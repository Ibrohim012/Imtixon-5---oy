import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrderItemService } from './order_item.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { OrderItem } from './entities/order_item.entity';


@ApiTags('order-items')
@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order item' })
  @ApiBody({ type: CreateOrderItemDto })
  @ApiResponse({ status: 201, description: 'The order item has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all order items' })
  @ApiResponse({ status: 200, description: 'List of all order items' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific order item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The unique identifier of the order item' })
  @ApiResponse({ status: 200, description: 'The order item with the specified ID' })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  async findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing order item' })
  @ApiParam({ name: 'id', type: String, description: 'The unique identifier of the order item' })
  @ApiBody({ type: UpdateOrderItemDto })
  @ApiResponse({ status: 200, description: 'The order item has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  async update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order item' })
  @ApiParam({ name: 'id', type: String, description: 'The unique identifier of the order item' })
  @ApiResponse({ status: 200, description: 'The order item has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  async remove(@Param('id') id: string) {
    return this.orderItemService.remove(id);
  }
}
