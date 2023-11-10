import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media, Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
  ) {}

  async createMessage(
    content: string,
    media: Media,
    senderId: string,
    receiverId: string,
  ): Promise<Message> {
    const message = new this.messageModel({
      content,
      media,
      sender: senderId,
      receiver: receiverId,
    });
    return await message.save();
  }

  async findAllMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async findMessagesByReceiver(receiverId: string): Promise<Message[]> {
    return this.messageModel.find({ receiver: receiverId }).exec();
  }

  async findMessagesBySender(senderId: string): Promise<Message[]> {
    return this.messageModel.find({ sender: senderId }).exec();
  }

  async findById(id: string): Promise<Message> {
    return this.messageModel.findById(id).exec();
  }

  async updateMessage(
    id: string,
    content: string,
    media: any,
  ): Promise<Message> {
    return this.messageModel
      .findByIdAndUpdate(id, { content, media }, { new: true })
      .exec();
  }

  async deleteMessage(id: string): Promise<Message> {
    return this.messageModel.findByIdAndRemove(id).exec();
  }
}
