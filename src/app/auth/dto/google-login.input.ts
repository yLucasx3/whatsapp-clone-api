import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class GoogleLoginUserInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  displayName: string;
}
