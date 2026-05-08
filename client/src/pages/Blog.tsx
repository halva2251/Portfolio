import { Link } from "react-router-dom";
import { posts } from "../data/posts";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const Blog = () => (
  <div className="min-h-screen">
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 h-12">
        <Link to="/" className="font-display font-extrabold text-base tracking-tight text-text-primary">
          halva
        </Link>
        <Link
          to="/"
          className="text-sm text-text-muted hover:text-text-secondary transition-colors"
        >
          ← Home
        </Link>
      </div>
    </header>

    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Writing</h1>
        <p className="text-text-muted text-sm">
          Mostly dev stuff. Occasionally not.
        </p>
      </div>

      <div className="flex flex-col divide-y divide-surface-border">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group py-6 first:pt-0"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="text-lg font-semibold text-text-primary group-hover:text-white transition-colors leading-snug">
                {post.title}
              </h2>
              <span className="font-mono text-xs text-text-muted flex-shrink-0 mt-1">
                {formatDate(post.date)}
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              {post.excerpt}
            </p>
            <span className="inline-block mt-3 font-mono text-xs text-text-muted group-hover:text-accent transition-colors">
              Read →
            </span>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default Blog;
