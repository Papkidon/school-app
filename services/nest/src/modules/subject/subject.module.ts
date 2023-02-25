import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { SubjectRepository } from './subject.repository';
import { LoggerModule } from 'nestjs-pino';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    PrismaModule.forRoot(),
  ],
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepository, PrismaService],
})
export class SubjectModule {}
