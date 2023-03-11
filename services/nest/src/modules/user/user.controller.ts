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
import {
  userCreateSchema,
  userUpdateSchema,
} from '../../models/user/user.types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from '@prisma/client';
import { userType } from '../../models/user/user.types';
import { DeepPartial, idSchema } from '../../models/utility.types';
import { ZodValidationPipe } from '../../pipes/zod.validation.pipe';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async findAll(): Promise<User[]> {
    try {
      const result = await this.userService.findAll();

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

  @Post('')
  async create(
    @Body(new ZodValidationPipe(userCreateSchema)) createUserDto: userType,
  ): Promise<User> {
    try {
      const userExists = await this.userService.findByUsername(
        createUserDto.data.username,
      );

      if (userExists) {
        throw new HttpException(
          'User with given username already exists',
          HttpStatus.CONFLICT,
        );
      }

      return await this.userService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('random')
  async createRandomUser() {
    try {
      return await this.userService.createRandomUser();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findById(
    @Param('id', new ZodValidationPipe(idSchema)) id: string,
  ): Promise<User> {
    try {
      const result = await this.userService.findById(id);

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
    @Body(new ZodValidationPipe(userUpdateSchema))
    body: DeepPartial<userType>,
  ): Promise<User> {
    try {
      const userExists = await this.userService.findById(id);

      if (!userExists) {
        throw new HttpException(
          'User with given username does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.userService.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', new ZodValidationPipe(idSchema)) id: string,
  ): Promise<User> {
    try {
      const userExists = await this.userService.findById(id);

      if (!userExists) {
        throw new HttpException(
          'User with given username does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.userService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
