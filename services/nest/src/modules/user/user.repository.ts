import { Injectable } from '@nestjs/common';
import { PrismaService as PrismaService } from 'nestjs-prisma';
import { userType } from '../../models/user/user.types';
import { DeepPartial } from '../../models/utility.types';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  async create(body: any): Promise<User> {
    return await this.prisma.user.create(body);
  }

  async createRandomUser(username: string, password: string): Promise<User> {
    return await this.prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });
  }

  async delete(id: string): Promise<User> {
    return await this.prisma.user.delete({ where: { id: id } });
  }

  async update(id: string, body: DeepPartial<userType>): Promise<User> {
    return await this.prisma.user.update({
      where: { id: id },
      data: { ...body.data },
    });
  }
}
