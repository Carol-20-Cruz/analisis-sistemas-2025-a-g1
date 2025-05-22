import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class ProgressService extends PrismaClient implements OnModuleInit {
  findAll() {
    throw new Error('Method not implemented.');
  }
  profile: any;
   async onModuleInit() {
    await this.$connect();
    
  }
  
  create(createUserDto: CreateProgressDto) {
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

