export interface LbmEvent {
    type: LbmEventType,
    data: any
}

export enum LbmEventType {
    PLAYER_NEXT,
    PLAYER_PAUSE,
    PLAYER_RESUME,

    SONG_PLAY,
    SONG_UPVOTE,
    SONG_DOWNVOTE,

    LIST_REFRESH,
}