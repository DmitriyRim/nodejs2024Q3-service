import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artis = this.artists.find((artist) => artist.id === id);

    if (!artis) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    return artis;
  }

  create(createArtistDto: CreateArtistDto) {
    this.validateDto(createArtistDto);
    const artist = {
      ...createArtistDto,
      id: randomUUID(),
    };

    this.artists.push(artist);
    return artist;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }

  validateDto(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;

    if (!(typeof name === 'string' && typeof grammy === 'string')) {
      throw new HttpException(
        'does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
