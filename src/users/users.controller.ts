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
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';
import { ResponseUser, User } from './interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update.user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    type: [ResponseUser],
  })
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get single user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user has been found',
    type: ResponseUser,
  })
  @ApiResponse({ status: 404, description: 'not found' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been created',
    type: ResponseUser,
  })
  @ApiResponse({ status: 400, description: 'not contain required fields' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'The user has successfully updated',
    type: ResponseUser,
  })
  @ApiResponse({ status: 404, description: 'not found' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiResponse({ status: 403, description: 'oldPassword is wrong' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiBody({ type: UpdatePasswordDto })
  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    return this.userService.update(id, oldPassword, newPassword);
  }

  @ApiOperation({ summary: 'Remove user' })
  @ApiResponse({ status: 204, description: 'the record is found and deleted' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiResponse({ status: 404, description: 'not found' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.userService.remove(id);
  }
}
