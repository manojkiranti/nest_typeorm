import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { Roles } from '../auth/roles.decorators';
import { RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiBearerAuth('JWT-auth')
@Controller({ path: 'users', version: '1' })
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(UserDto)
  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  // @UseInterceptors(CacheInterceptor)
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Serialize(UserDto)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserEntity | null> {
    return await this.usersService.findOne(id);
  }

  @Serialize(UserDto)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  async createUser(@Body() userData: Partial<UserEntity>): Promise<UserEntity> {
    return await this.usersService.create(userData);
  }
}
