import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './entities/message.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { ConversationDocument } from '../conversation/entities/conversation.entity';
// import { ConversationService } from '../conversation/conversation.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
    @InjectModel(Message.name)
    private conversationModel: Model<ConversationDocument>,
  ) {}

  findAll(skip = 0, limit = 10) {
    return this.messageModel.find().skip(skip).limit(limit);
  }

  findMessages(ids: string[]) {
    return this.messageModel.find({ _id: { $in: ids } });
  }

  findMessageById(id: string) {
    return this.messageModel.findOne({ _id: id });
  }

  async createMessage(message: CreateMessageInput) {
    const newMessage = new this.messageModel(message);

    return newMessage.save();
  }
}
