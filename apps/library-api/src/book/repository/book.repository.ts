import { Injectable } from '@nestjs/common';
import { BookEntity } from '../entity/book.entity';
import { PageDto } from 'src/common/dto/page.dto';
import { BookDto } from '../dto/book.dto';
import { v4 as uuid } from 'uuid';
import { PatchBookDto } from '../dto/patch-book.dto';
import { BookFiltersDto } from '../dto/book-filters.dto';
import { AuthorRepository } from 'src/author/repository/author.repository';
import { BookResponseDto } from '../dto/book-response.dto';

@Injectable()
export class BookRepository {
  private _storage = new Map<string, BookEntity>();

  constructor(private readonly authorRepository: AuthorRepository) { }

  private async toResponseDto(entity: BookEntity): Promise<BookResponseDto> {
    const author = await this.authorRepository.findById(entity.authorId);
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      author: author || undefined,
      publishedDate: entity.publishedDate,
      status: entity.status
    };
  }

  async findPage(
    page: number,
    pageSize: number,
    filters: BookFiltersDto,
  ): Promise<PageDto<BookResponseDto>> {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    let books = [...this._storage.values()];

    if (filters.title) {
      books = books.filter((b) =>
        b.title.toLowerCase().includes(filters.title!.toLowerCase()),
      );
    }
    if (filters.publishedDate) {
      books = books.filter((b) => b.publishedDate === filters.publishedDate);
    }
    if (filters.authorId) {
      books = books.filter((b) => b.authorId === filters.authorId);
    }

    const sliced = books.slice(start, end);

    const content = await Promise.all(sliced.map(b => this.toResponseDto(b)));

    return {
      content,
      page,
      pageSize,
      total: books.length,
    };
  }

  async create(dto: BookDto): Promise<BookResponseDto> {
    const id = uuid();
    const newBook: BookEntity = { id, ...dto };
    this._storage.set(id, newBook);
    return this.toResponseDto(newBook);
  }

  async findById(id: string): Promise<BookResponseDto | null> {
    const book = this._storage.get(id)
    return book ? this.toResponseDto(book) : null;
  }

  async update(id: string, dto: BookDto): Promise<BookResponseDto | null> {
    const book = this._storage.get(id);

    if (!book) return null;

    const updated: BookEntity = {
      id: book.id,
      title: dto.title,
      description: dto.description,
      authorId: dto.authorId,
      publishedDate: dto.publishedDate
    };

    this._storage.set(updated.id, updated);

    return this.toResponseDto(updated);
  }

  async patch(id: string, dto: PatchBookDto): Promise<BookResponseDto | null> {
    const book = this._storage.get(id);

    if (!book) return null;

    const patched: BookEntity = {
      id: book.id,
      title: dto.title || book.title,
      description: dto.description || book.description,
      authorId: dto.authorId || book.authorId,
      publishedDate: dto.publishedDate || book.publishedDate
    };

    this._storage.set(patched.id, patched);

    return this.toResponseDto(patched);
  }

  async delete(id: string): Promise<boolean> {
    return this._storage.delete(id);
  }
}
