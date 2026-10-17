/**
 * Smoke test: bundle the real app with esbuild and render it in jsdom.
 * Simulates the intro → main flow and every interactive section.
 */
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  pretendToBeVisual: true,
  url: 'http://localhost/',
});

const { window } = dom;

/* ---- browser API polyfills jsdom lacks ---- */
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});

class FakeObserver {
  constructor(cb) {
    this.cb = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
window.IntersectionObserver = FakeObserver;

class FakeAudio {
  constructor() {
    this.paused = true;
    this.currentTime = 0;
    this.duration = 200;
    this.volume = 1;
    this.muted = false;
    this._listeners = {};
  }
  addEventListener(t, fn) {
    (this._listeners[t] ||= []).push(fn);
  }
  removeEventListener(t, fn) {
    this._listeners[t] = (this._listeners[t] || []).filter((f) => f !== fn);
  }
  async play() {
    this.paused = false;
  }
  pause() {
    this.paused = true;
  }
  set src(v) {
    this._src = v;
  }
  get src() {
    return this._src;
  }
}
window.Audio = FakeAudio;
window.scrollTo = () => {};
window.HTMLElement.prototype.scrollIntoView = () => {};

/* ---- expose as globals for React ---- */
global.window = window;
global.document = window.document;
global.navigator = window.navigator;
global.localStorage = window.localStorage;
global.getComputedStyle = window.getComputedStyle.bind(window);
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.CSS = window.CSS || { supports: () => false };
/* note: do NOT assign window.performance — jsdom's wrapper recurses on .now().
   Node's own global.performance is already correct. */

for (const name of [
  'HTMLElement', 'Element', 'Node', 'SVGElement', 'SVGGraphicsElement',
  'HTMLInputElement', 'HTMLTextAreaElement', 'HTMLImageElement', 'HTMLButtonElement',
  'HTMLSelectElement', 'HTMLCanvasElement', 'HTMLAnchorElement', 'HTMLMediaElement',
  'HTMLIFrameElement', 'HTMLDivElement', 'HTMLUListElement',
  'Event', 'CustomEvent', 'MouseEvent', 'KeyboardEvent', 'FocusEvent', 'UIEvent',
  'MutationObserver', 'DocumentFragment', 'Text', 'Comment', 'EventTarget',
  'CSS', 'DOMParser', 'XMLSerializer',
]) {
  if (window[name]) global[name] = window[name];
}
global.Audio = window.Audio;
global.Image = window.Image;
global.IntersectionObserver = window.IntersectionObserver;
global.ResizeObserver = window.ResizeObserver || FakeObserver;
global.AudioContext = window.AudioContext || class {};
/* framer-motion passes AbortSignals into addEventListener — must be jsdom's own */
global.AbortController = window.AbortController;
global.AbortSignal = window.AbortSignal;

/* silence expected act()/noise, keep errors */
const errors = [];
const origError = console.error;
console.error = (...args) => {
  const msg = String(args[0] || '');
  if (msg.includes('Not implemented: window.scrollTo')) return;
  errors.push(msg.slice(0, 200));
  origError('[console.error]', ...args.map((a) => String(a).slice(0, 160)));
};

process.on('uncaughtException', (e) => {
  errors.push('UNCAUGHT: ' + e.message);
  console.log('❌ uncaught:', e.message);
  console.log(String(e.stack).split('\n').slice(0, 14).join('\n'));
});

/* ---- load the bundled app ---- */
require('./smoke-app.cjs');

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  await wait(300);
  const root = window.document.getElementById('root');
  const html = () => root.innerHTML;

  const checks = [];
  const expect = (label, cond) => {
    checks.push({ label, ok: !!cond });
    console.log(cond ? '✅' : '❌', label);
  };

  /* ---------- INTRO ---------- */
  expect('opening screen renders', html().includes('Open Your Little Universe'));
  expect('headline present', html().includes('favorite parts of being alive'));
  expect('birthday line present', html().includes('Happy Birthday, Shimu'));
  expect('skip intro present', html().includes('Skip the intro'));
  expect('envelope / wax seal present', html().includes('Open the sealed letter'));

  /* click "Open Your Little Universe" */
  const openBtn = [...root.querySelectorAll('button')].find((b) =>
    b.textContent.includes('Open Your Little Universe')
  );
  expect('open button found', !!openBtn);
  openBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(250);
  expect('envelope opened note appears', html().includes('I just want you to know'));

  /* wait for the CTA swap animation (AnimatePresence mode="wait"; jsdom is slow) */
  await wait(2600);

  /* click "Come inside" */
  const comeBtn = [...root.querySelectorAll('button')].find((b) => b.textContent.includes('Come inside'));
  expect('come-inside button found', !!comeBtn);
  comeBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(3600);

  /* ---------- MAIN ---------- */
  expect('letter section renders', html().includes('To my Shimu,'));
  expect('letter signature', html().includes('Mostak'));
  expect('memory lane title', html().includes('Little Moments, A Whole Lot of Love'));
  expect('gallery title', html().includes('The Photographs We Keep'));
  expect('favorite view section', html().includes('My Favorite View Is You'));
  expect('promises title', html().includes('If I Could Promise You a Thousand Things'));
  expect('cake title', html().includes('Make a wish, birthday girl'));
  expect('notes title', html().includes('Little Things I Want You to Remember'));
  expect('time capsule title', html().includes('Letters From Today to Our Tomorrow'));
  expect('music section', html().includes('Our Song'));
  expect('final headline', html().includes('chapters still unwritten'));
  expect('replay button', html().includes('Replay Our Little Story'));
  expect('nav visible', html().includes('For Shimu'));
  expect('filled sample memory renders', html().includes('The day everything quietly started'));
  expect('sample dates render', html().includes('August 20, 2022'));

  /* jsdom never loads images — simulate a failed image load to test graceful fallback */
  root.querySelectorAll('img').forEach((img) => img.dispatchEvent(new window.Event('error')));
  await wait(200);
  expect('film strip filled', html().includes('rainy-day phone calls'));
  expect('scrapbook filled', html().includes('they just need to be said'));
  expect('song block renders (player or missing-song state)', html().includes('The song is not here yet') || html().includes('Perfect — Ed Sheeran'));

  /* jsdom never loads images — simulate a failed image load to test graceful fallback */
  root.querySelectorAll('img').forEach((img) => img.dispatchEvent(new window.Event('error')));
  await wait(200);
  expect('photo fallback hint on error', html().includes('Add this memory') || html().includes('Add a photo'));

  /* ---------- interactions ---------- */
  /* memory filter chip */
  const chip = [...root.querySelectorAll('button')].find((b) => b.textContent.includes('Funniest memories'));
  expect('filter chip found', !!chip);
  chip.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(250);
  expect('filter narrows the timeline', html().includes('The laugh that broke the whole evening'));
  expect('filter hides other categories', !html().includes('The day everything quietly started'));

  /* promise card */
  const promiseCard = [...root.querySelectorAll('button')].find((b) => b.textContent.includes('To listen'));
  expect('promise card found', !!promiseCard);
  promiseCard.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(900);
  expect('promise opens', html().includes('I promise to listen'));

  /* final promise */
  const finalPromiseBtn = [...root.querySelectorAll('button')].find((b) =>
    b.textContent.includes('One Last Promise')
  );
  expect('final promise envelope found', !!finalPromiseBtn);
  finalPromiseBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(120);
  expect('final promise text reveals', html().includes('You don’t have to be happy every moment'));

  /* cake candles */
  const cakeSvg = root.querySelector('svg[aria-label*="birthday cake"]');
  expect('cake svg present', !!cakeSvg);
  const candleHit = cakeSvg.querySelector('rect[role="button"]');
  expect('candle hit target present', !!candleHit);
  candleHit.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(80);
  const blowAllBtn = [...root.querySelectorAll('button')].find((b) =>
    b.textContent.includes('Blow out all the candles')
  );
  expect('blow-all button found', !!blowAllBtn);
  blowAllBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(3200);
  expect('wish message reveals', html().includes('reasons to smile'));
  expect('relight button appears', html().includes('Light the candles again'));

  /* hidden note */
  const noteBtn = [...root.querySelectorAll('button')].find((b) => b.textContent.includes('a note for you'));
  expect('hidden note found', !!noteBtn);
  noteBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(900);
  expect('note reveals text', html().includes('perfect to be precious'));

  /* time capsule seal */
  const textarea = root.querySelector('textarea');
  expect('capsule textarea present', !!textarea);
  textarea.value = 'Dear future us, we were here.';
  textarea.dispatchEvent(new window.Event('input', { bubbles: true }));
  const sealBtn = [...root.querySelectorAll('button')].find((b) => b.textContent.includes('Seal This Memory'));
  expect('seal button found', !!sealBtn);
  sealBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(2200);
  expect('sealed state confirms', html().includes('Sealed — and safe on this device') || html().includes('SEALED'));

  /* music player */
  const playBtn = [...root.querySelectorAll('button')].find((b) => b.getAttribute('aria-label') === 'Play the song');
  expect('play button present (song error state ok)', !!playBtn || html().includes('The song is not here yet'));

  /* lightbox: open hero photo */
  const heroBtn = [...root.querySelectorAll('button')].find((b) => b.getAttribute('aria-label') === 'Open hero photograph');
  expect('hero photo button found', !!heroBtn);
  heroBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(700);
  expect('lightbox opens', html().includes('Photo viewer'));
  /* close with Escape */
  window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await wait(700);
  expect('lightbox closes', !html().includes('Photo viewer'));

  /* replay */
  const replayBtn = [...root.querySelectorAll('button')].find((b) => b.textContent.includes('Replay Our Little Story'));
  expect('replay button found', !!replayBtn);
  replayBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(1200);
  expect('replay returns to opening', html().includes('Open Your Little Universe'));

  /* ---------- summary ---------- */
  const failed = checks.filter((c) => !c.ok);
  console.log('\n────────────────────────────────');
  console.log(`checks passed: ${checks.length - failed.length}/${checks.length}`);
  if (errors.length) {
    console.log('console.error count:', errors.length);
    errors.slice(0, 6).forEach((e) => console.log('  •', e));
  }
  if (failed.length) {
    console.log('FAILED:', failed.map((f) => f.label).join(' | '));
    process.exit(1);
  }
  console.log('SMOKE TEST PASSED 🎉');
  process.exit(0);
})();
