import {
  IsString,
  IsEmail,
  IsOptional,
  IsUrl,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @MinLength(10, { message: 'Contact number must be at least 10 digits' })
  @MaxLength(15, { message: 'Contact number too long' })
  contactNumber: string;

  @IsOptional()
  @IsUrl({}, { message: 'Please enter a valid URL' })
  website?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Please enter a valid image URL' })
  logoUrl?: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Description should be at least 10 characters' })
  description?: string;

  @IsString()
  @MinLength(2, { message: 'Category is required' })
  category: string;

  @IsString()
  @MinLength(2, { message: 'Location is required' })
  location: string;

  @IsString()
  @MinLength(2, { message: 'Sublocation is required' })
  sublocation: string;
}
