import { Injectable } from "@nestjs/common";
import { BookEntity } from "../entity/book.entity";
import { BookResponseDto } from "../dto/book-response.dto";
import { BookOutboxDto } from "../dto/book-outbox.dto";

@Injectable()
export class BookOutboxRepository {
  private _storage: BookOutboxDto[] = [];

  async post(message: BookOutboxDto) {
    this._storage.push(message);
  }

  async poll() {
    return this._storage.shift();
  }

  async hasMessages() {
    return this._storage.length > 0;
  }
}