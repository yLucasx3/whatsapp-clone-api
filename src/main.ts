import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: 'randomstring',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
