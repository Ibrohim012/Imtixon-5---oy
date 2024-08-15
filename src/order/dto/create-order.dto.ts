import { IsNotEmpty, IsNumber, IsUUID, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The total amount of the order',
    example: 99.99,
  })
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({
    description: 'The status of the order',
    example: 'pending',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'The unique identifier of the user placing the order',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The unique identifier of the restaurant',
    example: 'e47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @ApiProperty({
    description: 'The unique identifier of the payment (if any)',
    example: 'b47ac10b-58cc-4372-a567-0e02b2c3d479',
    required: false,
  })
  @IsOptional()
  @IsString()
  paymentId?: string;
}
