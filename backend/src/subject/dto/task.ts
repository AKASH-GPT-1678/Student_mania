// src/subject-task/dto/create-subject-task.dto.ts
import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class CreateSubjectTaskDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsInt()
  subjectId: number;
}
