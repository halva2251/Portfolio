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
    "w-full bg-transparent border-b border-surface-border px-0 py-3 text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-text-muted transition-colors";

  return (
    <div>
      <h1 className="font-serif text-5xl italic mb-2">Let's Talk</h1>
      <p className="text-text-secondary text-sm mb-4 max-w-lg">
        Got a project idea, want to chat about tech, or just want to argue about
        music? I'm all ears. Seriously, don't overthink it.
      </p>

      {/* Availability */}
      <p className="text-sm text-text-muted mb-12">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-2 relative top-[-1px]" />
        Open to apprenticeship opportunities — 2027
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-xs text-text-muted uppercase tracking-wide mb-2"
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
              className="block text-xs text-text-muted uppercase tracking-wide mb-2"
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
            className="block text-xs text-text-muted uppercase tracking-wide mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="What's on your mind?"
            className={`${inputClass} resize-y`}
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="self-start px-5 py-2.5 bg-text-primary text-surface text-sm font-medium hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
        {status === "success" && (
          <p className="text-green-400 text-sm">
            Message sent. I'll get back to you soon.
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
        <h2 className="text-xs text-text-muted uppercase tracking-wide mb-6">
          Or find me here
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-surface-border">
          {socials.map((s, i) =>
            s.copyable ? (
              <button
                key={i}
                onClick={handleCopyDiscord}
                className="text-left p-5 bg-surface hover:bg-surface-raised transition-colors group"
              >
                <span className="block text-sm text-text-primary group-hover:text-white transition-colors">
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
                className="p-5 bg-surface hover:bg-surface-raised transition-colors group"
              >
                <span className="block text-sm text-text-primary group-hover:text-white transition-colors">
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
