import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('api/subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}




  @Post('create')
  create(@Body() name : string) {
    return this.subjectService.create(name);
  }

 
}
