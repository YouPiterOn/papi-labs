import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorRepository } from './repository/author.repository';
import { AuthorResolver } from './author.resolver';
import { CountryModule } from 'src/country/country.module';

@Module({
  controllers: [AuthorController],
  imports: [CountryModule],
  providers: [AuthorService, AuthorRepository, AuthorResolver],
  exports: [AuthorRepository],
})
export class AuthorModule {}
