import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AdminModule } from '../../src/modules/admin/admin.module';
import { AdminRepository } from '../../src/modules/admin/admin.repository';
import { dummyAdminCreate } from './dummies/dummy.data';

describe('[AdminController] Integration tests', () => {
  let app: INestApplication;
  const adminRepository = {
    findAll: () => ['dummyFoundAdmin'],
    findById: () => 'dummyFoundAdminById',
    findByUsername: () => 'dummyFoundAdminByUsername',
    create: () => 'dummyCreatedAdmin',
    update: () => 'dummyUpdatedAdmin',
    delete: () => 'dummyDeletedAdmin',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AdminModule],
    })
      .overrideProvider(AdminRepository)
      .useValue(adminRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`Get all admins - should pass when at least one admin exists in the db`, async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/admin/');

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Get all admins - should fail when no admin data exists in the db`, async () => {
    jest.spyOn(adminRepository, 'findAll').mockImplementationOnce(() => []);

    const response = await request(app.getHttpServer()).get('/api/v1/admin/');

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Get admin by id - should pass when admin with given id exists in the db`, async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/admin/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Get admin by id - should fail when admin with given id does not exists in the db`, async () => {
    jest.spyOn(adminRepository, 'findById').mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer()).get(
      '/api/v1/admin/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it('Get admin by id - should fail when id parameter is not UUID', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/admin/123',
    );

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  it(`Create admin - should pass when request body is correct`, async () => {
    jest
      .spyOn(adminRepository, 'findByUsername')
      .mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer())
      .post('/api/v1/admin/')
      .send(dummyAdminCreate);

    expect(response.status).toEqual(201);
    expect(response.body).toMatchSnapshot();
  });

  it('Create admin - should fail when request body is incorrect', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/admin/')
      .send({ wrong: 'body' });

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  it(`Update admin - should pass when admin with given id exists in the db`, async () => {
    jest.spyOn(adminRepository, 'findById').mockImplementationOnce(() => 'xD');
    const response = await request(app.getHttpServer()).patch(
      '/api/v1/admin/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    ); // It passes without the body, because every property is optional

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Update admin - should fail when admin with given id does not exists in the db`, async () => {
    jest.spyOn(adminRepository, 'findById').mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer()).patch(
      '/api/v1/admin/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    ); // It passes without the body, because every property is optional

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Update admin - should fail when id parameter is not UUID`, async () => {
    const response = await request(app.getHttpServer()).patch(
      '/api/v1/admin/123',
    ); // It passes without the body, because every property is optional

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  it(`Delete admin - should pass when admin with given id exists in the db`, async () => {
    const response = await request(app.getHttpServer()).delete(
      '/api/v1/admin/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Delete admin - should fail when admin with given id does not exist in the db`, async () => {
    jest.spyOn(adminRepository, 'findById').mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer()).delete(
      '/api/v1/admin/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Delete admin - should fail when id parameter is not UUID`, async () => {
    const response = await request(app.getHttpServer()).delete(
      '/api/v1/admin/123',
    );

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  afterAll(async () => {
    await app.close();
  });
});
