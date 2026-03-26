import { useState, useEffect } from "react";
import { getRecentTracks, type Track } from "../services/lastfmService";

// ─── DATA ────────────────────────────────────────────

const featuredProjects = [
  {
    name: "SongSwap",
    description:
      "The project I'm most proud of. I wanted to learn Go so I built an entire full-stack app from scratch — a music discovery platform where you submit a song and get one back from a stranger. Themed chains, mood context, JWT auth, PostgreSQL, rate limiting, Docker Containers, Dev Containers, 26 passing tests, CI/CD with GitHub Actions, and deployed to my Raspberry Pi. All in about a month, with zero prior Go experience.",
    tech: ["Go", "React", "TypeScript", "PostgreSQL", "Docker", "AWS"],
    github: "https://github.com/halva2251/songswap",
    type: "Personal",
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
      "Automated news scraper that filters by keywords and delivers curated email digests.",
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
  { name: "God of War + Ragnarok", note: null },
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

const musicRotation = [
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

// ─── CARD SHELL ──────────────────────────────────────

const Card = ({
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
  const base = `bg-surface-raised border border-surface-border rounded-2xl p-5 transition-all duration-200 ${className}`;

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} hover:bg-surface-hover hover:scale-[1.01] cursor-pointer block`}
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
        className={`${base} hover:bg-surface-hover cursor-pointer text-left`}
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

const CardLabel = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted mb-3">
    {children}
  </h3>
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

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6">
      {/* ═══════════════════════════════════════════════════
          PROFESSIONAL ZONE
          ═══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-auto">
        {/* ── ROW 1: INTRO | LAST.FM | STATUS ── */}

        {/* INTRO + STACK wrapper */}
        <div className="md:row-span-2 flex flex-col gap-3 sm:gap-4">
          {/* INTRO */}
          <Card className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-mono text-xs text-accent">
                  Open to apprenticeships — 2027
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-1">
                Yevhenii Sauliak
              </h1>
              <p className="text-text-muted text-sm mb-4">
                aka <span className="text-text-secondary">"Yen"</span> or{" "}
                <span className="text-text-secondary">"halva"</span> online
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                CS student in Switzerland who builds things to learn how they
                work. Currently into Go, React, and self-deployment.
              </p>
            </div>
            <div className="flex gap-2 mt-6">
              <a
                href="#contact"
                className="px-4 py-2 bg-text-primary text-surface text-sm font-medium rounded-lg hover:bg-white transition-colors cursor-pointer"
              >
                Contact
              </a>
              <a
                href="https://github.com/halva2251"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-text-primary text-surface text-sm font-medium rounded-lg hover:bg-white transition-colors cursor-pointer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yevhenii-sauliak/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-text-primary text-surface text-sm font-medium rounded-lg hover:bg-white transition-colors cursor-pointer"
              >
                LinkedIn
              </a>
            </div>
          </Card>

          {/* SKILLS */}
          <Card className="self-end">
            <CardLabel>Stack</CardLabel>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="text-xs text-text-secondary bg-surface-hover px-2.5 py-1 rounded-md"
                >
                  {s}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* NOW PLAYING */}
        <Card>
          <CardLabel>
            {tracks.length > 0 && tracks[0].nowPlaying
              ? "Now Playing"
              : "Recently Played"}
          </CardLabel>
          {tracksLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-9 h-9 rounded-lg bg-surface-hover flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-surface-hover rounded w-3/4" />
                    <div className="h-2.5 bg-surface-hover rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : tracks.length > 0 ? (
            <div className="flex flex-col gap-1">
              {tracks.slice(0, 4).map((track, i) => (
                <a
                  key={i}
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer -mx-2"
                >
                  {track.image && (
                    <img
                      src={track.image}
                      alt={`${track.name} by ${track.artist}`}
                      className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-text-primary truncate flex items-center gap-2">
                      {track.name}
                      {track.nowPlaying && (
                        <span className="flex items-center gap-1 text-accent text-[0.6rem] font-mono flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          LIVE
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-text-muted truncate">
                      {track.artist}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-sm">Couldn't load tracks</p>
          )}
          <div className="mt-3 pt-3 border-t border-surface-border/50">
            <span className="font-mono text-[0.6rem] text-text-muted">
              via Last.fm
            </span>
          </div>
        </Card>

        {/* STATUS */}
        <Card className="flex flex-col gap-4">
          <div>
            <CardLabel>Building</CardLabel>
            <p className="text-sm text-text-primary">StackUnderflow</p>
          </div>
          <div>
            <CardLabel>Learning</CardLabel>
            <p className="text-sm text-text-primary">Go & CI/CD</p>
          </div>
          <div>
            <CardLabel>Education</CardLabel>
            <p className="text-sm text-text-primary">IMS Baden — CS</p>
            <p className="text-xs text-text-muted mt-0.5">
              Berufsmatura + EFZ Informatiker
            </p>
            <p className="text-xs text-text-muted">2024 – 2028</p>
          </div>
        </Card>

        {/* ── ROW 2: ABOUT (2 cols) ── */}

        {/* ABOUT — full narrative */}
        <Card className="md:col-span-2">
          <CardLabel>About Me</CardLabel>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              I've been glued to computers for as long as I can remember. My mom
              loves telling the story of walking into my room when I was around
              eight and finding me fully locked in, building something on
              screen. She asked what I was doing. My response:{" "}
              <span className="text-text-primary italic">
                "You won't get it, I'm programming a clock."
              </span>{" "}
              I don't even remember this, but apparently that was the vibe from
              day one.
            </p>
            <p>
              Growing up in Ukraine, I spent my free time attending a computer
              academy — Python, design, robotics, game dev, business. The main
              thing I took away? That I liked coding way more than all the other
              stuff. When I moved to Switzerland about four years ago, that
              didn't change. If anything, it got sharper.
            </p>
            <p>
              I don't learn from tutorials. I learn by building things that
              actually work. Taught myself Go from scratch by building{" "}
              <span className="text-text-primary">SongSwap</span> — JWT auth,
              PostgreSQL, Docker, CI/CD, deployed to my Raspberry Pi, all in
              about a month. I'm also working through Cisco's cybersecurity
              curriculum on my own time, because understanding how things break
              helps you build them better.
            </p>
            <p>
              I never really saw myself doing anything else. It's not just what
              I study — it's what I'd be doing anyway.
            </p>
            <p>
              When I'm not in front of a screen, you'll find me riding my
              mountain bike, binging TV shows and movies, gaming, traveling with
              friends, or at a concert throwing my hands in the moshpit. Check
              out the personal zone below for a glimpse of that side of me.
            </p>
          </div>
        </Card>

        {/* ── ROW 3: FEATURED PROJECTS (full width) ── */}

        <div className="md:col-span-3">
          <CardLabel>Featured Projects</CardLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {featuredProjects.map((p, i) => (
              <Card
                key={i}
                href={p.github ?? undefined}
                className={`flex flex-col ${!p.github ? "cursor-default" : ""}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-text-primary">
                    {p.name}
                  </span>
                  <span className="font-mono text-[0.6rem] text-text-muted border border-surface-border px-1.5 py-0.5 rounded">
                    {p.type}
                  </span>
                  {!p.github && (
                    <span className="font-mono text-[0.6rem] text-accent bg-accent-dim px-1.5 py-0.5 rounded">
                      WIP
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {p.tech.map((t, j) => (
                    <span
                      key={j}
                      className="font-mono text-[0.65rem] text-text-muted bg-surface-hover px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── ROW 4: OTHER PROJECTS (full width) ── */}

        <Card className="md:col-span-3">
          <CardLabel>Other Projects</CardLabel>
          <div className="flex flex-col divide-y divide-surface-border/50">
            {otherProjects.map((p, i) => (
              <a
                key={i}
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 first:pt-0 last:pb-0 group cursor-pointer"
              >
                <div className="flex items-center gap-2 sm:w-40 flex-shrink-0">
                  <span className="text-sm font-medium text-text-primary group-hover:text-white transition-colors">
                    {p.name}
                  </span>
                  <span className="font-mono text-[0.6rem] text-text-muted">
                    {p.type}
                  </span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed flex-1">
                  {p.description}
                </p>
                <div className="flex gap-2 flex-shrink-0 mt-1 sm:mt-0">
                  {p.tech.map((t, j) => (
                    <span
                      key={j}
                      className="font-mono text-[0.6rem] text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════
          DIVIDER
          ═══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto my-8 sm:my-12 flex items-center gap-4">
        <div className="flex-1 h-px bg-surface-border" />
        <span className="text-text-muted text-xs font-mono tracking-wide">
          Beyond the code
        </span>
        <div className="flex-1 h-px bg-surface-border" />
      </div>

      {/* ═══════════════════════════════════════════════════
          PERSONAL ZONE
          ═══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-auto">
        {/* ── CONCERTS (video) ── */}
        <div className="relative rounded-2xl overflow-hidden border border-surface-border min-h-[220px] group">
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
            <h3 className="text-lg font-bold text-white">Concerts</h3>
            <p className="text-white/60 text-sm mt-0.5">
              Somewhere in the moshpit
            </p>
          </div>
        </div>

        {/* ── TRAVEL (gallery) ── */}
        <Card>
          <CardLabel>Traveling</CardLabel>
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
        </Card>

        {/* ── CONTACT ── */}
        <Card className="md:row-span-2" id="contact">
          <CardLabel>Get in Touch</CardLabel>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              className="w-full bg-surface-hover border border-surface-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-text-muted transition-colors"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full bg-surface-hover border border-surface-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-text-muted transition-colors"
            />
            <textarea
              name="message"
              rows={3}
              required
              placeholder="Message"
              className="w-full bg-surface-hover border border-surface-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-text-muted transition-colors resize-y"
            />
            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="w-full px-4 py-2 bg-text-primary text-surface text-sm font-medium rounded-lg hover:bg-white transition-colors disabled:opacity-50 cursor-pointer"
            >
              {formStatus === "sending" ? "Sending..." : "Send"}
            </button>
            {formStatus === "success" && (
              <p className="text-accent text-xs">Sent! I'll get back to you.</p>
            )}
            {formStatus === "error" && (
              <p className="text-red-400 text-xs">Something went wrong.</p>
            )}
          </form>
          <div className="border-t border-surface-border/50 pt-3 flex flex-col gap-1.5">
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
                  className="flex items-center justify-between py-1.5 group cursor-pointer"
                >
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    {s.label}
                  </span>
                  <span className="text-xs text-text-muted">{s.note}</span>
                </a>
              ),
            )}
          </div>
        </Card>

        {/* ── GAMING (hero, wide) ── */}
        <div className="md:col-span-2 relative rounded-2xl overflow-hidden border border-surface-border min-h-[200px] group">
          <img
            src="/personal/gaming.jpg"
            alt="Gaming setup"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-5">
            <h3 className="text-lg font-bold text-white">Gaming</h3>
            <p className="text-white/60 text-sm mt-0.5">
              Kojima, Rockstar, and way too much Overwatch
            </p>
          </div>
        </div>

        {/* ── GAMES LIST ── */}
        <Card>
          <CardLabel>Favorite Games</CardLabel>
          <div className="flex flex-col">
            {games.map((g, i) => (
              <div
                key={i}
                className="py-2 border-b border-surface-border/40 last:border-0 text-sm"
              >
                <span className="text-text-primary">{g.name}</span>
                {g.note && (
                  <span className="text-text-muted italic text-xs ml-2">
                    ({g.note})
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* ── SHOWS LIST ── */}
        <Card>
          <CardLabel>Favorite Shows</CardLabel>
          <div className="flex flex-col">
            {shows.map((s, i) => (
              <div
                key={i}
                className="py-2 border-b border-surface-border/40 last:border-0 text-sm"
              >
                <span className="text-text-primary">{s.name}</span>
                {s.note && (
                  <span className="text-text-muted italic text-xs ml-2">
                    ({s.note})
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* ── MUSIC ROTATION ── */}
        <Card>
          <CardLabel>Music Rotation</CardLabel>
          <div className="flex flex-col">
            {musicRotation.map((m, i) => (
              <div
                key={i}
                className="py-2 border-b border-surface-border/40 last:border-0 text-sm"
              >
                <span className="text-text-primary">{m.artist}</span>
                <span className="text-text-muted"> — {m.album}</span>
                {m.note && (
                  <span className="text-text-muted italic text-xs ml-2">
                    ({m.note})
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ═══ FOOTER ═══ */}
      <div className="max-w-6xl mx-auto mt-8 sm:mt-12 pt-4 border-t border-surface-border flex justify-between items-center pb-4">
        <span className="text-text-muted text-xs">&copy; 2026 Yen Sauliak</span>
        <span className="font-mono text-text-muted text-[0.6rem]">
          built with dedication
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
