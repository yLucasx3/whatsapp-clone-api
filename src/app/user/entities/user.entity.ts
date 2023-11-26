import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  displayName: string;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Field(() => String)
  @Prop()
  picture: string;

  @Field(() => String)
  @Prop()
  type: 'oauth' | string;

  @Field(() => String)
  @Prop()
  provider: 'google' | string;

  @Field(() => String)
  @Prop()
  providerAccountId: string;

  @Field(() => String)
  @Prop()
  accessToken: string;

  @Field(() => String)
  @Prop()
  refreshToken: string;

  @Field(() => String)
  @Prop()
  idToken: string;

  @Field(() => Number)
  @Prop()
  expiresIn: number;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
