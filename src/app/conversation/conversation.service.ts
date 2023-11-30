import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Conversation,
  ConversationDocument,
} from './entities/conversation.entity';
import { CreateConversationInput } from './dto/create-conversatoin.input';
import { MessageService } from '../message/message.service';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    private messageService: MessageService,
  ) {}

  findById(id: string): Promise<Conversation> {
    return this.conversationModel.findById(id);
  }

  async findAllMyConversations(email: string): Promise<Conversation[]> {
    return this.conversationModel.find({ users: { $in: [email] } });
  }

  async findOrCreateConversation(
    id: string,
    conversation: CreateConversationInput,
  ) {
    const { sender, recipient } = conversation;

    if (!id) {
      const newConversation = new this.conversationModel({
        users: [sender, recipient],
      });

      return newConversation.save();
    }

    return this.findById(id);
  }

  async addMessageToConversation(conversationId: string, messageId: string) {
    return this.conversationModel.updateOne(
      { _id: conversationId },
      { $push: { messages: messageId } },
    );
  }
}
