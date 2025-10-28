// src/announcement/dto/create-announcement.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  classId: string;

  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;


  @IsOptional()
  @IsString()
  creatorId?: string;
}
export type AttendanceDto = {
  Date: string;       // e.g. "2025-10-08"
  Lecture: string;    // e.g. "Marketing Fundamentals"
  Day: string;  
  Time : string      // e.g
}