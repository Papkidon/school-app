import { Injectable } from '@nestjs/common';
import { PrismaService as PrismaService } from 'nestjs-prisma';
import { subjectType } from '../../models/subject/subject.types';
import { DeepPartial } from '../../models/utility.types';
import { Subject } from '@prisma/client';
import { subjectsWithClassesDto } from '../../models/subject/subject.types';

@Injectable()
export class SubjectRepository {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<Subject[]> {
    return await this.prisma.subject.findMany();
  }

  async findById(id: string): Promise<Subject> {
    return await this.prisma.subject.findUnique({ where: { id: id } });
  }

  async findAllSubjectsWithClasses() {
    return (await this.prisma.$queryRaw`
        SELECT
        json_build_object (
            'id', s.id,
            'name', s.name,
            'points', s.points,
            'classes', jsonb_agg (c)
            ) AS result
       FROM "Subject" s
       LEFT JOIN "ClassSubject" as cs ON
       s.id = cs.subject_id
       LEFT JOIN "Class" as c ON
       cs.class_id = c.id
       GROUP BY s.id;`) as subjectsWithClassesDto;
  }

  async create(body: any): Promise<Subject> {
    return await this.prisma.subject.create(body);
  }

  async delete(id: string): Promise<Subject> {
    return await this.prisma.subject.delete({ where: { id: id } });
  }

  async update(id: string, body: DeepPartial<subjectType>): Promise<Subject> {
    return await this.prisma.subject.update({
      where: { id: id },
      data: { ...body.data },
    });
  }
}
