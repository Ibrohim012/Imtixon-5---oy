// src/payment/payment.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.payment.findMany();
  }

  async findOne(id: string) {
    return this.prisma.payment.findUnique({ where: { id } });
  }

  async create(createPaymentDto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        payment_method: createPaymentDto.payment_method,
        amount: createPaymentDto.amount,
        status: createPaymentDto.status || 'Pending', 
        order: {
          connect: { id: createPaymentDto.orderId }
        }
      },
    });
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        payment_method: updatePaymentDto.payment_method,
        amount: updatePaymentDto.amount,
        status: updatePaymentDto.status || 'Pending', 
      },
    });
  }

  async remove(id: string) {
    return this.prisma.payment.delete({ where: { id } });
  }
}
