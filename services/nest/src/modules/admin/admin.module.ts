import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
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
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, PrismaService],
})
export class AdminModule {}
