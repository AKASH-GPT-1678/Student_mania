import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    IsDateString,
    MinLength,
} from 'class-validator';

export class CreateAdvertisementDto {
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    title: string;

    @IsOptional()
    @IsString()
    content?: string;

 
    @IsUrl({}, { message: 'Image URL must be a valid URL' })
    imageUrl?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Start date must be a valid ISO date string' })
    startDate?: string;

    @IsOptional()
    @IsDateString({}, { message: 'End date must be a valid ISO date string' })
    endDate?: string;

    @IsOptional()
    @IsUrl({}, { message: 'Links must be a valid URL' })
    links?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'brandId is required' })
    brandId: string;
}
