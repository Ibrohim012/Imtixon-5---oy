import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, restaurantId, paymentId, ...orderData } = createOrderDto;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    return this.prisma.order.create({
      data: {
        ...orderData,
        user: {
          connect: { id: user.id },
        },
        restaurant: {
          connect: { id: restaurant.id },
        },
        payment: paymentId ? { connect: { id: paymentId } } : undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const { userId, restaurantId, paymentId, ...orderData } = updateOrderDto;

    const updateData: any = { ...orderData };

    if (userId) {
      updateData.user = {
        connect: { id: userId },
      };
    }

    if (restaurantId) {
      updateData.restaurant = {
        connect: { id: restaurantId },
      };
    }

    if (paymentId) {
      updateData.payment = {
        connect: { id: paymentId },
      };
    }

    return this.prisma.order.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
