import { Injectable } from '@nestjs/common';
import { Admin } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { adminType } from '../../models/admin/admin.types';
import { DeepPartial } from '../../models/utility.types';

@Injectable()
export class AdminRepository {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<Admin[]> {
    return await this.prisma.admin.findMany();
  }

  async findById(id: string): Promise<Admin> {
    return await this.prisma.admin.findUnique({ where: { id } });
  }

  async findByUsername(username: string): Promise<Admin> {
    return await this.prisma.admin.findUnique({ where: { username } });
  }

  async create(body: any): Promise<Admin> {
    return await this.prisma.admin.create(body);
  }

  async delete(id: string): Promise<Admin> {
    return await this.prisma.admin.delete({ where: { id } });
  }

  async update(id: string, body: DeepPartial<adminType>): Promise<Admin> {
    return await this.prisma.admin.update({
      where: { id },
      data: { ...body.data },
    });
  }
}
