import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserController } from '../../src/modules/user/user.controller';
import { UserRepository } from '../../src/modules/user/user.repository';
import { UserService } from '../../src/modules/user/user.service';
import {
  dummyUserCreate,
  dummyUserId,
  dummyUserUpdate,
} from './utils/dummy.data';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let userRepository: UserRepository;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    userRepository = new UserRepository(prismaService);
    userService = new UserService(userRepository);
    userController = new UserController(userService);
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of all users', async () => {
      const result = ['user1', 'user2'] as unknown as User[];
      jest
        .spyOn(userRepository, 'findAll')
        .mockImplementation(async () => result);

      expect(await userController.findAll()).toMatchSnapshot();
    });
  });

  describe('findUnique', () => {
    it('should return an user with given id', async () => {
      const result = 'dummyFoundByIdUser' as unknown as User;
      jest
        .spyOn(userRepository, 'findById')
        .mockImplementation(async () => result);

      expect(await userController.findById(dummyUserId)).toMatchSnapshot();
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const result = 'dummyCreatedUser' as unknown as User;
      jest
        .spyOn(userRepository, 'create')
        .mockImplementation(async () => result);

      expect(await userController.create(dummyUserCreate)).toMatchSnapshot();
    });
  });

  describe('update', () => {
    it('should update an user with given id', async () => {
      const result = 'dummyUpdatedUser' as unknown as User;
      jest
        .spyOn(userRepository, 'update')
        .mockImplementation(async () => result);

      expect(
        await userController.update(dummyUserId, dummyUserUpdate),
      ).toMatchSnapshot();
    });
  });

  describe('delete', () => {
    it('should delete an user with given id', async () => {
      const result = 'dummyDeletedUser' as unknown as User;
      jest
        .spyOn(userRepository, 'delete')
        .mockImplementation(async () => result);

      expect(await userController.delete(dummyUserId)).toMatchSnapshot();
    });
  });
});
