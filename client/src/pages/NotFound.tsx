import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="text-center py-20">
    <h1 className="font-mono text-8xl font-bold text-surface-border mb-4">
      404
    </h1>
    <p className="text-text-muted mb-8">Oops, this page doesn't exist.</p>
    <Link
      to="/"
      className="px-6 py-3 bg-accent text-surface font-mono text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors"
    >
      Back to Home
    </Link>
  </div>
);

export default NotFound;
