import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { OrderItem } from './entities/order_item.entity';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const { orderId, mealId, quantity, price } = createOrderItemDto;
    return this.prisma.orderItems.create({
      data: {
        orderId,
        mealId,
        quantity,
        price,  
      },
    });
  }
  
  async findAll() {
    return this.prisma.orderItems.findMany();
  }

  asyncfindAll() {
    return this.prisma.orderItems.findMany();
  }

  async findOne(id: string) {
    const orderItem = await this.prisma.orderItems.findUnique({ where: { id } });
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with ID ${id} not found`);
    }
    return orderItem;
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    return this.prisma.orderItems.update({
      where: { id },
      data: updateOrderItemDto,
    });
  }s

  async remove(id: string) {
    return this.prisma.orderItems.delete({ where: { id } });
  }
}
