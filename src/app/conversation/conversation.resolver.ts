import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation } from './entities/conversation.entity';
import { MessageService } from '../message/message.service';
import { GraphQLUser } from 'src/decorators';
import { Message } from '../message/entities/message.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Conversation], { name: 'allMyConversations' })
  findAllMyConversations(@GraphQLUser() email: string) {
    return this.conversationService.findAllMyConversations(email);
  }

  @Query(() => Conversation, { name: 'conversationById' })
  findConversationById(@Args('id') id: string) {
    return this.conversationService.findById(id);
  }

  @ResolveField('allMessages', () => [Message])
  async allMessages(@Parent() { messages }: Conversation) {
    return this.messageService.findMessages(messages);
  }

  @ResolveField('recipient', () => User)
  async recipient(
    @Parent() conversation: Conversation,
    @GraphQLUser() email: string,
  ) {
    const recipient = conversation.users.find((user) => user !== email);

    const recipientUser = this.userService.findUserByEmail(recipient);

    return recipientUser;
  }

  @ResolveField('lastMessage', () => Message)
  lastMessage(@Parent() conversation: Conversation) {
    return this.messageService.findMessageById(conversation.messages.at(-1));
  }

  @ResolveField('unreadMessages', () => [Message] || [])
  unreadMessages(
    @Parent() conversation: Conversation,
    @GraphQLUser() user: string,
  ) {
    return this.messageService.findUnreadMessages(
      String(conversation._id),
      user,
    );
  }
}
