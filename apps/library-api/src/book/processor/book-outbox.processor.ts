import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { BookOutboxRepository } from '../repository/book-outbox.repository';
import { ClientProxy } from '@nestjs/microservices';
import { BookOutboxDto } from '../dto/book-outbox.dto';
import { DeadLetterQueue } from 'src/rabbitmq/dead-letter-queue';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 500;
const PROCESS_INTERVAL = 2000;

@Injectable()
export class BookOutboxProcessor {
  constructor(
    private readonly outbox: BookOutboxRepository,
    private readonly deadLetterQueue: DeadLetterQueue,
    @Inject('BOOK_SERVICE') private readonly bookClient: ClientProxy,
  ) { }

  @Interval(PROCESS_INTERVAL)
  async processOutbox() {
    let message: BookOutboxDto | undefined;

    while ((message = await this.outbox.poll())) {
      let attempt = 0;

      while (attempt < MAX_RETRIES) {
        try {
          await new Promise<void>((resolve, reject) => {
            this.bookClient.emit(message!.pattern, message!.data).subscribe({
              error: err => reject(err),
              complete: () => resolve(),
            });
          });
          if (Math.random() > 0.5) throw Error;
          break;
        } catch (err) {
          attempt++;
          if (attempt >= MAX_RETRIES) {
            this.deadLetterQueue.post(message);
          } else {
            await new Promise(res => setTimeout(res, RETRY_DELAY_MS));
          }
        }
      }
    }
  }
}
