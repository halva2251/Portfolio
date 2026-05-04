import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPost } from "../data/posts";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-surface-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 h-12">
          <Link to="/" className="font-serif text-xl italic text-text-primary">
            yen
          </Link>
          <Link
            to="/blog"
            className="text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            ← Blog
          </Link>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-3">
            {post.title}
          </h1>
          <span className="font-mono text-xs text-text-muted">
            {formatDate(post.date)}
          </span>
        </header>

        <div className="prose-blog">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>

        <div className="mt-16 pt-6 border-t border-surface-border">
          <Link
            to="/blog"
            className="font-mono text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            ← All posts
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
