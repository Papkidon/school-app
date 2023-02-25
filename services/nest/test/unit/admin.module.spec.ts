import { PrismaService } from 'nestjs-prisma';
import { Admin } from '@prisma/client';
import { AdminRepository } from '../../src/modules/admin/admin.repository';
import { AdminService } from '../../src/modules/admin/admin.service';
import { AdminController } from '../../src/modules/admin/admin.controller';
import {
  dummyAdminId,
  dummyAdminUpdate,
  dummyAdminCreate,
} from './utils/dummy.data';

jest.mock('uuid', () => ({ v4: () => 'cdd77c0f-63f6-49a8-8023-dd05f8ec5dcf' }));
jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

describe('UserController', () => {
  let adminController: AdminController;
  let adminService: AdminService;
  let adminRepository: AdminRepository;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    adminRepository = new AdminRepository(prismaService);
    adminService = new AdminService(adminRepository);
    adminController = new AdminController(adminService);
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of all admins', async () => {
      const result = ['admin1', 'admin2'] as unknown as Admin[];
      jest
        .spyOn(adminRepository, 'findAll')
        .mockImplementation(async () => result);

      expect(await adminController.findAll()).toMatchSnapshot();
    });
  });

  describe('findUnique', () => {
    it('should return an admin with given id', async () => {
      const result = 'dummyFoundByIdAdmin' as unknown as Admin;
      jest
        .spyOn(adminRepository, 'findById')
        .mockImplementation(async () => result);

      expect(await adminController.findById(dummyAdminId)).toMatchSnapshot();
    });
  });

  describe('create', () => {
    it('should create a new admin', async () => {
      const result = 'dummyCreatedAdmin' as unknown as Admin;
      jest
        .spyOn(adminRepository, 'create')
        .mockImplementation(async () => result);

      expect(await adminController.create(dummyAdminCreate)).toMatchSnapshot();
    });
  });

  describe('update', () => {
    it('should update an admin with given id', async () => {
      const result = 'dummyUpdatedAdmin' as unknown as Admin;
      jest
        .spyOn(adminRepository, 'update')
        .mockImplementation(async () => result);

      expect(
        await adminController.update(dummyAdminId, dummyAdminUpdate),
      ).toMatchSnapshot();
    });
  });

  describe('delete', () => {
    it('should delete an admin with given id', async () => {
      const result = 'dummyDeletedAdmin' as unknown as Admin;
      jest
        .spyOn(adminRepository, 'delete')
        .mockImplementation(async () => result);

      expect(await adminController.delete(dummyAdminId)).toMatchSnapshot();
    });
  });
});
