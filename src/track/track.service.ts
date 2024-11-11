// src/track/track.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TrackService {
  private tracks = [];

  constructor(private readonly favoritesService: FavoritesService) {}

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  update(id: string, updateTrackDto: CreateTrackDto) {
    const track = this.findOne(id);
    Object.assign(track, updateTrackDto);
    return track;
  }

  remove(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    // Remove track from favorites
    // this.favoritesService.removeTrackFromFavorites(id);

    // Remove track
    this.tracks.splice(trackIndex, 1);
  }

  // Helper method to remove artist reference from tracks
  removeArtistFromTracks(artistId: string) {
    this.tracks.forEach(track => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }
  
  removeAlbumFromTracks(albumId: string) {
    this.tracks.forEach(track => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
