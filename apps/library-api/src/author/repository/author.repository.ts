import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/common/dto/page.dto';
import { v4 as uuid } from 'uuid';
import { AuthorEntity } from '../entity/author.entity';
import { AuthorDto } from '../dto/author.dto';
import { PatchAuthorDto } from '../dto/patch-author.dto';

@Injectable()
export class AuthorRepository {
  private _storage = new Map<string, AuthorEntity>();

  async findPage(
    page: number,
    pageSize: number,
  ): Promise<PageDto<AuthorEntity>> {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const authors = [...this._storage.values()];
    const content = authors.slice(start, end);

    return {
      content,
      page,
      pageSize,
      total: authors.length,
    };
  }

  async create(dto: AuthorDto): Promise<AuthorEntity> {
    const id = uuid();
    const newAuthor: AuthorEntity = { id, ...dto };
    this._storage.set(id, newAuthor);
    return newAuthor;
  }

  async findById(id: string): Promise<AuthorEntity | null> {
    return this._storage.get(id) ?? null;
  }

  async update(id: string, dto: AuthorDto): Promise<AuthorEntity | null> {
    const author = this._storage.get(id);
    if (!author) return null;

    const updated: AuthorEntity = { ...author, ...dto };
    this._storage.set(updated.id, updated);
    return updated;
  }

  async patch(id: string, dto: PatchAuthorDto): Promise<AuthorEntity | null> {
    const author = this._storage.get(id);
    if (!author) return null;

    const patched: AuthorEntity = { ...author, ...dto };
    this._storage.set(patched.id, patched);
    return patched;
  }

  async delete(id: string): Promise<boolean> {
    return this._storage.delete(id);
  }
}
