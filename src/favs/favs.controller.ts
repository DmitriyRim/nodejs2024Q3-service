import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Fav, ResponseFav } from './interfaces/fav.interface';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @ApiOperation({ summary: 'Add favorite id' })
  @ApiResponse({ status: 201, description: 'The id has been added' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiParam({ name: 'favoriteType', description: 'type element' })
  @ApiParam({ name: 'id', description: 'element ID' })
  @Post(':favoriteType/:id')
  create(
    @Param('favoriteType') favoriteType: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favsService.addFavorite(`${favoriteType}s`, id);
  }

  @ApiOperation({ summary: 'Get all favs' })
  @ApiResponse({
    status: 200,
    description: 'Get all favs',
    type: [ResponseFav],
  })
  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @ApiOperation({ summary: 'Remove favorite' })
  @ApiResponse({ status: 204, description: 'the record is found and deleted' })
  @ApiResponse({ status: 400, description: 'not uuid' })
  @ApiResponse({ status: 404, description: 'not found' })
  @ApiParam({ name: 'favoriteType', description: 'type element' })
  @ApiParam({ name: 'id', description: 'element ID' })
  @Delete(':favoriteType/:id')
  @HttpCode(204)
  remove(
    @Param('favoriteType') favoriteType: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favsService.remove(`${favoriteType}s`, id);
  }
}
