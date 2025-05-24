import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";

export class CreateWorkoutDto {
    @IsString()
  title: string;

  @IsOptional()
  @IsDateString()
  date?: string;  // ISO date string, opcional porque tiene valor por defecto

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;  // también opcional por el default en el modelo

  @IsString()
  userId: string; // requerido porque no tiene default en el modelo

}
