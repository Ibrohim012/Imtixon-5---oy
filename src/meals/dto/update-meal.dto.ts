import { IsString, IsOptional, IsUUID, IsDecimal } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMealDto {
  @ApiPropertyOptional({ description: 'The name of the meal' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'A brief description of the meal' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'The price of the meal', type: Number })
  @IsDecimal()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ description: 'The UUID of the category the meal belongs to' })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'The UUID of the restaurant offering the meal' })
  @IsUUID()
  @IsOptional()
  restaurantId?: string;

  @ApiPropertyOptional({ description: 'URL of the meal image' })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
