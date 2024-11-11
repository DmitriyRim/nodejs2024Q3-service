import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  Header,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Artist } from './interfaces/artist.interface';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: 200,
    description: 'Get all artist',
    type: [Artist],
  })
  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiResponse({
    status: 200,
    description: 'The artist has been found',
    type: Artist,
  })
  @ApiResponse({ status: 404, description: 'not found' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiParam({ name: 'id', description: 'Artist ID' })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.findOne(id);
  }

  @ApiOperation({ summary: 'Create artist' })
  @ApiResponse({
    status: 201,
    description: 'The artist has been created',
    type: Artist,
  })
  @ApiResponse({ status: 400, description: 'not contain required fields' })
  @ApiBody({ type: CreateArtistDto })
  @Post()
  @Header('Accept', 'application/json')
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @ApiOperation({ summary: 'Update artist' })
  @ApiResponse({
    status: 200,
    description: 'The artist has successfully updated',
    type: Artist,
  })
  @ApiResponse({ status: 404, description: 'not found' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiParam({ name: 'id', description: 'Artist ID', type: String })
  @ApiBody({ type: UpdateArtistDto })
  @Put(':id')
  @Header('Accept', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @ApiOperation({ summary: 'Remove artist' })
  @ApiResponse({ status: 204, description: 'the record is found and deleted' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiResponse({ status: 404, description: 'not found' })
  @ApiParam({ name: 'id', description: 'Artist ID', type: String })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.remove(id);
  }
}
