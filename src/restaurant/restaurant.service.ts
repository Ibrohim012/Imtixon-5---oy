// src/restaurant/restaurant.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.restaurant.findMany();
  }

  async findOne(id: string) {
    return this.prisma.restaurant.findUnique({ where: { id } });
  }

  async create(createRestaurantDto: CreateRestaurantDto) {
    return this.prisma.restaurant.create({ data: createRestaurantDto });
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    return this.prisma.restaurant.update({
      where: { id },
      data: updateRestaurantDto,
    });
  }

  async remove(id: string) {
    return this.prisma.restaurant.delete({ where: { id } });
  }
}
