import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageInput } from './message/dto/create-message.input';
import { ConversationService } from './conversation/conversation.service';
import { MessageService } from './message/message.service';
import { PubsubService } from './common/pubsub.service';

@Injectable()
export class AppService {
  constructor(
    private readonly messageService: MessageService,
    private readonly conversationService: ConversationService,
    private readonly pubSubService: PubsubService,
  ) {}

  async sendMessage(message: CreateMessageInput) {
    const { sender, recipient, content } = message;

    if (!sender || !recipient) {
      throw new BadRequestException('Sender or recipient not inputed...');
    }

    if (!content) {
      throw new BadRequestException('Message content is empty!');
    }

    const conversation =
      await this.conversationService.findOrCreateConversation(
        message.conversation,
        { message, sender, recipient },
      );

    const newMessage = await this.messageService.createMessage({
      ...message,
      conversation: String(conversation._id),
    });

    void this.pubSubService.publish('NEW_MESSAGE_SENT', newMessage);

    await this.conversationService.addMessageToConversation(
      String(conversation._id),
      newMessage.id,
    );

    return newMessage;
  }
}
