import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpGoogleOAuthGuard } from './guards';
import { HttpUser, Public } from 'src/decorators';
import { LoginUserInput } from './dto/login-user.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SetMetadata('google-login', true)
  @UseGuards(HttpGoogleOAuthGuard)
  @Get()
  async googleAuth() {}

  @SetMetadata('google-login', true)
  @UseGuards(HttpGoogleOAuthGuard)
  @Get('google-redirect')
  googleAuthRedirect(
    @HttpUser()
    {
      accessToken,
      displayName,
      email,
      expiresIn,
      idToken,
      picture,
      providerAccountId,
      refreshToken,
    }: LoginUserInput,
  ) {
    return this.authService.login({
      accessToken,
      displayName,
      email,
      expiresIn,
      idToken,
      picture,
      providerAccountId,
      refreshToken,
    });
  }

  @Public()
  @Post('validate')
  validate(
    @Body()
    {
      accessToken,
      displayName,
      email,
      expiresIn,
      idToken,
      picture,
      providerAccountId,
      refreshToken,
    }: LoginUserInput,
  ) {
    return this.authService.validate({
      accessToken,
      displayName,
      email,
      expiresIn,
      idToken,
      picture,
      providerAccountId,
      refreshToken,
    });
  }
}
