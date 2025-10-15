import { BadRequestException, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors, Body, HttpStatus, HttpCode, HttpException, Get, Param } from '@nestjs/common';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { CreateClassDto } from './dto/create-class.dto';

import { ClassService } from './class.service';
import { AppService } from 'src/app.service';
import { CreateAssignmentDto } from './dto/create-assignment-dto';
import { CreateAnnouncementDto } from './dto/create-announcement';
@Controller('api/class')
export class ClassController {
  constructor(private readonly classService: ClassService, private readonly appservice: AppService) { }

  @Post('attendance')
  @UseInterceptors(FileInterceptor('file'))
  //@ts-ignore
  async createAttendace(@UploadedFile() file: Express.Multer.File) {
    console.log("I AM FILE", file);
    if (!file.originalname.endsWith(".csv")) {
      throw new BadRequestException("Only CSV files are allowed to process");

    };


    const response = await this.classService.processAttendance(file);
    console.log(response);

    return response;



  }

  @Post('create')
  @UseGuards(JwtGuard)
  async createClass(@Req() req, @Body() data: CreateClassDto) {
    try {

      const userId = req.user?.sub;
      if (!userId) {
        throw new HttpException(
          'Unauthorized: User ID not found in token',
          HttpStatus.UNAUTHORIZED,
        );
      }


      data.id = userId;

      const createdClass = await this.classService.createClass(data);
      console.log(createdClass);


      return {
        statusCode: HttpStatus.CREATED,
        message: 'Class created successfully',
        data: createdClass,
      };
    } catch (error) {

      if (error.code === 'P2002') {

        throw new HttpException(
          'Class with this name already exists',
          HttpStatus.CONFLICT,
        );
      }

      if (error instanceof HttpException) {
        throw error;
      }


      console.error('Unexpected error creating class:', error);
      throw new HttpException(
        'Internal server error while creating class',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  };


  @Get('load')
  @UseGuards(JwtGuard)
  async getOneClass(@Req() req) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new HttpException(
        'Unauthorized: User ID not found in token',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const oneClass = await this.classService.getOneClass(userId);
    return oneClass;

  }
  @UseGuards(JwtGuard)
  @Get('announcements/:classId')
  @HttpCode(200) // sets HTTP status to 200 OK
  async loadAnnouncements(@Param('classId') classId: string) {
    return this.classService.getAnnouncementsByClass(classId);
  }
  @Post('announcement')
  @UseGuards(JwtGuard)
  async createAnnouncement(@Req() req, @Body() data: CreateAnnouncementDto) {

    const userId = req.user?.sub;
    if (!userId) {
      throw new HttpException(
        'Unauthorized: User ID not found in token',
        HttpStatus.UNAUTHORIZED,
      );
    }
    data.creatorId = userId;
    const announcement = await this.classService.createAnnouncement(data);
    return announcement;

  }

  @Get('classes')
  @UseGuards(JwtGuard)
  async loadClass(@Req() req) {

    const userId = req.user?.sub;
    if (!userId) {
      throw new HttpException(
        'Unauthorized: User ID not found in token',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const classes = await this.classService.loadClass(userId);
    return classes;
  }

  @Post('assignments')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createAssignments(
    @Req() req,
    //@ts-ignore
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateAssignmentDto
  ) {
    const userId = req.user?.sub;
    console.log(" i am file", file)
    if (!userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    };




    let attachments: string[] = [];
    if (file) {
      const fileUrl = await this.appservice.uploadFile(file);
      attachments.push(fileUrl);
    }





    const assignments = await this.classService.createAssignments(data, userId);
    return assignments;
  }


}
