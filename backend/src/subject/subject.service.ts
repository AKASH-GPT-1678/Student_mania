import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SubjectService {
   constructor(private readonly prisma : PrismaService) {


    
   }



   async create(name : string) {
    return await this.prisma.subject.create(
      {
        data : {
          name : name
        }
      }
    )
  }
}
