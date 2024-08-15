import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Rating of the review, from 1 to 5',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Optional comment for the review',
    example: 'Great meal, would definitely recommend!',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    description: 'Unique identifier for the user who made the review',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Unique identifier for the restaurant being reviewed',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;

  @ApiProperty({
    description: 'Unique identifier for the meal being reviewed',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  mealId: string;
}
