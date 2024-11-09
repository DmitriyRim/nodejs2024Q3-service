import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
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
  @Header('Accept', 'application/json')
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
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

  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(id, oldPassword, newPassword);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.userService.deleteUser(id);
  }
}
// Сервер должен ответить кодом status code 204, если запись найдена и удалена
// Сервер должен ответить кодом status code 404 и соответствующим сообщением, если запись с id === userId не существует
