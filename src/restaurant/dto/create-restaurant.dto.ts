import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsPhoneNumber } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'Name of the restaurant',
    example: 'The Gourmet Kitchen',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the restaurant',
    example: 'A place that serves gourmet meals with a variety of cuisines.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Address of the restaurant',
    example: '123 Food Street, Gourmet City, GC 12345',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Phone number of the restaurant',
    example: '+1234567890',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Rating of the restaurant on a scale of 1 to 5',
    example: 4.5,
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    description: 'Opening hours of the restaurant',
    example: 'Monday-Sunday: 10:00 AM - 10:00 PM',
  })
  @IsString()
  @IsNotEmpty()
  opening_hours: string;
}
