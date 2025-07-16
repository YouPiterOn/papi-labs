import { IsOptional, IsString } from 'class-validator';

export class PatchAuthorDto {
  @IsOptional()
  @IsString()
  name?: string;
}
