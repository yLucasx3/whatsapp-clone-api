import { Module } from '@nestjs/common';
import { Enhancer, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { RootQuery } from 'src/root.query';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        return {
          debug: config.get('GRAPHQL_DEBUG') === 'true',
          playground: config.get('GRAPHQL_PLAYGROUND') === 'true',
          autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
          sortSchema: true,
          fieldResolverEnhancers: ['interceptors'] as Enhancer[],
          autoTransformHttpErrors: true,
          context: (context: any) => context,
          subscriptions: {
            'subscriptions-transport-ws': true,
            'graphql-ws': true,
            onConnect: () => {
              console.log('connected');
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return { uri: configService.get('DATABASE_URL') };
      },
    }),
    JwtModule.register({
      global: true,
    }),
    AuthModule,
    PassportModule,
    UserModule,
    CommonModule,
    MessageModule,
    ConversationModule,
  ],
  providers: [
    AppResolver,
    AppService,
    RootQuery,
    GoogleStrategy,
    JwtStrategy,
    MessageModule,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
