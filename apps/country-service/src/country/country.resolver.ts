import { Args, ID, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { CountryService } from './country.service';
import { CountryResponseDto } from './dto/country-response.dto';
import { CountryDto } from './dto/country.dto';

@Resolver(() => CountryResponseDto)
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Mutation(() => CountryResponseDto)
  async createCountry(
    @Args('input') input: CountryDto,
  ): Promise<CountryResponseDto> {
    return this.countryService.createCountry(input);
  }

  @Query(() => CountryResponseDto, { nullable: true })
  async getCountryById(@Args('id', { type: () => ID }) id: string) {
    return this.countryService.getCountryById(id);
  }

  @Query(() => CountryResponseDto, { nullable: true })
  async getCountryByName(@Args('name') name: string) {
    return this.countryService.getCountryByName(name);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return await this.countryService.getCountryById(reference.id);
  }
}
