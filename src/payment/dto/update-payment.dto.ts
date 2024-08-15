import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsDecimal } from 'class-validator';

export class UpdatePaymentDto {
  @ApiPropertyOptional({
    description: 'ID of the order related to this payment',
    example: 'b1b2a3a4-b5b6-c7c8-d9d0-e1e2f3f4f5f6',
  })
  @IsUUID()
  @IsOptional()
  order_id?: string;

  @ApiPropertyOptional({
    description: 'Method used for the payment (e.g., credit card, PayPal)',
    example: 'credit_card',
  })
  @IsString()
  @IsOptional()
  payment_method?: string;

  @ApiPropertyOptional({
    description: 'Amount of money for the payment',
    example: '99.99',
  })
  @IsDecimal()
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({
    description: 'Status of the payment (e.g., pending, completed)',
    example: 'completed',
  })
  @IsString()
  @IsOptional()
  status?: string;
}
