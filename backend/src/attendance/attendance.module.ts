import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService, JwtService],
})
export class AttendanceModule {}
