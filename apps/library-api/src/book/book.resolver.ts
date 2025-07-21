import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BookService } from './book.service';
import { ID } from '@nestjs/graphql';
import { BookDto } from './dto/book.dto';
import { BookResponseDto } from './dto/book-response.dto';
import { PatchBookDto } from './dto/patch-book.dto';
import { BookPageObject } from './dto/book-page.object';
import { BookFiltersDto } from './dto/book-filters.dto';

@Resolver(() => BookResponseDto)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => BookResponseDto)
  async getBookById(@Args('id', { type: () => ID }) id: string) {
    return this.bookService.getById(id);
  }

  @Query(() => BookPageObject)
  async getBooksPage(
    @Args('page', { type: () => Number }) page: number,
    @Args('pageSize', { type: () => Number }) pageSize: number,
    @Args('filters') filters: BookFiltersDto
  ) {
    return this.bookService.getPage({ page, pageSize, filters});
  }

  @Mutation(() => BookResponseDto)
  async createBook(@Args('input') input: BookDto) {
    return this.bookService.create(input);
  }

  @Mutation(() => BookResponseDto)
  async updateBook(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: BookDto,
  ) {
    return this.bookService.update(id, input);
  }

  @Mutation(() => BookResponseDto)
  async patchBook(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: PatchBookDto,
  ) {
    return this.bookService.patch(id, input);
  }

  @Mutation(() => Boolean)
  async deleteBook(@Args('id', { type: () => ID }) id: string) {
    await this.bookService.delete(id);
    return true;
  }
}