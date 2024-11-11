import { Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
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

  create(createFavDto: CreateFavDto) {
    return 'This action adds a new fav';
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

  findOne(id: number) {
    return `This action returns a #${id} fav`;
  }

  update(id: number, updateFavDto: UpdateFavDto) {
    return `This action updates a #${id} fav`;
  }

  remove(id: number) {
    return `This action removes a #${id} fav`;
  }
}
