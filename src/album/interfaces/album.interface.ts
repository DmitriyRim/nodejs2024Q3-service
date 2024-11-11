import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  year: number;

  @ApiProperty({ type: String, nullable: true })
  artistId: string | null;
}
