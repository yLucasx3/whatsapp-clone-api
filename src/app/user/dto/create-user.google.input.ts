import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  displayName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  picture: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  provider: string;

  @Field(() => String)
  providerAccountId: string;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  @Field(() => String)
  idToken: string;

  @Field(() => String)
  expiresIn: number;
}
