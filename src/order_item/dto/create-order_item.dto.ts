import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'The unique identifier of the order item',
    example: '123456',
    required: false, 
  })
  orderId?: string;

  @ApiProperty({
    description: 'The unique identifier of the meal',
    example: '78910',
    required: false, 
  })
  mealId?: string;

  @ApiProperty({
    description: 'The quantity of the meal in the order',
    example: 2,
  })
  quantity: number;

  @ApiProperty({
    description: 'The price of the meal',
    example: 19.99,
    required: false, 
  })
  price?: number;
}
