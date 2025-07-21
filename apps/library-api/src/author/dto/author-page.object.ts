import { Field, ObjectType } from "@nestjs/graphql";
import { AuthorResponseDto } from "./author-response.dto";

@ObjectType()
export class AuthorPageObject {
  @Field(() => [AuthorResponseDto])
  content: AuthorResponseDto[];
  
  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  pageSize: number;
}