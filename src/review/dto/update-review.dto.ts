import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({
    description: 'Rating of the review, from 1 to 5',
    example: 4,
    minimum: 1,
    maximum: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiProperty({
    description: 'Optional comment for the review',
    example: 'Updated comment!',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
