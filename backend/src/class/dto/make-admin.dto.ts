import { IsNotEmpty, IsUUID } from 'class-validator';

export class MakeAdminDto {
  @IsNotEmpty()
  @IsUUID()
  classId: string;  // ID of the class

  @IsNotEmpty()
  @IsUUID()
  targetUserId: string; // User we want to promote
}
