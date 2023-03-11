import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Subject } from '@prisma/client';
import {
  subjectCreateSchema,
  subjectType,
  subjectUpdateSchema,
} from '../../models/subject/subject.types';
import { DeepPartial, idSchema } from '../../models/utility.types';
import { ZodValidationPipe } from '../../pipes/zod.validation.pipe';
import { mapSubjectsWithClasses } from './subject.mapper';
import { SubjectService } from './subject.service';

@Controller('api/v1/subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('')
  async findAll(): Promise<Subject[]> {
    try {
      const result = await this.subjectService.findAll();

      if (!Object.keys(result).length) {
        throw new HttpException(
          'No subject data exists in the database',
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
      const result = mapSubjectsWithClasses(
        await this.subjectService.findAllSubjectWithClasses(),
      );

      if (!result.length) {
        throw new HttpException(
          'No subject with classes data was found in the database',
          HttpStatus.NOT_FOUND,
        );
      }

      return result;
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
      const subjectExists = await this.subjectService.findByName(
        createSubjectDto.data.name,
      );

      if (subjectExists) {
        throw new HttpException(
          'Subject with given name already exists',
          HttpStatus.CONFLICT,
        );
      }

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
          'Subject with given id does not exist in the database',
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
    try {
      const subjectExists = await this.subjectService.findById(id);

      if (!subjectExists) {
        throw new HttpException(
          'Subject with given id does not exist in the database',
          HttpStatus.NOT_FOUND,
        );
      }

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
      const subjectExists = await this.subjectService.findById(id);

      if (!subjectExists) {
        throw new HttpException(
          'Subject with given id does not exist in the database',
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.subjectService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
