import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class ExerciseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // Crear un nuevo ejercicio
  create(createExerciseDto: CreateExerciseDto) {
    return this.exercise.create({
      data: createExerciseDto,
    });
  }

  // Obtener todos los ejercicios
  findAll() {
    return this.exercise.findMany();
  }

  // Obtener un ejercicio (si lo necesitas)
  findOne(id: string) {
    return this.exercise.findUnique({ where: { id } });
  }

  // Actualizar ejercicio
  update(id: string, updateExerciseDto: UpdateExerciseDto) {
    return this.exercise.update({
      where: { id },
      data: updateExerciseDto,
    });
  }

  // Eliminar ejercicio
  remove(id: string) {
    return this.exercise.delete({
      where: { id },
    });
  }
}
