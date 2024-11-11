import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  year: number;

  @ApiProperty({ type: String, nullable: true })
  artistId: string | null;
}
