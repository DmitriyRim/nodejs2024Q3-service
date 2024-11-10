import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interface/track.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto) {
    this.validateDto(createTrackDto);
    const track = {
      ...createTrackDto,
      id: randomUUID(),
    };

    this.tracks.push(track);
    return track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    this.validateDto(updateTrackDto);
    this.tracks[index] = {
      ...this.tracks[index],
      ...updateTrackDto,
    };

    return this.tracks[index];
  }

  remove(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    this.tracks.splice(index, 1);
  }

  validateDto(createTrackDto: CreateTrackDto | UpdateTrackDto) {
    const { name, duration, albumId, artistId } = createTrackDto;

    if (
      typeof name === 'string' &&
      (typeof artistId === 'string' || artistId === null) &&
      (typeof albumId === 'string' || albumId === null) &&
      typeof duration === 'number'
    ) {
      return true;
    }

    throw new HttpException(
      'does not contain required fields',
      HttpStatus.BAD_REQUEST,
    );
  }

  removeValueById(id: string, key: 'artistId' | 'albumId') {
    this.tracks.forEach((track, index) => {
      if (track[key] === id) {
        this.tracks[index][key] = null;
      }
    });
  }
}
