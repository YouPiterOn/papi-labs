import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BookService } from './book.service';
import { ID } from '@nestjs/graphql';

@Resolver(() => BookResponseDto)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => BookResponseDto, { name: 'book' })
  async getBookById(@Args('id', { type: () => ID }) id: string) {
    return this.bookService.getById(id);
  }

  @Mutation(() => BookResponseDto)
  async createBook(@Args('input') input: BookDto) {
    return this.bookService.create(input);
  }
}