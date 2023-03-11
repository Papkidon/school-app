import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from '../../src/modules/user/user.module';
import { UserRepository } from '../../src/modules/user/user.repository';
import { dummyPersonCreate } from './dummies/dummy.data';

describe('[UserController] Integration tests', () => {
  let app: INestApplication;
  const userRepository = {
    findAll: () => ['dummyFoundUser'],
    findById: () => 'dummyFoundUserById',
    findByUsername: () => 'dummyFoundUserByUsername',
    create: () => 'dummyCreatedUser',
    createRandomUser: () => 'dummyCreatedRandomUser',
    update: () => 'dummyUpdatedUser',
    delete: () => 'dummyDeletedUser',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserRepository)
      .useValue(userRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`Get all users - should pass when at least one user exists in the db`, async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/user/');

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Get all user - should fail when no user data exists in the db`, async () => {
    jest.spyOn(userRepository, 'findAll').mockImplementationOnce(() => []);

    const response = await request(app.getHttpServer()).get('/api/v1/user/');

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Get user by id - should pass when user with given id exists in the db`, async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/user/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Get user by id - should fail when user with given id does not exists in the db`, async () => {
    jest.spyOn(userRepository, 'findById').mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer()).get(
      '/api/v1/user/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it('Get user by id - should fail when id parameter is not UUID', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/user/123');

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  it(`Create user - should pass when request body is correct`, async () => {
    jest
      .spyOn(userRepository, 'findByUsername')
      .mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer())
      .post('/api/v1/user/')
      .send(dummyPersonCreate);

    expect(response.status).toEqual(201);
    expect(response.body).toMatchSnapshot();
  });

  it(`Create user - should fail when user with given username already exists`, async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/user/')
      .send(dummyPersonCreate);

    expect(response.status).toEqual(409);
    expect(response.body).toMatchSnapshot();
  });

  it('Create user - should fail when request body is incorrect', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/user/')
      .send({ wrong: 'body' });

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  it('Create random user - should pass', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/user/random/')
      .send();

    expect(response.status).toEqual(201);
    expect(response.body).toMatchSnapshot();
  });

  it('Create random user - should fail due to an unpredicted error', async () => {
    jest
      .spyOn(userRepository, 'createRandomUser')
      .mockImplementationOnce(() => {
        throw new Error('Something went wrong');
      });

    const response = await request(app.getHttpServer())
      .post('/api/v1/user/random/')
      .send();

    expect(response.status).toEqual(500);
    expect(response.body).toMatchSnapshot();
  });

  it(`Update user - should pass when user with given id exists in the db`, async () => {
    jest.spyOn(userRepository, 'findById').mockImplementationOnce(() => 'xD');
    const response = await request(app.getHttpServer()).patch(
      '/api/v1/user/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    ); // It passes without the body, because every property is optional

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Update user - should fail when user with given id does not exists in the db`, async () => {
    jest.spyOn(userRepository, 'findById').mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer()).patch(
      '/api/v1/user/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    ); // It passes without the body, because every property is optional

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Update user - should fail when id parameter is not UUID`, async () => {
    const response = await request(app.getHttpServer()).patch(
      '/api/v1/user/123',
    ); // It passes without the body, because every property is optional

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  it(`Delete user - should pass when user with given id exists in the db`, async () => {
    const response = await request(app.getHttpServer()).delete(
      '/api/v1/user/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Delete user - should fail when user with given id does not exist in the db`, async () => {
    jest.spyOn(userRepository, 'findById').mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer()).delete(
      '/api/v1/user/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Delete user - should fail when id parameter is not UUID`, async () => {
    const response = await request(app.getHttpServer()).delete(
      '/api/v1/user/123',
    );

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  afterAll(async () => {
    await app.close();
  });
});
