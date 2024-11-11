// src/album/album.service.ts
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from 'src/track/track.service';
@Injectable()
export class AlbumService {
  private albums = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  update(id: string, updateAlbumDto: CreateAlbumDto) {
    const album = this.findOne(id);
    Object.assign(album, updateAlbumDto);
    return album;
  }

  remove(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.trackService.removeAlbumFromTracks(id);

    // Remove album from favorites
    // this.favoritesService.removeAlbumFromFavorites(id);

    // Remove album
    this.albums.splice(albumIndex, 1);
  }

  // Helper method to remove artist reference from albums
  removeArtistFromAlbums(artistId: string) {
    this.albums.forEach(album => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}