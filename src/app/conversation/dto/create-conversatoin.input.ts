import { InputType, Field } from '@nestjs/graphql';
import { CreateMessageInput } from 'src/app/message/dto/create-message.input';

@InputType()
export class CreateConversationInput {
  @Field(() => String)
  sender: string;

  @Field(() => String)
  recipient: string;

  @Field(() => CreateMessageInput)
  message: Omit<CreateMessageInput, 'conversation'>;
}
