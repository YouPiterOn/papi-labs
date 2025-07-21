import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class CountryResponseDto {
  @Field(() => ID)
  id: string;
  
  @Field()
  name: string;
}
