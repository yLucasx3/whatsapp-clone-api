import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooSchema } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';
import { GoogleCreateUserInput } from './dto/create-user.google.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  async googleCreateUser(details: GoogleCreateUserInput) {
    const createdUser = new this.userModel(details);
    return createdUser.save();
  }

  async createUser(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);

    return createdUser.save();
  }

  findAll(skip = 0, limit = 10) {
    return this.userModel.find().skip(skip).limit(limit);
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  getUserById(id: MongooSchema.Types.ObjectId) {
    return this.userModel.findOne({ _id: id });
  }

  async updateUser(
    id: MongooSchema.Types.ObjectId,
    updateUserInput: UpdateUserInput,
  ) {
    return await this.userModel.findByIdAndUpdate(id, updateUserInput, {
      new: true,
    });
  }

  remove(id: MongooSchema.Types.ObjectId) {
    return this.userModel.deleteOne({ _id: id });
  }
}
