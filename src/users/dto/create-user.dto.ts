import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String })
  login: string;

  @ApiProperty({ type: String })
  password: string;
}
