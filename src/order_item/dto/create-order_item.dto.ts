import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateOrderItemDto {
  @Field()
  orderId: string;

  @Field()
  mealId: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;
}
