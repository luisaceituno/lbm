import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {PlayerService} from "../../app/services/player.service";
import {SongMetadata} from "../../app/types/song-metadata.type";
import {LbmEventType} from "../../app/types/lbm-event.type";
import {EventsService} from "../../app/services/events.service";

@Component({
  templateUrl: 'player.html',
})
export class PlayerPage {

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    public playerService: PlayerService,
    private events: EventsService
  ) {
  }

  playTrack(track: SongMetadata, playlist: SongMetadata[]) {
    this.events.emit({ type: LbmEventType.SONG_PLAY, data: track })
    this.events.emit({ type: LbmEventType.PLAYLIST_UPDATE, data: playlist});
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

  upvote(track : SongMetadata) {
    this.events.emit({ type: LbmEventType.SONG_UPVOTE, data: track });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
