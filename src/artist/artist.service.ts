// src/artist/artist.service.ts
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistService {
  private artists = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  update(id: string, updateArtistDto: CreateArtistDto) {
    const artist = this.findOne(id);
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  remove(id: string): void {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    // Delete the artist from tracks and albums
    this.trackService.removeArtistFromTracks(id);
    this.albumService.removeArtistFromAlbums(id);
    this.favoritesService.removeArtistFromFavorites(id);

    // Remove the artist from the list
    this.artists.splice(artistIndex, 1);
  }
}
