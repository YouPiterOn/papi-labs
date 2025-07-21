import { Field, ObjectType } from "@nestjs/graphql";
import { BookResponseDto } from "./book-response.dto";

@ObjectType()
export class BookPageObject {
  @Field(() => [BookResponseDto])
  content: BookResponseDto[];
  
  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  pageSize: number;
}