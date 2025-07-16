import { BookStatus } from '../enum/book-status.enum';

export class BookResponseDto {
  id: string;
  title: string;
  description?: string;
  authorId: string;
  publishedDate?: string;
  status?: BookStatus;
}
