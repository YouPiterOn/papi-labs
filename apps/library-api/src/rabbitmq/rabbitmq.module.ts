import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { DeadLetterQueue } from "./dead-letter-queue";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'book_queue',
          queueOptions: {
            durable: true
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule, DeadLetterQueue],
  providers: [DeadLetterQueue]
})
export class RabbitMQModule {}