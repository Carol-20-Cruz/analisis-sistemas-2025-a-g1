import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}  // Cambié workoutService a mealService

  @Post()
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealService.create(createMealDto);  // Cambié workoutService a mealService y parámetro a createMealDto
  }

  @Get()
  findAll() {
    return this.mealService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealService.remove(id);
  }
}
