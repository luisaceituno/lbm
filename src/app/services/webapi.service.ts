import ApplicationProperties from '../app.properties';
import { LbmEventType } from '../types/lbm-event.type';
import { LocationSongs } from '../types/location-songs.type';
import { SongMetadata } from '../types/song-metadata.type';
import { Vote } from '../types/vote.type';
import { EventsService } from './events.service';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { ContentType } from '@angular/http/src/enums';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebApiService {
    private baseUrl = ApplicationProperties.webapi_url;
    private postHeaders = new Headers({ 'Content-Type': 'application/json' });
    private getHeaders = new Headers({ 'Accept': 'application/json' });

    constructor(
        private http: Http,
        private events: EventsService,
    ) {
        this.setUpEventHandling();
    }

    public setUpEventHandling() {
        this.events.forEach(event => {
            switch (event.type) {
                case LbmEventType.SONG_UPVOTE:
                case LbmEventType.SONG_END:
                    this.voteWithLocation(event.data, +1);
                    return;
                case LbmEventType.SONG_SKIP:
                case LbmEventType.SONG_DOWNVOTE:
                    this.voteWithLocation(event.data, -1);
                    return;
            }
        });
    }

    public voteWithLocation(song: SongMetadata, rating: number) {
        navigator.geolocation.getCurrentPosition(position => {
            let location = {
                lon: position.coords.longitude,
                lat: position.coords.latitude
            };

            this.vote({
                song_id: song.id,
                location: location,
                rating: rating
            });
        });
    }

    vote(vote: Vote): Observable<Response> {
        let url = this.baseUrl + '/post/vote';

        let headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');

        let request = this.http.post(
            url,
            vote,
            { headers: headers }
        )

        request.subscribe(
            response => console.log(response),
            err => console.log(err)
        );

        return request;
    }

    // locationSongs(location: { lon: number, lat: number }): Observable<LocationSongs> {
    //     let lon = number.toString(location.lon)
    //     let lat = number.toString(location.lat)
    //     console.log(location);
    //     return this.http.get(this.baseUrl + 'get/songlist/' + lon + '/' + lat, this.getHeaders)
    //         .map(res => let locationSongs = res.json())
    //         .catch(this.handleError);
    // }

    // private handleError(error: Response | any) {
    //     // das geht besser
    //     let errMsg: string;
    //     if (error instanceof Response) {
    //         const body = error.json() || '';
    //         const err = body.error || JSON.stringify(body);
    //         errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //     } else {
    //         errMsg = error.message ? error.message : error.toString();
    //     }
    //     console.error(errMsg);
    //     return Observable.throw(errMsg);
    // }
}
