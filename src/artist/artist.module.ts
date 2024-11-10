// src/artist/artist.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { Artist } from '../entities';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AlbumsModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({

  imports: [Artist, forwardRef(() => FavoritesModule), AlbumsModule, TrackModule],  // Import Artist entity
  controllers: [ArtistController],  // Register the controller
  providers: [ArtistService],  // Register services
  exports: [ArtistService],  // Export ArtistService
})
export class ArtistModule {}
