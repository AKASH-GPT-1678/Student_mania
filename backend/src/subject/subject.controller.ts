import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { JwtGuard } from 'src/jwt/jwt.guard';
@Controller('api/subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) { }



  @UseGuards(JwtGuard)
  @Post('create')
  create(@Req() req, @Body() data: CreateSubjectDto) {
    console.log(req.user);
    const id = req.user.sub;
    if (!id) {
      throw new NotFoundException('User not found');
    }
    return this.subjectService.create(data.name, id);
  };

  @UseGuards(JwtGuard)
  @Get('loadSubjects')
  loadAllSubjects(@Req() req) {
    const id = req.user.sub;
    if (!id) {
      throw new NotFoundException('User not found');
    }
    return this.subjectService.loadAllSubjects(id);
  };


}
