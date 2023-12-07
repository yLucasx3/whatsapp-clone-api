import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { Message, MessageSchema } from './entities/message.entity';
import { MessageResolver } from './message.resolver';
import { UserModule } from '../user/user.module';
import { ConversationModule } from '../conversation/conversation.module';
import { forwardRef } from '@nestjs/common';

@Module({
  providers: [MessageResolver, MessageService],
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    UserModule,
    forwardRef(() => ConversationModule),
  ],
  exports: [MessageService],
})
export class MessageModule {}
