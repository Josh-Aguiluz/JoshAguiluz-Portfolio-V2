import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { LazyMotion, MotionConfig, domMax } from 'framer-motion';
import App from './App';

/**
 * Build-time pre-render of the home route (scripts/prerender.mjs). The hero and shell
 * ship as real HTML, so the LCP heading paints before any JavaScript runs; the client
 * then hydrates it. Lazy sections render their reserved-height placeholders here.
 */
export function render(url: string) {
  return renderToString(
    <React.StrictMode>
      <LazyMotion features={domMax} strict>
        <MotionConfig reducedMotion="user">
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </MotionConfig>
      </LazyMotion>
    </React.StrictMode>,
  );
}
