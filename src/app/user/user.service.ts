import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooSchema } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.google.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  createUser(details: CreateUserInput) {
    const createdUser = new this.userModel(details);
    return createdUser.save();
  }

  findAll(skip = 0, limit = 10) {
    return this.userModel.find().skip(skip).limit(limit);
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  findUserById(id: MongooSchema.Types.ObjectId) {
    return this.userModel.findOne({ _id: id });
  }

  remove(id: MongooSchema.Types.ObjectId) {
    return this.userModel.deleteOne({ _id: id });
  }
}
