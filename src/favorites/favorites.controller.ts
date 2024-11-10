// src/favorites/favorites.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AddTrackToFavoritesDto } from './dto/add-to-favorites.dto';
import { AddAlbumToFavoritesDto } from './dto/add-to-favorites.dto';
import { AddArtistToFavoritesDto } from './dto/add-to-favorites.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('global-favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all global favorites' })
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track')
  @ApiBody({ type: AddTrackToFavoritesDto })
  @ApiResponse({ status: 201, description: 'Track added to global favorites' })
  addTrackToFavorites(@Body() addTrackDto: AddTrackToFavoritesDto) {
    return this.favoritesService.addTrackToFavorites(addTrackDto);
  }

  @Delete('track/:trackId')
  @ApiResponse({ status: 204, description: 'Track removed from global favorites' })
  removeTrackFromFavorites(@Param('trackId') trackId: string) {
    this.favoritesService.removeTrackFromFavorites(trackId);
  }

  @Post('album')
  @ApiBody({ type: AddAlbumToFavoritesDto })
  @ApiResponse({ status: 201, description: 'Album added to global favorites' })
  addAlbumToFavorites(@Body() addAlbumDto: AddAlbumToFavoritesDto) {
    return this.favoritesService.addAlbumToFavorites(addAlbumDto);
  }

  @Delete('album/:albumId')
  @ApiResponse({ status: 204, description: 'Album removed from global favorites' })
  removeAlbumFromFavorites(@Param('albumId') albumId: string) {
    this.favoritesService.removeAlbumFromFavorites(albumId);
  }

  @Post('artist')
  @ApiBody({ type: AddArtistToFavoritesDto })
  @ApiResponse({ status: 201, description: 'Artist added to global favorites' })
  addArtistToFavorites(@Body() addArtistDto: AddArtistToFavoritesDto) {
    return this.favoritesService.addArtistToFavorites(addArtistDto);
  }

  @Delete('artist/:artistId')
  @ApiResponse({ status: 204, description: 'Artist removed from global favorites' })
  removeArtistFromFavorites(@Param('artistId') artistId: string) {
    this.favoritesService.removeArtistFromFavorites(artistId);
  }
}
