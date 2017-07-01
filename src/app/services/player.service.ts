import { PlayerState } from '../state/player.state';
import { LbmEventType } from '../types/lbm-event.type';
import { SongMetadata } from '../types/song-metadata.type';
import { EventsService } from './events.service';

import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {

    private audio: HTMLAudioElement;
    public playerState: PlayerState;

    constructor(
        private events: EventsService
    ) {
        this.playerState = new PlayerState();
        this.audio = new Audio();
        
        this.setUpEventHandling();
    }

    private setUpEventHandling() {
        this.events.forEach(event => {
            switch(event.type) {
                case LbmEventType.SONG_PLAY:
                    this.audio.src = (<SongMetadata> event.data).stream_url;
                    this.audio.load();
                    return;
                case LbmEventType.PLAYER_PAUSE:
                    this.audio.pause();
                    return;
                case LbmEventType.PLAYER_RESUME:
                    this.audio.play();
                    return;
            }
        });

        this.audio.ontimeupdate = () => {
            this.playerState.currentTime = this.audio.currentTime;
        }

        this.audio.onended = () => {
            this.events.emit({type: LbmEventType.SONG_END, data: this.playerState.currentSong});
        }

        this.audio.onpause = () => {
            this.playerState.currentState = 'paused';
        }

        this.audio.onplay = () => {
            this.playerState.currentState = 'playing';
        }
    }
}