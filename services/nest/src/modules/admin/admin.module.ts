import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, PrismaService],
})
export class AdminModule {}
