import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  ParseUUIDPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Track } from './interface/track.interface';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Get all track',
    type: [Track],
  })
  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @ApiOperation({ summary: 'Get single track by id' })
  @ApiResponse({
    status: 200,
    description: 'The track has been found',
    type: Track,
  })
  @ApiResponse({ status: 404, description: 'not found' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiParam({ name: 'id', description: 'Track ID' })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.findOne(id);
  }

  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({
    status: 201,
    description: 'The track has been created',
    type: Track,
  })
  @ApiResponse({ status: 400, description: 'not contain required fields' })
  @ApiBody({ type: CreateTrackDto })
  @Post()
  @Header('Accept', 'application/json')
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @ApiOperation({ summary: 'Update track' })
  @ApiResponse({
    status: 200,
    description: 'The track has successfully updated',
    type: Track,
  })
  @ApiResponse({ status: 404, description: 'not found' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiParam({ name: 'id', description: 'Track ID', type: String })
  @ApiBody({ type: UpdateTrackDto })
  @Put(':id')
  @Header('Accept', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @ApiOperation({ summary: 'Remove track' })
  @ApiResponse({ status: 204, description: 'the record is found and deleted' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiResponse({ status: 404, description: 'not found' })
  @ApiParam({ name: 'id', description: 'Track ID', type: String })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.remove(id);
  }
}
