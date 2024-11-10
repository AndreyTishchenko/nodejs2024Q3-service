import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('artists')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Artist created successfully' })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all artists' })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a single artist' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: CreateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.artistService.remove(id);
  }
}