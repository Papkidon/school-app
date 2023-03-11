import { Injectable } from '@nestjs/common';
import { ClassRepository } from './class.repository';
import { classType } from '../../models/class/class.types';
import { DeepPartial } from '../../models/utility.types';
import { Class } from '@prisma/client';
import { classesWithSubjectsDto } from '../../models/class/class.types';

@Injectable()
export class ClassService {
  constructor(private classRepository: ClassRepository) {}
  async findAll(): Promise<Class[]> {
    return await this.classRepository.findAll();
  }

  async findById(id: string): Promise<Class> {
    return await this.classRepository.findById(id);
  }

  async findByNumber(number: number): Promise<Class> {
    return await this.classRepository.findByNumber(number);
  }

  async findAllClassesWithSubjects(): Promise<classesWithSubjectsDto> {
    return await this.classRepository.findAllClassesWithSubjects();
  }

  async create(body: any): Promise<Class> {
    return await this.classRepository.create(body);
  }

  async delete(id: string): Promise<Class> {
    return await this.classRepository.delete(id);
  }

  async update(id: string, body: DeepPartial<classType>): Promise<Class> {
    return await this.classRepository.update(id, body);
  }
}
