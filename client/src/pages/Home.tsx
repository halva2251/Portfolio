import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecentTracks, type Track } from "../services/lastfmService";

const Home = () => {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    getRecentTracks(1)
      .then((tracks) => setTrack(tracks[0] || null))
      .catch(console.error);
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-center">
      {/* Availability */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-6 self-start">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="font-mono text-xs text-green-400">
          Open to apprenticeships — 2027
        </span>
      </div>

      {/* Name */}
      <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-text-primary mb-2">
        Yevhenii Sauliak
      </h1>
      <p className="text-text-muted text-lg mb-6">
        aka <span className="text-text-secondary">"Yen"</span> or{" "}
        <span className="text-text-secondary">"halva"</span> online
      </p>

      {/* Subtitle */}
      <p className="text-xl text-text-secondary max-w-xl leading-relaxed mb-10">
        CS student in Switzerland who builds things to learn how they work.
        Currently into Go, React, and self-deployment.
      </p>

      {/* Currently */}
      <div className="flex flex-wrap gap-3 mb-10">
        <div className="px-4 py-2.5 rounded-lg bg-surface-raised/60 border border-surface-border">
          <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-text-muted mb-0.5">
            Building
          </span>
          <span className="text-sm text-text-primary">
            SongSwap on Raspberry Pi
          </span>
        </div>
        <div className="px-4 py-2.5 rounded-lg bg-surface-raised/60 border border-surface-border">
          <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-text-muted mb-0.5">
            Learning
          </span>
          <span className="text-sm text-text-primary">Cloud infra & CI/CD</span>
        </div>
        {track && (
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-surface-raised/60 border border-surface-border hover:border-accent transition-colors group"
          >
            <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-text-muted mb-0.5">
              {track.nowPlaying ? "♫ Listening" : "♫ Last played"}
            </span>
            <span className="text-sm text-text-primary group-hover:text-accent transition-colors">
              {track.name}
              <span className="text-text-muted"> — {track.artist}</span>
            </span>
          </a>
        )}
      </div>

      {/* CTAs */}
      <div className="flex gap-4">
        <Link
          to="/projects"
          className="px-6 py-3 bg-accent text-surface font-mono text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors"
        >
          View Projects
        </Link>
        <Link
          to="/about"
          className="px-6 py-3 border border-surface-border text-text-secondary font-mono text-sm rounded-lg hover:border-accent hover:text-accent transition-colors"
        >
          About Me
        </Link>
      </div>
    </div>
  );
};

export default Home;
