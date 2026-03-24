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
      <p className="text-sm text-text-muted mb-8">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-2 relative top-[-1px]" />
        Open to apprenticeships — 2027
      </p>

      {/* Name */}
      <h1 className="font-serif text-6xl sm:text-7xl text-text-primary mb-3 italic">
        Yevhenii Sauliak
      </h1>
      <p className="text-text-muted text-lg mb-8">
        aka <span className="text-text-secondary">"Yen"</span> or{" "}
        <span className="text-text-secondary">"halva"</span> online
      </p>

      {/* Subtitle */}
      <p className="text-lg text-text-secondary max-w-lg leading-relaxed mb-12">
        CS student in Switzerland who builds things to learn how they work.
        Currently into Go, React, and self-deployment.
      </p>

      {/* Currently */}
      <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12 border-l border-surface-border pl-6">
        <div>
          <span className="block text-xs text-text-muted uppercase tracking-wide mb-1">
            Building
          </span>
          <span className="text-sm text-text-primary">
            SongSwap on Raspberry Pi
          </span>
        </div>
        <div>
          <span className="block text-xs text-text-muted uppercase tracking-wide mb-1">
            Learning
          </span>
          <span className="text-sm text-text-primary">Cloud infra & CI/CD</span>
        </div>
        {track && (
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <span className="block text-xs text-text-muted uppercase tracking-wide mb-1">
              {track.nowPlaying ? "Listening" : "Last played"}
            </span>
            <span className="text-sm text-text-primary group-hover:text-text-secondary transition-colors">
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
          className="px-5 py-2.5 bg-text-primary text-surface text-sm font-medium hover:bg-white transition-colors"
        >
          View Projects
        </Link>
        <Link
          to="/about"
          className="px-5 py-2.5 border border-surface-border text-text-secondary text-sm hover:text-text-primary hover:border-text-muted transition-colors"
        >
          About Me
        </Link>
      </div>
    </div>
  );
};

export default Home;
