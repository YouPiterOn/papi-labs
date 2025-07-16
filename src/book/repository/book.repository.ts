import { Injectable } from '@nestjs/common';
import { BookEntity } from '../entity/book.entity';
import { PageDto } from 'src/common/dto/page.dto';
import { BookDto } from '../dto/book.dto';
import { v4 as uuid } from 'uuid';
import { PatchBookDto } from '../dto/patch-book.dto';
import { BookFiltersDto } from '../dto/book-filters.dto';

@Injectable()
export class BookRepository {
  private _storage = new Map<string, BookEntity>();

  async findPage(
    page: number,
    pageSize: number,
    filters: BookFiltersDto,
  ): Promise<PageDto<BookEntity>> {
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

    const content = books.slice(start, end);

    return {
      content,
      page,
      pageSize,
      total: books.length,
    };
  }

  async create(dto: BookDto): Promise<BookEntity> {
    const id = uuid();
    const newBook: BookEntity = { id, ...dto };
    this._storage.set(id, newBook);
    return newBook;
  }

  async findById(id: string): Promise<BookEntity | null> {
    return this._storage.get(id) ?? null;
  }

  async update(id: string, dto: BookDto): Promise<BookEntity | null> {
    const book = this._storage.get(id);

    if (!book) return null;

    const updated = { ...dto, ...book };

    this._storage.set(updated.id, updated);

    return updated;
  }

  async patch(id: string, dto: PatchBookDto): Promise<BookEntity | null> {
    const book = this._storage.get(id);

    if (!book) return null;

    const patched = { ...dto, ...book };

    this._storage.set(patched.id, patched);

    return patched;
  }

  async delete(id: string): Promise<boolean> {
    return this._storage.delete(id);
  }
}
