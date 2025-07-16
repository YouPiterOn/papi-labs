import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { PatchBookDto } from './dto/patch-book.dto';
import { BookRepository } from './repository/book.repository';
import { PageDto } from 'src/common/dto/page.dto';
import { BookResponseDto } from './dto/book-response.dto';
import { AuthorRepository } from 'src/author/repository/author.repository';
import { BookFiltersDto } from './dto/book-filters.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorRepository: AuthorRepository,
  ) {}

  async getPage(params: {
    page: number;
    pageSize: number;
    filters: BookFiltersDto;
  }): Promise<PageDto<BookResponseDto>> {
    const { page, pageSize, filters } = params;
    return this.bookRepository.findPage(page, pageSize, filters);
  }

  async create(dto: BookDto): Promise<BookResponseDto> {
    const author = await this.authorRepository.findById(dto.authorId);
    if (!author) {
      throw new BadRequestException('Author does not exist');
    }
    return this.bookRepository.create(dto);
  }

  async getById(id: string): Promise<BookResponseDto> {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: string, dto: BookDto): Promise<BookResponseDto> {
    const author = await this.authorRepository.findById(dto.authorId);
    if (!author) {
      throw new BadRequestException('Author does not exist');
    }
    const updated = await this.bookRepository.update(id, dto);
    if (!updated) {
      throw new NotFoundException('Book not found');
    }
    return updated;
  }

  async patch(id: string, dto: PatchBookDto): Promise<BookResponseDto> {
    if (dto.authorId) {
      const author = await this.authorRepository.findById(dto.authorId);
      if (!author) {
        throw new BadRequestException('Author does not exist');
      }
    }
    const patched = await this.bookRepository.patch(id, dto);
    if (!patched) {
      throw new NotFoundException('Book not found');
    }
    return patched;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.bookRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Book not found');
    }
  }
}
