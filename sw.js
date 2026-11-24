/* WAQTY — Service Worker: aplikasi tetap terbuka saat offline & dimuat instan */
const VERSION = '1.1.0';
const CACHE = 'waqty-' + VERSION;
const CORE = [
  './', 'index.html', 'manifest.webmanifest', 'assets/img/logo.svg',
  'assets/css/style.css?v=' + VERSION, 'assets/js/config.js?v=' + VERSION, 'assets/js/defaults.js?v=' + VERSION,
  'assets/js/data.js?v=' + VERSION, 'assets/js/app.js?v=' + VERSION
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.indexOf('waqty-') === 0 && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // API Apps Script & pencarian lokasi: selalu lewat jaringan
  if (/script\.google(usercontent)?\.com$/.test(url.hostname) || url.hostname.indexOf('googleusercontent.com') > -1 || url.hostname.indexOf('nominatim') > -1) return;
  // Halaman: jaringan dulu (agar update cepat tampil), cadangan dari cache saat offline
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put('index.html', cp)); return r; })
      .catch(() => caches.match('index.html')));
    return;
  }
  // Aset & Google Fonts: tampilkan dari cache, perbarui di belakang layar
  if (url.origin === self.location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
  }
});
