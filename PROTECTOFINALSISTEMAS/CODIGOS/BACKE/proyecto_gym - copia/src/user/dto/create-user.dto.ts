import { IsBoolean, IsEmail, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsNumber()
  age: number;

  @IsString()
  phone: string;

  @IsString()
  gender: string;
}

