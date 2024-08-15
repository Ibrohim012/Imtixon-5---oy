import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsDecimal } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID of the order related to this payment',
    example: 'b1b2a3a4-b5b6-c7c8-d9d0-e1e2f3f4f5f6',
  })
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    description: 'Method used for the payment (e.g., credit card, PayPal)',
    example: 'credit_card',
  })
  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @ApiProperty({
    description: 'Amount of money for the payment',
    example: '99.99',
  })
  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'Status of the payment (e.g., pending, completed)',
    example: 'completed',
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
