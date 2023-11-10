import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { GoogleLoginUserInput } from './dto/google-login.input';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(details: GoogleLoginUserInput) {
    const { email } = details;

    const user = await this.userService.findOneByEmail(email);
    if (user) return user;

    return this.userService.googleCreateUser(details);
  }
}
