import { PassportStrategy } from '@nestjs/passport';
import {
  GoogleCallbackParameters,
  Profile,
  Strategy,
  VerifyCallback,
} from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super(
      {
        clientID: configService.get('GOOGLE_CLIENT_ID'),
        clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
        callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
        scope: ['email', 'profile', 'openid'],
      },
      async (
        accessToken: string,
        refreshToken: string,
        params: GoogleCallbackParameters,
        profile: Profile,
        done: VerifyCallback,
      ) => {
        const { expires_in, id_token } = params;
        const { id, displayName, emails, photos } = profile;

        const user = {
          providerAccountId: id,
          email: emails[0].value,
          displayName,
          picture: photos[0].value,
          accessToken,
          refreshToken,
          idToken: id_token,
          expiresIn: expires_in,
        };

        done(null, user);
      },
    );
  }
}
