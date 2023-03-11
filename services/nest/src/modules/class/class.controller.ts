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
import { Class } from '@prisma/client';
import {
  classCreateSchema,
  classType,
  classUpdateSchema,
} from '../../models/class/class.types';
import { DeepPartial, idSchema } from '../../models/utility.types';
import { ZodValidationPipe } from '../../pipes/zod.validation.pipe';
import { mapClassesWithSubjects } from './class.mapper';
import { ClassService } from './class.service';

@Controller('api/v1/class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get('')
  async findAll(): Promise<Class[]> {
    try {
      const result = await this.classService.findAll();

      if (!Object.keys(result).length) {
        throw new HttpException(
          'No class data exists in the database',
          HttpStatus.NOT_FOUND,
        );
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get('subjects')
  async findAllClassesWithSubjects() {
    try {
      const result = mapClassesWithSubjects(
        await this.classService.findAllClassesWithSubjects(),
      );

      if (!result.length) {
        throw new HttpException(
          'No class data exists in the database',
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
    @Body(new ZodValidationPipe(classCreateSchema)) createClassDto: classType,
  ): Promise<Class> {
    try {
      const foundClass = await this.classService.findByNumber(
        createClassDto.data.number,
      );

      if (foundClass) {
        throw new HttpException(
          'Class with given number already exists',
          HttpStatus.CONFLICT,
        );
      }

      return await this.classService.create(createClassDto);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findById(
    @Param('id', new ZodValidationPipe(idSchema)) id: string,
  ): Promise<Class> {
    try {
      const result = await this.classService.findById(id);

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
    @Body(new ZodValidationPipe(classUpdateSchema))
    body: DeepPartial<classType>,
  ): Promise<Class> {
    try {
      const foundClass = await this.classService.findById(id);

      if (!foundClass) {
        throw new HttpException(
          'Class with given id does not exist in the database',
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.classService.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', new ZodValidationPipe(idSchema)) id: string,
  ): Promise<Class> {
    try {
      const foundClass = await this.classService.findById(id);

      if (!foundClass) {
        throw new HttpException(
          'Class with given id does not exist in the database',
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.classService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
