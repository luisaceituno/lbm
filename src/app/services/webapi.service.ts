import { LocationSongs } from '../types/location-songs.type';
import { Vote } from '../types/vote.type';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebApiService {
    constructor(private http: Http) { }
    
    vote(vote: Vote): Observable<Response> {
        console.log(vote);
        return Observable.empty();
    }

    locationSongs(location: {lon: number, lat: number}): Observable<LocationSongs> {
        console.log(location);
        return Observable.empty();
    }
}