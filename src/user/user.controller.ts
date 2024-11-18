import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('users')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async changePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() changePasswordDto: UpdateUserDto, // Validate request body (oldPassword, newPassword)
  ) {
    const { oldPassword, newPassword } = changePasswordDto;

    // Call the service to handle password change
    return await this.userService.update(id, oldPassword, newPassword);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.userService.remove(id); // Ensure no content is returned here
    // Explicitly return nothing here to ensure 204 status code
  }
}
