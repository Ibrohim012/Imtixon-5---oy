  import { IsNotEmpty, IsNumber, IsUUID, IsString, IsOptional } from 'class-validator';

  export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    totalAmount: number;

    @IsString()
    @IsOptional()
    status?: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsUUID()
    @IsNotEmpty()
    restaurantId: string;

    @IsOptional()
    @IsString()
    paymentId?: string;
  }
