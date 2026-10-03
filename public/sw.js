// Service Worker La Base 420. Sube la versión en cada despliegue.
const CACHE = 'la-base-420-v2';
const PRECACHE = ['/', '/manifest.json'];

self.addEventListener('install', (e) => {
  // Tolerante: si falta un archivo, el SW se instala igualmente
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.allSettled(PRECACHE.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const save = (req, res) => {
  if (res && res.ok && res.type === 'basic') {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(req, copy));
  }
  return res;
};

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  // Solo GET del mismo origen: Apps Script, fuentes y POST pasan directos
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((r) => save(req, r))
        .catch(() => caches.match(req).then((c) => c || caches.match('/')))
    );
    return;
  }
  if (['image', 'style', 'script', 'font'].includes(req.destination)) {
    e.respondWith(caches.match(req).then((c) => c || fetch(req).then((r) => save(req, r))));
  }
});
