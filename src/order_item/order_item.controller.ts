import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrderItemService } from './order_item.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  async create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  async findAll() {
    return this.orderItemService.asyncfindAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.orderItemService.remove(id);
  }
}
