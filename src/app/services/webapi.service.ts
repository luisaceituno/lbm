import ApplicationProperties from '../app.properties';
import { LbmEventType } from '../types/lbm-event.type';
import { LocationSongs } from '../types/location-songs.type';
import { SongMetadata } from '../types/song-metadata.type';
import { Vote } from '../types/vote.type';
import { EventsService } from './events.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
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
                    this.publishUpvote(event.data);
                    return;
                case LbmEventType.PLAYER_NEXT:
                case LbmEventType.SONG_DOWNVOTE:
                    this.publishDownvote(event.data);
                    return;
            }
        });
    }

    public publishUpvote(song: SongMetadata) {
        // navigator.geolocation.getCurrentPosition(position => {
        //     let location = {
        //         position.coords.longitude,
        //         position.coords.latitude
        //     };
            
        //     this.vote(new Vote(
        //         song.id,
        //         1,
        //         { lon }
        //     ))
        // });
    }

    public publishDownvote(song: SongMetadata) {

    }

    // vote(vote: Vote): Observable<Response> {
    //     console.log(vote);
    //     return this.http.post(this.baseUrl + 'post/vote/', vote, this.postHeaders).catch(this.handleError);
    // }

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
