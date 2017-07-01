import { Query } from '@angular/core';

export default class ApplicationProperties {
    public static soundcloud_api_base = "https://api.soundcloud.com";
    public static soundcloud_client_key = "2t9loNQH90kzJcsFCODdigxfp325aq4z";

    public static searchUrl(query: string, offset: number): string {
        query = encodeURI(query);
        let offsetStr = encodeURI('' + offset);
        return `http://api.soundcloud.com/search/tracks?q=${query}&client_id=${this.soundcloud_client_key}&limit=10&offset=${offsetStr}`;
    }

    public static streamUrl(trackId: string): string {
        trackId = encodeURI(trackId);
        return `${this.soundcloud_api_base}/tracks/${trackId}/stream?client_id=${this.soundcloud_client_key}`;
    }

    public static trackUrl(trackId: string): string {
        trackId = encodeURI(trackId);
        return `${this.soundcloud_api_base}/tracks/${trackId}?client_id=${this.soundcloud_client_key}`;
    }
}
