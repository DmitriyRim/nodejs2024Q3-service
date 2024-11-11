import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [ArtistModule, AlbumModule, TrackModule],
})
export class FavsModule {}
