// src/album/album.module.ts
import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DbModule } from '../db/db.module'

@Module({
  imports: [DbModule], // Import Album entity
  controllers: [AlbumController], // Register the controller
  providers: [AlbumService], // Register services
  exports: [AlbumService],
})
export class AlbumsModule {}
