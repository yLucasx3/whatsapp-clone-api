import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class Media {
  type: 'TEXT' | 'AUDIO' | 'VIDEO' | 'DOCUMENT' | '';
  url: string;
}

@ObjectType()
@Schema()
export class Message {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  content: string;

  @Field(() => Media)
  @Prop()
  media: Media;

  @Field(() => String)
  @Prop()
  senderId: string;

  @Field(() => String)
  @Prop()
  receiverId: string;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
