import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Conversation {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => [String])
  @Prop()
  users: string[];

  @Field(() => [String])
  @Prop()
  messages: string[];
}

export type ConversationDocument = Conversation & Document;
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
