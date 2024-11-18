// src/favorites/favorites.module.ts
import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { DbModule } from 'src/db/db.module';
@Module({
  imports: [DbModule], // Import any necessary modules
  controllers: [FavoriteController], // Register the controller
  providers: [FavoriteService], // Register the service
  exports: [FavoriteService],
})
export class FavoritesModule {}
