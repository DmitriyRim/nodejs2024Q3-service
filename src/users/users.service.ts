import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  findAll() {
    return this.users;
  }

  findById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  createUser({ login, password }: CreateUserDto) {
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

  hasUser(login: string): boolean {
    return this.users.find((user) => user.login === login) ? true : false;
  }

  updatePassword(id: string, oldPassword: string, newPassword: string): User {
    const user = this.findById(id);
    const index = this.users.findIndex((user) => user.id === id);

    if (!user) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== oldPassword) {
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
    }

    this.users[index] = {
      ...user,
      password: newPassword,
      updatedAt: +new Date(),
      version: ++user.version,
    };

    return this.users[index];
  }

  deleteUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    this.users.splice(index, 1);
  }
}
