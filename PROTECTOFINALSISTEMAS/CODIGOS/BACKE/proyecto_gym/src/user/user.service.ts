import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  profile: any;
   async onModuleInit() {
    await this.$connect();
    
  }
  create(createUserDto: CreateUserDto) {
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

