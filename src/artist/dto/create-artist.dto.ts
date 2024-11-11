// src/artist/dto/create-artist.dto.ts
import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
