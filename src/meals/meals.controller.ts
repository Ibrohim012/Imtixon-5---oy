import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './entities/meal.entity'; // Agar mavjud bo'lsa

@ApiTags('meals')
@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @ApiOperation({ summary: 'Create a new meal' })
  @ApiResponse({ status: 201, description: 'Meal successfully created.', type: Meal })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Post()
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealsService.create(createMealDto);
  }

  @ApiOperation({ summary: 'Get all meals' })
  @ApiResponse({ status: 200, description: 'List of all meals.', type: [Meal] })
  @Get()
  findAll() {
    return this.mealsService.findAll();
  }

  @ApiOperation({ summary: 'Get a meal by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the meal to retrieve' })
  @ApiResponse({ status: 200, description: 'The found meal.', type: Meal })
  @ApiResponse({ status: 404, description: 'Meal not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a meal by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the meal to update' })
  @ApiResponse({ status: 200, description: 'Meal successfully updated.', type: Meal })
  @ApiResponse({ status: 404, description: 'Meal not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return this.mealsService.update(id, updateMealDto);
  }

  @ApiOperation({ summary: 'Delete a meal by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the meal to delete' })
  @ApiResponse({ status: 200, description: 'Meal successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Meal not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealsService.remove(id);
  }
}
