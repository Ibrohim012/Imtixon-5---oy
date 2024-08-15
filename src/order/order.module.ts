import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrdersController } from './order.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [OrdersController],
  providers: [OrderService, PrismaService],
})
export class OrdersModule {}
