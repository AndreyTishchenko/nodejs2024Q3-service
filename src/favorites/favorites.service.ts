// src/favorites/favorites.service.ts
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AddTrackToFavoritesDto } from './dto/add-to-favorites.dto';
import { AddAlbumToFavoritesDto } from './dto/add-to-favorites.dto';
import { AddArtistToFavoritesDto } from './dto/add-to-favorites.dto';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  private globalFavorites = {
    artists: [],
    albums: [],
    tracks: []
  };

  constructor(
    @Inject(forwardRef(() => TrackService)) private readonly trackService: TrackService, // TrackService is wrapped in forwardRef
    @Inject(forwardRef(() => AlbumService)) private readonly albumService: AlbumService, // AlbumService is wrapped in forwardRef
    @Inject(forwardRef(() => ArtistService)) private readonly artistService: ArtistService // ArtistService is wrapped in forwardRef
  ) {}

  // Get all global favorites
  getAllFavorites() {
    return {
      artists: this.globalFavorites.artists.map(id => this.artistService.findOne(id)),
      albums: this.globalFavorites.albums.map(id => this.albumService.findOne(id)),
      tracks: this.globalFavorites.tracks.map(id => this.trackService.findOne(id)),
    };
  }

  // Add track to global favorites
  addTrackToFavorites(trackId: string) {
    const track = this.trackService.findOne(trackId);

    // Check if the track is already in favorites
    if (this.globalFavorites.tracks.includes(track.id)) {
      throw new NotFoundException(`Track with id ${track.id} is already in global favorites`);
    }

    this.globalFavorites.tracks.push(track.id);
    return track;
  }

  // Remove track from global favorites
  removeTrackFromFavorites(trackId: string) {
    const trackIndex = this.globalFavorites.tracks.indexOf(trackId);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${trackId} is not in global favorites`);
    }

    this.globalFavorites.tracks.splice(trackIndex, 1);
  }

  // Add album to global favorites
  addAlbumToFavorites(albumId: string) {
    const album = this.albumService.findOne(albumId);

    // Check if the album is already in favorites
    if (this.globalFavorites.albums.includes(album.id)) {
      throw new NotFoundException(`Album with id ${album.id} is already in global favorites`);
    }

    this.globalFavorites.albums.push(album.id);
    return album;
  }

  // Remove album from global favorites
  removeAlbumFromFavorites(albumId: string) {
    const albumIndex = this.globalFavorites.albums.indexOf(albumId);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id ${albumId} is not in global favorites`);
    }

    this.globalFavorites.albums.splice(albumIndex, 1);
  }

  // Add artist to global favorites
  addArtistToFavorites(artistId: string) {
    const artist = this.artistService.findOne(artistId);

    // Check if the artist is already in favorites
    if (this.globalFavorites.artists.includes(artist.id)) {
      throw new NotFoundException(`Artist with id ${artist.id} is already in global favorites`);
    }

    this.globalFavorites.artists.push(artist.id);
    return artist;
  }

  // Remove artist from global favorites
  removeArtistFromFavorites(artistId: string) {
    const artistIndex = this.globalFavorites.artists.indexOf(artistId);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${artistId} is not in global favorites`);
    }

    this.globalFavorites.artists.splice(artistIndex, 1);
  }
}
