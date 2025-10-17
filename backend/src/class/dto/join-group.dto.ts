import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class JoinGroupDto {
    @IsNotEmpty()
    @IsUUID()
    classId: string;  // ID of the class to join

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string;  // Class password
}
