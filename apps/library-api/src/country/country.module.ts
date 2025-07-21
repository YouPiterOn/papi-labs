import { Module } from "@nestjs/common";
import { CountryRepository } from "./country.repository";

@Module({
  providers: [CountryRepository],
  exports: [CountryRepository],
})
export class CountryModule {}