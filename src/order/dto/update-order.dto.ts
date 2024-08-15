import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  restaurantId?: string;

  @IsOptional()
  @IsString()
  paymentId?: string;
}
