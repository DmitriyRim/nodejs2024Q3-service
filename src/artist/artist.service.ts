import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { randomUUID } from 'crypto';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  constructor(private readonly trackService: TrackService) {}
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

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    this.validateDto(updateArtistDto);
    this.artists[index] = {
      ...this.artists[index],
      ...updateArtistDto,
    };
    return this.artists[index];
  }

  remove(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    this.trackService.removeArtists(id);
    this.artists.splice(index, 1);
  }

  validateDto(createArtistDto: CreateArtistDto | UpdateArtistDto) {
    const { name, grammy } = createArtistDto;

    if (!(typeof name === 'string' && typeof grammy === 'boolean')) {
      throw new HttpException(
        'does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
