import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GoogleCreateUserInput {
  @Field(() => String)
  displayName: string;

  @Field(() => String)
  email: string;
}
