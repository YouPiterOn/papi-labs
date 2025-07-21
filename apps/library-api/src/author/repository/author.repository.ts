import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/common/dto/page.dto';
import { v4 as uuid } from 'uuid';
import { AuthorEntity } from '../entity/author.entity';
import { AuthorResponseDto } from '../dto/author-response.dto';
import { AuthorDto } from '../dto/author.dto';
import { PatchAuthorDto } from '../dto/patch-author.dto';

@Injectable()
export class AuthorRepository {
  private _storage = new Map<string, AuthorEntity>();

  constructor() { }

  async findPage(
    page: number,
    pageSize: number,
  ): Promise<PageDto<AuthorResponseDto>> {
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

  async create(dto: AuthorDto): Promise<AuthorResponseDto> {
    const id = uuid();
    const created: AuthorEntity = {
      id,
      ...dto
    };

    this._storage.set(id, created);
    return created;
  }

  async findById(id: string): Promise<AuthorResponseDto | null> {
    const author = this._storage.get(id);
    if (!author) return null;
    return author;
  }

  async update(id: string, dto: AuthorDto): Promise<AuthorResponseDto | null> {
    const author = this._storage.get(id);
    if (!author) return null;

    const updated: AuthorEntity = {
      id: author.id,
      name: dto.name,
      countryId: dto.countryId,
    };

    this._storage.set(updated.id, updated);
    return updated;
  }

  async patch(id: string, dto: PatchAuthorDto): Promise<AuthorResponseDto | null> {
    const author = this._storage.get(id);
    if (!author) return null;

    const patched: AuthorEntity = {
      id: author.id,
      name: dto.name ?? author.name,
      countryId: dto.countryId ?? author.countryId,
    };

    this._storage.set(patched.id, patched);
    return patched;
  }

  async delete(id: string): Promise<boolean> {
    return this._storage.delete(id);
  }

  async findByIds(ids: string[]): Promise<Map<string, AuthorResponseDto>> {
    const idsSet = new Set(ids);
    const authorsMap = new Map<string, AuthorResponseDto>();

    for (const author of this._storage.values()) {
      if(authorsMap.has(author.id)) continue;

      if (idsSet.has(author.id)) {
        authorsMap.set(author.id, author);
      }
    }

    return authorsMap;
  }
}