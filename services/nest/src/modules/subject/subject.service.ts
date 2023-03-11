import { Injectable } from '@nestjs/common';
import { SubjectRepository } from './subject.repository';
import { subjectType } from '../../models/subject/subject.types';
import { DeepPartial } from '../../models/utility.types';
import { Subject } from '@prisma/client';
import { subjectsWithClassesDto } from '../../models/subject/subject.types';

@Injectable()
export class SubjectService {
  constructor(private subjectRepository: SubjectRepository) {}
  async findAll(): Promise<Subject[]> {
    return await this.subjectRepository.findAll();
  }

  async findById(id: string): Promise<Subject> {
    return await this.subjectRepository.findById(id);
  }

  async findByName(name: string): Promise<Subject> {
    return await this.subjectRepository.findByName(name);
  }

  async findAllSubjectWithClasses(): Promise<subjectsWithClassesDto> {
    return await this.subjectRepository.findAllSubjectsWithClasses();
  }

  async create(body: any): Promise<Subject> {
    return await this.subjectRepository.create(body);
  }

  async delete(id: string): Promise<Subject> {
    return await this.subjectRepository.delete(id);
  }

  async update(id: string, body: DeepPartial<subjectType>): Promise<Subject> {
    return await this.subjectRepository.update(id, body);
  }
}
