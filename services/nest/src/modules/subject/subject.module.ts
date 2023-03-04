import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SubjectController } from './subject.controller';
import { SubjectRepository } from './subject.repository';
import { SubjectService } from './subject.service';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepository, PrismaService],
})
export class SubjectModule {}
