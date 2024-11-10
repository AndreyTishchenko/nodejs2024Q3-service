// src/track/track.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { Track } from '../entities';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import {FavoritesModule} from "../favorites/favorites.module";

@Module({
  imports: [Track, forwardRef(() => FavoritesModule)],  // Import Track entity
  controllers: [TrackController],  // Register the controller
  providers: [TrackService],  // Register services
  exports: [TrackService]
})
export class TrackModule {}
