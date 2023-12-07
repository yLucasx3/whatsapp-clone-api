import { InputType, Field } from '@nestjs/graphql';
import { MessageStatus, MessageType } from '../entities/message.entity';

@InputType()
export class CreateMessageInput {
  @Field(() => String)
  type: MessageType;

  @Field(() => String)
  content: string;

  @Field(() => String)
  status: MessageStatus;

  @Field(() => String)
  sender: string;

  @Field(() => String)
  recipient: string;

  @Field(() => String)
  conversation?: string;
}
