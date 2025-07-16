import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorRepository } from './repository/author.repository';
import { AuthorDto } from './dto/author.dto';
import { PatchAuthorDto } from './dto/patch-author.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { AuthorResponseDto } from './dto/author-response.dto';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async getPage(params: {
    page: number;
    pageSize: number;
  }): Promise<PageDto<AuthorResponseDto>> {
    const { page, pageSize } = params;
    return this.authorRepository.findPage(page, pageSize);
  }

  async create(dto: AuthorDto): Promise<AuthorResponseDto> {
    return this.authorRepository.create(dto);
  }

  async getById(id: string): Promise<AuthorResponseDto> {
    const author = await this.authorRepository.findById(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }

  async update(id: string, dto: AuthorDto): Promise<AuthorResponseDto> {
    const updated = await this.authorRepository.update(id, dto);
    if (!updated) {
      throw new NotFoundException('Author not found');
    }
    return updated;
  }

  async patch(id: string, dto: PatchAuthorDto): Promise<AuthorResponseDto> {
    const patched = await this.authorRepository.patch(id, dto);
    if (!patched) {
      throw new NotFoundException('Author not found');
    }
    return patched;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.authorRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Author not found');
    }
  }
}
