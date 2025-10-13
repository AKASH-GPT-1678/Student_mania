// create-class.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClassDto {
    @IsNotEmpty({ message: 'Class name is required' })
    @IsString()
    className: string;

    @IsOptional()
    @IsString()
    section?: string;

    @IsOptional()
    @IsString()
    room?: string;

    @IsOptional()
    @IsString()
    subject?: string;


    @IsOptional()
    @IsString()
    id?: string
}
