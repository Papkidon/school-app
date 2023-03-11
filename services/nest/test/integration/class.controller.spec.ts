import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { classesWithSubjectsDto } from '../../src/models/class/class.types';
import { ClassModule } from '../../src/modules/class/class.module';
import { ClassRepository } from '../../src/modules/class/class.repository';
import {
  dummyClassCreate,
  dummyClassesWithSubjects,
} from './dummies/dummy.data';

describe('[ClassController] Integration tests', () => {
  let app: INestApplication;
  const classRepository = {
    findAll: () => ['dummyFoundClasses'],
    findById: () => 'dummyFoundClassById',
    findByNumber: () => 'dummyFoundClassByNumber',
    findAllClassesWithSubjects: () =>
      dummyClassesWithSubjects as unknown as classesWithSubjectsDto,
    create: () => 'dummyCreatedClass',
    update: () => 'dummyUpdatedClass',
    delete: () => 'dummyDeletedClass',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ClassModule],
    })
      .overrideProvider(ClassRepository)
      .useValue(classRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`Get all classes - should pass when at least one class exists in the db`, async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/class/');

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Get all classes - should fail when no class data exists in the db`, async () => {
    jest.spyOn(classRepository, 'findAll').mockImplementationOnce(() => []);

    const response = await request(app.getHttpServer()).get('/api/v1/class/');

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Get class by id - should pass when class with given id exists in the db`, async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/class/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Get class by id - should fail when class with given id does not exists in the db`, async () => {
    jest.spyOn(classRepository, 'findById').mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer()).get(
      '/api/v1/class/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it('Get class by id - should fail when id parameter is not UUID', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/class/123',
    );

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  it('Get classes with subjects - should pass when data exists', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/class/subjects',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it('Get classes with subjects - should fail when data does not exists', async () => {
    jest
      .spyOn(classRepository, 'findAllClassesWithSubjects')
      .mockImplementationOnce(() => '' as unknown as classesWithSubjectsDto);

    const response = await request(app.getHttpServer()).get(
      '/api/v1/class/subjects',
    );

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Create class - should pass when request body is correct`, async () => {
    jest
      .spyOn(classRepository, 'findByNumber')
      .mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer())
      .post('/api/v1/class/')
      .send(dummyClassCreate);

    expect(response.status).toEqual(201);
    expect(response.body).toMatchSnapshot();
  });

  it(`Create class - should fail when class with given number already exists`, async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/class/')
      .send(dummyClassCreate);

    expect(response.status).toEqual(409);
    expect(response.body).toMatchSnapshot();
  });

  it('Create class - should fail when request body is incorrect', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/class/')
      .send({ wrong: 'body' });

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  it(`Update class - should pass when class with given id exists in the db`, async () => {
    jest
      .spyOn(classRepository, 'findById')
      .mockImplementationOnce(() => 'dummyFoundClassToUpdate');

    const response = await request(app.getHttpServer()).patch(
      '/api/v1/class/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    ); // It passes without the body, because every property is optional

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Update class - should fail when class with given id does not exists in the db`, async () => {
    jest.spyOn(classRepository, 'findById').mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer()).patch(
      '/api/v1/class/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    ); // It passes without the body, because every property is optional

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Update class - should fail when id parameter is not UUID`, async () => {
    const response = await request(app.getHttpServer()).patch(
      '/api/v1/class/123',
    ); // It passes without the body, because every property is optional

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  it(`Delete class - should pass when class with given id exists in the db`, async () => {
    const response = await request(app.getHttpServer()).delete(
      '/api/v1/class/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Delete class - should fail when class with given id does not exist in the db`, async () => {
    jest.spyOn(classRepository, 'findById').mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer()).delete(
      '/api/v1/class/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Delete class - should fail when id parameter is not UUID`, async () => {
    const response = await request(app.getHttpServer()).delete(
      '/api/v1/class/123',
    );

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  afterAll(async () => {
    await app.close();
  });
});
