import { Injectable } from '@nestjs/common';
import { PageDto } from 'src/common/dto/page.dto';
import { v4 as uuid } from 'uuid';
import { AuthorEntity } from '../entity/author.entity';
import { CountryRepository } from 'src/country/country.repository';
import { AuthorResponseDto } from '../dto/author-response.dto';
import { AuthorDto } from '../dto/author.dto';
import { PatchAuthorDto } from '../dto/patch-author.dto';

@Injectable()
export class AuthorRepository {
  private _storage = new Map<string, AuthorEntity>();

  constructor(private readonly countryRepository: CountryRepository) { }

  private async toResponseDto(entity: AuthorEntity): Promise<AuthorResponseDto> {
    const country = await this.countryRepository.getById(entity.countryId);
    return {
      id: entity.id,
      name: entity.name,
      country: country || undefined,
    };
  }

  async findPage(
    page: number,
    pageSize: number,
  ): Promise<PageDto<AuthorResponseDto>> {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const authors = [...this._storage.values()];
    const sliced = authors.slice(start, end);

    const content = await Promise.all(sliced.map(a => this.toResponseDto(a)));

    return {
      content,
      page,
      pageSize,
      total: authors.length,
    };
  }

  async create(dto: AuthorDto): Promise<AuthorResponseDto> {
    let country = await this.countryRepository.getByName(dto.countryName);
    if (!country) {
      country = await this.countryRepository.create({ name: dto.countryName });
    }

    const id = uuid();
    const newAuthor: AuthorEntity = {
      id,
      name: dto.name,
      countryId: country.id,
    };

    this._storage.set(id, newAuthor);
    return this.toResponseDto(newAuthor);
  }

  async findById(id: string): Promise<AuthorResponseDto | null> {
    const author = this._storage.get(id);
    if (!author) return null;
    return this.toResponseDto(author);
  }

  async update(id: string, dto: AuthorDto): Promise<AuthorResponseDto | null> {
    const author = this._storage.get(id);
    if (!author) return null;

    let country = await this.countryRepository.getByName(dto.countryName);
    if (!country) {
      country = await this.countryRepository.create({ name: dto.countryName });
    }

    const updated: AuthorEntity = {
      id: author.id,
      name: dto.name,
      countryId: country.id,
    };

    this._storage.set(updated.id, updated);
    return this.toResponseDto(updated);
  }


  async patch(id: string, dto: PatchAuthorDto): Promise<AuthorResponseDto | null> {
    const author = this._storage.get(id);
    if (!author) return null;

    let countryId = author.countryId;

    if (dto.countryName) {
      let country = await this.countryRepository.getByName(dto.countryName);
      if (!country) {
        country = await this.countryRepository.create({ name: dto.countryName });
      }
      countryId = country.id;
    }

    const patched: AuthorEntity = {
      id: author.id,
      name: dto.name ?? author.name,
      countryId,
    };

    this._storage.set(patched.id, patched);
    return this.toResponseDto(patched);
  }

  async delete(id: string): Promise<boolean> {
    return this._storage.delete(id);
  }
}