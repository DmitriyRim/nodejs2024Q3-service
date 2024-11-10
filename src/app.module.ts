import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { AlbumModule } from './album/album.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, TrackModule, ArtistModule, AlbumModule],
})
export class AppModule {}
