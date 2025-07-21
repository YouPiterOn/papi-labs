import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CountryResponseDto {
  @Field()
  id: string;
  
  @Field()
  name: string;
}
