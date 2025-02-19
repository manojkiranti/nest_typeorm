import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SuperUserCommand } from './superuser.command';
import { AdminService } from './admin.service';
import { RolesEntity } from './entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RolesEntity])],
  providers: [UsersService, AdminService, SuperUserCommand],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
