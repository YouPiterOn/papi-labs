import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class BookFiltersDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  publishedDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  authorId?: string;
}
