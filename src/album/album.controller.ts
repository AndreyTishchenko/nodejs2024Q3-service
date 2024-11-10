// src/album/album.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CheckUUID } from 'src/common/pipes/uuid-validation.pipe';

@ApiTags('albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()

  @ApiResponse({ status: 400, description: 'Not valid body' })
  @ApiResponse({ status: 201, description: 'Album created successfully' })

  @UsePipes(new ValidationPipe())  // Validation of request body and param
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
  @ApiResponse({ status: 400, description: 'Id is not UUID' })
  @ApiResponse({ status: 404, description: 'Album not found' })


  @UsePipes(new ValidationPipe())  // Validation of request body and param
  findOne(@Param() params: CheckUUID) {
    const { id } = params;
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())  // Validation of request body and param

  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @ApiResponse({ status: 204, description: 'ALbum found successfully' })

  update(@Param() params: CheckUUID, @Body() updateAlbumDto: CreateAlbumDto) {
    const { id } = params;
    return this.albumService.update(id, updateAlbumDto);
  }




  @Delete(':id')

  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @ApiResponse({ status: 204, description: 'Album deleted successfully' })

  @UsePipes(new ValidationPipe())  // Validation of request body and param
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: CheckUUID) {
    const { id } = params;
    this.albumService.remove(id);
  }
}
