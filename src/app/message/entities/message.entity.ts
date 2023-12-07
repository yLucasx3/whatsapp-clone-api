import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MessageType = 'text' | 'audio' | 'video' | 'photo';
export type MessageStatus = 'sent' | 'unsent' | 'unread' | 'read';

export type MessageStatusEnum = keyof MessageStatus;

@ObjectType()
@Schema({ timestamps: true })
export class Message {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  type: MessageType;

  @Field(() => String)
  @Prop()
  content: string;

  @Field(() => String)
  @Prop()
  status: MessageStatus;

  @Field(() => String)
  @Prop()
  sender: string;

  @Field(() => String)
  @Prop()
  recipient: string;

  @Field(() => String)
  @Prop()
  conversation: string;

  @Field(() => Date)
  @Prop()
  createdAt: Date;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
