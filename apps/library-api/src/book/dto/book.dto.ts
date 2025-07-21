import { IsString, IsOptional, IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { BookStatus } from '../enum/book-status.enum';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BookDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  publishedDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(BookStatus)
  status?: BookStatus;
}
