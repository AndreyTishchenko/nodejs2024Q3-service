// src/artist/artist.service.ts
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { UpdateArtistDto } from './dto/update-artist.dto';
@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.db.artists.push(newArtist);
    return newArtist;
  }

  async findAll() {
    return this.db.artists;
  }

  async findOne(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  async remove(id: string) {
    const CurrentArtist = await this.findOne(id);
    const artistIndex = this.db.artists.findIndex((artist) => { return artist.id === CurrentArtist.id; });
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.db.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    this.db.favorites.artists = this.db.favorites.artists.filter(
      (storedId) => storedId !== CurrentArtist.id,
    );
    
    this.db.artists.splice(artistIndex, 1);
  }
}
