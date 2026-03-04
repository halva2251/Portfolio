import { useState } from "react";

const Contact = () => {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

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

  const inputClass =
    "w-full bg-surface-raised border border-surface-border rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors";

  return (
    <div>
      <h1 className="font-mono text-3xl font-bold mb-2">Contact</h1>
      <p className="text-text-muted text-sm mb-8">
        Want to collaborate, have a question, or just say hi?
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              className={inputClass}
            />
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
              className={`${inputClass} resize-y`}
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="self-start px-6 py-3 bg-accent text-surface font-mono text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
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

        <div>
          <h2 className="font-mono text-lg font-semibold mb-4">
            Or find me elsewhere
          </h2>
          <div className="flex flex-col gap-3">
            {[
              { label: "GitHub", url: "https://github.com/halva2251" },
              {
                label: "LinkedIn",
                url: "https://www.linkedin.com/in/yevhenii-sauliak/",
              },
              {
                label: "Instagram",
                url: "https://www.instagram.com/sauliak.yevhenii/",
              },
            ].map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
