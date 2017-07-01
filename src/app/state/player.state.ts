import { SongMetadata } from '../types/song-metadata.type';

export class PlayerState {
    public currentSong: SongMetadata;
    public currentTime: any = 0;
    public currentState: 'playing' | 'paused';
}