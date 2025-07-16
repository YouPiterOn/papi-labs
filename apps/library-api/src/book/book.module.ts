import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './repository/book.repository';
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [AuthorModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
