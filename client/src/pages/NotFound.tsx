import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6">
    <h1 className="text-7xl font-bold text-surface-border mb-4">404</h1>
    <p className="text-text-muted mb-8">This page doesn't exist.</p>
    <Link
      to="/"
      className="px-5 py-2.5 bg-text-primary text-surface text-sm font-medium rounded-lg hover:bg-white transition-colors"
    >
      Back to Home
    </Link>
  </div>
);

export default NotFound;
