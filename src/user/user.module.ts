import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule], // Import User entity
  controllers: [UserController], // Register the controller
  providers: [UserService], // Register services
  exports: [UserService], // Export service if it's used in other modules
})
export class UserModule {}
