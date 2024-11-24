import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumsModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorite/favorite.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    AlbumsModule,
    ArtistModule,
    FavoritesModule,
    TrackModule,
    PrismaModule,
  ]
})
export class AppModule {}
