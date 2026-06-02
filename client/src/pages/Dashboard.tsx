import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import { getRecentTracks, type Track } from "../services/lastfmService";

// ─── DATA ────────────────────────────────────────────

const featuredProjects = [
  {
    name: "SongSwap",
    description:
      "The project I'm most proud of. I wanted to learn Go so I built an entire full-stack app from scratch: a music discovery platform where you submit a song and get one back from a stranger. Themed chains, mood context, JWT auth, PostgreSQL, rate limiting, Docker Containers, Dev Containers, 26 passing tests, CI/CD with GitHub Actions, and deployed to my Raspberry Pi. All in about a month, with zero prior Go experience.",
    tech: ["Go", "React", "TypeScript", "PostgreSQL", "Docker", "AWS"],
    github: "https://github.com/halva2251/songswap",
    type: "Personal",
    wide: true,
  },
  {
    name: "TrackMyFood",
    description:
      "Top 10 finalist at BadenHackt 2026 out of 30 teams. I designed and built the entire Go backend solo for Team Autexis — a food supply-chain traceability platform with trust scores, recall alerts, and JWT-authenticated REST API. The jury highlighted the backend as a textbook example for code quality.",
    tech: ["Go", "PostgreSQL", "React Native", "Expo", "TypeScript", "JWT"],
    github: "https://github.com/TrackMyFood",
    type: "Hackathon",
  },
  {
    name: "StackUnderflow",
    description:
      "A satirical Q&A platform where you post real tech questions and an AI generates completely wrong but supremely confident answers. Currently building this with a friend — we're training our own model on his home server. The goal is maximum confidence, minimum accuracy.",
    tech: ["In Progress"],
    github: "https://github.com/halva2251/StackUnderFlow",
    type: "Personal",
  },
];

const otherProjects = [
  {
    name: "BBB-Leitsystem",
    description:
      "Real-time room guidance system for BBBaden University showing campus availability.",
    tech: ["React", "C#", "SQLite"],
    github: "https://github.com/halva2251/BBB-Leitsystem",
    type: "Hackathon",
  },
  {
    name: "Budget Buddy",
    description:
      "Budget tracking web app for managing spending and savings goals.",
    tech: ["C#", ".NET MVC"],
    github: "https://github.com/halva2251/BudgetAssistent_.NET_MVC",
    type: "School",
  },
  {
    name: "News Digest",
    description:
      "News scraper that filters by keyword and emails a daily digest.",
    tech: ["Python", "PowerShell"],
    github: "https://github.com/halva2251/news-digest",
    type: "School",
  },
];

const skills = [
  "C#",
  "Go",
  "React",
  "TypeScript",
  "Python",
  ".NET",
  "PostgreSQL",
  "Docker",
  "Git",
  "AWS / Azure",
  "Linux",
];

const games = [
  { name: "Death Stranding 1 & 2", note: "peak Kojima" },
  { name: "Red Dead Redemption 1 & 2", note: null },
  { name: "God of War & Ragnarök", note: null },
  {
    name: "Disco Elysium",
    note: "I just don't wanna be this type of animal anymore",
  },
  { name: "Bloons TD 6", note: "definitely not addicted" },
  { name: "Civilization VI", note: "watch it more than I play" },
];

const shows = [
  { name: "Better Call Saul", note: null },
  { name: "Mr. Robot", note: null },
  { name: "Breaking Bad", note: null },
  { name: "YOU", note: null },
  { name: "Bojack Horseman / Vinland Saga", note: "can't pick one" },
  { name: "Dexter", note: "still watching" },
];

const musicRotation = [
  { artist: "Darko US", album: "DETHMASK 3", note: null },
  {
    artist: "Signs of the Swarm",
    album: "Amongst the Low and Empty",
    note: null,
  },
  { artist: "Boundaries", album: "Your Receding Warmth", note: null },
  {
    artist: "Radiohead",
    album: "In Rainbows",
    note: "yes, it's not metal, sue me",
  },
  { artist: "Whitechapel", album: "Somatic Defilement", note: "old school" },
];

