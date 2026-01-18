const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const USERNAME = import.meta.env.VITE_LASTFM_USERNAME;
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export interface Track {
    name: string;
    artist: string;
    album: string;
    image: string;
    url: string;
    nowPlaying: boolean;
}

export const getRecentTracks = async (limit: number = 5): Promise<Track[]> => {
    const params = new URLSearchParams({
        method: 'user.getrecenttracks',
        user: USERNAME,
        api_key: API_KEY,
        format: 'json',
        limit: limit.toString(),
    });

    const res = await fetch(`${BASE_URL}?${params}`);
    const data = await res.json();

    if (!data.recenttracks?.track) return [];

    return data.recenttracks.track.map((track: any) => ({
        name: track.name,
        artist: track.artist['#text'],
        album: track.album['#text'],
        image: track.image?.[2]?.['#text'] || '',
        url: track.url,
        nowPlaying: track['@attr']?.nowplaying === 'true',
    }));
};