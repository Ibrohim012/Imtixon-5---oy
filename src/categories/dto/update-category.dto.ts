import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Main Courses',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'A brief description of the category',
    example: 'Main dishes served as the main course of a meal',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
