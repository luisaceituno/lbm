import ApplicationProperties from '../app.properties';
import { PlayerState } from '../state/player.state';
import { PlaylistState } from '../state/playlist.state';
import { LbmEventType } from '../types/lbm-event.type';
import { SongMetadata } from '../types/song-metadata.type';
import { EventsService } from './events.service';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class PlayerService {

    private audio: HTMLAudioElement;
    private playerState: PlayerState;
    private playlistState: PlaylistState;

    public playerStates: BehaviorSubject<PlayerState>;
    public playlistStates: BehaviorSubject<PlaylistState>;

    constructor(
        private events: EventsService
    ) {
        this.playerState = new PlayerState();
        this.playlistState = new PlaylistState();
        this.audio = new Audio();

        this.playerStates = new BehaviorSubject(this.playerState);
        this.playlistStates = new BehaviorSubject(this.playlistState);
        
        this.setUpEventHandling();
    }

    private setUpEventHandling() {
        this.events.forEach(event => {
            switch(event.type) {
                case LbmEventType.SONG_PLAY:
                    this.audio.src = ApplicationProperties.streamUrl((<SongMetadata> event.data).id);
                    this.updatePlayerState(Object.assign(this.playerState, {currentSong: event.data}));
                    this.audio.load();
                    this.audio.play();
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

    public updatePlaylistState(playlistState: PlaylistState) {
        this.playlistState = playlistState;
        this.playlistStates.next(this.playlistState);
    }

    private updatePlayerState(playerState: PlayerState) {
        this.playerState = playerState;
        this.playerStates.next(playerState);
    }
}