import { SongMetadata } from '../types/song-metadata.type';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApplicationState {

    constructor() { }

    public songsList(): Observable<SongMetadata[]> {
        return Observable.empty();
    }

    public currentlyPlaying(): Observable<SongMetadata> {
        return Observable.empty();
    }
}