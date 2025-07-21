import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class BookFiltersDto {
  @Field()
  @IsOptional()
  @IsString()
  title?: string;

  @Field()
  @IsOptional()
  @IsString()
  publishedDate?: string;

  @Field()
  @IsOptional()
  @IsString()
  authorId?: string;
}
