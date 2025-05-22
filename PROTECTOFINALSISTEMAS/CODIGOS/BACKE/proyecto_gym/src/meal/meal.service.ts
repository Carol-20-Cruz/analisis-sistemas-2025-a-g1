import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class MealService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createMealDto: CreateMealDto) {
    return this.meal.create({
      data: createMealDto,
    });
  }

  async findAll() {
    return this.meal.findMany();
  }

  async remove(id: string) {
    return this.meal.delete({
      where: { id },
    });
  }
}
