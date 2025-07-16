import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  HttpCode,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDto } from './dto/author.dto';
import { PatchAuthorDto } from './dto/patch-author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorsService: AuthorService) {}

  @Get()
  getAuthors(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    return this.authorsService.getPage({ page, pageSize });
  }

  @Post()
  @HttpCode(201)
  createAuthor(@Body() dto: AuthorDto) {
    return this.authorsService.create(dto);
  }

  @Get(':id')
  getAuthorById(@Param('id') id: string) {
    return this.authorsService.getById(id);
  }

  @Put(':id')
  updateAuthor(@Param('id') id: string, @Body() dto: AuthorDto) {
    return this.authorsService.update(id, dto);
  }

  @Patch(':id')
  patchAuthor(@Param('id') id: string, @Body() dto: PatchAuthorDto) {
    return this.authorsService.patch(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAuthor(@Param('id') id: string) {
    return this.authorsService.delete(id);
  }
}
