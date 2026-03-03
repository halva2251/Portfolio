const projects = [
  {
    name: "SongSwap",
    description:
      "Full-stack music discovery app — submit a song, get one back from a stranger. Features themed chains, mood context, and JWT auth.",
    tech: ["Go", "React", "TypeScript", "PostgreSQL", "JWT"],
    github: "https://github.com/halva2251/songswap",
    type: "Personal",
    featured: true,
  },
  {
    name: "BBB-Leitsystem",
    description:
      "Real-time room guidance system for BBBaden University displaying availability across campus.",
    tech: ["React", "C#", "SQLite"],
    github: "https://github.com/halva2251/BBB-Leitsystem",
    type: "Hackathon",
  },
  {
    name: "Budget Buddy",
    description:
      "Budget tracking web app helping users manage spending and savings goals.",
    tech: ["C#", ".NET MVC"],
    github: "https://github.com/halva2251/BudgetAssistent_.NET_MVC",
    type: "School",
  },
  {
    name: "News Digest",
    description:
      "Automated news scraper that filters articles by keywords and delivers curated digests via email.",
    tech: ["Python", "PowerShell"],
    github: "https://github.com/halva2251/news-digest",
    type: "School",
  },
];

const Projects = () => {
  return (
    <div>
      <h1 className="font-mono text-3xl font-bold mb-2">Projects</h1>
      <p className="text-text-muted font-mono text-sm mb-8">
        Things I've built — from side projects to hackathons.
      </p>

      <div className="flex flex-col gap-4">
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`block rounded-xl p-5 border transition-all duration-300 hover:-translate-y-0.5 hover:border-accent group ${
              p.featured
                ? "bg-accent/[0.03] border-accent/20"
                : "bg-surface-raised/40 border-surface-border"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-mono text-lg font-semibold text-text-primary">
                {p.name}
              </h2>
              <span className="font-mono text-[0.65rem] text-text-muted border border-surface-border px-2 py-0.5 rounded">
                {p.type}
              </span>
              {p.featured && (
                <span className="font-mono text-[0.65rem] text-accent bg-accent/10 px-2 py-0.5 rounded uppercase tracking-wide">
                  ★ Featured
                </span>
              )}
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {p.tech.map((t, j) => (
                <span
                  key={j}
                  className="font-mono text-[0.7rem] text-accent bg-accent/[0.08] px-2 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="font-mono text-sm text-accent group-hover:underline">
              View on GitHub →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
