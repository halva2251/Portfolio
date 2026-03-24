const projects = [
  {
    name: "SongSwap",
    description:
      "Full-stack music discovery app built from scratch to learn Go — submit a song, get one back from a stranger. Features themed chains, mood context, JWT auth, and PostgreSQL.",
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
      <h1 className="font-serif text-5xl italic mb-2">Projects</h1>
      <p className="text-text-muted text-sm mb-12">
        Things I've built — from side projects to hackathons.
      </p>

      <div className="flex flex-col">
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group block py-6 border-b border-surface-border first:border-t transition-colors"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="font-serif text-2xl text-text-primary italic group-hover:text-white transition-colors">
                {p.name}
              </h2>
              <span className="text-xs text-text-muted">{p.type}</span>
              {p.featured && (
                <span className="text-xs text-text-secondary">Featured</span>
              )}
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-3 max-w-xl">
              {p.description}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {p.tech.map((t, j) => (
                <span
                  key={j}
                  className="font-mono text-xs text-text-muted"
                >
                  {t}
                </span>
              ))}
              <span className="text-text-muted text-sm ml-auto group-hover:text-text-secondary transition-colors">
                GitHub &rarr;
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
