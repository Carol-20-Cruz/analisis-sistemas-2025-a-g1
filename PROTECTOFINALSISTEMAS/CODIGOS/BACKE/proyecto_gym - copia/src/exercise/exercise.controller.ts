import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly workoutService: ExerciseService) {}

  // Crear un nuevo ejercicio
  @Post()
  create(@Body() createWorkoutDto: CreateExerciseDto) {
    return this.workoutService.create(createWorkoutDto);
  }

  // Obtener todos los ejercicios
  @Get()
  findAll() {
    return this.workoutService.findAll();
  }

  // Actualizar un ejercicio por ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateExerciseDto) {
    return this.workoutService.update(id, updateDto);
  }

  // Eliminar un ejercicio por ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutService.remove(id);
  }
}
