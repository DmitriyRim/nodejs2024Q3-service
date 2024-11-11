import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Boolean })
  grammy: boolean;
}
