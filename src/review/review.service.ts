import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import {UpdateReviewDto}  from './dto/update-review.dto';


@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(dto: CreateReviewDto) {
    return this.prisma.review.create({
      data: {
        rating: dto.rating,
        comment: dto.comment,
        user: {
          connect: { id: dto.userId },
        },
        restaurant: {
          connect: { id: dto.restaurantId },
        },
        meal: {
          connect: { id: dto.mealId },
        },
      },
    });
  }

  async getReviewsForRestaurant(restaurantId: string) {
    return this.prisma.review.findMany({
      where: { restaurantId },
    });
  }

  async updateReview(id: string, dto: UpdateReviewDto) {
    return this.prisma.review.update({
      where: { id },
      data: dto,
    });
  }

  async deleteReview(id: string) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
