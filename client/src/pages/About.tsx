import { Link } from "react-router-dom";

const skills = [
  "C#",
  "Python",
  "Go",
  "React",
  "TypeScript",
  ".NET",
  "Docker",
  "Git",
  "AWS/Azure",
  "Linux",
  "PostgreSQL",
];

const About = () => {
  return (
    <div>
      <h1 className="font-mono text-3xl font-bold mb-6">About Me</h1>

      <section className="mb-8">
        <p className="text-text-secondary leading-relaxed mb-3">
          Hi, I'm{" "}
          <span className="text-text-primary font-medium">
            Yevhenii Sauliak
          </span>
          , also known as{" "}
          <span className="text-text-primary font-medium">Yen</span> or{" "}
          <span className="text-text-primary font-medium">halva</span> online.
          I'm studying Computer Science in Baden, Switzerland, focusing on
          Software Development.
        </p>
        <p className="text-text-secondary leading-relaxed">
          I enjoy coding and learning new things — whether that's new
          technologies, video games, TV shows, philosophy, or exploring new
          genres of music. Curiosity keeps me going.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-mono text-lg font-semibold mb-3">Skills & Tools</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <span
              key={i}
              className="text-sm text-text-secondary bg-surface-raised border border-surface-border px-3 py-1.5 rounded-lg"
            >
              {s}
              {s === "Linux" && (
                <span className="text-accent italic text-xs ml-1">
                  (yes im running it on my main PC, I'm that guy)
                </span>
              )}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-mono text-lg font-semibold mb-3">
          Currently Learning
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Attending an optional robotics class at school — it's actually really
          fun. Also working through Cisco Cybersecurity courses online. Always
          expanding the toolkit.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-mono text-lg font-semibold mb-3">
          Outside of Code
        </h2>
        <p className="text-text-secondary leading-relaxed">
          When I'm not in front of a screen, you'll find me riding my mountain
          bike, binging TV shows and movies, gaming, traveling with friends, or
          at a concert throwing my hands in the moshpit.
        </p>
      </section>

      <section className="pt-6 border-t border-surface-border">
        <p className="text-text-secondary">
          Always looking for new challenges and opportunities to grow.{" "}
          <Link to="/contact" className="text-accent hover:underline">
            Reach out
          </Link>{" "}
          if you want to collaborate or just chat!
        </p>
      </section>
    </div>
  );
};

export default About;
