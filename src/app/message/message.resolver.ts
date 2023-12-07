import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Mutation,
} from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message, MessageStatus } from './entities/message.entity';
import { User } from '../user/entities/user.entity';
import { Conversation } from '../conversation/entities/conversation.entity';
import { ConversationService } from '../conversation/conversation.service';
import { UserService } from '../user/user.service';
import { Public } from 'src/decorators';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly conversationService: ConversationService,
  ) {}

  @Query(() => [Message], { name: 'messages' })
  findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Public()
  @Mutation(() => Boolean)
  setMessagesStatus(
    @Args('messages', { type: () => [String] }) messages: string[],
    @Args('status') status: string,
  ) {
    return this.messageService.setMessagesStatus(messages, status);
  }

  @ResolveField('recipientDetails', () => User)
  recipientDetails(@Parent() message: Message): Promise<User> {
    return this.userService.findUserByEmail(message.recipient);
  }

  @ResolveField('conversationDetails', () => Conversation)
  conversationDetais(@Parent() message: Message): Promise<Conversation> {
    return this.conversationService.findById(message.conversation);
  }
}
