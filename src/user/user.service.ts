import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Prisma } from '@prisma/client';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: createUserDto });
    return new UserEntity(user);
  }

  async findAll() {
    const allPrismaUsers = await this.prisma.user.findMany();
    const allUsers = allPrismaUsers.map((user) => new UserEntity(user));
    return allUsers;
  }

  async findOne(id: string) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!currentUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return new UserEntity(currentUser);
  }

  async update(id: string, UpdateUserDto: UpdateUserDto) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!currentUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (currentUser.password !== UpdateUserDto.oldPassword) {
      throw new HttpException('Old password does not match', 403);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: UpdateUserDto.newPassword,
        version: { increment: 1 },
      },
    });

    return new UserEntity(updatedUser);
  }

  async remove(id: string) {
    try {
      const deleteUser = await this.prisma.user.delete({
        where: { id },
      });
      return deleteUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }
}
