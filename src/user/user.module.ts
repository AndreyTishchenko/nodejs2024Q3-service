import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController], // Register the controller
  providers: [UserService], // Register services
  exports: [UserService], // Export service if it's used in other modules
})
export class UserModule {}
