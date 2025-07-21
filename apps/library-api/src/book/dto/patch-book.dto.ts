import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { BookStatus } from '../enum/book-status.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PatchBookDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  authorId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  publishedDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(BookStatus)
  status?: BookStatus;
}
