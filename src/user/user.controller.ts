import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CheckUUID } from 'src/common/pipes/uuid-validation.pipe';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Incorrect Input' })
  @UsePipes(new ValidationPipe()) // Validation of request body and param
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a single user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Incorrect ID format' })
  @UsePipes(new ValidationPipe()) // Validation of request body and param
  findOne(@Param() params: CheckUUID) {
    const { id } = params;
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Access Forbidden: Wrong password' })
  @ApiResponse({ status: 400, description: 'Wrong Input' })
  @UsePipes(new ValidationPipe()) // Validation of request body and param
  changePassword(
    @Param() params: CheckUUID, // Validate id as UUID
    @Body() changePasswordDto: UpdatePasswordDto, // Validate request body (oldPassword, newPassword)
  ) {
    const { oldPassword, newPassword } = changePasswordDto;
    const { id } = params;

    // Call the service to handle password change
    return this.userService.update(id, oldPassword, newPassword);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe()) // Validation of request body and param
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  remove(@Param() params: CheckUUID) {
    const { id } = params;
    this.userService.remove(id); // Ensure no content is returned here
    // Explicitly return nothing here to ensure 204 status code
  }
}
