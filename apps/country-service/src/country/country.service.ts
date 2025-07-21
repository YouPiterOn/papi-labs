import { Injectable } from '@nestjs/common';
import { CountryRepository } from './country.repository';
import { CountryDto } from './dto/country.dto';
import { CountryEntity } from './country.entity';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async createCountry(dto: CountryDto): Promise<CountryEntity> {
    return this.countryRepository.create(dto);
  }

  async getCountryById(id: string): Promise<CountryEntity | null> {
    return this.countryRepository.getById(id);
  }

  async getCountryByName(name: string): Promise<CountryEntity | null> {
    return this.countryRepository.getByName(name);
  }
}