import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaClient } from 'generated/prisma';
import { profile } from 'console';
import { Workout } from './entities/workout.entity';

@Injectable()
export class WorkoutService extends PrismaClient implements OnModuleInit {
  findAll() {
    throw new Error('Method not implemented.');
  }
  profile: any;
   async onModuleInit() {
    await this.$connect();
    
  }
  create(createUserDto: CreateWorkoutDto) {
    return this.profile.create ({
      data: createUserDto
    });
  }

  findOne() {
    return this.profile.findfirst();
  }


  remove(id: string) {
    return this.profile.dalate({where:{id}})
  }
}
