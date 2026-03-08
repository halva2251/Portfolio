import { Link } from "react-router-dom";

const skills = [
  { name: "C#", context: "school + projects" },
  { name: "Go", context: "SongSwap" },
  { name: "React", context: "everything frontend" },
  { name: "TypeScript", context: "daily driver" },
  { name: "Python", context: "scripting + automation" },
  { name: ".NET", context: "school projects" },
  { name: "PostgreSQL", context: "SongSwap" },
  { name: "Docker", context: "SongSwap deployment" },
  { name: "Git", context: "always" },
  { name: "AWS / Azure", context: "EC2 + coursework" },
  { name: "Linux", context: "main PC, yes really" },
];

const About = () => {
  return (
    <div>
      <h1 className="font-mono text-3xl font-bold mb-6">About Me</h1>

      {/* The origin story */}
      <section className="mb-8">
        <p className="text-text-secondary leading-relaxed mb-3">
          I've been glued to computers for as long as I can remember. And I mean
          that literally. My mom loves telling the story of walking into my room
          when I was around eight and finding me fully locked in, building
          something on screen. She asked what I was doing. My response:{" "}
          <span className="text-text-primary italic">
            "You won't get it, I'm programming a clock."
          </span>{" "}
          I don't even remember this, but apparently that was the vibe from day
          one.
        </p>
        <p className="text-text-secondary leading-relaxed mb-3">
          Growing up in Ukraine, I spent my free time in middle school attending
          a computer academy that threw everything at us — Python, design,
          robotics, game dev, business. The main thing I took away? That I liked
          coding way more than all the other stuff. When I moved to Switzerland
          about four years ago, that didn't change. If anything, it got sharper.
        </p>
        <p className="text-text-secondary leading-relaxed">
          I never really saw myself doing anything else. It's not just what I
          study — it's what I'd be doing anyway.
        </p>
      </section>

      {/* Education & Experience */}
      <section className="mb-8">
        <h2 className="font-mono text-lg font-semibold mb-4">
          Where I'm At Now
        </h2>
        <div className="flex flex-col gap-4">
          {/* IMS */}
          <div className="p-4 rounded-lg bg-surface-raised/40 border border-surface-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-text-primary font-medium">
                IMS Baden — CS Student
              </span>
              <span className="font-mono text-xs text-text-muted">
                2024 – 2028
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Dual program: Berufsmatura at Kanti Baden + EFZ Informatiker
              (Software Development) at BBBaden. Currently in my second year,
              with an apprenticeship placement starting in year four.
            </p>
          </div>

          {/* Praktikum */}
          <div className="p-4 rounded-lg bg-surface-raised/40 border border-surface-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-text-primary font-medium">
                Software Engineer at ITConsulting24 — Praktikum
              </span>
              <span className="font-mono text-xs text-text-muted">
                3 months in 2023
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Got hands-on professional experience early, worked as a software
              engineer intern shortly after arriving in Switzerland. Developed
              an employee management and communication website using Python and
              Django.
            </p>
          </div>

          {/* Cisco */}
          <div className="p-4 rounded-lg bg-surface-raised/40 border border-surface-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-text-primary font-medium">
                Cisco Cybersecurity — Coursework
              </span>
              <span className="font-mono text-xs text-text-muted">ongoing</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Working through Cisco's cybersecurity curriculum on my own time.
              Security interests me. Understanding how things break helps you
              build them better.
            </p>
          </div>
        </div>
      </section>

      {/* How I learn */}
      <section className="mb-8">
        <h2 className="font-mono text-lg font-semibold mb-3">How I Learn</h2>
        <p className="text-text-secondary leading-relaxed mb-3">
          I don't learn from tutorials, I learn by building things that actually
          work. The best example: I taught myself{" "}
          <span className="text-text-primary">Go</span> from scratch by building{" "}
          <Link to="/projects" className="text-accent hover:underline">
            SongSwap
          </Link>
          , a full-stack music discovery app. JWT auth, PostgreSQL, rate
          limiting, Docker, 26 passing tests, CI/CD with GitHub Actions, and
          deployment to AWS EC2, all within about a month.
        </p>
        <p className="text-text-secondary leading-relaxed">
          I'm also attending an optional robotics class at school (it's
          genuinely fun), and next up is a module on public cloud infrastructure
          and CI/CD pipelines. Always expanding the toolkit.
        </p>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="font-mono text-lg font-semibold mb-3">Skills & Tools</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <span
              key={i}
              className="text-sm text-text-secondary bg-surface-raised border border-surface-border px-3 py-1.5 rounded-lg"
            >
              {s.name}
              <span className="text-text-muted text-xs ml-1.5">
                · {s.context}
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* Outside of code */}
      <section className="mb-8">
        <h2 className="font-mono text-lg font-semibold mb-3">
          Outside of Code
        </h2>
        <p className="text-text-secondary leading-relaxed">
          When I'm not in front of a screen, you'll find me riding my mountain
          bike, binging TV shows and movies, gaming, traveling with friends, or
          at a concert throwing my hands in the moshpit. Check out the{" "}
          <Link to="/personal" className="text-accent hover:underline">
            personal page
          </Link>{" "}
          if you want the full picture.
        </p>
      </section>

      {/* CTA */}
      <section className="pt-6 border-t border-surface-border">
        <p className="text-text-secondary">
          Currently looking ahead to apprenticeship opportunities starting 2027.{" "}
          <Link to="/contact" className="text-accent hover:underline">
            Reach out
          </Link>{" "}
          if you want to collaborate, chat, or just talk music.
        </p>
      </section>
    </div>
  );
};

export default About;
