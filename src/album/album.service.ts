import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto) {
    this.validateDto(createAlbumDto);

    const newAlbum = {
      ...createAlbumDto,
      id: randomUUID(),
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((artist) => artist.id === id);

    if (!album) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = this.albums.findIndex((album) => (album.id = id));
    this.validateDto(updateAlbumDto);

    if (index === -1) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }

  validateDto(dto: CreateAlbumDto | UpdateAlbumDto) {
    const { name, year, artistId } = dto;

    if (
      !(
        (typeof name === 'string' &&
          Number.isInteger(year) &&
          typeof artistId === 'string') ||
        artistId === null
      )
    ) {
      throw new HttpException(
        'does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
