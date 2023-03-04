import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
})
export class UserModule {}
