import { Class } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import {
  classesWithSubjectsDto,
  mappedClassesWithSubjects,
} from '../../src/models/class/class.types';
import { ClassController } from '../../src/modules/class/class.controller';
import * as classTypes from '../../src/modules/class/class.mapper';
import { ClassRepository } from '../../src/modules/class/class.repository';
import { ClassService } from '../../src/modules/class/class.service';
import {
  dummyClassCreate,
  dummyClassId,
  dummyClassUpdate,
} from './dummies/dummy.data';

describe('UserController', () => {
  let classController: ClassController;
  let classService: ClassService;
  let classRepository: ClassRepository;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    classRepository = new ClassRepository(prismaService);
    classService = new ClassService(classRepository);
    classController = new ClassController(classService);
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of all classes', async () => {
      const result = ['class1', 'class2'] as unknown as Class[];
      jest
        .spyOn(classRepository, 'findAll')
        .mockImplementation(async () => result);

      expect(await classController.findAll()).toMatchSnapshot();
    });
  });

  describe('findById', () => {
    it('should return a class with given id', async () => {
      const result = 'dummyFoundByIdClass' as unknown as Class;
      jest
        .spyOn(classRepository, 'findById')
        .mockImplementation(async () => result);

      expect(await classController.findById(dummyClassId)).toMatchSnapshot();
    });
  });

  describe('findClassesWithSubjects', () => {
    it('should return all classes with their subjects', async () => {
      const mappedResult =
        'dummyMappedResult' as unknown as mappedClassesWithSubjects;
      const result =
        'dummyFoundClassesWithSubjects' as unknown as classesWithSubjectsDto;

      jest
        .spyOn(classRepository, 'findAllClassesWithSubjects')
        .mockImplementation(async () => result);

      jest
        .spyOn(classTypes, 'mapClassesWithSubjects')
        .mockImplementation(() => mappedResult);

      expect(
        await classController.findAllClassesWithSubjects(),
      ).toMatchSnapshot();
    });
  });

  describe('create', () => {
    it('should create a new class', async () => {
      const dummyClassNotFoundByNumber = '' as unknown as Class;
      const result = 'dummyCreatedClass' as unknown as Class;
      jest
        .spyOn(classRepository, 'create')
        .mockImplementation(async () => result);

      jest
        .spyOn(classRepository, 'findByNumber')
        .mockImplementation(async () => dummyClassNotFoundByNumber);

      expect(await classController.create(dummyClassCreate)).toMatchSnapshot();
    });
  });

  describe('update', () => {
    it('should update a class with given id', async () => {
      const dummyFoundClassById = 'dummyFoundClassById' as unknown as Class;
      const result = 'dummyUpdatedClass' as unknown as Class;
      jest
        .spyOn(classRepository, 'update')
        .mockImplementation(async () => result);

      jest
        .spyOn(classRepository, 'findById')
        .mockImplementation(async () => dummyFoundClassById);

      expect(
        await classController.update(dummyClassId, dummyClassUpdate),
      ).toMatchSnapshot();
    });
  });

  describe('delete', () => {
    it('should delete a class with given id', async () => {
      const dummyFoundClassById = 'dummyFoundClassById' as unknown as Class;
      const result = 'dummyDeletedUser' as unknown as Class;
      jest
        .spyOn(classRepository, 'delete')
        .mockImplementation(async () => result);

      jest
        .spyOn(classRepository, 'findById')
        .mockImplementation(async () => dummyFoundClassById);

      expect(await classController.delete(dummyClassId)).toMatchSnapshot();
    });
  });
});
