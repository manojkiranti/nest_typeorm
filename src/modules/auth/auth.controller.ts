import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: LoginResponseDto })
  @ApiBody({ type: LoginRequestDto })
  @UseGuards(LocalAuthGuard)
  @Serialize(LoginResponseDto)
  @Post('login')
  login(@Request() req) {
    return this.authService.generateToken(req.user);
  }
}
