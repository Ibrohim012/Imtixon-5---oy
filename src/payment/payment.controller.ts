import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@ApiTags('payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({
    status: 200,
    description: 'List of all payments.',
  })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Details of a specific payment.',
  })
  @ApiResponse({
    status: 404,
    description: 'Payment not found.',
  })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({
    status: 201,
    description: 'Payment successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing payment' })
  @ApiResponse({
    status: 200,
    description: 'Payment successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Payment not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Payment successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Payment not found.',
  })
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
