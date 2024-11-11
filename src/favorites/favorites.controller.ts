// src/favorites/favorites.controller.ts
import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, UsePipes, HttpStatus, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AddTrackToFavoritesDto } from './dto/add-to-favorites.dto';
import { AddAlbumToFavoritesDto } from './dto/add-to-favorites.dto';
import { AddArtistToFavoritesDto } from './dto/add-to-favorites.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CheckUUID } from 'src/common/pipes/uuid-validation.pipe';

@ApiTags('global-favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()

  @ApiResponse({ status: 200, description: 'Get all global favorites' })

  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')

  @ApiResponse({ status: 201, description: 'Track added to global favorites' })
  @ApiResponse({ status: 422, description: 'UNPROCESSABLE_ENTITY' })
  
  @UsePipes(new ValidationPipe())
  addTrackToFavorites(@Param() params: CheckUUID) {
    const { id } = params;
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @ApiResponse({ status: 204, description: 'Track removed from global favorites' })
  
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param() params: CheckUUID) {
    const { id } = params;
    this.favoritesService.removeTrackFromFavorites(id, true);
  }

  @Post('album/:id')
  @ApiBody({ type: AddAlbumToFavoritesDto })
  @ApiResponse({ status: 201, description: 'Album added to global favorites' })
  @ApiResponse({ status: 422, description: 'UNPROCESSABLE_ENTITY' })
  
  @UsePipes(new ValidationPipe())
  addAlbumToFavorites(@Param() params: CheckUUID) {
    const { id } = params;
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @ApiResponse({ status: 204, description: 'Album removed from global favorites' })
  
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param() params: CheckUUID) {
    const { id } = params;
    this.favoritesService.removeAlbumFromFavorites(id, true);
  }

  @Post('artist/:id')

  @ApiResponse({ status: 201, description: 'Artist added to global favorites' })
  @ApiResponse({ status: 422, description: 'UNPROCESSABLE_ENTITY' })

  @UsePipes(new ValidationPipe())
  addArtistToFavorites(@Param() params: CheckUUID) {
    console.log(params);
    const { id } = params;
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @ApiResponse({ status: 204, description: 'Artist removed from global favorites' })
  
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param() params: CheckUUID) {
    const { id } = params;
    this.favoritesService.removeArtistFromFavorites(id, true);
  }
}
