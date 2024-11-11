import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CheckUUID } from 'src/common/pipes/uuid-validation.pipe';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @UsePipes(new ValidationPipe()) // Validation of request body and param
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
  @UsePipes(new ValidationPipe()) // Validation of request body and param
  findOne(@Param() params: CheckUUID) {
    const { id } = params;
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe()) // Validation of request body and param
  update(@Param() params: CheckUUID, @Body() updateArtistDto: CreateArtistDto) {
    const { id } = params;
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: CheckUUID) {
    const { id } = params;
    console.log('Deleting artist with id:', id); // Debug line to confirm the `id` is correct
    this.artistService.remove(id);
  }
}
