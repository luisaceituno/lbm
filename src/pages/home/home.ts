import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { EventsService } from '../../app/services/events.service';
import { PlayerService } from '../../app/services/player.service';
import { SoundcloudService } from '../../app/services/soundcloud.service';
import { PlayerState } from '../../app/state/player.state';
import { PlaylistState } from '../../app/state/playlist.state';
import { LbmEventType } from '../../app/types/lbm-event.type';
import { SongMetadata } from '../../app/types/song-metadata.type';
import { PlayerPage } from '../player/player';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private tracks: SongMetadata[] = [];
  private currentTrack: SongMetadata;
  private currentIndex: number = 0;
  private audio: any;

  private playlistStates: Observable<PlaylistState>;
  private playerStates: Observable<PlayerState>;
  
  private searchResults: BehaviorSubject<SongMetadata[]>;
  private displayList: Observable<SongMetadata[]>;


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private scService: SoundcloudService,
    private playerService: PlayerService,
    private events: EventsService) {
  }

  ngOnInit() {
      this.playlistStates = this.playerService.playlistStates;
      this.playerStates = this.playerService.playerStates;
      
      this.searchResults = new BehaviorSubject([]);
      this.displayList = this.playlistStates
        .map(state => state.playlist)
        .combineLatest(this.searchResults)
        .map(([playlist, searchResults]) => {
          if (searchResults && searchResults.length > 0) {
            return searchResults;
          }
          return playlist;
        })
  }

  openModal() {
    let modal = this.modalCtrl.create(PlayerPage, this.currentTrack);
    modal.present();
  }

  playTrack(track: SongMetadata, index: number) {
    this.events.emit({ type: LbmEventType.SONG_PLAY, data: track })
  }

  pauseTrack() {
    this.events.emit({ type: LbmEventType.PLAYER_PAUSE, data: {} });
  }

  resumeTrack() {
    this.events.emit({ type: LbmEventType.PLAYER_RESUME, data: {} });
  }

  skipTrack() {
    this.events.emit({ type: LbmEventType.PLAYER_NEXT, data: {} });
  }

  searchTracks(event: any) {
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.scService.search(val).forEach(searchResult => this.searchResults.next(searchResult));
    } else {
      this.searchResults.next([]);
    }
  }
}
