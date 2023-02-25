import { SubjectController } from '../../src/modules/subject/subject.controller';
import { SubjectService } from '../../src/modules/subject/subject.service';
import { SubjectRepository } from '../../src/modules/subject/subject.repository';
import { PrismaService } from 'nestjs-prisma';
import { Subject } from '@prisma/client';
import * as subjectTypes from '../../src/modules/subject/subject.mapper';
import {
  mappedSubjectsWithClassesDto,
  subjectsWithClassesDto,
} from '../../src/models/subject/subject.types';
import {
  dummySubjectId,
  dummySubjectCreate,
  dummySubjectUpdate,
} from './utils/dummy.data';

jest.mock('uuid', () => ({ v4: () => 'cdd77c0f-63f6-49a8-8023-dd05f8ec5dcf' }));
jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

describe('UserController', () => {
  let subjectController: SubjectController;
  let subjectService: SubjectService;
  let subjectRepository: SubjectRepository;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    subjectRepository = new SubjectRepository(prismaService);
    subjectService = new SubjectService(subjectRepository);
    subjectController = new SubjectController(subjectService);
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of all subjects', async () => {
      const result = ['subject1', 'subject2'] as unknown as Subject[];
      jest
        .spyOn(subjectRepository, 'findAll')
        .mockImplementation(async () => result);

      expect(await subjectController.findAll()).toMatchSnapshot();
    });
  });

  describe('findUnique', () => {
    it('should return a subject with given id', async () => {
      const result = 'dummyFoundByIdSubject' as unknown as Subject;
      jest
        .spyOn(subjectRepository, 'findById')
        .mockImplementation(async () => result);

      expect(
        await subjectController.findById(dummySubjectId),
      ).toMatchSnapshot();
    });
  });

  describe('findSubjectsWithClasses', () => {
    it('should return all subjects with their classes', async () => {
      const mappedResult =
        'dummyMappedSubjectsWithClasses' as unknown as mappedSubjectsWithClassesDto;
      const result =
        'dummyFoundSubjectsWithClasses' as unknown as subjectsWithClassesDto;

      jest
        .spyOn(subjectRepository, 'findAllSubjectsWithClasses')
        .mockImplementation(async () => result);

      jest
        .spyOn(subjectTypes, 'mapSubjectsWithClasses')
        .mockImplementation(() => mappedResult);

      expect(
        await subjectController.findAllSubjectsWithClasses(),
      ).toMatchSnapshot();
    });
  });

  describe('create', () => {
    it('should create a new subject', async () => {
      const result = 'dummyCreatedSubject' as unknown as Subject;
      jest
        .spyOn(subjectRepository, 'create')
        .mockImplementation(async () => result);

      expect(
        await subjectController.create(dummySubjectCreate),
      ).toMatchSnapshot();
    });
  });

  describe('update', () => {
    it('should update a subject with given id', async () => {
      const result = 'dummyUpdatedSubject' as unknown as Subject;
      jest
        .spyOn(subjectRepository, 'update')
        .mockImplementation(async () => result);

      expect(
        await subjectRepository.update(dummySubjectId, dummySubjectUpdate),
      ).toMatchSnapshot();
    });
  });

  describe('delete', () => {
    it('should delete a subject with given id', async () => {
      const result = 'dummyDeletedSubject' as unknown as Subject;
      jest
        .spyOn(subjectRepository, 'delete')
        .mockImplementation(async () => result);

      expect(await subjectController.delete(dummySubjectId)).toMatchSnapshot();
    });
  });
});
