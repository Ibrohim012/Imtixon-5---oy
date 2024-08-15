import { IsString, IsNotEmpty, IsOptional, IsUUID, IsDecimal } from 'class-validator';

export class CreateMealDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
