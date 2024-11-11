import { ApiProperty } from '@nestjs/swagger';

export class ResponseUser {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  login: string;

  @ApiProperty({ type: Number })
  version: number;

  @ApiProperty({ type: Number })
  createdAt: number;

  @ApiProperty({ type: Number })
  updatedAt: number;
}

export class User {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  login: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: Number })
  version: number;

  @ApiProperty({ type: Number })
  createdAt: number;

  @ApiProperty({ type: Number })
  updatedAt: number;
}
