import { BookStatus } from '../enum/book-status.enum';

export class BookEntity {
  id: string;
  title: string;
  description?: string;
  authorId: string;
  publishedDate?: string;
  status?: BookStatus;
}
