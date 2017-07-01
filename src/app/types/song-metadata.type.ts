export interface SongMetadata {
    id: string;
    artwork_url?: string;
    created_at: Date;
    description: string;
    duration: number;
    genre: string;
    title: string;
    stream_url: string;
    upvoted: boolean;
    user: Artist;
}

export interface Artist {
    username: string;
}