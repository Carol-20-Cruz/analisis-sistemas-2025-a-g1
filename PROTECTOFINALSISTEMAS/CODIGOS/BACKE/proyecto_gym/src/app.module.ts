import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';
import { MealModule } from './meal/meal.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [UserModule, WorkoutModule, ExerciseModule, MealModule, ProgressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
