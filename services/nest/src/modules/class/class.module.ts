import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { ClassRepository } from './class.repository';
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
  controllers: [ClassController],
  providers: [ClassService, ClassRepository, PrismaService],
})
export class ClassModule {}
