import { IsString, IsNotEmpty, IsUUID, IsDecimal } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
