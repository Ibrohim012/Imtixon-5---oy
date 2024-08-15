import { IsNotEmpty, IsString, IsUUID, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;

  @IsNotEmpty()
  @IsUUID()
  mealId: string;
}
