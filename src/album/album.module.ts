// src/album/album.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../entities';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [
    Album,
    forwardRef(() => FavoritesModule),
    forwardRef(() => TrackModule),
  ], // Import Album entity
  controllers: [AlbumController], // Register the controller
  providers: [AlbumService], // Register services
  exports: [AlbumService],
})
export class AlbumsModule {}
