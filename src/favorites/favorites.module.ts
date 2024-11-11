// src/favorites/favorites.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AlbumsModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
  ], // Import any necessary modules
  controllers: [FavoritesController], // Register the controller
  providers: [FavoritesService], // Register the service
  exports: [FavoritesService],
})
export class FavoritesModule {}
