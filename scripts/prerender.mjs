/**
 * Injects the server-rendered home route into build/index.html.
 * Runs after `vite build` and `vite build --ssr` (see the "build" npm script).
 */
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ssrDir = path.resolve('build-ssr');
const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.mjs')).href);

const file = path.resolve('build/index.html');
const html = await readFile(file, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('prerender: #root placeholder not found in build/index.html');

const app = render('/');

// Runs as soon as the pre-rendered markup is parsed, before the first paint, so a reload /
// duplicated tab / Chrome tab discard reopens at the saved spot instead of flashing the top
// of the page. Mirrors getRestoreTarget() in src/App.tsx.
const restoreScroll = `<script>(function(){try{
var nav=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];
var y=nav&&nav.type!=='navigate'?sessionStorage.getItem('scroll-y'):null;
if(y!==null&&!isNaN(+y)){window.scrollTo({top:+y,behavior:'instant'});return;}
var id=location.hash.slice(1),el=id&&document.getElementById(id);
if(el)el.scrollIntoView({block:'start',behavior:'instant'});
}catch(e){}})();</script>`;

await writeFile(file, html.replace(marker, `<div id="root">${app}</div>${restoreScroll}`));
await rm(ssrDir, { recursive: true, force: true });

console.log(`prerender: injected ${(app.length / 1024).toFixed(1)} kB of HTML into build/index.html`);
