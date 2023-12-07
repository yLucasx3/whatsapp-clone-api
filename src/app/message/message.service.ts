import { InjectModel } from '@nestjs/mongoose';
import {
  Message,
  MessageDocument,
  MessageStatus,
} from './entities/message.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  findAll(skip = 0, limit = 10): Promise<Message[]> {
    return this.messageModel.find().skip(skip).limit(limit);
  }

  findMessages(ids: string[]): Promise<Message[]> {
    return this.messageModel.find({ _id: { $in: ids } });
  }

  findMessageById(id: string): Promise<Message> {
    return this.messageModel.findOne({ _id: id });
  }

  async setMessagesStatus(
    messages: string[],
    status: string,
  ): Promise<boolean> {
    const updatedMessages = await this.messageModel.updateMany(
      { _id: { $in: messages } },
      { $set: { status: status } },
    );

    return !!updatedMessages.modifiedCount;
  }

  async findUnreadMessages(
    conversation: string,
    email: string,
  ): Promise<Message[]> {
    const unreadMessages = await this.messageModel.find({
      status: 'sent',
      conversation,
      recipient: email,
    });

    return unreadMessages;
  }

  async createMessage(message: CreateMessageInput) {
    const newMessage = new this.messageModel(message);

    return newMessage.save();
  }
}
