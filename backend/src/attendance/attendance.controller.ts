import { BadRequestException, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';


@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }



  @Post('create')
  // @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  //@ts-ignore
  async createAttendace(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    if (!file.originalname.endsWith(".csv")) {
      throw new BadRequestException("Only CSV files are allowed to process");

    };
 

    const response = await this.attendanceService.processAttendance(file);
    console.log(response);

    return response;
   


  }
}
