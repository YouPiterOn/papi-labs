import { Args, ID, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { AuthorResponseDto } from "./dto/author-response.dto";
import { AuthorService } from "./author.service";
import { AuthorDto } from "./dto/author.dto";
import { PubSub } from "graphql-subscriptions";
import { PatchAuthorDto } from "./dto/patch-author.dto";
import { PageDto } from "src/common/dto/page.dto";
import { AuthorPageObject } from "./dto/author-page.object";

const pubSub = new PubSub();

@Resolver(() => AuthorResponseDto)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

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

  @Subscription(() => AuthorResponseDto)
  authorCreated() {
    return pubSub.asyncIterableIterator('authorCreated');
  }
}