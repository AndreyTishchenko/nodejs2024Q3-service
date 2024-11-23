import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumsModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorite/favorite.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumsModule,
    TrackModule,
    FavoritesModule,
    DbModule
  ]
})
export class AppModule {}
