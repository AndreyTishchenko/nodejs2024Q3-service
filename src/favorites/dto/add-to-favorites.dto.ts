import { IsString } from 'class-validator';

export class AddTrackToFavoritesDto {
  @IsString()
  trackId: string;
}

export class AddAlbumToFavoritesDto {
  @IsString()
  albumId: string;
}

export class AddArtistToFavoritesDto {
  @IsString()
  artistId: string;
}
