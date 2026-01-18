import { useState, useEffect } from 'react';
import { getRecentTracks, type Track } from '../services/lastfmService';

const games = [
    { name: 'Death Stranding 1 & 2', note: 'peak Kojima' },
    { name: 'Red Dead Redemption 1 & 2', note: null },
    { name: 'God of War + Ragnarök', note: null },
    { name: 'Disco Elysium', note: 'still playing' },
    { name: 'Overwatch 2', note: "to shake things up (I'm definitely  not addicted)" },
];

const shows = [
    { name: 'Better Call Saul', note: null },
    { name: 'Mr. Robot', note: null },
    { name: 'Breaking Bad', note: null },
    { name: 'YOU', note: null },
    { name: 'Bojack Horseman / Vinland Saga', note: "can't pick one" },
];

const music = [
    { artist: 'Lorna Shore', album: 'Pain Remains / I Feel The Everblack Festering Within Me', note: null},
    { artist: 'Signs of the Swarm', album: 'Amongst the Low and Empty / To Rid Myself Of Truth', note: null },
    { artist: 'Boundaries', album: 'Your Receding Warmth / Death Is Little More', note: null },
    { artist: 'Radiohead', album: 'In Rainbows', note: "yes, it's not metal — so what" },
    { artist: 'Whitechapel', album: 'Somatic Defilement', note: 'a bit of old school' }
];


const Personal = () => {
    const [recentTracks, setRecentTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRecentTracks(5)
            .then(setRecentTracks)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="personal">
            <h1>Personal</h1>
            <p className="personal-intro">
                Beyond the code — the stuff that keeps me sane (or insane, depending on the playlist).
            </p>

            <section className="spotify-section">
                <h2>What I'm Listening To</h2>
                {loading ? (
                    <p className="loading-text">Loading tracks...</p>
                ) : recentTracks.length > 0 ? (
                    <ul className="recent-tracks">
                        {recentTracks.map((track, i) => (
                            <li key={i} className="track-item">
                                {track.image && <img src={track.image} alt={track.album} className="track-image" />}
                                <div className="track-info">
                                    <a href={track.url} target="_blank" rel="noopener noreferrer" className="track-name">
                                        {track.name}
                                        {track.nowPlaying && <span className="now-playing">▶ Now Playing</span>}
                                    </a>
                                    <span className="track-artist">{track.artist}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-tracks">Couldn't load recent tracks</p>
                )}
            </section>

            <section className="favorites-section">
                <h2>Favorite Games</h2>
                <ul className="favorites-list">
                    {games.map((g, i) => (
                        <li key={i}>
                            <span className="fav-name">{g.name}</span>
                            {g.note && <span className="fav-note"> — {g.note}</span>}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="favorites-section">
                <h2>Favorite Shows</h2>
                <ul className="favorites-list">
                    {shows.map((s, i) => (
                        <li key={i}>
                            <span className="fav-name">{s.name}</span>
                            {s.note && <span className="fav-note"> — {s.note}</span>}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="favorites-section">
                <h2>Music Rotation</h2>
                <ul className="favorites-list music-list">
                    {music.map((m, i) => (
                        <li key={i}>
                            <span className="fav-name">{m.artist}</span>
                            <span className="fav-album"> — {m.album}</span>
                            {m.note && <span className="fav-note"> ({m.note})</span>}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="gallery-section">
                <h2>Gallery</h2>
                <p className="gallery-intro">Concerts, travels, and random moments.</p>
                <div className="gallery-grid">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="gallery-placeholder">
                            Photo {i + 1}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Personal;