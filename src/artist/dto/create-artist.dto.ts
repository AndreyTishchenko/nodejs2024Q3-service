// src/artist/dto/create-artist.dto.ts
import { IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  name: string;

  grammy: boolean;
}
