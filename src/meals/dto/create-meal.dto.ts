import { IsString, IsNotEmpty, IsOptional, IsUUID, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMealDto {
  @ApiProperty({ description: 'The name of the meal' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'A brief description of the meal', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The price of the meal', type: Number })
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'The UUID of the category the meal belongs to' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ description: 'The UUID of the restaurant offering the meal' })
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @ApiProperty({ description: 'URL of the meal image', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
