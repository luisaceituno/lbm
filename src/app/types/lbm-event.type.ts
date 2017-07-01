export interface LbmEvent {
    type: LbmEventType,
    data: any
}

export enum LbmEventType {
    PLAYER_NEXT,
    PLAYER_PAUSE,
    PLAYER_RESUME,

    SONG_PLAY,
    SONG_END,
    SONG_UPVOTE,
    SONG_DOWNVOTE,

    PLAYLIST_UPDATE,

    LIST_REFRESH,
}