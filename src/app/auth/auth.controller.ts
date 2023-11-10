import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/google.guards';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'Redirect ok ' };
  }

  @Get('status')
  user(@Req() request: Request) {
    if (request.user) {
      return { message: 'Authenticated ' };
    }

    return { message: 'Not authenticated' };
  }
}
