import { IsOptional, IsString } from 'class-validator';

export class BookFiltersDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  publishedDate?: string;

  @IsOptional()
  @IsString()
  authorId?: string;
}
