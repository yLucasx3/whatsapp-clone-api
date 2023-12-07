import { Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';
import { AppService } from './app.service';
import {
  Message,
  MessageStatus,
  MessageType,
} from './message/entities/message.entity';
import { Public } from 'src/decorators';
import { PubsubService } from './common/pubsub.service';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    private readonly pubSubService: PubsubService,
  ) {}

  @Public()
  @Mutation(() => Message)
  sendMessage(
    @Args('content') content: string,
    @Args('type') type: MessageType,
    @Args('status') status: MessageStatus,
    @Args('sender') sender: string,
    @Args('recipient') recipient: string,
    @Args('conversation') conversation: string,
  ) {
    return this.appService.sendMessage({
      content,
      type,
      sender,
      recipient,
      status,
      conversation,
    });
  }

  @Public()
  @Subscription(() => Message, {
    resolve: (payload: Message) => payload,
  })
  public onNewMessageSent() {
    return this.pubSubService.asyncIterator('NEW_MESSAGE_SENT');
  }
}
