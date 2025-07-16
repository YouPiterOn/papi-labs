import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { BookStatus } from '../enum/book-status.enum';

export class PatchBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  authorId?: string;

  @IsOptional()
  @IsDateString()
  publishedDate?: string;

  @IsOptional()
  @IsEnum(BookStatus)
  status?: BookStatus;
}
