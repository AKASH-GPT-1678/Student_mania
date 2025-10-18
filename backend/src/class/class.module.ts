import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
      
    }),
  ],

  controllers: [ClassController],
  providers: [ClassService, PrismaService, JwtService, AppService],
})
export class ClassModule { }
