import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new BadRequestException();
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException();
    return user;
  }

  async generateToken(reqUser: UserEntity) {
    const user = await this.userService.findOne(reqUser.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload = {
      username: user.email,
      sub: user.id,
      roles: user.roles.map((role) => role.name),
    };

    console.log('login payload', payload);
    const access_token = this.jwtService.sign(payload);
    user['accessToken'] = access_token;
    user['tokenType'] = 'Bearer';
    user['userId'] = user.id;
    return user;
  }
}
