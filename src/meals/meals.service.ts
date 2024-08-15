import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Injectable()
export class MealsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMealDto: CreateMealDto) {
    const { restaurantId, categoryId, ...mealData } = createMealDto;

    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return this.prisma.meal.create({
      data: {
        ...mealData,
        restaurant: {
          connect: { id: restaurant.id },
        },
        category: {
          connect: { id: category.id },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.meal.findMany();
  }

  async findOne(id: string) {
    return this.prisma.meal.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateMealDto: UpdateMealDto) {
    const { restaurantId, categoryId, ...mealData } = updateMealDto;

    const updateData: any = { ...mealData };

    if (restaurantId) {
      updateData.restaurant = {
        connect: { id: restaurantId },
      };
    }

    if (categoryId) {
      updateData.category = {
        connect: { id: categoryId },
      };
    }

    return this.prisma.meal.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prisma.meal.delete({
      where: { id },
    });
  }
}
