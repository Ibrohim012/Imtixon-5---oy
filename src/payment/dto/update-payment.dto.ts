import { IsString, IsOptional, IsUUID, IsDecimal } from 'class-validator';

export class UpdatePaymentDto {
  @IsUUID()
  @IsOptional()
  order_id?: string;

  @IsString()
  @IsOptional()
  payment_method?: string;

  @IsDecimal()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  status?: string;
}
