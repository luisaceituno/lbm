import ApplicationProperties from '../app.properties';
import { PlayerState } from '../state/player.state';
import { PlaylistState } from '../state/playlist.state';
import { LbmEventType } from '../types/lbm-event.type';
import { SongMetadata } from '../types/song-metadata.type';
import { EventsService } from './events.service';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import _ from 'lodash';

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
        this.playerStates.forEach(playerState => this.playerState = playerState);
        this.playlistStates.forEach(playlistState => this.playlistState = playlistState);

        this.events.forEach(event => {
            switch(event.type) {
                case LbmEventType.SONG_PLAY:
                    this.updatePlayerState({currentSong: event.data});
                    this.audio.src = ApplicationProperties.streamUrl((<SongMetadata> event.data).id);
                    this.audio.load();
                    this.audio.play();
                    return;
                case LbmEventType.PLAYLIST_UPDATE:
                    this.updatePlaylistState({playlist: event.data});
                    return;
                case LbmEventType.PLAYER_PAUSE:
                    this.audio.pause();
                    return;
                case LbmEventType.PLAYER_RESUME:
                    this.audio.play();
                    return;
                case LbmEventType.SONG_END:
                case LbmEventType.PLAYER_NEXT:
                    this.playNext();
                    return;
            }
        });

        this.audio.ontimeupdate = () => {
            this.updatePlayerState({currentTime: this.audio.currentTime});
        }

        this.audio.onended = () => {
            this.events.emit({type: LbmEventType.SONG_END, data: this.playerState.currentSong});
        }

        this.audio.onpause = () => {
            this.updatePlayerState({currentState: 'paused'});
        }

        this.audio.onplay = () => {
            this.updatePlayerState({currentState: 'playing'});
        }
    }

    public updatePlaylistState(playlistState: any) {
        this.playlistStates.next(Object.assign(this.playlistState, playlistState));
    }

    private updatePlayerState(playerState: any) {
        this.playerStates.next(Object.assign(this.playerState, playerState));
    }

    private playNext() {
        try {
            let songId = this.playerState.currentSong.id;
            let playlist = this.playlistState.playlist;
            let playlistIndex = _.findIndex(playlist, {'id': songId});
            if (playlist.length > playlistIndex + 1) {
                this.events.emit({type: LbmEventType.SONG_PLAY, data: playlist[playlistIndex + 1]});
            }
            else {
                this.events.emit({type: LbmEventType.PLAYER_STOP, data: {}});
            }
        } catch (err) {
            console.error(err);
        }
    }
}