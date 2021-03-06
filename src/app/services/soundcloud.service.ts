import ApplicationProperties from '../app.properties';
import { SongMetadata } from '../types/song-metadata.type';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SoundcloudService {

    constructor(
        private http: Http
    ) {
    }

    public search(query: string): Observable<SongMetadata[]> {
        let url = ApplicationProperties.searchUrl(query, 0);
        return this.http.get(url).map(response => response.json());
    }

    public trackMetadata(id: string): Observable<SongMetadata> {
        let url = ApplicationProperties.trackUrl(id);
        return this.http.get(url).map(response => response.json());
    }
}

