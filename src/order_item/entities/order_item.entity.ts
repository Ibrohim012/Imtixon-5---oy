import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/entities/order.entity';
import { Meal } from 'src/meals/entities/meal.entity';

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: string;

  @Field(() => Order)
  order: Order;

  @Field(() => String)
  orderId: string;

  @Field(() => Meal)
  meal: Meal;

  @Field(() => String)
  mealId: string;

  @Field()
  quantity: number;

  @Field()
  price: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
