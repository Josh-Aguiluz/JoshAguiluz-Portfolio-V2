import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';
import path from 'path';

/**
 * Absolute URLs (canonical, og:url, og:image, sitemap) need the deployed origin.
 * It is never hard-coded: set SITE_URL yourself, or let Netlify provide URL at build time.
 * Without one, the absolute-URL tags and the sitemap are simply left out.
 */
const SITE_URL = (process.env.SITE_URL || process.env.URL || '').replace(/\/$/, '');

function siteMeta(): Plugin {
  return {
    name: 'site-meta',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const tags: { tag: string; attrs: Record<string, string>; injectTo: 'head' }[] = [];

        // Preload the self-hosted Latin Geist font used by the hero heading.
        const font = ctx.bundle
          ? Object.keys(ctx.bundle).find((f) => /geist-latin-wght-normal.*\.woff2$/.test(f))
          : undefined;
        if (font) {
          tags.push({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${font}`, crossorigin: '' },
            injectTo: 'head',
          });
        }

        if (SITE_URL) {
          const meta = (attrs: Record<string, string>) => tags.push({ tag: 'meta', attrs, injectTo: 'head' });
          tags.push({ tag: 'link', attrs: { rel: 'canonical', href: `${SITE_URL}/` }, injectTo: 'head' });
          meta({ property: 'og:url', content: `${SITE_URL}/` });
          meta({ property: 'og:image', content: `${SITE_URL}/og-image.png` });
          meta({ property: 'og:image:width', content: '1200' });
          meta({ property: 'og:image:height', content: '630' });
          meta({ property: 'og:image:alt', content: 'Josh Andrei Aguiluz, Backend Engineer' });
          meta({ name: 'twitter:image', content: `${SITE_URL}/og-image.png` });
          html = html.replace('"@type": "Person",', `"@type": "Person",\n        "url": "${SITE_URL}/",`);
        }
        return { html, tags };
      },
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${SITE_URL ? `\nSitemap: ${SITE_URL}/sitemap.xml\n` : ''}`,
      });
      if (!SITE_URL) return;
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc></url>\n</urlset>\n`,
      });
    },
  };
}

/**
 * Dev only: serves POST /api/chat from netlify/functions/chat.mjs so the AI chat works under
 * `npm run dev` without the Netlify CLI. The key is read from GROQ_API_KEY in your (git-ignored)
 * .env file. In production Netlify runs the same function itself.
 */
function devChatApi(): Plugin {
  return {
    name: 'dev-chat-api',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '');
      for (const key of ['GROQ_API_KEY', 'GROQ_MODEL']) if (env[key]) process.env[key] = env[key];

      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const body = Buffer.concat(chunks);

          const headers = new Headers();
          for (const [k, v] of Object.entries(req.headers)) if (v !== undefined) headers.set(k, Array.isArray(v) ? v.join(',') : v);
          const request = new Request(`http://${req.headers.host}/api/chat`, {
            method: req.method,
            headers,
            body: req.method === 'GET' || req.method === 'HEAD' ? undefined : body,
          });

          // Reload the function on every request so edits apply without restarting the dev server.
          const mod = await server.ssrLoadModule('/netlify/functions/chat.mjs');
          const response: Response = await mod.default(request, { ip: req.socket.remoteAddress });

          res.statusCode = response.status;
          response.headers.forEach((value, name) => res.setHeader(name, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (error) {
          server.config.logger.error(`[dev-chat-api] ${(error as Error).message}`);
          res.statusCode = 500;
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify({ error: 'dev_error' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools(), siteMeta(), devChatApi()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    outDir: 'build',
    rollupOptions: {
      output: {
        // React + router are stable across deploys, so they get their own long-cached chunk.
        // Framer Motion is left to Rollup so its async `domMax` features stay out of the entry.
        manualChunks(id) {
          if (/node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id)) {
            return 'vendor-react';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
