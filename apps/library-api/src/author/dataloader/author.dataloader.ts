import { AuthorRepository } from "../repository/author.repository";
import * as DataLoader from "dataloader";
import { AuthorResponseDto } from "../dto/author-response.dto";
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class AuthorDataLoader extends DataLoader<string, AuthorResponseDto> {
  constructor(private readonly authorRepository: AuthorRepository) {
    super(async (authorIds: string[]) => {
      const authorsMap = await this.authorRepository.findByIds(authorIds);

      return authorIds.map((id) => {
        const author = authorsMap.get(id);
        if (!author) {
          throw new Error('Author not found');
        }
        return author;
      });
    });
  }
}