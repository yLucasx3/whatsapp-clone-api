import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsNumber } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field(() => String)
  @IsString()
  providerAccountId: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  displayName: string;

  @Field(() => String)
  @IsString()
  picture: string;

  @Field(() => String)
  @IsString()
  accessToken: string;

  @Field(() => String)
  @IsString()
  refreshToken: string;

  @Field(() => String)
  @IsString()
  idToken: string;

  @Field(() => Number)
  @IsNumber()
  expiresIn: number;
}
