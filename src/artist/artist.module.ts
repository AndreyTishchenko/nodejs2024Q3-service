// src/artist/artist.module.ts
import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DbModule } from 'src/db/db.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Import Artist entity
  controllers: [ArtistController], // Register the controller
  providers: [ArtistService], // Register services
  exports: [ArtistService], // Export ArtistService
})
export class ArtistModule {}
