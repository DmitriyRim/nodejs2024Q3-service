import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  create({ login, password }: CreateUserDto): User {
    if (typeof login !== 'string' || typeof password !== 'string') {
      throw new HttpException(
        'The username or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (this.users.find((user) => user.login === login)) {
      throw new HttpException(
        'The login has already been registered',
        HttpStatus.CONFLICT,
      );
    }

    const newUser = {
      id: randomUUID(),
      login,
      password,
      version: 1,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    };
    const answer = { ...newUser };

    delete answer.password;

    this.users.push(newUser);
    return answer;
  }

  update(id: string, oldPassword: string, newPassword: string): User {
    if (!oldPassword || !newPassword) {
      throw new HttpException('invalid dto', HttpStatus.BAD_REQUEST);
    }

    const index = this.users.findIndex((user) => user.id === id);
    const user = this.findOne(id);

    if (user.password !== oldPassword) {
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
    }

    const newUserData = {
      ...user,
      password: newPassword,
      updatedAt: +new Date(),
      version: ++user.version,
    };
    const answer = { ...newUserData };

    delete answer.password;
    this.users[index] = newUserData;

    return answer;
  }

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    this.users.splice(index, 1);
  }
}
