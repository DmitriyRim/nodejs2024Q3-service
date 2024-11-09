import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.userService.findById(id);

    if (!user) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    if (typeof login !== 'string' || typeof password !== 'string') {
      throw new HttpException(
        'The username or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (this.userService.hasUser(login)) {
      throw new HttpException(
        'The login has already been registered',
        HttpStatus.CONFLICT,
      );
    }
    return this.userService.createUser(createUserDto);
  }
}
