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
