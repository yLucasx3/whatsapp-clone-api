import { InputType, Field } from '@nestjs/graphql';

export type MessageType = 'text' | 'audio' | 'video' | 'photo';

export type MessageStatus = 'sent' | 'unsent' | 'unread' | 'read';

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
