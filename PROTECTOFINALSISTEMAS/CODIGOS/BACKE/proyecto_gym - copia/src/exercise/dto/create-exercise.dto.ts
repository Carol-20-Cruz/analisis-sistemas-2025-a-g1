import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateExerciseDto {
    @IsString()
  name: string;

  @IsNumber()
  sets: number;

  @IsNumber()
  reps: number;

  @IsNumber()
  weight: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;  // opcional por el default en el modelo

  @IsString()
  workoutId: string; // requerido porque no tiene default en el modelo
}
