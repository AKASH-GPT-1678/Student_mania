import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ClassController],
  providers: [ClassService,PrismaService,JwtService],
})
export class ClassModule {}
