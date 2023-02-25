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
import {
  adminCreateSchema,
  adminUpdateSchema,
} from '../../models/admin/admin.types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AdminService } from './admin.service';
import { ZodValidationPipe } from '../../pipes/zod.validation.pipe';
import { adminType } from '../../models/admin/admin.types';
import { Admin } from '@prisma/client';
import { DeepPartial, idSchema } from '../../models/utility.types';

@Controller('api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('')
  async findAll(): Promise<Admin[]> {
    try {
      const result = await this.adminService.findAll();

      if (!Object.keys(result).length) {
        throw new HttpException(
          'No admin data exists in the database',
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
    @Body(new ZodValidationPipe(adminCreateSchema)) createAdminDto: adminType,
  ): Promise<Admin> {
    try {
      return await this.adminService.create(createAdminDto);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findById(
    @Param('id', new ZodValidationPipe(idSchema)) id: string,
  ): Promise<Admin> {
    try {
      const result = await this.adminService.findById(id);

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
    @Body(new ZodValidationPipe(adminUpdateSchema))
    body: DeepPartial<adminType>,
  ): Promise<Admin> {
    try {
      return await this.adminService.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', new ZodValidationPipe(idSchema)) id: string,
  ): Promise<Admin> {
    try {
      return await this.adminService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
