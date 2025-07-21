import { forwardRef, Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorRepository } from './repository/author.repository';
import { AuthorResolver } from './author.resolver';
import { BookModule } from 'src/book/book.module';
import { AuthorDataLoader } from './dataloader/author.dataloader';

@Module({
  controllers: [AuthorController],
  imports: [
    forwardRef(() => BookModule)
  ],
  providers: [AuthorService, AuthorRepository, AuthorResolver, AuthorDataLoader],
  exports: [AuthorRepository, AuthorService, AuthorDataLoader],
})
export class AuthorModule {}
