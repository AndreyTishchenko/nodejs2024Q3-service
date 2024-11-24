// src/album/album.module.ts
import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [PrismaModule], // Import Album entity
  controllers: [AlbumController], // Register the controller
  providers: [AlbumService], // Register services
  exports: [AlbumService],
})
export class AlbumsModule {}
