import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, nullable: true })
  artistId: string | null;

  @ApiProperty({ type: String, nullable: true })
  albumId: string | null;

  @ApiProperty({ type: Number })
  duration: number;
}
