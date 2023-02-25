import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { adminType } from '../../models/admin/admin.types';
import { DeepPartial } from '../../models/utility.types';
import { Admin } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}
  async findAll(): Promise<Admin[]> {
    return await this.adminRepository.findAll();
  }

  async findById(id: string): Promise<Admin> {
    return await this.adminRepository.findById(id);
  }

  async create(body: any): Promise<Admin> {
    return await this.adminRepository.create(body);
  }

  async delete(id: string): Promise<Admin> {
    return await this.adminRepository.delete(id);
  }

  async update(id: string, body: DeepPartial<adminType>): Promise<Admin> {
    return await this.adminRepository.update(id, body);
  }
}
