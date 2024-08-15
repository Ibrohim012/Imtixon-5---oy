import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'The total amount of the order',
    example: 99.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @ApiProperty({
    description: 'The status of the order',
    example: 'completed',
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    description: 'The unique identifier of the user placing the order',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    required: false,
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({
    description: 'The unique identifier of the restaurant',
    example: 'e47ac10b-58cc-4372-a567-0e02b2c3d479',
    required: false,
  })
  @IsOptional()
  @IsString()
  restaurantId?: string;

  @ApiProperty({
    description: 'The unique identifier of the payment (if any)',
    example: 'b47ac10b-58cc-4372-a567-0e02b2c3d479',
    required: false,
  })
  @IsOptional()
  @IsString()
  paymentId?: string;
}
