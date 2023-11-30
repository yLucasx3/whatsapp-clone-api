import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async validate(user: LoginUserInput): Promise<{ message: string }> {
    if (!user) {
      throw new UnauthorizedException('No user from google');
    }

    const { email } = user;

    const existingUser = await this.userService.findUserByEmail(email);

    if (!existingUser) {
      const newUser = await this.userService.createUser({
        ...user,
        type: 'oauth',
        provider: 'google',
      });

      return { message: `New user created ${newUser.displayName}` };
    }

    return { message: 'Success' };
  }

  async login(user: LoginUserInput): Promise<{ access_token: string }> {
    if (!user) {
      throw new UnauthorizedException('No user from google');
    }
    const {
      displayName,
      email,
      picture,
      expiresIn,
      providerAccountId,
      accessToken,
      refreshToken,
      idToken,
    } = user;

    const existingUser = await this.userService.findUserByEmail(email);

    if (!existingUser) {
      const newUser = await this.userService.createUser({
        displayName,
        email,
        picture,
        type: 'oauth',
        provider: 'google',
        providerAccountId,
        accessToken,
        refreshToken,
        idToken,
        expiresIn,
      });

      const access_token = await this.signJwt(
        newUser.id,
        idToken,
        accessToken,
        expiresIn,
      );

      return { access_token };
    }

    const access_token = await this.signJwt(
      existingUser.id,
      idToken,
      accessToken,
      expiresIn,
    );

    return { access_token };
  }

  signJwt(
    userId: string,
    id_token: string,
    access_token: string,
    expires_at: number,
    expiresIn = '1d',
  ): Promise<string> {
    const payload = {
      sub: userId,
      id_token,
      access_token,
      expires_at,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn,
      secret: this.configService.get('APP_JWT_SECRET'),
    });
  }
}
