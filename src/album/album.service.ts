import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto) {
    return 'This action adds a new album';
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

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
