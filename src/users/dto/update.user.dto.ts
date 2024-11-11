import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ type: String })
  oldPassword: string;

  @ApiProperty({ type: String })
  newPassword: string;
}
