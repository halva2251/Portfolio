import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const useTyping = (text: string, speed = 50, startDelay = 0) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
};

const Cursor = () => (
  <span className="text-accent animate-[blink_1s_infinite]">▊</span>
);

const Home = () => {
  const line1 = useTyping("Yevhenii Sauliak", 50, 400);
  const line2 = useTyping('aka "Yen"', 60, 1400);
  const line3 = useTyping(
    "CS student & developer. Turning complex problems into clean, practical software.",
    20,
    2200,
  );
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    if (line3.done) {
      const t = setTimeout(() => setShowCta(true), 400);
      return () => clearTimeout(t);
    }
  }, [line3.done]);

  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="max-w-2xl w-full">
        {/* Terminal window */}
        <div className="bg-surface-raised/60 border border-surface-border rounded-xl overflow-hidden backdrop-blur-sm">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-border">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 font-mono text-xs text-text-muted">
              ~/portfolio
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-sm leading-relaxed">
            <div>
              <span className="text-accent">→</span>{" "}
              <span className="text-green-400">whoami</span>
            </div>
            <div className="text-3xl font-bold text-text-primary my-1">
              {line1.displayed}
              {!line1.done && <Cursor />}
            </div>

            {line1.done && (
              <div className="text-text-secondary mb-2">
                {line2.displayed}
                {!line2.done && <Cursor />}
              </div>
            )}

            {line2.done && (
              <>
                <div className="h-3" />
                <div>
                  <span className="text-accent">→</span>{" "}
                  <span className="text-green-400">cat about.txt</span>
                </div>
                <div className="text-text-secondary max-w-lg">
                  {line3.displayed}
                  {!line3.done && <Cursor />}
                </div>
              </>
            )}

            {line3.done && (
              <div className="mt-3 text-text-muted">
                <span className="text-accent">→</span> Curious by default,
                builder by choice. Always iterating.
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`flex gap-4 mt-8 transition-all duration-700 ${showCta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Link
            to="/projects"
            className="px-6 py-3 bg-accent text-surface font-mono text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors"
          >
            View Projects →
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border border-surface-border text-text-secondary font-mono text-sm rounded-lg hover:border-accent hover:text-accent transition-colors"
          >
            Get in Touch
          </Link>
        </div>

        {/* Status */}
        <div
          className={`flex gap-6 mt-8 font-mono text-xs text-text-muted transition-all duration-700 delay-200 ${showCta ? "opacity-100" : "opacity-0"}`}
        >
          <span>📍 Baden, Switzerland</span>
          <span>🎓 CS Student</span>
          <span>🔧 C# / React / Go</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
