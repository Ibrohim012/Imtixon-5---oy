import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: string) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
