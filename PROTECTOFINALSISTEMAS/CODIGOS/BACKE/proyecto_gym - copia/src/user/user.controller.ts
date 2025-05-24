import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST /api/v1/user
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // GET /api/v1/user
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // DELETE /api/v1/user/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}