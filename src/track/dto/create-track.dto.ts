// src/track/dto/create-track.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  artistId: string | null; // Artist ID reference
  albumId: string | null; // Album ID reference

  @IsNumber()
  duration: number;
}
