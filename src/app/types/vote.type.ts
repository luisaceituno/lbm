export interface Vote {
    song_id: string,
    rating: number,
    location: { lon: number, lat: number }
}