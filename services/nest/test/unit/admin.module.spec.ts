import { Admin } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { AdminController } from '../../src/modules/admin/admin.controller';
import { AdminRepository } from '../../src/modules/admin/admin.repository';
import { AdminService } from '../../src/modules/admin/admin.service';
import {
  dummyAdminCreate,
  dummyAdminId,
  dummyAdminUpdate,
} from './utils/dummy.data';

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
      const dummyAdminNotFound = '' as unknown as Admin;
      const result = 'dummyCreatedAdmin' as unknown as Admin;
      jest
        .spyOn(adminRepository, 'create')
        .mockImplementation(async () => result);
      jest
        .spyOn(adminRepository, 'findByUsername')
        .mockImplementation(async () => dummyAdminNotFound);

      expect(await adminController.create(dummyAdminCreate)).toMatchSnapshot();
    });
  });

  describe('update', () => {
    it('should update an admin with given id', async () => {
      const dummyFoundAdminById = 'dummyAdminExists' as unknown as Admin;
      const result = 'dummyUpdatedAdmin' as unknown as Admin;
      jest
        .spyOn(adminRepository, 'update')
        .mockImplementation(async () => result);
      jest
        .spyOn(adminRepository, 'findById')
        .mockImplementation(async () => dummyFoundAdminById);

      expect(
        await adminController.update(dummyAdminId, dummyAdminUpdate),
      ).toMatchSnapshot();
    });
  });

  describe('delete', () => {
    it('should delete an admin with given id', async () => {
      const dummyAdminFoundById = 'dummyAdminFoundById' as unknown as Admin;
      const result = 'dummyDeletedAdmin' as unknown as Admin;
      jest
        .spyOn(adminRepository, 'delete')
        .mockImplementation(async () => result);
      jest
        .spyOn(adminRepository, 'findById')
        .mockImplementation(async () => dummyAdminFoundById);

      expect(await adminController.delete(dummyAdminId)).toMatchSnapshot();
    });
  });
});
