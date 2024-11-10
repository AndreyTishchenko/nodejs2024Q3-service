import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumsModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumsModule,
    TrackModule,
    FavoritesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
