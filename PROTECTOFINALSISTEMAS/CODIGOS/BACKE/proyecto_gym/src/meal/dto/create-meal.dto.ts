import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMealDto {
    @IsString()
    name: string;
  
    @IsNumber()
    calories: number;
  
    @IsOptional()
    @IsDateString()
    date?: string; // opcional por el default
  
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
  
    @IsString()
    userId: string; // obligatorio
}
