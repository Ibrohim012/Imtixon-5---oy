import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsPhoneNumber } from 'class-validator';

export class UpdateRestaurantDto {
  @ApiPropertyOptional({
    description: 'Name of the restaurant',
    example: 'The Gourmet Kitchen',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Description of the restaurant',
    example: 'A place that serves gourmet meals with a variety of cuisines.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Address of the restaurant',
    example: '123 Food Street, Gourmet City, GC 12345',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    description: 'Phone number of the restaurant',
    example: '+1234567890',
  })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'Rating of the restaurant on a scale of 1 to 5',
    example: 4.5,
  })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({
    description: 'Opening hours of the restaurant',
    example: 'Monday-Sunday: 10:00 AM - 10:00 PM',
  })
  @IsString()
  @IsOptional()
  opening_hours?: string;
}
