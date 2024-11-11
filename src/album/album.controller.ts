import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  Header,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Album } from './interfaces/album.interface';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({
    status: 200,
    description: 'Get all albums',
    type: [Album],
  })
  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @ApiOperation({ summary: 'Get single album by id' })
  @ApiResponse({
    status: 200,
    description: 'The album has been found',
    type: Album,
  })
  @ApiResponse({ status: 404, description: 'not found' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiParam({ name: 'id', description: 'album ID' })
  @Get(':id')
  @Header('Accept', 'application/json')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.findOne(id);
  }

  @ApiOperation({ summary: 'Create album' })
  @ApiResponse({
    status: 201,
    description: 'The album has been created',
    type: Album,
  })
  @ApiResponse({ status: 400, description: 'not contain required fields' })
  @ApiBody({ type: CreateAlbumDto })
  @Post()
  @Header('Accept', 'application/json')
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @ApiOperation({ summary: 'Update album' })
  @ApiResponse({
    status: 200,
    description: 'The album has successfully updated',
    type: Album,
  })
  @ApiResponse({ status: 404, description: 'not found' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiParam({ name: 'id', description: 'album ID', type: String })
  @ApiBody({ type: UpdateAlbumDto })
  @Put(':id')
  @Header('Accept', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @ApiOperation({ summary: 'Remove album' })
  @ApiResponse({ status: 204, description: 'the record is found and deleted' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiResponse({ status: 404, description: 'not found' })
  @ApiParam({ name: 'id', description: 'album ID', type: String })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.remove(id);
  }
}
