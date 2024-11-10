// src/album/dto/create-album.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  artistId: string | null;  // Artist ID reference
}
