import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/google.strategy';
import { SessionSerializer } from './utils/session.serializer';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthController, GoogleStrategy, SessionSerializer],
  imports: [UserModule, PassportModule, ConfigModule],
})
export class AuthModule {}
