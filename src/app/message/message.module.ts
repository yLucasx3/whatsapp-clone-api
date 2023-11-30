import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { Message, MessageSchema } from './entities/message.entity';
import { MessageResolver } from './message.resolver';

@Module({
  providers: [MessageResolver, MessageService],
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  exports: [MessageService],
})
export class MessageModule {}
