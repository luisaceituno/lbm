export interface SongMetadata {
    id: number;
    artwork_url?: string;
    created_at: Date;
    description: string;
    duration: number;
    genre: string;
    title: string;
    stream_url: string;
    user: Artist;
}

export interface Artist {
    username: string;
}