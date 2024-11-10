import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [User],  // Import User entity
  controllers: [UserController],  // Register the controller
  providers: [UserService],  // Register services
  exports: [UserService],  // Export service if it's used in other modules
})
export class UserModule {}
