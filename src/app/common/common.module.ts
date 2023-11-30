import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PubsubService } from './pubsub.service';

export const PUB_SUB: symbol = Symbol('PUB_SUB');

@Module({
  imports: [],
  providers: [
    {
      provide: PUB_SUB,
      useFactory: () => {
        return new PubSub();
      },
      inject: [],
    },
    {
      provide: PubsubService,
      useFactory: (pubsub) => pubsub,
      inject: [PUB_SUB],
    },
  ],
  exports: [PubsubService],
})
export class CommonModule {}
