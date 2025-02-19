import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { Roles } from '../auth/roles.decorators';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(UserDto)
  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
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
