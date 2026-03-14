import { useState } from "react";

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
  {
    label: "Discord",
    url: null,
    note: "nothalva",
    copyable: true,
  },
];

const Contact = () => {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch("https://formspree.io/f/mpqqpyvl", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  };

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText("nothalva");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass =
    "w-full bg-surface-raised border border-surface-border rounded-lg px-4 py-3 text-text-primary text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-accent transition-colors";

  return (
    <div>
      <h1 className="font-mono text-3xl font-bold mb-2">Let's Talk</h1>
      <p className="text-text-secondary text-sm mb-6 max-w-lg">
        Got a project idea, want to chat about tech, or just want to argue about
        music? I'm all ears. Seriously, don't overthink it.
      </p>

      {/* Availability badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="font-mono text-xs text-green-400">
          Open to apprenticeship opportunities — 2027
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-text-secondary text-sm mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="What should I call you?"
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-text-secondary text-sm mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your@email.com"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-text-secondary text-sm mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="What's on your mind?"
            className={`${inputClass} resize-y`}
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="self-start px-6 py-3 bg-accent text-surface font-mono text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending..." : "Send Message →"}
        </button>
        {status === "success" && (
          <p className="text-green-400 text-sm">
            Message sent! I'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm">
            Something went wrong. Please try again.
          </p>
        )}
      </form>

      {/* Socials */}
      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">
          Or find me here
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {socials.map((s, i) =>
            s.copyable ? (
              <button
                key={i}
                onClick={handleCopyDiscord}
                className="text-left p-4 rounded-xl bg-surface-raised/40 border border-surface-border hover:border-accent transition-all group"
              >
                <span className="block font-mono text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {s.label}
                </span>
                <span className="block text-text-muted text-xs mt-1">
                  {copied ? "copied!" : s.note}
                </span>
              </button>
            ) : (
              <a
                key={i}
                href={s.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-surface-raised/40 border border-surface-border hover:border-accent transition-all group"
              >
                <span className="block font-mono text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {s.label}
                </span>
                <span className="block text-text-muted text-xs mt-1">
                  {s.note}
                </span>
              </a>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
