import { Injectable } from '@nestjs/common';
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

    this.users.push(newUser);
    return newUser;
  }

  hasUser(login: string): boolean {
    return this.users.find((user) => user.login === login) ? true : false;
  }
}
