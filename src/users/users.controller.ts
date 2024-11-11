import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/create-user.dto';
import { UserService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    return this.userService.update(id, oldPassword, newPassword);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.userService.remove(id);
  }
}
