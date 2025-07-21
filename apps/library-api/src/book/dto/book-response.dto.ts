import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BookStatus } from '../enum/book-status.enum';
import { AuthorResponseDto } from 'src/author/dto/author-response.dto';

@ObjectType()
export class BookResponseDto {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  author?: AuthorResponseDto;

  @Field({ nullable: true })
  publishedDate?: string;

  @Field({ nullable: true })
  status?: BookStatus;
}
