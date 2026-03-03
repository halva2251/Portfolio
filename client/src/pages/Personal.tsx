import { useState, useEffect } from "react";
import { getRecentTracks, type Track } from "../services/lastfmService";

const games = [
  { name: "Death Stranding 1 & 2", note: "peak Kojima" },
  { name: "Red Dead Redemption 1 & 2", note: null },
  { name: "God of War + Ragnarök", note: null },
  { name: "Disco Elysium", note: "still playing" },
  { name: "Overwatch 2", note: "definitely not addicted" },
];

const shows = [
  { name: "Better Call Saul", note: null },
  { name: "Mr. Robot", note: null },
  { name: "Breaking Bad", note: null },
  { name: "YOU", note: null },
  { name: "Bojack Horseman / Vinland Saga", note: "can't pick one" },
];

const music = [
  { artist: "Lorna Shore", album: "Pain Remains", note: null },
  {
    artist: "Signs of the Swarm",
    album: "Amongst the Low and Empty",
    note: null,
  },
  { artist: "Boundaries", album: "Your Receding Warmth", note: null },
  {
    artist: "Radiohead",
    album: "In Rainbows",
    note: "yes, it's not metal — so what",
  },
  { artist: "Whitechapel", album: "Somatic Defilement", note: "old school" },
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
    <div>
      <h1 className="font-mono text-3xl font-bold mb-2">Personal</h1>
      <p className="text-text-muted text-sm mb-8">
        Beyond the code — the stuff that keeps me sane (or insane, depending on
        the playlist).
      </p>

      {/* Last.fm */}
      <section className="mb-10">
        <h2 className="font-mono text-lg font-semibold mb-4">
          What I'm Listening To
        </h2>
        {loading ? (
          <p className="text-text-muted text-sm">Loading tracks...</p>
        ) : recentTracks.length > 0 ? (
          <div className="flex flex-col gap-2">
            {recentTracks.map((track, i) => (
              <a
                key={i}
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-lg bg-surface-raised/40 hover:bg-surface-raised transition-colors"
              >
                {track.image && (
                  <img
                    src={track.image}
                    alt={track.album}
                    className="w-12 h-12 rounded object-cover"
                  />
                )}
                <div>
                  <div className="text-text-primary text-sm font-medium flex items-center gap-2">
                    {track.name}
                    {track.nowPlaying && (
                      <span className="text-green-400 text-[0.65rem] font-mono font-semibold">
                        ▶ NOW
                      </span>
                    )}
                  </div>
                  <div className="text-text-muted text-xs">{track.artist}</div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-sm">Couldn't load recent tracks</p>
        )}
      </section>

      {/* Favorites */}
      {[
        {
          title: "Favorite Games",
          items: games.map((g) => ({
            primary: g.name,
            secondary: undefined,
            note: g.note,
          })),
        },
        {
          title: "Favorite Shows",
          items: shows.map((s) => ({
            primary: s.name,
            secondary: undefined,
            note: s.note,
          })),
        },
        {
          title: "Music Rotation",
          items: music.map((m) => ({
            primary: m.artist,
            secondary: m.album,
            note: m.note,
          })),
        },
      ].map((section, i) => (
        <section key={i} className="mb-10">
          <h2 className="font-mono text-lg font-semibold mb-4">
            {section.title}
          </h2>
          <div className="flex flex-col">
            {section.items.map((item, j) => (
              <div
                key={j}
                className="py-3 border-b border-surface-border last:border-0 text-sm"
              >
                <span className="text-text-primary">{item.primary}</span>
                {item.secondary && (
                  <span className="text-text-muted"> — {item.secondary}</span>
                )}
                {item.note && (
                  <span className="text-accent italic text-xs ml-2">
                    ({item.note})
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Personal;
