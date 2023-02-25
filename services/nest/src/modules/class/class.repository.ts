import { Injectable } from '@nestjs/common';
import { PrismaService as PrismaService } from 'nestjs-prisma';
import { classType } from '../../models/class/class.types';
import { DeepPartial } from '../../models/utility.types';
import { Class } from '@prisma/client';
import { classesWithSubjectsDto } from '../../models/class/class.types';

@Injectable()
export class ClassRepository {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<Class[]> {
    return await this.prisma.class.findMany();
  }

  async findById(id: string): Promise<Class> {
    return await this.prisma.class.findUnique({ where: { id: id } });
  }

  async findAllClassesWithSubjects(): Promise<classesWithSubjectsDto> {
    return (await this.prisma.class.findMany({
      include: {
        ClassSubject: {
          include: {
            subject: true,
          },
        },
      },
    })) as unknown as classesWithSubjectsDto;
  }

  async create(body: any): Promise<Class> {
    return await this.prisma.class.create(body);
  }

  async delete(id: string): Promise<Class> {
    return await this.prisma.class.delete({ where: { id: id } });
  }

  async update(id: string, body: DeepPartial<classType>): Promise<Class> {
    return await this.prisma.class.update({
      where: { id: id },
      data: { ...body.data },
    });
  }
}
