import { BookStatus } from "../enum/book-status.enum";

export class BookOutboxDto {
  pattern: string;
  data: {
    id: string,
    title: string,
    description?: string,
    authorId: string,
    publishedDate?: string,
    status?: BookStatus,
  }
}