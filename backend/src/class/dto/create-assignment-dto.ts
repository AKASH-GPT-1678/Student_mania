import { IsString, IsOptional, IsArray, IsDateString, ArrayNotEmpty, IsUUID } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString() // ensures valid ISO 8601 date format
  dueDate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];

  @IsUUID()
  classId: string;
}
