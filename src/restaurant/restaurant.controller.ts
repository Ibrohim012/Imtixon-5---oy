import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@ApiTags('restaurants')
@ApiBearerAuth()
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @ApiOperation({ summary: 'Get all restaurants' })
  @ApiResponse({
    status: 200,
    description: 'List of all restaurants.',
  })
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a restaurant by ID' })
  @ApiResponse({
    status: 200,
    description: 'Details of a specific restaurant.',
  })
  @ApiResponse({
    status: 404,
    description: 'Restaurant not found.',
  })
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiResponse({
    status: 201,
    description: 'Restaurant successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing restaurant' })
  @ApiResponse({
    status: 200,
    description: 'Restaurant successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Restaurant not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a restaurant by ID' })
  @ApiResponse({
    status: 200,
    description: 'Restaurant successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Restaurant not found.',
  })
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }
}
