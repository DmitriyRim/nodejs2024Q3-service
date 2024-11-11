import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  duration: number;

  @ApiProperty()
  artistId: any;

  @ApiProperty()
  albumId: any;
}
