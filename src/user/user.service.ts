import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from 'src/db/db.service';


@Injectable()
export class UserService {
  constructor(private db: DbService) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.db.users.push(newUser);
    return {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  async findAll() {
    return this.db.users;
  }

  async findOne(id: string) {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, oldPassword: string, newPassword: string) {
    // Find user by ID
    const user = await this.findOne(id);

    // Check if the old password is correct, throw 403 if not
    if (user.password !== oldPassword) {
      throw new ForbiddenException('Access Forbidden: Wrong password');
    }

    // Update password and timestamp
    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version = user.version + 1;

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async remove(id: string) {
    const currentUser = await this.findOne(id);
    const index = this.db.users.findIndex((u) => u.id === currentUser.id);
    if (index !== -1) {
      this.db.users.splice(index, 1);
    }
    // No return value is necessary, deletion is implied by the operation
  }
}
