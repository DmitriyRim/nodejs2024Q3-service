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

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post(':favoriteType/:id')
  create(
    @Param('favoriteType') favoriteType: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favsService.addFavorite(`${favoriteType}s`, id);
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Delete(':favoriteType/:id')
  @HttpCode(204)
  remove(
    @Param('favoriteType') favoriteType: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favsService.remove(`${favoriteType}s`, id);
  }
}
