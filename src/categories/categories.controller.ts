import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of all categories',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the category',
    example: 'a1b2c3d4',
  })
  @ApiResponse({
    status: 200,
    description: 'The category with the specified ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing category' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the category',
    example: 'a1b2c3d4',
  })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the category',
    example: 'a1b2c3d4',
  })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
