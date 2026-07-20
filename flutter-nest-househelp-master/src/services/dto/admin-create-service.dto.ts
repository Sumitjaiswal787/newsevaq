import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
  MaxLength,
  IsUrl,
  Min,
  Matches,
} from 'class-validator';

import { IsBoolean } from 'class-validator';

export class AdminCreateServiceDto {
  @Type(() => String)
  @IsString({ message: 'Service name must be a string' })
  @IsNotEmpty({ message: 'Service name is required' })
  @MinLength(2, { message: 'Service name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Service name must not exceed 100 characters' })
  name!: string;

  @Type(() => String)
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  @MaxLength(1000, { message: 'Description must not exceed 1000 characters' })
  description?: string;

  @Type(() => String)
  @IsString({ message: 'Category must be a string' })
  @IsNotEmpty({ message: 'Category is required for admin operations' })
  @MinLength(2, { message: 'Category must be at least 2 characters long' })
  @MaxLength(50, { message: 'Category must not exceed 50 characters' })
  category!: string;

  @IsOptional()
  @Type(() => String)
  @IsString({ message: 'Subcategory must be a string' })
  @MinLength(2, { message: 'Subcategory must be at least 2 characters long' })
  @MaxLength(50, { message: 'Subcategory must not exceed 50 characters' })
  subcategory?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Base price must be a number' })
  @IsNotEmpty({ message: 'Base price is required' })
  @Min(0, { message: 'Base price must be greater than or equal to 0' })
  basePrice!: number;

  @IsOptional()
  @Type(() => String)
  @IsString({ message: 'Image URL must be a string' })
  @MaxLength(500, { message: 'Image URL must not exceed 500 characters' })
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsBoolean()
  isFastBooking?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Duration must be a number' })
  duration?: number;

  @IsOptional()
  @IsString({ each: true, message: 'Each slot must be a string' })
  slots?: string[];
}
