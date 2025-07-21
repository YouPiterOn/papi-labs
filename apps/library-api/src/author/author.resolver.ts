import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference, Subscription } from "@nestjs/graphql";
import { AuthorResponseDto } from "./dto/author-response.dto";
import { AuthorService } from "./author.service";
import { AuthorDto } from "./dto/author.dto";
import { PubSub } from "graphql-subscriptions";
import { PatchAuthorDto } from "./dto/patch-author.dto";
import { AuthorPageObject } from "./dto/author-page.object";
import { BookService } from "src/book/book.service";
import { BookPageObject } from "src/book/dto/book-page.object";
import { CountryResponseDto } from "./dto/country-response.dto";

const pubSub = new PubSub();

@Resolver(() => AuthorResponseDto)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private readonly bookService: BookService
  ) { }

  @Query(() => AuthorResponseDto)
  async getAuthorById(@Args('id', { type: () => ID }) id: string) {
    return this.authorService.getById(id);
  }

  @Query(() => AuthorPageObject)
  async getAuthorsPage(
    @Args('page', { type: () => Number }) page: number,
    @Args('pageSize', { type: () => Number }) pageSize: number,
  ) {
    return this.authorService.getPage({ page, pageSize });
  }

  @Mutation(() => AuthorResponseDto)
  async createAuthor(@Args('input') input: AuthorDto) {
    const created = await this.authorService.create(input);
    await pubSub.publish('authorCreated', { authorCreated: created });
    return created;
  }

  @Mutation(() => AuthorResponseDto)
  async updateAuthor(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: AuthorDto,
  ) {
    return this.authorService.update(id, input);
  }

  @Mutation(() => AuthorResponseDto)
  async patchAuthor(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: PatchAuthorDto,
  ) {
    return this.authorService.patch(id, input);
  }

  @Mutation(() => Boolean)
  async deleteAuthor(@Args('id', { type: () => ID }) id: string) {
    await this.authorService.delete(id);
    return true;
  }

  @ResolveField(() => BookPageObject)
  async books(
    @Parent() author: AuthorResponseDto,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number
  ) {
    return this.bookService.getPage({
      page,
      pageSize,
      filters: { authorId: author.id },
    });
  }

  @ResolveField(() => CountryResponseDto)
  async country(@Parent() author: AuthorResponseDto) {
    return { __typename: 'CountryResponseDto', id: author.countryId };
  }

  @Subscription(() => AuthorResponseDto)
  async authorCreated() {
    return pubSub.asyncIterableIterator('authorCreated');
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return await this.authorService.getById(reference.id);
  }
}