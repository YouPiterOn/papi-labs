import { Injectable } from '@nestjs/common';
import { CountryEntity } from './country.entity';
import { v4 as uuid } from 'uuid';
import { CountryDto } from './dto/country.dto';

@Injectable()
export class CountryRepository {
  private _storage = new Map<string, CountryEntity>();

  async create(dto: CountryDto): Promise<CountryEntity> {
    const id = uuid();
    const newCountry: CountryEntity = { id, ...dto };
    this._storage.set(id, newCountry);
    return newCountry;
  }

  async getById(id: string): Promise<CountryEntity | null> {
    const country = this._storage.get(id);
    if(!country) return null;

    return country;
  }

  async getByName(name: string): Promise<CountryEntity | null> {
    for (const country of this._storage.values()) {
      if (country.name === name) {
        return country;
      }
    }
    return null;
  }
}
