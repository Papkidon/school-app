import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { subjectsWithClassesDto } from '../../src/models/subject/subject.types';
import { SubjectModule } from '../../src/modules/subject/subject.module';
import { SubjectRepository } from '../../src/modules/subject/subject.repository';
import {
  dummySubjectCreate,
  dummySubjectsWithClasses,
} from './dummies/dummy.data';

describe('[SubjectController] Integration tests', () => {
  let app: INestApplication;
  const subjectRepository = {
    findAll: () => ['dummyFoundSubjects'],
    findById: () => 'dummyFoundSubjectById',
    findByName: () => 'dummyFoundSubjectByName',
    findAllSubjectsWithClasses: () =>
      dummySubjectsWithClasses as unknown as subjectsWithClassesDto,
    create: () => 'dummyCreatedSubject',
    update: () => 'dummyUpdatedSubject',
    delete: () => 'dummyDeletedSubject',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SubjectModule],
    })
      .overrideProvider(SubjectRepository)
      .useValue(subjectRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`Get all subjects - should pass when at least one subject exists in the db`, async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/subject/');

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Get all subjects - should fail when no subject data exists in the db`, async () => {
    jest.spyOn(subjectRepository, 'findAll').mockImplementationOnce(() => []);

    const response = await request(app.getHttpServer()).get('/api/v1/subject/');

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Get subject by id - should pass when subject with given id exists in the db`, async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/subject/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Get subject by id - should fail when subject with given id does not exists in the db`, async () => {
    jest.spyOn(subjectRepository, 'findById').mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer()).get(
      '/api/v1/subject/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it('Get subject by id - should fail when id parameter is not UUID', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/subject/123',
    );

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  it('Get subjects with classes - should pass when data exists', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/subject/classes',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it('Get subjects with classes - should fail when data does not exists', async () => {
    jest
      .spyOn(subjectRepository, 'findAllSubjectsWithClasses')
      .mockImplementationOnce(() => '' as unknown as subjectsWithClassesDto);

    const response = await request(app.getHttpServer()).get(
      '/api/v1/subject/classes',
    );

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Create subject - should pass when request body is correct`, async () => {
    jest
      .spyOn(subjectRepository, 'findByName')
      .mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer())
      .post('/api/v1/subject/')
      .send(dummySubjectCreate);

    expect(response.status).toEqual(201);
    expect(response.body).toMatchSnapshot();
  });

  it(`Create subject - should fail when subject with given number already exists`, async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/subject/')
      .send(dummySubjectCreate);

    expect(response.status).toEqual(409);
    expect(response.body).toMatchSnapshot();
  });

  it('Create subject - should fail when request body is incorrect', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/subject/')
      .send({ wrong: 'body' });

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  it(`Update subject - should pass when subject with given id exists in the db`, async () => {
    jest
      .spyOn(subjectRepository, 'findById')
      .mockImplementationOnce(() => 'dummyFoundSubjectToUpdate');

    const response = await request(app.getHttpServer()).patch(
      '/api/v1/subject/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    ); // It passes without the body, because every property is optional

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Update subject - should fail when subject with given id does not exists in the db`, async () => {
    jest.spyOn(subjectRepository, 'findById').mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer()).patch(
      '/api/v1/subject/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    ); // It passes without the body, because every property is optional

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Update subject - should fail when id parameter is not UUID`, async () => {
    const response = await request(app.getHttpServer()).patch(
      '/api/v1/subject/123',
    ); // It passes without the body, because every property is optional

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  it(`Delete subject - should pass when subject with given id exists in the db`, async () => {
    const response = await request(app.getHttpServer()).delete(
      '/api/v1/subject/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toMatchSnapshot();
  });

  it(`Delete subject - should fail when subject with given id does not exist in the db`, async () => {
    jest.spyOn(subjectRepository, 'findById').mockImplementationOnce(() => '');

    const response = await request(app.getHttpServer()).delete(
      '/api/v1/subject/e4067cdc-dc91-41a6-bbb3-650fdd352dd4',
    );

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });

  it(`Delete subject - should fail when id parameter is not UUID`, async () => {
    const response = await request(app.getHttpServer()).delete(
      '/api/v1/subject/123',
    );

    expect(response.status).toEqual(422);
    expect(response.body).toMatchSnapshot();
  });

  afterAll(async () => {
    await app.close();
  });
});
