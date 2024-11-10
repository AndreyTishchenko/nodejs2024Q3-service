// src/user/dto/create-user.dto.ts
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  login: string;

  @IsString()
  @MinLength(6)
  password: string;
}
