// src/track/track.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Track created successfully' })
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
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: CreateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.trackService.remove(id);
  }
}
