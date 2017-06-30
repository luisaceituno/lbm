import { SongRating } from './song-rating.type';

export class LocationSongs {
    constructor(
        public location: {lon: number, lat: number},
        public songs: SongRating[],
    ) {}
}