import { AuthorResponseDto } from "src/author/dto/author-response.dto";
import { BookStatus } from "../enum/book-status.enum";

export class BookOutboxDto {
  pattern: string;
  data: {
    id: string,
    title: string,
    description?: string,
    author?: AuthorResponseDto,
    publishedDate?: string,
    status?: BookStatus,
  }
}