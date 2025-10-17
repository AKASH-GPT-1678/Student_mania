import { IsNotEmpty, IsUUID } from 'class-validator';

export class LeaveGroupDto {
  @IsNotEmpty()
  @IsUUID()
  classId: string;
}
