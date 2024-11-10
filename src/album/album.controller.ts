// src/album/album.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Album created successfully' })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all albums' })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a single album' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: CreateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.albumService.remove(id);
  }
}
