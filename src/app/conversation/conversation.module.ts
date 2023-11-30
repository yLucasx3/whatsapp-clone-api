import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationResolver } from './conversation.resolver';
import { ConversationService } from './conversation.service';
import {
  Conversation,
  ConversationSchema,
} from './entities/conversation.entity';
import { MessageModule } from '../message/message.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ConversationResolver, ConversationService],
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    MessageModule,
    UserModule,
  ],
  exports: [ConversationService],
})
export class ConversationModule {}
