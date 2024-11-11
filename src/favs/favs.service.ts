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

  services: {
    albums: AlbumService;
    artists: ArtistService;
    tracks: TrackService;
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {
    this.services = {
      albums: this.albumService,
      artists: this.artistService,
      tracks: this.trackService,
    };
  }

  addFavorite(type: string, id: string) {
    if (!this.services[type].hasById(id)) {
      throw new HttpException(
        `${type} with ${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favorites[type].push(id);
  }

  findAll() {
    const res = {};
    const keys = Object.keys(this.favorites);

    keys.forEach((key) => {
      res[key] = this.favorites[key]
        .filter((id: string) => this.services[key].hasById(id))
        .map((id: string) => this.services[key].findOne(id));
    });

    return res;
  }

  remove(type: string, id: string) {
    const index = this.favorites[type].findIndex((favs: string) => favs === id);

    if (index === -1) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    this.favorites[type].splice(index, 1);
  }
}
