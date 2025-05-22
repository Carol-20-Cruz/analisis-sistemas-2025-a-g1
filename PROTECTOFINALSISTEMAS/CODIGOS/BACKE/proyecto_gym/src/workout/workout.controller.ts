import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.create(createWorkoutDto);
  }

  @Get()
  findAll() {
    return this.workoutService.findAll();
  }


 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutService.remove(id);
  }
}
