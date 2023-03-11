import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { userType } from '../../models/user/user.types';
import { DeepPartial } from '../../models/utility.types';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  async create(body: any): Promise<User> {
    return await this.prisma.user.create(body);
  }

  async createRandomUser(username: string, password: string): Promise<User> {
    return await this.prisma.user.create({
      data: {
        username,
        password,
      },
    });
  }

  async delete(id: string): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }

  async update(id: string, body: DeepPartial<userType>): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: { ...body.data },
    });
  }
}
