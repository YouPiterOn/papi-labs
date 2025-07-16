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
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { PatchBookDto } from './dto/patch-book.dto';
import { BookFiltersDto } from './dto/book-filters.dto';

@Controller('books')
export class BookController {
  constructor(private readonly booksService: BookService) {}

  @Get()
  getBooks(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query() filters: BookFiltersDto,
  ) {
    return this.booksService.getPage({ page, pageSize, filters });
  }

  @Post()
  @HttpCode(201)
  createBook(@Body() dto: BookDto) {
    return this.booksService.create(dto);
  }

  @Get(':id')
  getBookById(@Param('id') id: string) {
    return this.booksService.getById(id);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() dto: BookDto) {
    return this.booksService.update(id, dto);
  }

  @Patch(':id')
  patchBook(@Param('id') id: string, @Body() dto: PatchBookDto) {
    return this.booksService.patch(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteBook(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
}
