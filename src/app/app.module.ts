import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { Enhancer, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { RootQuery } from 'src/root.query';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      cache: true,
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
          context: (context) => context,
          subscriptions: {
            'graphql-ws': true,
          },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options: MongooseModuleOptions = {
          uri: configService.get<string>('DATABASE_URL'),
        };

        return options;
      },
    }),
    UserModule,
    CommonModule,
    AuthModule,
    PassportModule.register({ session: true }),
  ],
  providers: [AppService, RootQuery],
})
export class AppModule {}