import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found | Josh Andrei Aguiluz | Backend Engineer';
    // Keep unknown URLs out of search results.
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  return (
    <main id="main" className="glow-top flex min-h-dvh items-center">
      <div className="container-page py-24 text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 text-h2 font-semibold">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-md text-lede text-fg-muted">
          Looks like this page doesn't exist. Let's get you back on track!
        </p>
        <code className="mt-8 inline-block rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm text-fg-muted">
          Error: Route not found in router configuration
        </code>
        <div className="mt-10">
          <Link to="/" className="btn btn-primary">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
