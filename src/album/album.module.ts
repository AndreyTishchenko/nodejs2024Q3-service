// src/album/album.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../entities';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [Album, forwardRef(() => FavoritesModule)],  // Import Album entity
  controllers: [AlbumController],  // Register the controller
  providers: [AlbumService],  // Register services
  exports: [AlbumService]
})
export class AlbumsModule {}
