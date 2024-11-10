import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { IsUUID } from 'class-validator';

@Injectable()
export class UserService {
  private users = [];

  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };
  }

  findAll() {
    return this.users;
  }

  findOne( id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  update(id: string, oldPassword: string, newPassword: string) {
    // Find user by ID
    const user = this.users.find((user) => user.id === id);
    
    // Check if user exists, throw 404 if not found
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Check if the old password is correct, throw 403 if not
    if (user.password !== oldPassword) {
      throw new ForbiddenException('Access Forbidden: Wrong password');
    }

    // Update password and timestamp
    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version = user.version + 1

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(index, 1);
    // No return value is necessary, deletion is implied by the operation
  }
}
