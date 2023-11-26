import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpGoogleOAuthGuard } from './guards';
import { HttpUser } from 'src/decorators';
import { LoginUserInput } from './dto/login-user.input';

@SetMetadata('google-login', true)
@UseGuards(HttpGoogleOAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  async googleAuth() {}

  @Get('google-redirect')
  googleAuthRedirect(@HttpUser() user: LoginUserInput) {
    return this.authService.login(user);
  }
}