const socials = [
  {
    label: "GitHub",
    url: "https://github.com/halva2251",
    note: "where the code lives",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/yevhenii-sauliak/",
    note: "the professional one",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/sauliak.yevhenii/",
    note: "concerts, travel, life",
  },
  { label: "Discord", url: null, note: "nothalva", copyable: true },
];

const travelGallery = [
  "/personal/travel-1.jpg",
  "/personal/travel-2.jpg",
  "/personal/travel-3.jpg",
  "/personal/travel-4.jpg",
];

// ─── TILE SHELL ──────────────────────────────────────

const tileBase =
  "bg-surface-raised border border-surface-border rounded-[10px] p-5 transition-colors duration-200";

const Tile = ({
  children,
  className = "",
  href,
  onClick,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  id?: string;
}) => {
  const base = `${tileBase} ${className}`;
  if (href) {
    return (
      <a
        id={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} hover:border-white/[0.14] block`}
      >
        {children}
      </a>
    );
  }
  if (onClick) {
    return (
      <button
        id={id}
        onClick={onClick}
        className={`${base} hover:border-white/[0.14] cursor-pointer text-left`}
      >
        {children}
      </button>
    );
  }
  return (
    <div id={id} className={base}>
      {children}
    </div>
  );
};

const TileLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[0.625rem] uppercase tracking-[0.09em] text-text-muted mb-3">
    {children}
  </p>
);

const SecLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="text-[0.625rem] uppercase tracking-[0.1em] text-text-muted whitespace-nowrap">
      {children}
    </span>
    <span className="flex-1 h-px bg-surface-border" />
  </div>
);

// ─── DASHBOARD ───────────────────────────────────────

const Dashboard = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [tracksLoading, setTracksLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  useEffect(() => {
    getRecentTracks(5)
      .then(setTracks)
      .catch(console.error)
      .finally(() => setTracksLoading(false));
  }, []);

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText("nothalva");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch("https://formspree.io/f/mpqqpyvl", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setFormStatus(res.ok ? "success" : "error");
      if (res.ok) form.reset();
    } catch {
      setFormStatus("error");
    }
  };

  const listeningLabel = tracksLoading
    ? "..."
    : tracks[0]
      ? tracks[0].name
      : "—";

  // keep posts import used (referenced for blog link)
  void posts;

  return (
    <div className="min-h-screen">
      {/* ── STICKY NAV ── */}
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-surface-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 h-12">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display font-extrabold text-base tracking-tight text-text-primary hover:opacity-70 transition-opacity"
          >
            halva
          </Link>
          <nav className="flex items-center gap-6">
            <a
              href="#work"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              Work
            </a>
            <a
              href="#personal"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              Personal
            </a>
            <Link
              to="/blog"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              Blog
            </Link>
            <a
              href="#contact"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* ══════════════════════════════════════════
          INTRO
        ══════════════════════════════════════════ */}
        <section className="pt-16 pb-14">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-80" />
            <span className="text-[0.75rem] uppercase tracking-[0.06em] text-text-muted">
              Open to apprenticeships from 2027
            </span>
          </div>

          <h1
            className="font-display font-extrabold leading-[1.0] tracking-[-0.03em] text-text-primary mb-4"
            style={{ fontSize: "clamp(44px, 5.5vw, 72px)" }}
          >
            Yevhenii Sauliak
          </h1>

          <p className="text-sm text-text-muted font-light mb-5">
            aka <span className="text-text-secondary">"Yen"</span> or{" "}
            <span className="text-text-secondary">"halva"</span> online
          </p>

          <p
            className="text-base leading-relaxed font-light max-w-[420px] mb-6"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            CS student in Switzerland who builds things to learn how they work.
            Currently into Go, React, and self-deployment.
          </p>

          {/* skills */}
          <div className="flex flex-wrap gap-1.5 mb-10 max-w-[520px]">
            {skills.map((s, i) => (
              <span
                key={i}
                className="text-[0.625rem] uppercase tracking-[0.06em] text-text-muted border border-surface-border px-2.5 py-1 rounded-[3px]"
              >
                {s}
              </span>
            ))}
          </div>

          {/* status row */}
          <div className="flex border-l border-surface-border mb-9">
            <div className="pl-4 pr-6 border-r border-surface-border">
              <span className="block text-[0.625rem] uppercase tracking-[0.09em] text-text-muted mb-1">
                Building
              </span>
              <span className="text-[0.8125rem] text-text-secondary">
                SyncUp (AI Challenge project)
              </span>
            </div>
            <div className="px-6 border-r border-surface-border">
              <span className="block text-[0.625rem] uppercase tracking-[0.09em] text-text-muted mb-1">
                Learning
              </span>
              <span className="text-[0.8125rem] text-text-secondary">
                Go & ML model training
              </span>
            </div>
            <div className="px-6">
              <span className="block text-[0.625rem] uppercase tracking-[0.09em] text-text-muted mb-1">
                Listening
              </span>
              <span className="text-[0.8125rem] text-accent block max-w-[180px] truncate">
                {listeningLabel}
              </span>
            </div>
          </div>

          {/* buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="px-5 py-2.5 bg-accent text-surface text-[0.8125rem] font-medium hover:opacity-85 transition-opacity"
            >
              Contact
            </a>
            <a
              href="https://github.com/halva2251"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-surface-border text-[0.8125rem] text-text-muted hover:text-text-primary hover:border-white/20 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yevhenii-sauliak/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-surface-border text-[0.8125rem] text-text-muted hover:text-text-primary hover:border-white/20 transition-colors"
            >
              LinkedIn
            </a>
            <Link
              to="/blog"
              className="px-5 py-2.5 border border-surface-border text-[0.8125rem] text-text-muted hover:text-text-primary hover:border-white/20 transition-colors"
            >
              Blog
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════
          WORK GRID
        ══════════════════════════════════════════ */}
        <div id="work" className="flex flex-col gap-8 pb-12">
          {/* ABOUT + LAST.FM */}
          <div>
            <SecLabel>About & Music</SecLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <Tile>
                <TileLabel>
                  {!tracksLoading && tracks[0]?.nowPlaying
                    ? "Now Playing"
                    : "Recently Played"}
                </TileLabel>
                {tracksLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 animate-pulse"
                      >
                        <div className="w-9 h-9 rounded-lg bg-surface-hover flex-shrink-0" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3 bg-surface-hover rounded w-3/4" />
                          <div className="h-2.5 bg-surface-hover rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : tracks.length > 0 ? (
                  <div className="flex flex-col">
                    {tracks.slice(0, 5).map((track, i) => (
                      <a
                        key={i}
                        href={track.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 py-2 border-b border-surface-border last:border-0 hover:opacity-60 transition-opacity"
                      >
                        {track.image && (
                          <img
                            src={track.image}
                            alt={`${track.name} by ${track.artist}`}
                            className="w-8 h-8 rounded-[5px] object-cover flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-[0.8125rem] text-text-primary truncate flex items-center gap-2">
                            {track.name}
                            {track.nowPlaying && (
                              <span className="flex items-center gap-1 text-accent text-[0.5625rem] font-mono flex-shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                LIVE
                              </span>
                            )}
                          </div>
                          <div className="text-[0.6875rem] text-text-muted truncate">
                            {track.artist}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-text-muted text-sm">
                    Couldn't load tracks
                  </p>
                )}
              </Tile>

              <Tile className="md:col-span-2">
                <TileLabel>About Me</TileLabel>
                <div
                  className="space-y-3 text-[0.8125rem] leading-relaxed font-light"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <p>
                    I've been glued to computers for as long as I can remember.
                    My mom loves telling the story of walking into my room when
                    I was around eight and finding me fully locked in, building
                    something on screen. She asked what I was doing. My
                    response:{" "}
                    <em
                      className="not-italic"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      "You won't get it, I'm programming a clock."
                    </em>{" "}
                    I don't even remember this, but apparently that was the vibe
                    from day one.
                  </p>
                  <p>
                    Growing up in Ukraine, I spent my free time at a computer
                    academy: Python, design, robotics, game dev. The main thing
                    I took away? I liked coding way more than all the other
                    stuff. When I moved to Switzerland four years ago, that
                    didn't change. If anything, it got sharper.
                  </p>
                  <p>
                    I don't learn from tutorials. I learn by building things
                    that actually work. Taught myself Go from scratch by
                    building{" "}
                    <span className="text-text-secondary">SongSwap</span> in
                    about a month. JWT auth, PostgreSQL, Docker, CI/CD, deployed
                    to my Raspberry Pi.
                  </p>
                  <p>
                    I never really saw myself doing anything else. It's what I
                    study and what I'd be doing either way.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-surface-border flex items-center justify-between">
                  <span className="text-[0.6875rem] text-text-muted">
                    IMS Baden, Berufsmatura + EFZ Informatiker
                  </span>
                  <span className="text-[0.6875rem] text-text-muted font-mono">
                    2024-2028
                  </span>
                </div>
              </Tile>
            </div>
          </div>

          {/* FEATURED PROJECTS */}
          <div>
            <SecLabel>Featured Projects</SecLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {featuredProjects.map((p, i) => (
                <Tile
                  key={i}
                  href={p.github ?? undefined}
                  className={`flex flex-col ${!p.github ? "cursor-default" : ""} ${p.wide ? "md:col-span-2" : ""}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-display font-bold text-base text-text-primary">
                      {p.name}
                    </span>
                    <span className="text-[0.5625rem] uppercase tracking-[0.06em] text-text-muted border border-surface-border px-1.5 py-0.5 rounded-[3px]">
                      {p.type}
                    </span>
                    {!p.github && (
                      <span className="text-[0.5625rem] uppercase tracking-[0.06em] text-accent border border-accent/25 px-1.5 py-0.5 rounded-[3px]">
                        WIP
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[0.8125rem] leading-relaxed mb-4 flex-1 font-light"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                  >
                    {p.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-auto">
                    {p.tech.map((t, j) => (
                      <span
                        key={j}
                        className="font-mono text-[0.625rem] text-text-muted border border-surface-border px-2 py-0.5 rounded-[3px]"
                      >
                        {t}
                      </span>
                    ))}
                    {p.github && (
                      <span className="font-mono text-[0.5625rem] text-text-muted border border-surface-border px-2 py-0.5 rounded-[3px] ml-auto flex-shrink-0">
                        ↗ GitHub
                      </span>
                    )}
                  </div>
                </Tile>
              ))}
            </div>
          </div>

          {/* OTHER PROJECTS */}
          <div>
            <SecLabel>Other Projects</SecLabel>
            <Tile>
              <div className="flex flex-col divide-y divide-surface-border/50">
                {otherProjects.map((p, i) => (
                  <a
                    key={i}
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 first:pt-0 last:pb-0 group hover:opacity-55 transition-opacity"
                  >
                    <div className="flex items-center gap-2 sm:w-40 flex-shrink-0">
                      <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">
                        {p.name}
                      </span>
                      <span className="text-[0.5625rem] uppercase tracking-[0.06em] text-text-muted">
                        {p.type}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed flex-1">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0 mt-1 sm:mt-0">
                      {p.tech.map((t, j) => (
                        <span
                          key={j}
                          className="font-mono text-[0.5625rem] text-text-muted"
                        >
                          {t}
                        </span>
                      ))}
                      <span className="text-text-muted text-xs ml-1">↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </Tile>
          </div>
        </div>

        {/* ═══ DIVIDER ═══ */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-surface-border" />
          <span className="text-text-muted text-[0.625rem] font-mono tracking-widest uppercase">
            Beyond the code
          </span>
          <div className="flex-1 h-px bg-surface-border" />
        </div>

        {/* ══════════════════════════════════════════
          PERSONAL GRID
        ══════════════════════════════════════════ */}
        <div
          id="personal"
          className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pb-12"
        >
          {/* CONCERTS */}
          <div className="relative rounded-[10px] overflow-hidden border border-surface-border min-h-[220px] group">
            <video
              src="/personal/concert.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-5">
              <h3 className="font-display font-bold text-base text-white">
                Concerts
              </h3>
              <p className="text-white/50 text-sm mt-0.5">
                Somewhere in the moshpit
              </p>
            </div>
          </div>

          {/* TRAVEL */}
          <Tile>
            <TileLabel>Traveling</TileLabel>
            <p className="text-text-secondary text-sm mb-3">
              Most recently: Hong Kong
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {travelGallery.map((src, i) => (
                <div
                  key={i}
                  className="relative rounded-lg overflow-hidden aspect-square"
                >
                  <img
                    src={src}
                    alt={`Travel photo ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </Tile>

          {/* CONTACT */}
          <Tile className="md:row-span-2" id="contact">
            <TileLabel>Get in Touch</TileLabel>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                className="w-full bg-surface-hover border border-surface-border rounded-[6px] px-3 py-2 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-text-muted transition-colors"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="w-full bg-surface-hover border border-surface-border rounded-[6px] px-3 py-2 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-text-muted transition-colors"
              />
              <textarea
                name="message"
                rows={3}
                required
                placeholder="Message"
                className="w-full bg-surface-hover border border-surface-border rounded-[6px] px-3 py-2 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-text-muted transition-colors resize-y"
              />
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full px-4 py-2 bg-accent text-surface text-sm font-medium rounded-[6px] hover:opacity-85 transition-opacity disabled:opacity-50 cursor-pointer"
              >
                {formStatus === "sending" ? "Sending..." : "Send"}
              </button>
              {formStatus === "success" && (
                <p className="text-accent text-xs">
                  Sent! I'll get back to you.
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-red-400 text-xs">Something went wrong.</p>
              )}
            </form>
            <div className="border-t border-surface-border pt-3 flex flex-col gap-1.5">
              {socials.map((s, i) =>
                s.copyable ? (
                  <button
                    key={i}
                    onClick={handleCopyDiscord}
                    className="flex items-center justify-between py-1.5 text-left group cursor-pointer"
                  >
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      {s.label}
                    </span>
                    <span className="text-xs text-text-muted">
                      {copied ? "copied!" : s.note}
                    </span>
                  </button>
                ) : (
                  <a
                    key={i}
                    href={s.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-1.5 group"
                  >
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      {s.label}
                    </span>
                    <span className="text-xs text-text-muted">{s.note}</span>
                  </a>
                ),
              )}
            </div>
          </Tile>

          {/* GAMING */}
          <div className="md:col-span-2 relative rounded-[10px] overflow-hidden border border-surface-border min-h-[200px] group">
            <img
              src="/personal/gaming.jpg"
              alt="Gaming setup"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-5">
              <h3 className="font-display font-bold text-base text-white">
                Gaming
              </h3>
              <p className="text-white/50 text-sm mt-0.5">
                Kojima, Rockstar, and way too much Bloons
              </p>
            </div>
          </div>

          {/* GAMES */}
          <Tile>
            <TileLabel>Favorite Games</TileLabel>
            <div className="flex flex-col">
              {games.map((g, i) => (
                <div
                  key={i}
                  className="py-2 border-b border-surface-border/40 last:border-0 text-sm"
                >
                  <span className="text-text-secondary">{g.name}</span>
                  {g.note && (
                    <span className="text-text-muted italic text-xs ml-2">
                      ({g.note})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Tile>

          {/* SHOWS */}
          <Tile>
            <TileLabel>Favorite Shows</TileLabel>
            <div className="flex flex-col">
              {shows.map((s, i) => (
                <div
                  key={i}
                  className="py-2 border-b border-surface-border/40 last:border-0 text-sm"
                >
                  <span className="text-text-secondary">{s.name}</span>
                  {s.note && (
                    <span className="text-text-muted italic text-xs ml-2">
                      ({s.note})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Tile>

          {/* MUSIC ROTATION */}
          <Tile>
            <TileLabel>Music Rotation</TileLabel>
            <div className="flex flex-col">
              {musicRotation.map((m, i) => (
                <div
                  key={i}
                  className="py-2 border-b border-surface-border/40 last:border-0 text-sm"
                >
                  <span className="text-text-secondary">{m.artist}</span>
                  <span className="text-text-muted">, {m.album}</span>
                  {m.note && (
                    <span className="text-text-muted italic text-xs ml-2">
                      ({m.note})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Tile>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div className="pt-4 pb-6 border-t border-surface-border flex justify-between items-center">
          <span className="text-text-muted text-xs">
            &copy; 2026 Yen Sauliak
          </span>
          <span className="font-mono text-text-muted text-[0.6rem]">
            built with dedication
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
