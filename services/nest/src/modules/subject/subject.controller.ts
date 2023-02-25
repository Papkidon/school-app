import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SubjectService } from './subject.service';
import { ZodValidationPipe } from '../../pipes/zod.validation.pipe';
import {
  subjectCreateSchema,
  subjectType,
  subjectUpdateSchema,
} from '../../models/subject/subject.types';
import { DeepPartial } from '../../models/utility.types';
import { Subject } from '@prisma/client';
import { mapSubjectsWithClasses } from './subject.mapper';
import { idSchema } from '../../models/utility.types';

@Controller('api/v1/subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('')
  async findAll(): Promise<Subject[]> {
    try {
      const result = await this.subjectService.findAll();

      if (!Object.keys(result).length) {
        throw new HttpException(
          'No user data exists in the database',
          HttpStatus.NOT_FOUND,
        );
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get('classes')
  async findAllSubjectsWithClasses(): Promise<unknown> {
    try {
      return mapSubjectsWithClasses(
        await this.subjectService.findAllSubjectWithClasses(),
      );
    } catch (error) {
      throw error;
    }
  }

  @Post('')
  async create(
    @Body(new ZodValidationPipe(subjectCreateSchema))
    createSubjectDto: subjectType,
  ): Promise<Subject> {
    try {
      return await this.subjectService.create(createSubjectDto);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findById(
    @Param('id', new ZodValidationPipe(idSchema)) id: string,
  ): Promise<Subject> {
    try {
      const result = await this.subjectService.findById(id);

      if (!result) {
        throw new HttpException(
          'User with given id does not exist in the database',
          HttpStatus.NOT_FOUND,
        );
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new ZodValidationPipe(idSchema)) id: string,
    @Body(new ZodValidationPipe(subjectUpdateSchema))
    body: DeepPartial<subjectType>,
  ): Promise<Subject> {
    console.log(id);
    try {
      return await this.subjectService.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', new ZodValidationPipe(idSchema)) id: string,
  ): Promise<Subject> {
    try {
      return await this.subjectService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
