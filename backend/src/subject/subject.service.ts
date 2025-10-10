import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from 'prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {



  }



  async create(name: string, id: string) {
    try {
      const finduser = await this.prisma.user.findUnique({
        where: {
          id: id
        }
      });
      if (!finduser) {
        throw new NotFoundException('User not found');
      }
      const subject = await this.prisma.subject.create({
        data: {
          name: name.toString(),
          userId: id
        }
      });
      return subject;

    } catch (error) {
      console.log(error);
      throw error;

    }
  }
}
