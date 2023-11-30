import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Schema as MongooSchema } from 'mongoose';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, {
    name: 'userById',
    description: 'This will be like getting the user profile by his id',
  })
  getUserById(
    @Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId,
  ) {
    return this.userService.findUserById(id);
  }

  @Query(() => User, {
    name: 'userByEmail',
    description: 'This will be like getting the user profile by his email',
  })
  getUserByEmail(@Args('email', { type: () => String }) email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Mutation(() => User)
  removeUser(
    @Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId,
  ) {
    return this.userService.remove(id);
  }
}
