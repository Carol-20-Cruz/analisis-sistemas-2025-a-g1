import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProgressDto {
@IsOptional()
  @IsDateString()
  date?: string;

  @IsNumber()
  weight: number;

  @IsOptional()
  @IsNumber()
  bodyFat?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsString()
  userId: string;
}
