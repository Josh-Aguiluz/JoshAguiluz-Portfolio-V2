import React, { lazy, Suspense } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LazyMotion, MotionConfig } from 'framer-motion';
import App from './App.tsx';
import './styles/index.css';

const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Framer features load async (drag is needed by the certificates carousel).
const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default);

const tree = (
  <React.StrictMode>
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="*"
              element={
                <Suspense fallback={<div className="min-h-dvh" />}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </LazyMotion>
  </React.StrictMode>
);

const container = document.getElementById('root')!;

// The production HTML contains the pre-rendered home route (scripts/prerender.mjs).
// Hydrate it on "/"; any other path (404, served via the SPA fallback) renders fresh.
if (container.hasChildNodes() && window.location.pathname === '/') {
  hydrateRoot(container, tree, {
    onRecoverableError(error) {
      // Lazy sections were pre-rendered as placeholders and are meant to switch to
      // client rendering (React error #419); anything else is a real problem.
      const msg = String((error as Error)?.message ?? error);
      if (/#419|could not finish this Suspense boundary/i.test(msg)) return;
      console.error(error);
    },
  });
} else {
  container.textContent = '';
  createRoot(container).render(tree);
}
