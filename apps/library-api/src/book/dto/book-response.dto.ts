import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { BookStatus } from '../enum/book-status.enum';

@ObjectType()
@Directive('@key(fields: "id")')
export class BookResponseDto {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  authorId: string;

  @Field({ nullable: true })
  publishedDate?: string;

  @Field({ nullable: true })
  status?: BookStatus;
}
