import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Fav } from './interfaces/fav.interface';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class FavsService {
  private readonly favorites: Fav = {
    albums: [],
    artists: [],
    tracks: [],
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  addFavorite(type: string, id: string) {
    const services = {
      albums: this.albumService,
      artists: this.artistService,
      tracks: this.trackService,
    };

    if (
      !Object.keys(this.favorites).includes(type) &&
      services[type].hasById(id)
    ) {
      throw new HttpException(
        `${type} with ${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favorites[type].push(id);
  }

  findAll() {
    const keys = Object.keys(this.favorites);
    const services = {
      albums: this.albumService,
      artists: this.artistService,
      tracks: this.trackService,
    };
    const res = {};

    keys.forEach((key) => {
      res[key] = this.favorites[key].map((id: string) => {
        services[key].findOne(id);
      });
    });

    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} fav`;
  }
}
