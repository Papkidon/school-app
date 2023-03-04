import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ClassController } from './class.controller';
import { ClassRepository } from './class.repository';
import { ClassService } from './class.service';

@Module({
  controllers: [ClassController],
  providers: [ClassService, ClassRepository, PrismaService],
})
export class ClassModule {}
