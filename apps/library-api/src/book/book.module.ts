import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './repository/book.repository';
import { AuthorModule } from 'src/author/author.module';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { BookOutboxRepository } from './repository/book-outbox.repository';
import { BookOutboxProcessor } from './processor/book-outbox.processor';

@Module({
  imports: [AuthorModule, RabbitMQModule],
  controllers: [BookController],
  providers: [BookService, BookRepository, BookOutboxRepository, BookOutboxProcessor],
})
export class BookModule {}
