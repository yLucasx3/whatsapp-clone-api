/* eslint-disable @typescript-eslint/ban-types */
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/app/user/entities/user.entity';
import { UserService } from 'src/app/user/user.service';
import { Schema } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }
  serializeUser(user: User, done: Function) {
    done(null, user);
  }
  async deserializeUser(
    payload: { _id: Schema.Types.ObjectId },
    done: Function,
  ) {
    const user = await this.userService.getUserById(payload._id);
    return user ? done(null, user) : done(null, null);
  }
}
