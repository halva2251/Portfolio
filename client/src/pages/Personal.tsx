import { useState, useEffect } from "react";
import { getRecentTracks, type Track } from "../services/lastfmService";

// DATA

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
  { artist: "Radiohead", album: "In Rainbows", note: "yes, it's not metal" },
  { artist: "Whitechapel", album: "Somatic Defilement", note: "old school" },
];

// Images
const gamingHero = "/personal/gaming.jpg";
const concertVideo = "/personal/concert.mp4";

// Travel
const travelGallery = [
  "/personal/travel-1.jpg",
  "/personal/travel-2.jpg",
  "/personal/travel-3.jpg",
  "/personal/travel-4.jpg",
];

// COMPONENTS

const ListCard = ({
  title,
  items,
}: {
  title: string;
  items: { primary: string; secondary?: string; note: string | null }[];
}) => (
  <div className="bg-surface-raised/40 border border-surface-border rounded-2xl p-5 flex flex-col">
    <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">
      {title}
    </h3>
    <div className="flex flex-col gap-0.5 flex-1">
      {items.map((item, i) => (
        <div
          key={i}
          className="py-2.5 border-b border-surface-border/50 last:border-0 text-sm"
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
  </div>
);

const HeroTile = ({
  image,
  video,
  label,
  sublabel,
  className = "",
}: {
  image?: string;
  video?: string;
  label: string;
  sublabel?: string;
  className?: string;
}) => (
  <div
    className={`relative rounded-2xl overflow-hidden border border-surface-border group ${className}`}
  >
    {video ? (
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    ) : image ? (
      <img
        src={image}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    ) : null}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    <div className="relative h-full flex flex-col justify-end p-5">
      <h3 className="font-mono text-lg font-semibold text-white">{label}</h3>
      {sublabel && <p className="text-white/60 text-sm mt-1">{sublabel}</p>}
    </div>
  </div>
);

const GalleryTile = ({
  images,
  label,
  sublabel,
}: {
  images: string[];
  label: string;
  sublabel?: string;
}) => (
  <div className="bg-surface-raised/40 border border-surface-border rounded-2xl p-5 flex flex-col">
    <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3">
      {label}
    </h3>
    {sublabel && <p className="text-text-secondary text-sm mb-3">{sublabel}</p>}
    <div className="grid grid-cols-2 gap-2 flex-1">
      {images.map((src, i) => (
        <div
          key={i}
          className="relative rounded-lg overflow-hidden aspect-square"
        >
          <img
            src={src}
            alt={`${label} ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  </div>
);

// PAGE

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
      <p className="text-text-muted text-sm mb-8">Beyond the code.</p>

      {/* ── BENTO GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-auto">
        {/* Last.fm — tall left card */}
        <div className="md:row-span-2 bg-surface-raised/40 border border-surface-border rounded-2xl p-5 flex flex-col">
          <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">
            Now Playing
          </h3>
          {loading ? (
            <p className="text-text-muted text-sm">Loading...</p>
          ) : recentTracks.length > 0 ? (
            <div className="flex flex-col gap-2 flex-1">
              {recentTracks.map((track, i) => (
                <a
                  key={i}
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-raised transition-colors"
                >
                  {track.image && (
                    <img
                      src={track.image}
                      alt={track.album}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="text-text-primary text-sm font-medium truncate flex items-center gap-2">
                      {track.name}
                      {track.nowPlaying && (
                        <span className="inline-flex items-center gap-1 text-green-400 text-[0.6rem] font-mono font-semibold flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          LIVE
                        </span>
                      )}
                    </div>
                    <div className="text-text-muted text-xs truncate">
                      {track.artist}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-sm">
              Couldn't load recent tracks
            </p>
          )}
          <div className="mt-auto pt-4 border-t border-surface-border/50">
            <span className="text-text-muted text-xs font-mono">
              via Last.fm
            </span>
          </div>
        </div>

        {/* Concerts — looping video */}
        <HeroTile
          video={concertVideo}
          label="Concerts"
          sublabel="Somewhere in the moshpit"
          className="min-h-[200px]"
        />

        {/* Traveling — gallery */}
        <GalleryTile
          images={travelGallery}
          label="Traveling"
          sublabel="Most recently: Hong Kong"
        />

        {/* Gaming — hero image, wide */}
        <HeroTile
          image={gamingHero}
          label="Gaming"
          sublabel="Kojima, Rockstar, and way too much Overwatch"
          className="md:col-span-2 min-h-[200px]"
        />

        {/* Favorite Games */}
        <ListCard
          title="Favorite Games"
          items={games.map((g) => ({
            primary: g.name,
            note: g.note,
          }))}
        />

        {/* Favorite Shows */}
        <ListCard
          title="Favorite Shows"
          items={shows.map((s) => ({
            primary: s.name,
            note: s.note,
          }))}
        />

        {/* Music Rotation */}
        <ListCard
          title="Music Rotation"
          items={music.map((m) => ({
            primary: m.artist,
            secondary: m.album,
            note: m.note,
          }))}
        />
      </div>
    </div>
  );
};

export default Personal;
