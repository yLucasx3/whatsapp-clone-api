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
  googleId: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Field(() => String)
  @Prop()
  displayName: string;

  @Field(() => String)
  @Prop()
  password: string;
}

@ObjectType()
export class LoginUserResponseR {
  @Field(() => User)
  user: User;

  @Field(() => String)
  authToken: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
