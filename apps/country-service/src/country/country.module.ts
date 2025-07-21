import { Module } from "@nestjs/common";
import { CountryRepository } from "./country.repository";
import { CountryResolver } from "./country.resolver";
import { CountryService } from "./country.service";

@Module({
  providers: [CountryRepository, CountryService, CountryResolver],
  exports: [CountryService],
})
export class CountryModule {}