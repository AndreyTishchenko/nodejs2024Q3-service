// src/track/track.controller.ts
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
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CheckUUID } from 'src/common/pipes/uuid-validation.pipe';

@ApiTags('tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Track created successfully' })
  @UsePipes(new ValidationPipe()) // Validation of request body and param
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all tracks' })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a single track' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @UsePipes(new ValidationPipe()) // Validation of request body and param
  findOne(@Param() params: CheckUUID) {
    const { id } = params;
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe()) // Validation of request body and param
  update(@Param() params: CheckUUID, @Body() updateTrackDto: CreateTrackDto) {
    const { id } = params;
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe()) // Validation of request body and param
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: CheckUUID) {
    const { id } = params;
    this.trackService.remove(id);
  }
}
