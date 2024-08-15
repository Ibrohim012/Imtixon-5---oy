import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('reviews') // Swaggerda ko'rsatiladigan tag
@ApiBearerAuth() // JWT autentifikatsiyasi uchun
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get(':restaurantId')
  @ApiOperation({ summary: 'Get all reviews for a specific restaurant' })
  @ApiResponse({
    status: 200,
    description: 'List of reviews for the restaurant.',
  })
  @ApiResponse({
    status: 404,
    description: 'Restaurant not found.',
  })
  findAll(@Param('restaurantId') restaurantId: string) {
    return this.reviewService.getReviewsForRestaurant(restaurantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a review by ID' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Review not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review by ID' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully removed.',
  })
  @ApiResponse({
    status: 404,
    description: 'Review not found.',
  })
  remove(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
}
