import { Field, ID, ObjectType } from "@nestjs/graphql";
import { CountryResponseDto } from "src/country/dto/country-response.dto";

@ObjectType()
export class AuthorResponseDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  country?: CountryResponseDto;
}
