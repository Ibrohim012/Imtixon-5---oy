import { IsString, IsOptional, IsUUID, IsDecimal } from 'class-validator';

export class UpdateMealDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDecimal()
  @IsOptional()
  price?: number;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsUUID()
  @IsOptional()
  restaurantId?: string;

  @IsString()
  @IsOptional()
  image_url?: string;
}
