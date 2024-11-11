import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Track } from 'src/track/interface/track.interface';

export class Fav {
  @ApiProperty({ type: [String] })
  artists: string[];

  @ApiProperty({ type: [String] })
  albums: string[];

  @ApiProperty({ type: [String] })
  tracks: string[];
}

export class ResponseFav {
  @ApiProperty({ type: [Artist] })
  artists: Artist[];

  @ApiProperty({ type: [Album] })
  albums: Album[];

  @ApiProperty({ type: [Track] })
  tracks: Track[];
}
