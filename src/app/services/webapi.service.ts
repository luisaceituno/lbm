import { LocationSongs } from '../types/location-songs.type';
import { Vote } from '../types/vote.type';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class WebApiService {

//     constructor(private http: Http) { }

//     private baseUrl = "http://192.168.10.14:5000/"

//     private postHeaders = new Headers({ 'Content-Type': 'application/json' });
//     private getHeaders = new Headers({ 'Accept': 'application/json' });


//     vote(vote: Vote): Observable<Response> {
//         console.log(vote);
//         return this.http.post( this.baseUrl + 'post/vote/', vote, this.postHeaders).catch(this.handleError);
//     }

//     locationSongs(location: {lon: number, lat: number}): Observable<LocationSongs> {
//         let lon = number.toString(location.lon)
//         let lat= number.toString(location.lat)
//         console.log(location);
//         return this.http.get( this.baseUrl + 'get/songlist/' + lon + '/' + lat , this.getHeaders)
//           .map(res => let locationSongs = res.json())
//           .catch(this.handleError);
//     }

//   private handleError (error: Response | any) {
//     // das geht besser
//     let errMsg: string;
//     if (error instanceof Response) {
//       const body = error.json() || '';
//       const err = body.error || JSON.stringify(body);
//       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//     } else {
//       errMsg = error.message ? error.message : error.toString();
//     }
//     console.error(errMsg);
//     return Observable.throw(errMsg);
//   }
}
