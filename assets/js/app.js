/* ============================================================
 *  WAQTY — APLIKASI (klien)
 *  Aplikasi ini dibuat oleh Bahruddin | © 2026 BeeCOMP
 * ============================================================ */
(function () {
'use strict';

const D = window.WAQTY_DATA;
const HAS_GAS = !!(window.google && google.script && google.script.run);
const CFG = window.WAQTY_CONFIG || {};
/* Mode: 'gas' (dibuka dari Apps Script) | 'api' (GitHub Pages + backend Apps Script) | 'local' (tanpa backend) */
const API = !HAS_GAS && CFG.apiUrl ? String(CFG.apiUrl).trim() : '';
const MODE = HAS_GAS ? 'gas' : API ? 'api' : 'local';
let ST;

/* ---------------- util ---------------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const pad = n => String(n).padStart(2, '0');
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clone = o => JSON.parse(JSON.stringify(o));
const D2R = Math.PI / 180, R2D = 180 / Math.PI;
const toAr = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const MEM = {};
const LS = {
  get(k, d) { try { const v = localStorage.getItem('waqty.' + k); if (v != null) return JSON.parse(v); } catch (e) {} return (k in MEM) ? MEM[k] : d; },
  set(k, v) { MEM[k] = v; try { if (v == null) localStorage.removeItem('waqty.' + k); else localStorage.setItem('waqty.' + k, JSON.stringify(v)); } catch (e) {} }
};
/* Pengaturan awal: dari server (Apps Script) atau dari cache perangkat (GitHub Pages) agar tampil instan */
ST = (window.WAQTY_BOOT && window.WAQTY_BOOT.appName) ? window.WAQTY_BOOT
   : deepMerge(window.WAQTY_DEFAULTS || {}, (MODE === 'api' ? LS.get('settingsCache', null) : LS.get('mockSettings', null)) || {});

/* ---------------- ikon ---------------- */
const ICONS = {
  bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  expand: '<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>',
  compress: '<path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"/>',
  refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  moonStar: '<path d="M18 14.5A7.5 7.5 0 1 1 9.5 4a6 6 0 0 0 8.5 10.5z"/><path d="M18 3l.7 1.6L20.3 5l-1.6.7L18 7.3l-.7-1.6L15.7 5l1.6-.4z"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/>',
  chevDown: '<path d="m6 9 6 6 6-6"/>', chevLeft: '<path d="m15 18-6-6 6-6"/>', chevRight: '<path d="m9 18 6-6-6-6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  locate: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M16 2.5v4M8 2.5v4M3 10h18"/>',
  table: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M3 15h18M9 9v12"/>',
  star8: '<path d="M12 2l2.6 3.7 4.5-.8-.8 4.5L22 12l-3.7 2.6.8 4.5-4.5-.8L12 22l-2.6-3.7-4.5.8.8-4.5L2 12l3.7-2.6-.8-4.5 4.5.8z"/><circle cx="12" cy="12" r="3.2"/>',
  compass: '<circle cx="12" cy="12" r="9.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  info: '<circle cx="12" cy="12" r="9.5"/><path d="M12 16v-4.5M12 8h.01"/>',
  print: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".6"/>',
  quote: '<path d="M3 21c3 0 7-1 7-8V5H3v8h4M14 21c3 0 7-1 7-8V5h-7v8h4"/>',
  shuffle: '<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2.5"/><path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3h-8A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3.5 2"/>',
  alarm: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M5 3 2 6M22 6l-3-3"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
  check: '<path d="M20 6 9 17l-5-5"/>', plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
  kaaba: '<path d="M4 7.5 12 4l8 3.5v10L12 21l-8-3.5z"/><path d="M4 7.5 12 11l8-3.5M12 11v10M4 10.5l8 3.5 8-3.5"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2M6 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
  mosque: '<path d="M3 21h18M5 21v-9M19 21v-9M4 12h2M18 12h2M5 9l0-3M19 9V6M8 21v-6a4 4 0 0 1 8 0v6M7.5 13c.5-3.5 4.5-4 4.5-8 0 4 4 4.5 4.5 8"/>',
  sunrise: '<path d="M12 2v6M8.5 5.5 12 2l3.5 3.5M4.2 10.2l1.4 1.4M1 18h2M21 18h2M18.4 11.6l1.4-1.4M23 22H1M16 18a4 4 0 0 0-8 0"/>',
  sunset: '<path d="M12 9V3M8.5 5.5 12 9l3.5-3.5M4.2 10.2l1.4 1.4M1 18h2M21 18h2M18.4 11.6l1.4-1.4M23 22H1M16 18a4 4 0 0 0-8 0"/>',
  horizon: '<path d="M17 18a5 5 0 0 0-10 0M12 9V6M4.2 10.2l1.4 1.4M1 18h2M21 18h2M18.4 11.6l1.4-1.4M23 22H1"/>',
  sunSmall: '<circle cx="12" cy="12" r="3.5"/><path d="M12 4.5v1.5M12 18v1.5M4.5 12H6M18 12h1.5M6.7 6.7l1 1M16.3 16.3l1 1M6.7 17.3l1-1M16.3 7.7l1-1"/>',
  cloudSun: '<path d="M12 2v2M4.9 4.9l1.4 1.4M20 12h2M19.1 4.9l-1.4 1.4M15.9 13A4 4 0 0 0 8.1 10.6"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 0 0 0 20c1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17a5 5 0 0 0 5-5C22 6 17.5 2 12 2z"/>',
  layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  volume: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>'
};
function ic(name, cls) { return '<svg class="i ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || '') + '</svg>'; }
function hydrateIcons(root) {
  $$('i[data-ic]', root).forEach(el => {
    const t = document.createElement('span'); t.innerHTML = ic(el.dataset.ic, el.className);
    el.replaceWith(t.firstChild);
  });
}

/* ---------------- RPC (server / mode pratinjau) ---------------- */
function rpc(fn) {
  const args = Array.prototype.slice.call(arguments, 1);
  return new Promise((resolve, reject) => {
    if (MODE === 'gas') {
      const r = google.script.run.withSuccessHandler(resolve).withFailureHandler(e => reject(e && e.message ? e : new Error(String(e))));
      r[fn].apply(r, args);
    } else if (MODE === 'api') {
      apiCall(fn, args).then(resolve, reject);
    } else {
      try { Promise.resolve(MOCK[fn].apply(null, args)).then(resolve, reject); } catch (e) { reject(e); }
    }
  });
}
/* Panggilan ke Web App Apps Script (dipakai versi GitHub Pages).
   GET untuk data publik, POST text/plain (tanpa preflight CORS) untuk aksi admin. */
function apiCall(fn, args) {
  const ctl = window.AbortController ? new AbortController() : null;
  const timer = ctl ? setTimeout(() => ctl.abort(), 20000) : null;
  const GET = {
    getPublicSettings: () => ({ action: 'settings' }),
    geocode: q => ({ action: 'geocode', q: q }),
    reverseGeocode: (lat, lng) => ({ action: 'reverse', lat: lat, lng: lng })
  };
  let req;
  if (GET[fn]) {
    const qs = new URLSearchParams(Object.assign({ api: '1' }, GET[fn].apply(null, args)));
    req = fetch(API + (API.indexOf('?') > -1 ? '&' : '?') + qs.toString(), { method: 'GET', redirect: 'follow', signal: ctl && ctl.signal });
  } else {
    req = fetch(API, { method: 'POST', redirect: 'follow', signal: ctl && ctl.signal,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: fn, args: args }) });
  }
  return req.then(r => { if (!r.ok) throw new Error('Server ' + r.status); return r.json(); })
    .then(j => { if (j && j.error) throw new Error(j.error); return j ? j.result : null; })
    .catch(e => { throw new Error(e && e.name === 'AbortError' ? 'Server tidak merespons. Periksa koneksi internet.' : (e.message || String(e))); })
    .finally(() => { if (timer) clearTimeout(timer); });
}
/* Mode lokal (tanpa backend) — pengaturan disimpan di perangkat ini saja */
const MOCK = {
  getPublicSettings: () => deepMerge(window.WAQTY_DEFAULTS || ST, LS.get('mockSettings', {}) || {}),
  adminLogin: pw => pw === LS.get('mockPw', 'admin123')
    ? { ok: true, token: 'demo', settings: MOCK.getPublicSettings(), defaults: window.WAQTY_DEFAULTS || ST, usingDefaultPassword: !LS.get('mockPw') }
    : { ok: false, message: 'Password salah.' },
  adminLogout: () => ({ ok: true }),
  saveSettings: (t, s) => { LS.set('mockSettings', s); return { ok: true, settings: MOCK.getPublicSettings() }; },
  resetSettings: () => { LS.set('mockSettings', null); return { ok: true, settings: MOCK.getPublicSettings() }; },
  changePassword: (t, o, n) => {
    if (o !== LS.get('mockPw', 'admin123')) return { ok: false, message: 'Password lama salah.' };
    if (!n || n.length < 6) return { ok: false, message: 'Password baru minimal 6 karakter.' };
    LS.set('mockPw', n); return { ok: true, message: 'Password berhasil diganti.' };
  },
  geocode: q => fetch('https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=8&accept-language=id&q=' + encodeURIComponent(q))
    .then(r => r.json()).then(j => j.map(nomi)),
  reverseGeocode: (lat, lng) => fetch('https://nominatim.openstreetmap.org/reverse?format=json&accept-language=id&lat=' + lat + '&lon=' + lng)
    .then(r => r.json()).then(x => Object.assign(nomi(x), { lat: lat, lng: lng }))
};
function nomi(x) {
  const a = x.address || {};
  return { name: a.city || a.town || a.county || a.municipality || a.state || String(x.display_name || '').split(',')[0],
    region: a.state || '', country: a.country || '', countryCode: (a.country_code || '').toUpperCase(),
    address: x.display_name, lat: +x.lat, lng: +x.lon };
}
function deepMerge(base, extra) {
  if (Array.isArray(base)) return Array.isArray(extra) ? extra : base;
  if (base === null || typeof base !== 'object') return extra === undefined ? base : extra;
  const out = Object.assign({}, base);
  if (extra && typeof extra === 'object') Object.keys(extra).forEach(k => { out[k] = (k in base) ? deepMerge(base[k], extra[k]) : extra[k]; });
  return out;
}

/* ---------------- waktu lokasi ---------------- */
let LOC = normLoc(LS.get('loc', null) || ST.defaultLocation);
function normLoc(l) {
  l = Object.assign({ name: 'Lokasi', region: '', country: 'Indonesia', lat: -6.1744, lng: 106.8161, tz: 7, elev: 0 }, l || {});
  l.lat = +l.lat; l.lng = +l.lng; l.tz = +l.tz; l.elev = +l.elev || 0; return l;
}
const nowL = () => new Date(Date.now() + LOC.tz * 3600e3);
const U = (y, m, d) => new Date(Date.UTC(y, m - 1, d));
const addD = (dt, n) => new Date(dt.getTime() + n * 864e5);
const parts = dt => ({ y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate(), wd: dt.getUTCDay() });
const dkey = dt => { const p = parts(dt); return p.y + '-' + pad(p.m) + '-' + pad(p.d); };
const dayStart = n => U(n.getUTCFullYear(), n.getUTCMonth() + 1, n.getUTCDate());
function isIndo(l) { l = l || LOC; return /indonesia/i.test(l.country || '') || (l.countryCode || '').toUpperCase() === 'ID'; }
function tzLabel(tz, l) {
  tz = +tz;
  if (isIndo(l)) { if (tz === 7) return 'WIB'; if (tz === 8) return 'WITA'; if (tz === 9) return 'WIT'; }
  const a = Math.abs(tz); return 'UTC' + (tz >= 0 ? '+' : '−') + Math.floor(a) + (a % 1 ? ':' + pad(Math.round(a % 1 * 60)) : '');
}
const fmtDate = (dt, wd) => { const p = parts(dt); return (wd === false ? '' : D.DAYS[p.wd] + ', ') + p.d + ' ' + D.MONTHS[p.m - 1] + ' ' + p.y; };
function pasaran(dt) { const n = Math.round((dt - U(1945, 8, 17)) / 864e5); return D.PASARAN[((n % 5) + 5) % 5]; }

/* ---------------- kalender Hijriah ---------------- */
function parseH(f, dt) {
  const o = {};
  f.formatToParts(dt).forEach(p => { if (p.type === 'day') o.d = +p.value; else if (p.type === 'month') o.m = +p.value; else if (p.type === 'year' || p.type === 'relatedYear') o.y = parseInt(p.value, 10); });
  return o;
}
const HF = (function () {
  try {
    const f = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' });
    const t = parseH(f, U(2026, 11, 16));
    if (t.d === 6 && t.m === 6 && t.y === 1448) return f;
  } catch (e) {}
  return null;
})();
function tabular(dt) {
  const jd = Math.floor(dt.getTime() / 864e5) + 2440588;
  let l = jd - 1948440 + 10632; const n = Math.floor((l - 1) / 10631); l = l - 10631 * n + 354;
  const j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) + Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const m = Math.floor((24 * l) / 709), d = l - Math.floor((709 * m) / 24), y = 30 * n + j - 30;
  return { d: d, m: m, y: y };
}
const HC = new Map();
function hijri(dt) {
  const adj = +ST.hijriAdjust || 0, k = dt.getTime() + '|' + adj;
  if (HC.has(k)) return HC.get(k);
  const x = addD(dt, adj), r = HF ? parseH(HF, x) : tabular(x);
  HC.set(k, r); return r;
}
const HSHORT = ['Muh.', 'Safar', 'R.Awal', 'R.Akhir', 'J.Awal', 'J.Akhir', 'Rajab', "Sya'ban", 'Ramadhan', 'Syawal', 'Dzulq.', 'Dzulh.'];
const hStr = h => h.d + ' ' + D.HIJRI_MONTHS[h.m - 1] + ' ' + h.y + ' H';
const hAr = h => toAr(h.d) + ' ' + D.HIJRI_MONTHS_AR[h.m - 1] + ' ' + toAr(h.y) + ' هـ';
const hShort = h => h.d + ' ' + D.HIJRI_MONTHS[h.m - 1].replace('Rabiul ', 'Rab. ').replace('Jumadil ', 'Jum. ').replace("Dzulqa'dah", "Dzulqa'dah");

/* ---------------- perhitungan jadwal ---------------- */
const KEYS = ['imsak', 'fajr', 'sunrise', 'dhuha', 'dhuhr', 'asr', 'maghrib', 'isha'];
const PNAME = { imsak: 'Imsak', fajr: 'Subuh', sunrise: 'Terbit', dhuha: 'Dhuha', dhuhr: 'Dzuhur', asr: 'Ashar', maghrib: 'Maghrib', isha: "Isya'" };
const PAR = { imsak: 'إِمْسَاك', fajr: 'صُبْح', sunrise: 'شُرُوق', dhuha: 'ضُحَى', dhuhr: 'ظُهْر', asr: 'عَصْر', maghrib: 'مَغْرِب', isha: 'عِشَاء' };
const PIC = { imsak: 'moonStar', fajr: 'sunrise', sunrise: 'horizon', dhuha: 'sunSmall', dhuhr: 'sun', asr: 'cloudSun', maghrib: 'sunset', isha: 'moon' };
const METHODS = {
  LFNU: { label: 'Lembaga Falakiyah PBNU', note: 'Subuh 20°, Isya 18°, Dhuha 4,5°', v: { fajr: 20, isha: 18, sunAlt: 0.9, elevCorr: false, dhuhaAlt: 4.5, dhuhrPlus: 1, imsak: 10, asr: 1, ramadanMaghribPlus: 1, ihtiyat: { imsak: 0, fajr: 0, sunrise: 0, dhuha: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 } } },
  KEMENAG: { label: 'Kemenag RI', note: 'Subuh 20°, Isya 18°, ihtiyath 2 menit', v: { fajr: 20, isha: 18, sunAlt: 0.8333, elevCorr: false, dhuhaAlt: 4.5, dhuhrPlus: 0, imsak: 10, asr: 1, ramadanMaghribPlus: 0, ihtiyat: { imsak: 0, fajr: 2, sunrise: -2, dhuha: 2, dhuhr: 2, asr: 2, maghrib: 2, isha: 2 } } },
  MUHAMMADIYAH: { label: 'Muhammadiyah', note: 'Subuh 18°, Isya 18°, ihtiyath 2 menit', v: { fajr: 18, isha: 18, sunAlt: 0.8333, elevCorr: false, dhuhaAlt: 4.5, dhuhrPlus: 0, imsak: 10, asr: 1, ramadanMaghribPlus: 0, ihtiyat: { imsak: 0, fajr: 2, sunrise: -2, dhuha: 2, dhuhr: 2, asr: 2, maghrib: 2, isha: 2 } } },
  MWL: { label: 'Muslim World League', note: 'Subuh 18°, Isya 17°', v: { fajr: 18, isha: 17, sunAlt: 0.8333, elevCorr: false, dhuhaAlt: 4.5, dhuhrPlus: 0, imsak: 10, asr: 1, ramadanMaghribPlus: 0, ihtiyat: { imsak: 0, fajr: 0, sunrise: 0, dhuha: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 } } },
  CUSTOM: { label: 'Kustom', note: 'Atur sendiri semua parameter', v: null }
};
const sin = d => Math.sin(d * D2R), cos = d => Math.cos(d * D2R), tan = d => Math.tan(d * D2R);
const fixA = (a, b) => { a = a - b * Math.floor(a / b); return a < 0 ? a + b : a; };
function jdate(y, m, d) { if (m <= 2) { y--; m += 12; } const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4); return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5; }
function sunPos(jd) {
  const Dd = jd - 2451545, g = fixA(357.529 + 0.98560028 * Dd, 360), q = fixA(280.459 + 0.98564736 * Dd, 360);
  const L = fixA(q + 1.915 * sin(g) + 0.020 * sin(2 * g), 360), e = 23.439 - 0.00000036 * Dd;
  const RA = R2D * Math.atan2(cos(e) * sin(L), cos(L)) / 15;
  return { decl: R2D * Math.asin(sin(e) * sin(L)), eqt: q / 15 - fixA(RA, 24) };
}
function rawTimes(y, m, d, o) {
  const jd0 = jdate(y, m, d) - o.lng / (15 * 24);
  const mid = t => fixA(12 - sunPos(jd0 + t).eqt, 24);
  const angT = (ang, t, ccw) => {
    const p = sunPos(jd0 + t), noon = fixA(12 - p.eqt, 24);
    const c = (-sin(ang) - sin(p.decl) * sin(o.lat)) / (cos(p.decl) * cos(o.lat));
    const T = R2D * Math.acos(c) / 15; return noon + (ccw ? -T : T);
  };
  const asrT = (f, t) => { const p = sunPos(jd0 + t); return angT(-R2D * Math.atan(1 / (f + tan(Math.abs(o.lat - p.decl)))), t); };
  const rs = o.sunAlt + 0.0347 * Math.sqrt(o.elev || 0);
  let t = { fajr: 5, sunrise: 6, dhuha: 6.5, dhuhr: 12, asr: 15, maghrib: 18, isha: 19 };
  for (let i = 0; i < 3; i++) {
    const f = x => x / 24;
    t = { fajr: angT(o.fajr, f(t.fajr), 1), sunrise: angT(rs, f(t.sunrise), 1), dhuha: angT(-o.dhuhaAlt, f(t.dhuha), 1),
      dhuhr: mid(f(t.dhuhr)), asr: asrT(o.asr, f(t.asr)), maghrib: angT(rs, f(t.maghrib)), isha: angT(o.isha, f(t.isha)) };
  }
  const adj = o.tz - o.lng / 15; Object.keys(t).forEach(k => { t[k] += adj; });
  return t;
}
const PTC = new Map();
function times(dt, calc, loc) {
  const c = calc || ST.calc, L = loc || LOC;
  const k = !calc && !loc ? dt.getTime() + '|' + L.lat + '|' + L.lng + '|' + L.tz + '|' + L.elev : null;
  if (k && PTC.has(k)) return PTC.get(k);
  const p = parts(dt), ram = hijri(dt).m === 9, ih = c.ihtiyat || {};
  const r = rawTimes(p.y, p.m, p.d, { lat: L.lat, lng: L.lng, tz: L.tz, elev: c.elevCorr ? (L.elev || 0) : 0,
    fajr: +c.fajr, isha: +c.isha, sunAlt: +c.sunAlt, dhuhaAlt: +c.dhuhaAlt, asr: +c.asr || 1 });
  const out = {};
  ['fajr', 'sunrise', 'dhuha', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(key => {
    let v = r[key] * 60 + (+ih[key] || 0);
    if (key === 'dhuhr') v += +c.dhuhrPlus || 0;
    if (key === 'maghrib' && ram) v += +c.ramadanMaghribPlus || 0;
    out[key] = isFinite(v) ? (key === 'sunrise' ? Math.floor(v + 1e-6) : Math.ceil(v - 1e-6)) : NaN;
  });
  out.imsak = out.fajr - (+c.imsak || 0) + (+ih.imsak || 0);
  if (k) PTC.set(k, out);
  return out;
}
const fmt = min => { if (!isFinite(min)) return '--:--'; min = ((min % 1440) + 1440) % 1440; return pad(Math.floor(min / 60)) + ':' + pad(min % 60); };
const pname = (k, dt) => (k === 'dhuhr' && dt && parts(dt).wd === 5) ? "Jum'at" : PNAME[k];

/* ---------------- info hari ---------------- */
function fastingOf(h, p) {
  if ((h.m === 10 && h.d === 1) || (h.m === 12 && h.d >= 10 && h.d <= 13)) return [{ name: 'Diharamkan berpuasa', type: 'haram' }];
  if (h.m === 9) return [{ name: 'Puasa Ramadhan', type: 'wajib' }];
  const f = [];
  if (h.m === 12 && h.d === 8) f.push('Puasa Tarwiyah');
  if (h.m === 12 && h.d === 9) f.push('Puasa Arafah');
  if (h.m === 1 && h.d === 9) f.push("Puasa Tasu'a");
  if (h.m === 1 && h.d === 10) f.push('Puasa Asyura');
  if (h.d >= 13 && h.d <= 15) f.push('Puasa Ayyamul Bidh');
  if (p.wd === 1) f.push('Puasa Senin');
  if (p.wd === 4) f.push('Puasa Kamis');
  return f.map(n => ({ name: n, type: 'sunnah' }));
}
function dayInfo(dt) {
  const h = hijri(dt), p = parts(dt), md = pad(p.m) + '-' + pad(p.d), hol = [], ev = [];
  D.HOLIDAYS.forEach(x => { if (x[0] === h.m && x[1] === h.d) hol.push({ name: x[2], kind: x[3], desc: x[4] }); });
  if (h.m === 12 && (h.d === 12 || h.d === 13)) hol.push({ name: 'Hari Tasyrik', kind: 'peringatan', desc: 'Diharamkan berpuasa (11–13 Dzulhijjah).' });
  D.EVENTS_HIJRI.forEach(x => { if (x[0] === h.m && x[1] === h.d) ev.push({ title: x[2], desc: x[3], cal: 'hijri' }); });
  D.EVENTS_MASEHI.forEach(x => { if (x[0] === md) ev.push({ title: x[1], desc: x[2], cal: 'masehi' }); });
  (ST.customEvents || []).forEach(e => {
    if (!e || !e.title) return;
    const ok = e.cal === 'hijri' ? (+e.m === h.m && +e.d === h.d && (!+e.y || +e.y === h.y))
                                 : (+e.m === p.m && +e.d === p.d && (!+e.y || +e.y === p.y));
    if (!ok) return;
    if (e.kind === 'peristiwa') ev.push({ title: e.title, desc: e.desc || '', cal: e.cal });
    else hol.push({ name: e.title, kind: e.kind || 'peringatan', desc: e.desc || '' });
  });
  return { dt: dt, h: h, p: p, hol: hol, ev: ev, fast: fastingOf(h, p) };
}

/* ---------------- state hari ini ---------------- */
let TODAY = {};
function refreshDay() {
  const dt = dayStart(nowL());
  TODAY = { dt: dt, key: dkey(dt), p: parts(dt), h: hijri(dt), t: times(dt), tTom: times(addD(dt, 1)), tYes: times(addD(dt, -1)), info: dayInfo(dt) };
  TODAY.agenda = agendaFor(dt);
}
function nextInfo(sec) {
  const t = TODAY.t, list = KEYS.map(k => ({ k: k, s: t[k] * 60 })).filter(x => isFinite(x.s));
  let next = list.find(x => x.s > sec), prev = list.slice().reverse().find(x => x.s <= sec);
  if (!next) next = { k: 'imsak', s: (TODAY.tTom.imsak + 1440) * 60, tomorrow: true };
  if (!prev) prev = { k: 'isha', s: (TODAY.tYes.isha - 1440) * 60, yesterday: true };
  return { next: next, prev: prev };
}

/* ---------------- pengaturan & tema ---------------- */
function hexRgb(h) { const m = /^#?([0-9a-f]{6})$/i.exec(String(h || '').trim()); if (!m) return null; const n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(','); }
/* Pola geometris Islami: SVG berwarna jadi (tanpa CSS mask) → murah saat digulir */
function patternUri(color, alpha) {
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><g fill='none' stroke='" + color + "' stroke-opacity='" + alpha + "' stroke-width='1.2'>" +
    "<rect x='22' y='22' width='36' height='36'/><rect x='22' y='22' width='36' height='36' transform='rotate(45 40 40)'/>" +
    "<circle cx='40' cy='40' r='7'/><path d='M0 0 22 22M80 0 58 22M0 80 22 58M80 80 58 58M40 0v14.5M40 80V65.5M0 40h14.5M80 40H65.5'/>" +
    "<path d='M0 -11 11 0 0 11 -11 0z M80 -11 91 0 80 11 69 0z M0 69 11 80 0 91 -11 80z M80 69 91 80 80 91 69 80z'/></g></svg>";
  return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
}
function updatePatterns() {
  const th = ST.theme || {}, r = document.documentElement.style, dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const a = Math.max(0, Math.min(0.3, (+th.patternOpacity || 0) / 100 * (dark ? 1.0 : 1.25)));
  const col = hexRgb(dark ? th.gold : th.primary) ? (dark ? th.gold : th.primary) : (dark ? '#C9A050' : '#04777F');
  r.setProperty('--pat-page', th.pattern === false || !a ? 'none' : patternUri(col, a.toFixed(3)));
  r.setProperty('--pat-white', patternUri('#FFFFFF', '0.09'));
  r.setProperty('--pat-gold', patternUri(hexRgb(th.gold) ? th.gold : '#C9A050', '0.12'));
}
/* Mode ringan: otomatis untuk perangkat lemah / pengguna yang memilih kurangi gerak */
function isLite() {
  const pref = (ST.theme || {}).performance || 'auto';
  if (pref === 'lite') return true;
  if (pref === 'full') return false;
  try { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return true; } catch (e) {}
  return (navigator.deviceMemory && navigator.deviceMemory <= 3) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || false;
}
function logoHtml() {
  return ST.logoUrl ? '<img src="' + esc(ST.logoUrl) + '" alt="' + esc(ST.appName) + '">' : $('#tplLogo').innerHTML;
}
function applySettings() {
  const r = document.documentElement.style, th = ST.theme || {};
  [['primary', th.primary], ['accent', th.accent], ['gold', th.gold]].forEach(([k, v]) => {
    const rgb = hexRgb(v); if (rgb) { r.setProperty('--' + k, v); r.setProperty('--' + k + '-rgb', rgb); }
  });
  document.documentElement.classList.toggle('lite', isLite());
  document.body.classList.toggle('no-pattern', th.pattern === false);
  document.body.classList.toggle('no-lanterns', th.lanterns === false);
  const meta = $('meta[name="theme-color"]'); if (meta && hexRgb(th.primary)) meta.content = th.primary;
  setTheme(LS.get('theme', null) || th.default || 'light', true);

  $('#appName').textContent = ST.appName || 'WAQTY';
  $('#tagline').textContent = ST.tagline || '';
  ['#logoBox', '#loginLogo', '#kLogo'].forEach(s => { $(s).innerHTML = logoHtml(); });
  $('#kName').textContent = ST.appName || 'WAQTY';
  document.title = (ST.appName || 'WAQTY') + ' — ' + (ST.tagline || '');
  const fe = esc(ST.footer || '').replace(/(Bahruddin|BeeCOMP)/g, '<b>$1</b>');
  $('#footerText').innerHTML = fe;

  const run = String(ST.runningText || '').trim(), sec = ST.sections || {};
  $('#marquee').classList.toggle('hidden', !run || sec.runningText === false);
  $('#marqueeText').textContent = run;
  $('#marqueeText').style.setProperty('--mq-dur', Math.max(18, run.length * 0.22) + 's');
  $('#kRun').textContent = run || (ST.appName + ' • ' + ST.tagline);

  const hero = $('#hero');
  if (th.heroImage) { hero.classList.add('has-image'); hero.style.backgroundImage = 'url("' + String(th.heroImage).replace(/"/g, '') + '")'; }
  else { hero.classList.remove('has-image'); hero.style.backgroundImage = ''; }

  const tabMap = { monthly: 'monthly', calendar: 'calendar', holidays: 'holidays', qibla: 'qibla' };
  let firstVisible = null;
  Object.keys(tabMap).forEach(k => {
    const on = sec[k] !== false;
    $('.tab[data-tab="' + k + '"]').classList.toggle('hidden', !on);
    if (on && !firstVisible) firstVisible = k;
  });
  $('main').classList.toggle('hidden', !firstVisible);
  const act = $('.tab.active');
  if (firstVisible && (!act || act.classList.contains('hidden'))) showTab(firstVisible);
  $('#quoteCard').classList.toggle('hidden', sec.quote === false);
  $('#eventsCard').classList.toggle('hidden', sec.events === false);
  $('#agendaCard').classList.toggle('hidden', sec.agenda === false);
}
function setTheme(mode, silent) {
  document.documentElement.setAttribute('data-theme', mode === 'dark' ? 'dark' : 'light');
  $('#themeToggle').checked = mode === 'dark';
  if (!silent) LS.set('theme', mode);
  updatePatterns();
}
function applyAll() { HC.clear(); PTC.clear(); applySettings(); refreshDay(); renderAll(); }

/* ---------------- render: hero & jadwal ---------------- */
function renderHero() {
  $('#locName').textContent = LOC.name;
  $('#locSub').textContent = (LOC.region ? LOC.region + ' · ' : '') + tzLabel(LOC.tz);
  $('#dateM').textContent = fmtDate(TODAY.dt) + ' · ' + pasaran(TODAY.dt);
  const h = TODAY.h, fast = TODAY.info.fast.filter(f => f.type !== 'haram'), hol = TODAY.info.hol[0];
  $('#dateH').innerHTML = '<span>' + esc(hStr(h)) + '</span>' +
    (hol ? '<span class="pill">' + esc(hol.name) + '</span>' : '') +
    (fast.length ? '<span class="pill">' + esc(fast[0].name) + '</span>' : '');
  $('#dateAr').textContent = D.DAYS_AR[TODAY.p.wd] + '، ' + hAr(h);
  $('#qLoc').textContent = LOC.name + (LOC.region ? ', ' + LOC.region : '') + ' (' + LOC.lat.toFixed(4) + ', ' + LOC.lng.toFixed(4) + ')';
  $('#kLoc').textContent = LOC.name + ' · ' + tzLabel(LOC.tz);
  $('#kDate').textContent = fmtDate(TODAY.dt) + ' · ' + pasaran(TODAY.dt);
  $('#kHijri').innerHTML = esc(hStr(h)) + '<span class="ar">' + hAr(h) + '</span>';
  if (!$('#stars').childElementCount) {
    let s = ''; for (let i = 0; i < 28; i++) s += '<i style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' + (Math.random() * 70).toFixed(1) + '%;opacity:' + (0.3 + Math.random() * 0.7).toFixed(2) + '"></i>';
    $('#stars').innerHTML = s;
  }
}
function renderTimes() {
  const t = TODAY.t;
  $('#times').innerHTML = KEYS.map((k, i) =>
    '<div class="pcard" data-k="' + k + '" style="animation-delay:' + (i * 0.05) + 's">' +
    '<span class="tag"></span><div class="pi">' + ic(PIC[k]) + '</div>' +
    '<div class="pn">' + esc(pname(k, TODAY.dt)) + '</div><div class="pa">' + PAR[k] + '</div>' +
    '<div class="pt">' + fmt(t[k]) + '</div><div class="mini"></div></div>').join('');
  $('#kTimes').innerHTML = KEYS.map(k => '<div data-k="' + k + '"><small>' + esc(pname(k, TODAY.dt)) + '</small><span class="ar">' + PAR[k] + '</span><b>' + fmt(t[k]) + '</b></div>').join('');
  lastStateKey = '';
}
let lastStateKey = '', lastSkyMin = -1;
function skyPeriod(min) {
  const t = TODAY.t;
  if (!(min >= t.imsak) || min >= t.isha) return 'malam';
  if (min < t.sunrise) return 'fajr';
  if (min < t.dhuhr - 60) return 'pagi';
  if (min < t.asr) return 'siang';
  if (min < t.maghrib - 25) return 'sore';
  return 'senja';
}
function updateSky(min) {
  const hero = $('#hero'), th = ST.theme || {};
  const per = th.dynamicSky === false ? 'siang' : skyPeriod(min);
  hero.className = hero.className.replace(/\bsky-\w+/g, '').trim() + ' sky-' + per;
  const t = TODAY.t, orb = $('#orb');
  let x, y, sun = min >= t.sunrise && min < t.maghrib;
  if (sun) { const f = (min - t.sunrise) / (t.maghrib - t.sunrise); x = 40 + 22 * f; y = 80 - 58 * Math.sin(Math.PI * f); }
  else {
    const start = min >= t.maghrib ? t.maghrib : TODAY.tYes.maghrib - 1440, end = min >= t.maghrib ? TODAY.tTom.sunrise + 1440 : t.sunrise;
    const f = Math.min(1, Math.max(0, (min - start) / (end - start))); x = 40 + 22 * f; y = 72 - 50 * Math.sin(Math.PI * f);
  }
  orb.className = 'orb ' + (sun ? 'sun' : 'moon');
  orb.style.left = x + '%'; orb.style.top = y + '%';
  const hh = min / 60;
  $('#greet').textContent = (hh < 11 ? 'Selamat pagi' : hh < 15 ? 'Selamat siang' : hh < 18.3 ? 'Selamat sore' : 'Selamat malam') + (ST.welcome ? ' · ' + ST.welcome : '');
}

/* ---------------- tick (ringan: hanya menulis DOM bila nilainya berubah) ---------------- */
const EL = {}, LASTTXT = new Map();
function el(id) { return EL[id] || (EL[id] = document.getElementById(id)); }
function setText(id, v) { if (LASTTXT.get(id) !== v) { LASTTXT.set(id, v); const e = el(id); if (e) e.textContent = v; } }
let lastRing = '', kioskOpen = false;
function tick() {
  const n = nowL();
  if (dkey(dayStart(n)) !== TODAY.key) { refreshDay(); renderAll(); }
  const H = n.getUTCHours(), M = n.getUTCMinutes(), S = n.getUTCSeconds(), sec = H * 3600 + M * 60 + S, min = H * 60 + M;
  const tzl = tzLabel(LOC.tz), hm = pad(H) + ':' + pad(M);
  setText('cHM', hm); setText('cS', pad(S)); setText('cTz', tzl);
  const ni = nextInfo(sec), nx = ni.next, pv = ni.prev, left = Math.max(0, nx.s - sec);
  const cd = pad(Math.floor(left / 3600)) + ':' + pad(Math.floor(left % 3600 / 60)) + ':' + pad(left % 60);
  const nname = nx.tomorrow ? PNAME.imsak : pname(nx.k, TODAY.dt);
  const at = (nx.tomorrow ? 'besok, ' : '') + 'pukul ' + fmt(nx.s / 60) + ' ' + tzl;
  setText('nextName', nname); setText('nextAr', PAR[nx.k]); setText('countdown', cd); setText('nextAt', at);
  const prog = Math.min(1, Math.max(0, (sec - pv.s) / (nx.s - pv.s)));
  const ring = (326.73 * (1 - prog)).toFixed(1);
  if (ring !== lastRing) { lastRing = ring; el('ringFg').setAttribute('stroke-dashoffset', ring); }

  const sk = nx.k + (nx.tomorrow ? 'T' : '') + '|' + min;
  if (sk !== lastStateKey) {
    lastStateKey = sk;
    $$('#times .pcard').forEach(c => {
      const k = c.dataset.k, s = TODAY.t[k] * 60;
      c.classList.toggle('past', s <= sec);
      c.classList.toggle('next', !nx.tomorrow && k === nx.k);
      c.classList.toggle('current', !pv.yesterday && k === pv.k);
      $('.tag', c).textContent = (!nx.tomorrow && k === nx.k) ? 'Berikutnya' : (!pv.yesterday && k === pv.k) ? 'Sekarang' : '';
      if (!(!nx.tomorrow && k === nx.k)) $('.mini', c).textContent = '';
    });
    $$('#kTimes div').forEach(c => { c.classList.toggle('next', !nx.tomorrow && c.dataset.k === nx.k); c.classList.toggle('current', !pv.yesterday && c.dataset.k === pv.k); });
    EL.mini = $('#times .pcard.next .mini');
    renderAgendaState(min);
  }
  if (EL.mini) EL.mini.textContent = '−' + cd;
  if (min !== lastSkyMin) { lastSkyMin = min; updateSky(min); }
  if (kioskOpen) { setText('kHM', hm); setText('kS', pad(S)); setText('kNext', nname); setText('kCd', cd); setText('kAt', at); }
  checkReminders(min);
}
function loop() { tick(); setTimeout(loop, 1000 - (Date.now() % 1000) + 15); }

/* ---------------- jadwal bulanan ---------------- */
const MV = { mode: 'masehi', y: 0, m: 0, hy: 0, hm: 0 };
function resetMonthView() { MV.y = TODAY.p.y; MV.m = TODAY.p.m; MV.hy = TODAY.h.y; MV.hm = TODAY.h.m; }
function hijriMonthDays(hy, hm) {
  const b = TODAY.dt, bh = TODAY.h;
  const approx = addD(b, Math.round(((hy - bh.y) * 12 + (hm - bh.m)) * 29.5306 - (bh.d - 1)));
  let start = null;
  for (let r = 0; r <= 20 && !start; r++) for (const s of [r, -r]) { const d = addD(approx, s), h = hijri(d); if (h.y === hy && h.m === hm && h.d === 1) { start = d; break; } }
  if (!start) return [];
  const out = []; let d = start;
  while (out.length < 31) { const h = hijri(d); if (h.m !== hm || h.y !== hy) break; out.push(d); d = addD(d, 1); }
  return out;
}
function monthDays() {
  if (MV.mode === 'hijri') return hijriMonthDays(MV.hy, MV.hm);
  const n = new Date(Date.UTC(MV.y, MV.m, 0)).getUTCDate(), out = [];
  for (let i = 1; i <= n; i++) out.push(U(MV.y, MV.m, i));
  return out;
}
function renderMonthly() {
  const days = monthDays(); if (!days.length) return;
  const first = days[0], last = days[days.length - 1], hf = hijri(first), hl = hijri(last), pf = parts(first), pl = parts(last);
  let title, sub;
  if (MV.mode === 'hijri') {
    title = D.HIJRI_MONTHS[MV.hm - 1] + ' ' + MV.hy + ' H';
    sub = pf.d + ' ' + D.MONTHS[pf.m - 1].slice(0, 3) + (pf.y !== pl.y ? ' ' + pf.y : '') + ' – ' + pl.d + ' ' + D.MONTHS[pl.m - 1].slice(0, 3) + ' ' + pl.y;
  } else {
    title = D.MONTHS[MV.m - 1] + ' ' + MV.y;
    sub = D.HIJRI_MONTHS[hf.m - 1] + (hf.m !== hl.m ? (hf.y !== hl.y ? ' ' + hf.y : '') + ' – ' + D.HIJRI_MONTHS[hl.m - 1] : '') + ' ' + hl.y + ' H';
  }
  $('#mTitle').textContent = title; $('#mSub').textContent = sub;
  $$('#mMode button').forEach(b => b.classList.toggle('on', b.dataset.mode === MV.mode));
  const col2 = MV.mode === 'hijri' ? 'Masehi' : 'Hijriah';
  let html = '<thead><tr><th>' + (MV.mode === 'hijri' ? 'Hijriah' : 'Tanggal') + '</th><th>' + col2 + '</th>' + KEYS.map(k => '<th>' + PNAME[k] + '</th>').join('') + '</tr></thead><tbody>';
  days.forEach(dt => {
    const p = parts(dt), h = hijri(dt), t = times(dt), cls = [];
    if (dkey(dt) === TODAY.key) cls.push('today');
    if (p.wd === 5) cls.push('fri');
    const c1 = MV.mode === 'hijri' ? '<b>' + h.d + '</b> ' + D.HIJRI_MONTHS[h.m - 1].slice(0, 3) : '<b>' + p.d + '</b> ' + D.MONTHS[p.m - 1].slice(0, 3);
    const c2 = MV.mode === 'hijri' ? p.d + ' ' + D.MONTHS[p.m - 1].slice(0, 3) + ' ' + String(p.y).slice(2) : hShort(h);
    html += '<tr class="' + cls.join(' ') + '"><td>' + c1 + '<span class="wd">' + D.DAYS[p.wd] + '</span></td><td class="hj">' + esc(c2) + '</td>' +
      KEYS.map(k => '<td class="' + k + '">' + fmt(t[k]) + '</td>').join('') + '</tr>';
  });
  $('#mTable').innerHTML = html + '</tbody>';
  const c = ST.calc, mt = METHODS[c.method] || METHODS.CUSTOM;
  $('#methodNote').textContent = 'Metode: ' + mt.label + ' · Subuh ' + c.fajr + '° · Isya ' + c.isha + '° · Dhuha ' + c.dhuhaAlt + '° · Imsak ' + c.imsak +
    ' menit sebelum Subuh · Ashar ' + (+c.asr === 2 ? 'Hanafi' : 'Syafi\'i') + ' · ' + LOC.lat.toFixed(4) + ', ' + LOC.lng.toFixed(4) + ' · ' + tzLabel(LOC.tz) +
    '. Selisih 1–2 menit dengan jadwal masjid setempat adalah wajar; mohon menyesuaikan.';
  $('#printHead').innerHTML = '<h2 style="margin:0;font-family:var(--display)">' + esc(ST.appName) + ' — Jadwal Imsakiyah ' + esc(title) + '</h2><p style="margin:4px 0 12px">' +
    esc(LOC.name + (LOC.region ? ', ' + LOC.region : '')) + ' · ' + esc(sub) + ' · ' + tzLabel(LOC.tz) + ' · Metode ' + esc(mt.label) + '</p>';
  const tr = $('#mTable tr.today'); if (tr && $('.panel[data-panel="monthly"]').classList.contains('active')) { const w = $('.table-wrap'); w.scrollTop = Math.max(0, tr.offsetTop - 120); }
}
function stepMonth(n) {
  if (MV.mode === 'hijri') { MV.hm += n; if (MV.hm > 12) { MV.hm = 1; MV.hy++; } if (MV.hm < 1) { MV.hm = 12; MV.hy--; } }
  else { MV.m += n; if (MV.m > 12) { MV.m = 1; MV.y++; } if (MV.m < 1) { MV.m = 12; MV.y--; } }
  renderMonthly();
}

/* ---------------- kalender ---------------- */
const CV = { y: 0, m: 0 };
function renderCalendar() {
  if (!CV.y) { CV.y = TODAY.p.y; CV.m = TODAY.p.m; }
  const first = U(CV.y, CV.m, 1), n = new Date(Date.UTC(CV.y, CV.m, 0)).getUTCDate(), start = addD(first, -parts(first).wd);
  const hf = hijri(first), hl = hijri(U(CV.y, CV.m, n));
  $('#cTitle').textContent = D.MONTHS[CV.m - 1] + ' ' + CV.y;
  $('#cSub').textContent = D.HIJRI_MONTHS[hf.m - 1] + (hf.m !== hl.m ? ' – ' + D.HIJRI_MONTHS[hl.m - 1] : '') + ' ' + hl.y + ' H';
  $('#calHead').innerHTML = ['Ahad', 'Sen', 'Sel', 'Rab', 'Kam', "Jum", 'Sab'].map(d => '<div>' + d + '</div>').join('');
  const cells = Math.ceil((parts(first).wd + n) / 7) * 7; let html = '';
  for (let i = 0; i < cells; i++) {
    const dt = addD(start, i), p = parts(dt), inf = dayInfo(dt), cls = ['cday'];
    if (p.m !== CV.m) cls.push('out');
    if (p.wd === 0) cls.push('sun'); if (p.wd === 5) cls.push('fri');
    if (dkey(dt) === TODAY.key) cls.push('today');
    if (inf.hol.some(x => x.kind === 'libur')) cls.push('hol');
    const dots = [];
    inf.hol.forEach(x => dots.push('dot-' + (x.kind === 'libur' ? 'libur' : x.kind === 'sunnah' ? 'sunnah' : 'peringatan')));
    if (inf.fast.some(f => /Arafah|Asyura|Tasu|Tarwiyah/.test(f.name))) dots.push('dot-sunnah');
    else if (inf.fast.some(f => /Senin|Kamis|Bidh/.test(f.name))) dots.push('dot-puasa');
    const uniq = Array.from(new Set(dots)).slice(0, 3);
    html += '<button class="' + cls.join(' ') + '" data-d="' + dkey(dt) + '" title="' + esc(inf.hol.map(x => x.name).join(', ')) + '"><span class="dots">' +
      uniq.map(c => '<i class="' + c + '"></i>').join('') + '</span><span class="g">' + p.d + '</span><span class="h"><span>' +
      (inf.h.d === 1 ? HSHORT[inf.h.m - 1] + ' ' : '') + inf.h.d + '</span><span class="ar">' + toAr(inf.h.d) + '</span></span></button>';
  }
  $('#calGrid').innerHTML = html;
}
function openDay(key) {
  const [y, m, d] = key.split('-').map(Number), dt = U(y, m, d), inf = dayInfo(dt), t = times(dt);
  $('#ddTitle').textContent = fmtDate(dt);
  let html = '<p style="margin:0 0 4px;font-weight:700">' + esc(hStr(inf.h)) + ' · ' + pasaran(dt) + '</p><p class="ar" style="margin:0 0 14px;font-size:1.3rem;color:var(--gold)">' + hAr(inf.h) + '</p>';
  html += '<div class="dd-times">' + KEYS.map(k => '<div><small>' + esc(pname(k, dt)) + '</small><b>' + fmt(t[k]) + '</b></div>').join('') + '</div>';
  const items = [];
  inf.hol.forEach(x => items.push(['star8', x.name, x.desc]));
  inf.fast.forEach(f => items.push(['utensils', f.name, f.type === 'haram' ? 'Hari yang diharamkan berpuasa.' : f.type === 'wajib' ? 'Puasa wajib bulan Ramadhan.' : 'Amalan puasa sunnah.']));
  inf.ev.forEach(e => items.push(['history', e.title, e.desc]));
  if (items.length) html += '<div class="sec-title">Keterangan</div>' + items.map(i => '<div class="ev"><div class="evi">' + ic(i[0]) + '</div><div><h4>' + esc(i[1]) + '</h4><p>' + esc(i[2]) + '</p></div></div>').join('');
  $('#ddBody').innerHTML = html; openModal('mDay');
}

/* ---------------- hari besar ---------------- */
function upcoming(n, maxDays) {
  const out = [];
  for (let i = 0; i < (maxDays || 420) && out.length < n; i++) {
    const dt = addD(TODAY.dt, i), inf = dayInfo(dt);
    inf.hol.forEach(x => { if (x.name === 'Hari Tasyrik' && inf.h.d !== 11) return; out.push(Object.assign({ dt: dt, h: inf.h, days: i }, x)); });
  }
  return out.slice(0, n);
}
function renderHolidays() {
  const list = upcoming(14);
  $('#hYear').textContent = TODAY.h.y + ' – ' + (TODAY.h.y + 1) + ' H';
  $('#hList').innerHTML = list.map((x, i) => {
    const kind = x.kind === 'libur' ? 'Libur Nasional' : x.kind === 'sunnah' ? 'Amalan Sunnah' : 'Peringatan';
    return '<div class="hitem ' + esc(x.kind) + '" style="animation-delay:' + (i * 0.04) + 's"><div class="hbadge"><b>' + x.h.d + '</b><small>' + esc(D.HIJRI_MONTHS[x.h.m - 1]) + '</small></div>' +
      '<div><h4>' + esc(x.name) + '</h4><p>' + esc(x.desc || '') + '</p><div class="when"><span class="chip">' + ic('calendar') + esc(fmtDate(x.dt)) + '</span><span class="chip ' + (x.kind === 'libur' ? 'accent' : 'gold') + '">' + kind + '</span></div></div>' +
      '<div class="count ' + (x.days === 0 ? 'today' : '') + '">' + (x.days === 0 ? '<b>Hari ini</b>' : x.days === 1 ? '<b>1</b><small>besok</small>' : '<b>' + x.days + '</b><small>hari lagi</small>') + '</div></div>';
  }).join('');
}

/* ---------------- kiblat ---------------- */
const KAABA = { lat: 21.422487, lng: 39.826206 };
function qiblaDeg(lat, lng) {
  const p1 = lat * D2R, p2 = KAABA.lat * D2R, dl = (KAABA.lng - lng) * D2R;
  return (Math.atan2(Math.sin(dl), Math.cos(p1) * Math.tan(p2) - Math.sin(p1) * Math.cos(dl)) * R2D + 360) % 360;
}
function distKm(a, b, c, d) {
  const dp = (c - a) * D2R, dl = (d - b) * D2R, x = Math.sin(dp / 2) ** 2 + Math.cos(a * D2R) * Math.cos(c * D2R) * Math.sin(dl / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
let HEADING = 0;
function renderQibla() {
  const deg = qiblaDeg(LOC.lat, LOC.lng), km = distKm(LOC.lat, LOC.lng, KAABA.lat, KAABA.lng);
  $('#qDeg').textContent = deg.toFixed(1).replace('.', ',') + '°';
  $('#qDist').textContent = Math.round(km).toLocaleString('id-ID') + ' km';
  let dial = '<circle cx="100" cy="100" r="96" fill="var(--surface-solid)" stroke="var(--line-2)" stroke-width="1.5"/><circle cx="100" cy="100" r="78" fill="none" stroke="var(--line)"/>';
  for (let a = 0; a < 360; a += 5) {
    const long = a % 30 === 0, r1 = long ? 84 : 89;
    dial += '<line x1="' + (100 + r1 * sin(a)).toFixed(2) + '" y1="' + (100 - r1 * cos(a)).toFixed(2) + '" x2="' + (100 + 94 * sin(a)).toFixed(2) + '" y2="' + (100 - 94 * cos(a)).toFixed(2) + '" stroke="' + (long ? 'var(--primary)' : 'var(--faint)') + '" stroke-width="' + (long ? 1.6 : .8) + '"/>';
  }
  [['U', 0], ['T', 90], ['S', 180], ['B', 270]].forEach(([l, a]) => {
    dial += '<text x="' + (100 + 68 * sin(a)).toFixed(1) + '" y="' + (100 - 68 * cos(a) + 5).toFixed(1) + '" text-anchor="middle" font-size="14" font-weight="800" fill="' + (l === 'U' ? 'var(--accent)' : 'var(--text)') + '" font-family="Plus Jakarta Sans">' + l + '</text>';
  });
  dial += '<g opacity=".18" fill="none" stroke="var(--gold)"><path d="M70 70h60v60H70z"/><path d="M100 57.6 142.4 100 100 142.4 57.6 100z"/></g>';
  $('#dial').innerHTML = dial;
  $('#needle').innerHTML = '<g id="needleG"><line x1="100" y1="100" x2="100" y2="30" stroke="var(--accent)" stroke-width="3.5" stroke-linecap="round"/>' +
    '<line x1="100" y1="100" x2="100" y2="128" stroke="var(--faint)" stroke-width="3.5" stroke-linecap="round"/>' +
    '<g transform="translate(88 6)"><rect width="24" height="24" rx="4" fill="#1A1A1A" stroke="var(--gold)" stroke-width="1.5"/><path d="M0 8h24" stroke="var(--gold)" stroke-width="2.5"/></g>' +
    '<circle cx="100" cy="100" r="7" fill="var(--accent)" stroke="#fff" stroke-width="2.5"/></g>';
  updateCompass(deg);
  const t1 = 9 * 60 + 18 + LOC.tz * 60, t2 = 9 * 60 + 27 + LOC.tz * 60;
  $('#qRashd').innerHTML = '<b>Rashdul Kiblat:</b> setiap 27/28 Mei pukul ' + fmt(t1) + ' dan 15/16 Juli pukul ' + fmt(t2) + ' ' + tzLabel(LOC.tz) +
    ', matahari tepat di atas Ka\'bah — bayangan benda tegak lurus membelakangi arah kiblat (berlaku bila saat itu matahari masih terlihat di lokasi Anda).';
}
function updateCompass(deg) {
  deg = deg == null ? qiblaDeg(LOC.lat, LOC.lng) : deg;
  $('#dial').style.transform = 'rotate(' + (-HEADING) + 'deg)';
  $('#needle').style.transform = 'rotate(' + (deg - HEADING) + 'deg)';
}
function enableSensor() {
  const handler = e => {
    let h = null;
    if (typeof e.webkitCompassHeading === 'number') h = e.webkitCompassHeading;
    else if (e.absolute && typeof e.alpha === 'number') h = 360 - e.alpha;
    if (h != null) { HEADING = h; updateCompass(); }
  };
  const start = () => {
    window.addEventListener('deviceorientationabsolute', handler, true);
    window.addEventListener('deviceorientation', handler, true);
    toast('Kompas aktif', 'Letakkan ponsel mendatar & jauhkan dari benda logam.', 'compass');
    setTimeout(() => { if (!HEADING) toast('Sensor tidak terdeteksi', 'Perangkat/peramban ini tidak memberi data arah. Gunakan derajat kiblat di samping.', 'info', 'gold'); }, 3500);
  };
  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission().then(r => r === 'granted' ? start() : toast('Izin ditolak', 'Akses sensor kompas tidak diizinkan.', 'info', 'gold')).catch(() => start());
  } else if (window.DeviceOrientationEvent) start();
  else toast('Tidak didukung', 'Perangkat ini tidak memiliki sensor kompas.', 'info', 'gold');
}

/* ---------------- mutiara ---------------- */
function allQuotes() {
  const cq = (ST.customQuotes || []).filter(q => q && (q.id || q.ar)).map(q => ({ t: q.t || 'Mutiara', ar: q.ar || '', id: q.id || '', src: q.src || '' }));
  return cq.concat(D.QUOTES);
}
let QI = -1;
function renderQuote(random) {
  const qs = allQuotes(); if (!qs.length) return;
  if (random) { let n; do { n = Math.floor(Math.random() * qs.length); } while (qs.length > 1 && n === QI); QI = n; }
  else { const doy = Math.floor((TODAY.dt - U(TODAY.p.y, 1, 1)) / 864e5); QI = (doy + TODAY.p.y * 7) % qs.length; }
  const q = qs[QI], body = $('#qBody');
  const put = () => {
    $('#qType').textContent = q.t; $('#qAr').textContent = q.ar; $('#qAr').classList.toggle('hidden', !q.ar);
    $('#qId').textContent = '“' + q.id + '”'; $('#qSrc').textContent = q.src;
    $('#kQuote').innerHTML = (q.ar ? '<span class="ar">' + esc(q.ar) + '</span>' : '') + '“' + esc(q.id) + '” — <b>' + esc(q.src) + '</b>';
    body.classList.remove('out');
  };
  if (random) { body.classList.add('out'); setTimeout(put, 300); } else put();
}
function copyText(txt) {
  const done = () => toast('Tersalin', 'Mutiara telah disalin ke papan klip.', 'check');
  const fb = () => { const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) {} ta.remove(); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, fb); else fb();
}

/* ---------------- peristiwa ---------------- */
function renderEvents() {
  const inf = TODAY.info, h = TODAY.h;
  $('#evDate').textContent = h.d + ' ' + D.HIJRI_MONTHS[h.m - 1];
  let html = '';
  inf.hol.forEach(x => { html += '<div class="ev today"><div class="evi">' + ic('star8') + '</div><div><div class="meta">Hari ini</div><h4>' + esc(x.name) + '</h4><p>' + esc(x.desc) + '</p></div></div>'; });
  inf.ev.forEach(e => { html += '<div class="ev today"><div class="evi">' + ic('history') + '</div><div><div class="meta">' + (e.cal === 'hijri' ? 'Tanggal ' + h.d + ' ' + esc(D.HIJRI_MONTHS[h.m - 1]) : 'Tanggal ' + TODAY.p.d + ' ' + D.MONTHS[TODAY.p.m - 1]) + '</div><h4>' + esc(e.title) + '</h4><p>' + esc(e.desc) + '</p></div></div>'; });
  if (!html) html = '<div class="ev"><div class="evi">' + ic('book') + '</div><div><div class="meta">Sejarah bulan ' + esc(D.HIJRI_MONTHS[h.m - 1]) + '</div><p>' + esc(D.MONTH_NOTES[h.m - 1]) + '</p></div></div>';
  const soon = [];
  for (let i = 1; i <= 90 && soon.length < 3; i++) {
    const dt = addD(TODAY.dt, i), di = dayInfo(dt);
    di.hol.forEach(x => { if (soon.length < 3 && !(x.name === 'Hari Tasyrik' && di.h.d !== 11)) soon.push({ i: i, t: x.name, dt: dt }); });
    di.ev.forEach(x => { if (soon.length < 3 && !soon.some(s => s.t === x.title || s.i === i)) soon.push({ i: i, t: x.title, dt: dt }); });
  }
  if (soon.length) html += '<div class="sec-title" style="margin-top:14px">Segera</div>' + soon.map(s =>
    '<div class="ev"><div class="evi">' + ic('calendar') + '</div><div><div class="meta">' + (s.i === 1 ? 'Besok' : s.i + ' hari lagi') + ' · ' + esc(fmtDate(s.dt, false)) + '</div><h4>' + esc(s.t) + '</h4></div></div>').join('');
  $('#evList').innerHTML = html;
}

/* ---------------- pengingat ---------------- */
function remPrefs() { return Object.assign({}, ST.reminders || {}, LS.get('rem', {})); }
function agendaFor(dt) {
  const R = remPrefs(), t = times(dt), tY = times(addD(dt, -1)), inf = dayInfo(dt), p = parts(dt), items = [];
  const add = (min, cat, icon, title, msg) => { if (isFinite(min)) items.push({ min: Math.round(min), cat: cat, icon: icon, title: title, msg: msg }); };
  const fast = inf.fast.filter(f => f.type !== 'haram');
  if (R.tahajud) add(tY.maghrib + ((t.fajr + 1440) - tY.maghrib) * 2 / 3 - 1440, 'tahajud', 'moonStar', 'Sepertiga malam terakhir', 'Waktu mustajab untuk tahajud, witir, dan istighfar.');
  if (R.imsak && fast.length) {
    add(t.imsak - 45, 'sahur', 'utensils', 'Waktunya sahur', 'Bersiap sahur — ' + fast.map(f => f.name).join(', ') + '.');
    add(t.imsak, 'imsak', 'moonStar', 'Imsak', 'Telah masuk waktu imsak, ' + (ST.calc.imsak || 10) + ' menit menuju Subuh.');
  }
  const P = [['fajr', 'Subuh'], ['dhuhr', p.wd === 5 ? "Jum'at" : 'Dzuhur'], ['asr', 'Ashar'], ['maghrib', 'Maghrib'], ['isha', "Isya'"]];
  if (R.prayers) P.forEach(([k, n]) => add(t[k], 'prayer', PIC[k], 'Waktu ' + n, 'Telah masuk waktu shalat ' + n + ' untuk ' + LOC.name + ' dan sekitarnya.'));
  if (R.fasting && fast.length) add(t.maghrib, 'iftar', 'utensils', 'Waktunya berbuka', 'Allahumma laka shumtu… Selamat berbuka puasa.');
  if (R.dzikir) { add(t.fajr + 20, 'dzikir', 'sparkle', 'Dzikir pagi', 'Baca wirid/dzikir pagi setelah Subuh.'); add(t.asr + 15, 'dzikir', 'sparkle', 'Dzikir petang', 'Baca wirid/dzikir petang setelah Ashar.'); }
  if (R.dhuha) add(t.dhuha + 5, 'dhuha', 'sunSmall', 'Shalat Dhuha', 'Waktu Dhuha telah tiba — minimal 2 rakaat.');
  if (R.jumat && p.wd === 5) {
    add(t.sunrise + 60, 'jumat', 'book', 'Membaca Al-Kahfi', "Sunnah membaca surat Al-Kahfi di hari Jum'at.");
    add(t.dhuhr - 30, 'jumat', 'mosque', "Bersiap shalat Jum'at", 'Mandi, berpakaian terbaik, memakai wewangian, dan bersegera ke masjid.');
  }
  if (R.jumat && p.wd === 4) add(t.maghrib + 10, 'jumat', 'moonStar', "Malam Jum'at", 'Perbanyak shalawat dan bacaan Al-Qur\'an.');
  if (R.fasting) {
    const ff = dayInfo(addD(dt, 1)).fast.filter(f => f.type !== 'haram');
    if (ff.length) add(t.isha + 60, 'fasting', 'utensils', 'Besok: ' + ff.map(f => f.name).join(' & '), 'Jangan lupa niat dan pasang alarm sahur.');
  }
  (ST.customReminders || []).forEach(r => {
    if (!r || !r.time) return; const days = r.days || [];
    if (days.length && days.map(Number).indexOf(p.wd) < 0) return;
    const hm = String(r.time).split(':').map(Number); add(hm[0] * 60 + hm[1], 'custom', 'bell', r.label || 'Pengingat', r.msg || '');
  });
  return items.sort((a, b) => a.min - b.min);
}
function renderAgenda() {
  const list = TODAY.agenda;
  $('#agList').innerHTML = list.length ? list.map((it, i) => '<li data-i="' + i + '"><span class="t">' + fmt(it.min) + '</span><span class="b"></span><span class="lbl"><b>' + esc(it.title) + '</b><small>' + esc(it.msg) + '</small></span></li>').join('')
    : '<li><span></span><span></span><span class="lbl"><small>Semua pengingat dinonaktifkan. Ketuk “Atur” untuk mengaktifkan.</small></span></li>';
  renderAgendaState(nowL().getUTCHours() * 60 + nowL().getUTCMinutes());
}
function renderAgendaState(min) {
  const list = TODAY.agenda || []; let nextSet = false;
  $$('#agList li[data-i]').forEach(li => {
    const it = list[+li.dataset.i]; const done = it.min <= min;
    li.classList.toggle('done', done);
    const isNext = !done && !nextSet; if (isNext) nextSet = true;
    li.classList.toggle('next', isNext);
  });
}
let lastRemKey = '';
function checkReminders(min) {
  const key = TODAY.key + '@' + min;
  if (key === lastRemKey) return;
  const first = !lastRemKey; lastRemKey = key;
  if (first) return;
  const R = remPrefs();
  (TODAY.agenda || []).forEach(it => { if (it.min === min) notify(it.title, it.msg, it.icon, it.cat === 'prayer' ? '' : it.cat === 'iftar' || it.cat === 'sahur' ? 'accent' : 'gold', it.cat === 'prayer'); });
  if (R.prayers && +R.before > 0) {
    [['fajr', 'Subuh'], ['dhuhr', TODAY.p.wd === 5 ? "Jum'at" : 'Dzuhur'], ['asr', 'Ashar'], ['maghrib', 'Maghrib'], ['isha', "Isya'"]].forEach(([k, n]) => {
      if (TODAY.t[k] - (+R.before) === min) notify(R.before + ' menit menuju ' + n, 'Bersiaplah — ambil wudhu dan luruskan niat.', 'alarm', 'accent', false);
    });
  }
}
function notify(title, msg, icon, variant, long) {
  toast(title, msg, icon || 'bell', variant || '', long ? 15000 : 10000);
  if (remPrefs().sound) chime(long);
  try { if (window.Notification && Notification.permission === 'granted' && document.hidden) new Notification(title, { body: msg }); } catch (e) {}
}
let AC = null;
function audio() { if (!AC) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; AC = new C(); } if (AC.state === 'suspended') AC.resume(); return AC; }
function chime(long) {
  const ac = audio(); if (!ac) return;
  const notes = long ? [659.25, 783.99, 987.77, 1318.51, 987.77, 1174.66] : [880, 1318.51];
  notes.forEach((f, i) => {
    [[f, .2], [f * 2.01, .05]].forEach(([fr, vol]) => {
      const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + i * (long ? .45 : .22), dur = long ? 1.8 : 1.1;
      o.type = 'sine'; o.frequency.value = fr;
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + .02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + dur + .05);
    });
  });
}
function renderRemModal() {
  const R = remPrefs();
  const row = (k, icon, title, sub) => '<div class="tg"><div class="tl"><span class="ico">' + ic(icon) + '</span><div><b>' + title + '</b><small>' + sub + '</small></div></div><label class="sw"><input type="checkbox" data-rem="' + k + '"' + (R[k] ? ' checked' : '') + '><span></span></label></div>';
  const before = [0, 5, 10, 15, 20, 30].map(v => '<option value="' + v + '"' + (+R.before === v ? ' selected' : '') + '>' + (v ? v + ' menit sebelumnya' : 'Tidak perlu') + '</option>').join('');
  let notif = '';
  if (window.Notification) notif = Notification.permission === 'granted' ? '<span class="chip">' + ic('check') + 'Notifikasi peramban aktif</span>' : '<button class="btn sm" id="remNotif">' + ic('bell') + 'Izinkan notifikasi peramban</button>';
  $('#remBody').innerHTML =
    row('prayers', 'mosque', 'Waktu shalat', 'Saat masuk waktu Subuh, Dzuhur, Ashar, Maghrib, Isya') +
    '<div class="field" style="margin:10px 0 4px"><label>Peringatan sebelum waktu shalat</label><select class="input" data-rem="before">' + before + '</select></div>' +
    row('sound', 'volume', 'Suara pengingat', 'Bunyi lonceng lembut saat pengingat muncul') +
    row('imsak', 'moonStar', 'Sahur & imsak', 'Pada hari puasa (Ramadhan & sunnah)') +
    row('fasting', 'utensils', 'Puasa wajib & sunnah', 'Senin–Kamis, Ayyamul Bidh, Arafah, Asyura, berbuka') +
    row('dzikir', 'sparkle', 'Dzikir pagi & petang', 'Setelah Subuh dan setelah Ashar') +
    row('dhuha', 'sunSmall', 'Shalat Dhuha', 'Saat waktu Dhuha tiba') +
    row('tahajud', 'moon', 'Tahajud', 'Awal sepertiga malam terakhir') +
    row('jumat', 'book', "Amalan Jum'at", "Malam Jum'at, Al-Kahfi, dan persiapan shalat Jum'at") +
    '<div class="note" style="margin-top:14px">' + ic('info') + '<span>Pengingat berjalan selama halaman ini terbuka. Pengaturan tersimpan di perangkat ini.</span></div>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px"><button class="btn primary sm" id="remTest">' + ic('bell') + 'Tes pengingat</button>' + notif + '</div>';
  $$('#remBody [data-rem]').forEach(el => el.addEventListener('change', () => {
    const cur = LS.get('rem', {}); cur[el.dataset.rem] = el.type === 'checkbox' ? el.checked : +el.value; LS.set('rem', cur);
    TODAY.agenda = agendaFor(TODAY.dt); renderAgenda();
  }));
  $('#remTest').onclick = () => { audio(); notify('Tes pengingat ' + (ST.appName || ''), 'Beginilah tampilan & suara pengingat ibadah Anda.', 'bell', '', true); };
  const nb = $('#remNotif'); if (nb) nb.onclick = () => { try { Notification.requestPermission().then(() => renderRemModal()); } catch (e) { toast('Tidak tersedia', 'Peramban tidak mengizinkan notifikasi pada halaman ini.', 'info', 'gold'); } };
}

/* ---------------- toast & modal ---------------- */
function toast(title, msg, icon, variant, ms) {
  ms = ms || 6000;
  const el = document.createElement('div'); el.className = 'toast ' + (variant || '');
  el.innerHTML = '<div class="ti">' + ic(icon || 'bell') + '</div><div><b>' + esc(title) + '</b>' + (msg ? '<p>' + esc(msg) + '</p>' : '') + '</div><button class="x" aria-label="Tutup">' + ic('x') + '</button><span class="bar" style="animation-duration:' + ms + 'ms"></span>';
  const close = () => { el.classList.add('out'); setTimeout(() => el.remove(), 400); };
  $('.x', el).onclick = close; setTimeout(close, ms);
  $('#toasts').prepend(el);
  while ($('#toasts').children.length > 4) $('#toasts').lastChild.remove();
}
function openModal(id) { $('#' + id).classList.add('open'); }
function closeModal(id) { $('#' + id).classList.remove('open'); }

/* ---------------- lokasi ---------------- */
const FOREIGN = ['Arab Saudi', 'Malaysia', 'Singapura', 'Mesir', 'Turki'];
function cityObj(c) { return { name: c[0], region: c[1], country: FOREIGN.indexOf(c[1]) > -1 ? c[1] : 'Indonesia', lat: c[2], lng: c[3], tz: c[4], elev: c[5] }; }
function renderCities(q) {
  q = (q || '').toLowerCase().trim();
  const list = D.CITIES.filter(c => !q || (c[0] + ' ' + c[1]).toLowerCase().indexOf(q) > -1);
  $('#cityList').innerHTML = list.map(c => '<button class="city' + (c[0] === LOC.name ? ' on' : '') + '" data-city="' + esc(c[0]) + '"><b>' + esc(c[0]) + '</b><small>' + esc(c[1]) + ' · ' + tzLabel(c[4], cityObj(c)) + '</small></button>').join('') ||
    '<p class="muted" style="font-size:.84rem">Tidak ada di daftar cepat — lihat hasil pencarian di atas.</p>';
}
function tzFor(pl, device) {
  if (isIndo(pl)) {
    let best = null, len = 0; const reg = (pl.region || '').toLowerCase();
    Object.keys(D.PROVINCE_TZ).forEach(k => { if (reg.indexOf(k.toLowerCase()) > -1 && k.length > len) { best = D.PROVINCE_TZ[k]; len = k.length; } });
    if (best != null) return best;
    return pl.lng >= 126 ? 9 : pl.lng >= 114.45 ? 8 : 7;
  }
  if (device) return -new Date().getTimezoneOffset() / 60;
  return Math.round(pl.lng / 15);
}
function setLocation(l, quiet) {
  LOC = normLoc(l); LS.set('loc', LOC); PTC.clear(); refreshDay(); resetMonthView(); CV.y = 0; renderAll(); lastStateKey = '';
  closeModal('mLoc');
  if (!quiet) toast('Lokasi diperbarui', LOC.name + (LOC.region ? ', ' + LOC.region : '') + ' · ' + tzLabel(LOC.tz), 'pin');
}
function fillManual() {
  $('#mName').value = LOC.name; $('#mLat').value = LOC.lat; $('#mLng').value = LOC.lng; $('#mElev').value = LOC.elev || 0;
  $('#mTz').innerHTML = tzOptions(LOC.tz);
}
function tzOptions(sel) {
  const vals = []; for (let i = -12; i <= 14; i++) vals.push(i); [3.5, 4.5, 5.5, 5.75, 6.5, 9.5, -3.5].forEach(v => vals.push(v)); vals.sort((a, b) => a - b);
  return vals.map(v => '<option value="' + v + '"' + (+sel === v ? ' selected' : '') + '>' + (v === 7 ? 'UTC+7 (WIB)' : v === 8 ? 'UTC+8 (WITA)' : v === 9 ? 'UTC+9 (WIT)' : tzLabel(v, { country: '' })) + '</option>').join('');
}
let searchTimer = null, searchSeq = 0;
function searchPlaces(q) {
  const seq = ++searchSeq;
  $('#locResults').innerHTML = '<p class="muted" style="font-size:.84rem">Mencari “' + esc(q) + '”…</p>';
  rpc('geocode', q).then(list => {
    if (seq !== searchSeq) return;
    if (!list || !list.length) { $('#locResults').innerHTML = '<p class="muted" style="font-size:.84rem">Lokasi tidak ditemukan. Coba nama lain atau isi koordinat manual.</p>'; return; }
    window.__places = list;
    $('#locResults').innerHTML = list.map((p, i) => '<button class="result" data-pi="' + i + '">' + ic('pin') + '<span><b>' + esc(p.name) + '</b><small>' + esc(p.address || [p.region, p.country].filter(Boolean).join(', ')) + '</small></span></button>').join('');
  }).catch(e => { if (seq === searchSeq) $('#locResults').innerHTML = '<p class="muted" style="font-size:.84rem">Pencarian gagal: ' + esc(e.message || e) + '</p>'; });
}
function locateMe(silent) {
  if (!navigator.geolocation) { if (!silent) toast('Tidak didukung', 'Peramban tidak mendukung deteksi lokasi.', 'info', 'gold'); return; }
  const btn = $('#useGeo'); btn.disabled = true; btn.innerHTML = ic('locate') + 'Mendeteksi lokasi…';
  const reset = () => { btn.disabled = false; btn.innerHTML = ic('locate') + 'Gunakan lokasi saat ini'; };
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = +pos.coords.latitude.toFixed(5), lng = +pos.coords.longitude.toFixed(5), elev = Math.max(0, Math.round(pos.coords.altitude || 0));
    rpc('reverseGeocode', lat, lng).then(pl => {
      pl = pl || {}; pl.lat = lat; pl.lng = lng;
      setLocation({ name: pl.name || 'Lokasi Saya', region: pl.region || '', country: pl.country || '', countryCode: pl.countryCode || '', lat: lat, lng: lng, tz: tzFor(pl, true), elev: elev });
    }).catch(() => setLocation({ name: 'Lokasi Saya', region: '', country: '', lat: lat, lng: lng, tz: -new Date().getTimezoneOffset() / 60, elev: elev })).then(reset, reset);
  }, err => {
    reset();
    if (!silent) toast('Lokasi tidak dapat diakses', (err && err.code === 1 ? 'Izin lokasi ditolak. ' : '') + 'Silakan pilih kota dari daftar atau cari nama kota Anda.', 'pin', 'gold', 8000);
  }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 });
}

/* ---------------- layar penuh ---------------- */
function openKiosk() {
  $('#kiosk').classList.add('open'); kioskOpen = true; LASTTXT.clear(); renderQuote(false); lastStateKey = ''; tick();
  const el = document.documentElement;
  try { const p = el.requestFullscreen ? el.requestFullscreen() : el.webkitRequestFullscreen ? el.webkitRequestFullscreen() : null; if (p && p.catch) p.catch(() => {}); } catch (e) {}
}
function closeKiosk() {
  $('#kiosk').classList.remove('open'); kioskOpen = false;
  try { if (document.fullscreenElement) document.exitFullscreen(); else if (document.webkitFullscreenElement) document.webkitExitFullscreen(); } catch (e) {}
}

/* ---------------- tab ---------------- */
/* Tab dirender hanya saat dibuka (lebih ringan saat halaman dimuat) */
const LAZY = { calendar: () => renderCalendar(), holidays: () => renderHolidays(), qibla: () => renderQibla() };
const DIRTY = {};
function showTab(name) {
  $$('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  $$('.panel').forEach(p => p.classList.toggle('active', p.dataset.panel === name));
  if (DIRTY[name] && LAZY[name]) { DIRTY[name] = false; LAZY[name](); }
  positionInk();
  if (name === 'monthly') { const tr = $('#mTable tr.today'); if (tr) $('.table-wrap').scrollTop = Math.max(0, tr.offsetTop - 120); }
}
function positionInk() { const a = $('.tab.active'), ink = $('#tabInk'); if (!a || !ink) return; ink.style.left = a.offsetLeft + 'px'; ink.style.width = a.offsetWidth + 'px'; }

function renderAll() {
  renderHero(); renderTimes(); renderMonthly(); renderQuote(false); renderAgenda();
  const act = ($('.tab.active') || {}).dataset || {};
  Object.keys(LAZY).forEach(k => { if (act.tab === k) { DIRTY[k] = false; LAZY[k](); } else DIRTY[k] = true; });
  idle(renderEvents);
  $('#footerMeta').textContent = (ST.appName || 'WAQTY') + ' v' + (ST.version || '1.0.0') + ' · Metode ' + (METHODS[ST.calc.method] || METHODS.CUSTOM).label + ' · ' + LOC.name + ' (' + tzLabel(LOC.tz) + ')';
  positionInk();
}

/* ============================================================
 *  PANEL ADMIN (ketuk logo 5x)
 * ============================================================ */
const ADM = { token: null, draft: null, defaults: null, sec: 'umum', dirty: false };
const ASEC = [
  ['umum', 'home', 'Umum'], ['lokasi', 'pin', 'Lokasi Default'], ['hitung', 'calc', 'Perhitungan'], ['tampilan', 'palette', 'Tampilan'],
  ['bagian', 'layout', 'Bagian Halaman'], ['mutiara', 'quote', 'Mutiara'], ['peristiwa', 'history', 'Hari Besar & Peristiwa'],
  ['pengingat', 'bell', 'Pengingat'], ['keamanan', 'shield', 'Keamanan & Data']
];
const getP = (o, p) => p.split('.').reduce((a, k) => a == null ? a : a[k], o);
const setP = (o, p, v) => { const ks = p.split('.'); let a = o; ks.slice(0, -1).forEach(k => { if (a[k] == null || typeof a[k] !== 'object') a[k] = {}; a = a[k]; }); a[ks[ks.length - 1]] = v; };
function F(path, label, type, opt) {
  opt = opt || {}; const v = getP(ADM.draft, path), id = 'f_' + path.replace(/\./g, '_');
  const help = opt.help ? '<span class="help">' + opt.help + '</span>' : '';
  if (type === 'toggle') return '<div class="tg"><div class="tl"><div><b>' + label + '</b>' + (opt.help ? '<small>' + opt.help + '</small>' : '') + '</div></div><label class="sw"><input type="checkbox" data-path="' + path + '" data-type="bool"' + (v ? ' checked' : '') + '><span></span></label></div>';
  let input;
  if (type === 'textarea') input = '<textarea class="input" id="' + id + '" data-path="' + path + '">' + esc(v) + '</textarea>';
  else if (type === 'select') input = '<select class="input" id="' + id + '" data-path="' + path + '" data-type="' + (opt.num ? 'num' : 'str') + '">' + opt.options.map(o => '<option value="' + esc(o[0]) + '"' + (String(o[0]) === String(v) ? ' selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>';
  else input = '<input class="input" id="' + id + '" type="' + (type === 'num' ? 'number' : type) + '"' + (opt.step ? ' step="' + opt.step + '"' : '') + (opt.min != null ? ' min="' + opt.min + '"' : '') + (opt.max != null ? ' max="' + opt.max + '"' : '') + ' data-path="' + path + '" data-type="' + (type === 'num' || type === 'range' ? 'num' : 'str') + '" value="' + esc(v == null ? '' : v) + '"' + (opt.ph ? ' placeholder="' + esc(opt.ph) + '"' : '') + '>';
  return '<div class="field"><label for="' + id + '">' + label + '</label>' + input + help + '</div>';
}
function openAdmin() { if (ADM.token) showAdmin(); else { $('#loginErr').classList.add('hidden'); $('#loginPw').value = ''; openModal('mLogin'); setTimeout(() => $('#loginPw').focus(), 200); } }
function showAdmin() {
  $('#aNav').innerHTML = ASEC.map(s => '<button data-sec="' + s[0] + '" class="' + (s[0] === ADM.sec ? 'on' : '') + '">' + ic(s[1]) + s[2] + '</button>').join('');
  renderAdminSec(); openModal('mAdmin');
}
function renderAdminSec() {
  const s = ADM.sec, d = ADM.draft; let h = '';
  $$('#aNav button').forEach(b => b.classList.toggle('on', b.dataset.sec === s));
  if (s === 'umum') {
    h = '<h4>Identitas Aplikasi</h4><p class="lead">Nama, logo, teks berjalan, dan footer.</p>' +
      '<div class="row">' + F('appName', 'Nama aplikasi', 'text') + F('tagline', 'Tagline', 'text') + '</div>' +
      F('welcome', 'Sapaan di hero', 'text', { help: 'Tampil setelah “Selamat pagi/siang…”.' }) +
      '<div class="row">' + F('logoUrl', 'URL logo (opsional)', 'url', { ph: 'https://…/logo.png', help: 'Kosongkan untuk memakai logo WAQTY bawaan.' }) + F('faviconUrl', 'URL favicon (opsional)', 'url', { ph: 'https://…/favicon.png' }) + '</div>' +
      F('runningText', 'Teks berjalan (pengumuman)', 'textarea', { help: 'Pisahkan beberapa info dengan tanda •' }) +
      F('sections.runningText', 'Tampilkan teks berjalan', 'toggle') +
      F('footer', 'Teks footer', 'text');
  } else if (s === 'lokasi') {
    h = '<h4>Lokasi Default</h4><p class="lead">Dipakai pengunjung yang belum memilih lokasi sendiri.</p>' +
      '<button class="btn sm" id="aUseLoc" style="margin-bottom:14px">' + ic('pin') + 'Pakai lokasi yang sedang aktif (' + esc(LOC.name) + ')</button>' +
      '<div class="row">' + F('defaultLocation.name', 'Nama lokasi', 'text') + F('defaultLocation.region', 'Provinsi / wilayah', 'text') + '</div>' +
      '<div class="row3">' + F('defaultLocation.lat', 'Lintang', 'num', { step: '0.0001' }) + F('defaultLocation.lng', 'Bujur', 'num', { step: '0.0001' }) + F('defaultLocation.elev', 'Ketinggian (m)', 'num') + '</div>' +
      '<div class="row">' + F('defaultLocation.tz', 'Zona waktu', 'select', { num: true, options: tzOptionsArr() }) + F('defaultLocation.country', 'Negara', 'text') + '</div>' +
      F('autoLocate', 'Minta lokasi otomatis saat pertama dibuka', 'toggle', { help: 'Pengunjung baru akan ditawari deteksi lokasi perangkat.' });
  } else if (s === 'hitung') {
    const c = d.calc;
    h = '<h4>Metode Perhitungan</h4><p class="lead">Pilih preset lalu sesuaikan bila perlu. Perubahan parameter otomatis menjadi “Kustom”.</p><div class="preset">' +
      Object.keys(METHODS).map(k => '<button data-preset="' + k + '" class="' + (c.method === k ? 'on' : '') + '"><b>' + METHODS[k].label + '</b><small>' + METHODS[k].note + '</small></button>').join('') + '</div>' +
      '<div class="row3">' + F('calc.fajr', 'Sudut Subuh (°)', 'num', { step: '0.1' }) + F('calc.isha', 'Sudut Isya (°)', 'num', { step: '0.1' }) + F('calc.dhuhaAlt', 'Tinggi matahari Dhuha (°)', 'num', { step: '0.1' }) + '</div>' +
      '<div class="row3">' + F('calc.imsak', 'Imsak (menit sebelum Subuh)', 'num') + F('calc.dhuhrPlus', 'Dzuhur + menit', 'num') + F('calc.asr', 'Mazhab Ashar', 'select', { num: true, options: [[1, "Syafi'i, Maliki, Hanbali"], [2, 'Hanafi']] }) + '</div>' +
      '<div class="row3">' + F('calc.sunAlt', 'Sudut terbit/terbenam (°)', 'num', { step: '0.0001', help: '0,9 = 0°54′ (LF PBNU) · 0,8333 = standar' }) + F('calc.ramadanMaghribPlus', 'Maghrib + menit (Ramadhan)', 'num') + F('hijriAdjust', 'Koreksi tanggal Hijriah', 'select', { num: true, options: [[-2, '−2 hari'], [-1, '−1 hari'], [0, 'Tanpa koreksi'], [1, '+1 hari'], [2, '+2 hari']] }) + '</div>' +
      F('calc.elevCorr', 'Koreksi ketinggian tempat untuk terbit & maghrib', 'toggle') +
      '<div class="sec-title">Ihtiyath (menit, boleh negatif)</div><div class="row3">' +
      KEYS.map(k => F('calc.ihtiyat.' + k, PNAME[k], 'num')).join('') + '</div>' +
      '<div class="sec-title">Pratinjau hari ini — ' + esc(LOC.name) + '</div><div class="dd-times" id="aPrev"></div>';
  } else if (s === 'tampilan') {
    h = '<h4>Tampilan</h4><p class="lead">Warna, ornamen, dan latar.</p>' +
      F('theme.default', 'Mode bawaan', 'select', { options: [['light', 'Terang (light)'], ['dark', 'Gelap (dark)']], help: 'Pengunjung tetap bisa mengganti lewat slider.' }) +
      '<div class="row3">' + F('theme.primary', 'Warna utama', 'color') + F('theme.accent', 'Warna aksen', 'color') + F('theme.gold', 'Warna ornamen (emas)', 'color') + '</div>' +
      F('theme.patternOpacity', 'Ketebalan pola ornamen latar (0–20)', 'range', { min: 0, max: 20, step: 1 }) +
      F('theme.pattern', 'Tampilkan pola geometris Islami', 'toggle') +
      F('theme.lanterns', 'Tampilkan lentera bergoyang', 'toggle') +
      F('theme.dynamicSky', 'Warna langit hero mengikuti waktu shalat', 'toggle') +
      F('theme.performance', 'Mode performa', 'select', { options: [['auto', 'Otomatis (ringan di perangkat lemah)'], ['full', 'Penuh — semua animasi'], ['lite', 'Ringan — tanpa animasi dekoratif']], help: 'Mode ringan mematikan lentera bergoyang & animasi masuk agar gulir lebih mulus.' }) +
      F('theme.heroImage', 'Gambar latar hero (opsional)', 'url', { ph: 'https://…/masjid.jpg', help: 'Kosongkan untuk latar gradasi langit.' }) +
      '<button class="btn sm" id="aResetColor">' + ic('refresh') + 'Kembalikan warna logo</button>';
  } else if (s === 'bagian') {
    h = '<h4>Bagian Halaman</h4><p class="lead">Tampilkan atau sembunyikan bagian.</p>' +
      F('sections.monthly', 'Tab Jadwal Imsakiyah bulanan', 'toggle') + F('sections.calendar', 'Tab Kalender Hijriah–Masehi', 'toggle') +
      F('sections.holidays', 'Tab Hari Besar Islam', 'toggle') + F('sections.qibla', 'Tab Arah Kiblat', 'toggle') +
      F('sections.quote', 'Kartu Mutiara Hari Ini', 'toggle') + F('sections.events', 'Kartu Peristiwa Hari Ini', 'toggle') + F('sections.agenda', 'Kartu Agenda Ibadah', 'toggle');
  } else if (s === 'mutiara') {
    h = '<h4>Mutiara Tambahan</h4><p class="lead">Ditambahkan ke ' + D.QUOTES.length + ' mutiara bawaan (Al-Qur\'an, hadits, syair, mahfudzat). Mutiara diputar harian.</p>' +
      listEditor('customQuotes', d.customQuotes, (q, i) =>
        '<div class="row">' + LF('customQuotes', i, 't', 'Jenis', 'select', q.t, [["Al-Qur'an", "Al-Qur'an"], ['Hadits', 'Hadits'], ['Syair', 'Syair'], ['Mahfudzat', 'Mahfudzat'], ['Kata Ulama', 'Kata Ulama'], ['Mutiara', 'Mutiara']]) +
        LF('customQuotes', i, 'src', 'Sumber', 'text', q.src) + '</div>' + LF('customQuotes', i, 'ar', 'Teks Arab (opsional)', 'textarea', q.ar, null, 'ar') + LF('customQuotes', i, 'id', 'Terjemah / isi', 'textarea', q.id), { t: 'Mutiara', ar: '', id: '', src: '' }, 'Tambah mutiara');
  } else if (s === 'peristiwa') {
    h = '<h4>Hari Besar & Peristiwa Kustom</h4><p class="lead">Tambahkan agenda lembaga, haul, hari jadi, dsb. Jenis “Peristiwa” tampil di kartu Peristiwa Hari Ini; jenis lain tampil di Hari Besar & Kalender.</p>' +
      listEditor('customEvents', d.customEvents, (e, i) =>
        '<div class="row">' + LF('customEvents', i, 'title', 'Judul', 'text', e.title) + LF('customEvents', i, 'kind', 'Jenis', 'select', e.kind, [['peristiwa', 'Peristiwa'], ['peringatan', 'Peringatan'], ['sunnah', 'Amalan sunnah'], ['libur', 'Libur / hari raya']]) + '</div>' +
        '<div class="row3">' + LF('customEvents', i, 'cal', 'Kalender', 'select', e.cal, [['hijri', 'Hijriah'], ['masehi', 'Masehi']]) + LF('customEvents', i, 'd', 'Tanggal', 'num', e.d) +
        LF('customEvents', i, 'm', 'Bulan', 'select', String(e.m), (e.cal === 'masehi' ? D.MONTHS : D.HIJRI_MONTHS).map((n, k) => [String(k + 1), (k + 1) + ' · ' + n])) + '</div>' +
        LF('customEvents', i, 'y', 'Tahun (kosongkan = setiap tahun)', 'num', e.y) + LF('customEvents', i, 'desc', 'Keterangan', 'textarea', e.desc),
        { title: '', kind: 'peristiwa', cal: 'hijri', d: 1, m: 1, y: '', desc: '' }, 'Tambah acara');
  } else if (s === 'pengingat') {
    h = '<h4>Pengingat</h4><p class="lead">Nilai bawaan untuk pengunjung (mereka dapat mengubahnya di perangkat masing-masing).</p>' +
      F('reminders.prayers', 'Waktu shalat', 'toggle') +
      F('reminders.before', 'Peringatan sebelum waktu shalat', 'select', { num: true, options: [[0, 'Tidak perlu'], [5, '5 menit'], [10, '10 menit'], [15, '15 menit'], [20, '20 menit'], [30, '30 menit']] }) +
      F('reminders.sound', 'Suara pengingat', 'toggle') + F('reminders.imsak', 'Sahur & imsak', 'toggle') + F('reminders.fasting', 'Puasa wajib & sunnah', 'toggle') +
      F('reminders.dzikir', 'Dzikir pagi & petang', 'toggle') + F('reminders.dhuha', 'Shalat Dhuha', 'toggle') + F('reminders.tahajud', 'Tahajud', 'toggle') + F('reminders.jumat', "Amalan Jum'at", 'toggle') +
      '<div class="sec-title">Pengingat kustom (kajian, kegiatan, dsb.)</div>' +
      listEditor('customReminders', d.customReminders, (r, i) =>
        '<div class="row">' + LF('customReminders', i, 'label', 'Judul', 'text', r.label) + LF('customReminders', i, 'time', 'Jam', 'time', r.time) + '</div>' +
        LF('customReminders', i, 'msg', 'Pesan', 'text', r.msg) +
        '<div class="field"><label>Hari (kosong = setiap hari)</label><div class="days">' + D.DAYS.map((n, k) => '<label><input type="checkbox" data-days="' + i + '" value="' + k + '"' + ((r.days || []).map(Number).indexOf(k) > -1 ? ' checked' : '') + '>' + n + '</label>').join('') + '</div></div>',
        { label: '', time: '19:30', msg: '', days: [] }, 'Tambah pengingat');
  } else if (s === 'keamanan') {
    h = '<h4>Keamanan & Data</h4><p class="lead">Ganti password, cadangkan, atau pulihkan pengaturan.</p>' +
      '<div class="sec-title">Ganti password admin</div>' +
      '<div class="row3"><div class="field"><label>Password lama</label><input class="input" type="password" id="pwOld"></div><div class="field"><label>Password baru</label><input class="input" type="password" id="pwNew"></div><div class="field"><label>Ulangi password baru</label><input class="input" type="password" id="pwNew2"></div></div>' +
      '<button class="btn primary sm" id="pwSave">' + ic('lock') + 'Ganti password</button>' +
      '<div class="sec-title">Cadangkan (ekspor)</div><textarea class="input" id="exJson" readonly style="min-height:120px;font-family:monospace;font-size:.78rem"></textarea>' +
      '<button class="btn sm" id="exCopy" style="margin-top:8px">' + ic('copy') + 'Salin JSON</button>' +
      '<div class="sec-title">Pulihkan (impor)</div><textarea class="input" id="imJson" placeholder="Tempel JSON cadangan di sini…" style="min-height:100px;font-family:monospace;font-size:.78rem"></textarea>' +
      '<button class="btn sm" id="imApply" style="margin-top:8px">' + ic('upload') + 'Muat ke formulir</button>' +
      '<div class="sec-title">Reset</div><button class="btn danger sm" id="aReset">' + ic('trash') + 'Kembalikan semua pengaturan ke bawaan</button>';
  }
  const main = $('#aMain'); main.innerHTML = h; main.scrollTop = 0;
  bindAdminSec();
}
function tzOptionsArr() { const a = []; for (let i = -12; i <= 14; i++) a.push(i); [3.5, 4.5, 5.5, 5.75, 6.5, 9.5].forEach(v => a.push(v)); return a.sort((x, y) => x - y).map(v => [v, v === 7 ? 'UTC+7 (WIB)' : v === 8 ? 'UTC+8 (WITA)' : v === 9 ? 'UTC+9 (WIT)' : tzLabel(v, { country: '' })]); }
function LF(list, i, key, label, type, val, options, cls) {
  const attr = 'data-list="' + list + '" data-idx="' + i + '" data-key="' + key + '"';
  let inp;
  if (type === 'textarea') inp = '<textarea class="input ' + (cls || '') + '" ' + attr + (cls === 'ar' ? ' dir="rtl" style="font-size:1.2rem"' : '') + '>' + esc(val) + '</textarea>';
  else if (type === 'select') inp = '<select class="input" ' + attr + '>' + options.map(o => '<option value="' + esc(o[0]) + '"' + (String(o[0]) === String(val) ? ' selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>';
  else inp = '<input class="input" type="' + (type === 'num' ? 'number' : type) + '" ' + attr + ' value="' + esc(val == null ? '' : val) + '">';
  return '<div class="field"><label>' + label + '</label>' + inp + '</div>';
}
function listEditor(name, arr, tpl, blank, addLabel) {
  arr = arr || [];
  return '<div>' + (arr.length ? arr.map((x, i) => '<div class="litem"><button class="btn sm danger del" data-del="' + name + '" data-idx="' + i + '">' + ic('trash') + '</button><div style="padding-right:48px">' + tpl(x, i) + '</div></div>').join('')
    : '<p class="muted" style="font-size:.86rem">Belum ada data.</p>') +
    '<button class="btn sm accent" data-add="' + name + '" data-blank=\'' + esc(JSON.stringify(blank)) + '\'>' + ic('plus') + addLabel + '</button></div>';
}
function markDirty() { ADM.dirty = true; $('#aStatus').textContent = 'Ada perubahan yang belum disimpan.'; }
function bindAdminSec() {
  const main = $('#aMain');
  $$('[data-path]', main).forEach(el => {
    const ev = el.type === 'checkbox' || el.tagName === 'SELECT' || el.type === 'color' || el.type === 'range' ? 'change' : 'input';
    el.addEventListener(ev, () => {
      let v = el.dataset.type === 'bool' ? el.checked : el.dataset.type === 'num' ? (el.value === '' ? 0 : +el.value) : el.value;
      setP(ADM.draft, el.dataset.path, v); markDirty();
      if (el.dataset.path.indexOf('calc.') === 0) { ADM.draft.calc.method = 'CUSTOM'; $$('.preset button', main).forEach(b => b.classList.toggle('on', b.dataset.preset === 'CUSTOM')); }
      if (el.dataset.path.indexOf('calc.') === 0 || el.dataset.path === 'hijriAdjust') adminPreview();
    });
  });
  $$('[data-list]', main).forEach(el => {
    el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', () => {
      const arr = ADM.draft[el.dataset.list], it = arr[+el.dataset.idx];
      it[el.dataset.key] = el.type === 'number' ? (el.value === '' ? '' : +el.value) : el.value; markDirty();
      if (el.dataset.key === 'cal') renderAdminSec();
    });
  });
  $$('[data-days]', main).forEach(el => el.addEventListener('change', () => {
    const i = +el.dataset.days; ADM.draft.customReminders[i].days = $$('[data-days="' + i + '"]', main).filter(x => x.checked).map(x => +x.value); markDirty();
  }));
  $$('[data-add]', main).forEach(b => b.onclick = () => { const n = b.dataset.add; ADM.draft[n] = ADM.draft[n] || []; ADM.draft[n].push(JSON.parse(b.dataset.blank)); markDirty(); renderAdminSec(); $('#aMain').scrollTop = 1e6; });
  $$('[data-del]', main).forEach(b => b.onclick = () => { ADM.draft[b.dataset.del].splice(+b.dataset.idx, 1); markDirty(); renderAdminSec(); });
  $$('[data-preset]', main).forEach(b => b.onclick = () => {
    const k = b.dataset.preset; ADM.draft.calc.method = k;
    if (METHODS[k].v) Object.assign(ADM.draft.calc, clone(METHODS[k].v));
    markDirty(); renderAdminSec();
  });
  const u = $('#aUseLoc'); if (u) u.onclick = () => { ADM.draft.defaultLocation = { name: LOC.name, region: LOC.region || '', country: LOC.country || 'Indonesia', lat: LOC.lat, lng: LOC.lng, tz: LOC.tz, elev: LOC.elev || 0 }; markDirty(); renderAdminSec(); };
  const rc = $('#aResetColor'); if (rc) rc.onclick = () => { Object.assign(ADM.draft.theme, { primary: '#04777F', accent: '#FE5A1A', gold: '#C9A050' }); markDirty(); renderAdminSec(); };
  if ($('#aPrev')) adminPreview();
  const ex = $('#exJson'); if (ex) ex.value = JSON.stringify(ADM.draft, null, 2);
  const ec = $('#exCopy'); if (ec) ec.onclick = () => copyText($('#exJson').value);
  const ia = $('#imApply'); if (ia) ia.onclick = () => {
    try { const obj = JSON.parse($('#imJson').value); ADM.draft = deepMerge(ADM.defaults || ADM.draft, obj); markDirty(); toast('JSON dimuat', 'Periksa lalu tekan “Simpan Pengaturan”.', 'upload'); renderAdminSec(); }
    catch (e) { toast('JSON tidak valid', e.message, 'info', 'gold'); }
  };
  const rs = $('#aReset'); if (rs) rs.onclick = () => {
    if (!rs.dataset.confirm) { rs.dataset.confirm = '1'; rs.innerHTML = ic('trash') + 'Klik sekali lagi untuk konfirmasi reset'; setTimeout(() => { if (rs.isConnected) { delete rs.dataset.confirm; rs.innerHTML = ic('trash') + 'Kembalikan semua pengaturan ke bawaan'; } }, 4000); return; }
    rpc('resetSettings', ADM.token).then(r => { ADM.draft = clone(r.settings); ST = r.settings; ADM.dirty = false; if (MODE === 'api') LS.set('settingsCache', ST); applyAll(); renderAdminSec(); toast('Pengaturan direset', 'Semua pengaturan kembali ke bawaan.', 'refresh'); }).catch(adminErr);
  };
  const pw = $('#pwSave'); if (pw) pw.onclick = () => {
    const o = $('#pwOld').value, n = $('#pwNew').value, n2 = $('#pwNew2').value;
    if (n !== n2) return toast('Tidak cocok', 'Ulangi password baru dengan benar.', 'lock', 'gold');
    rpc('changePassword', ADM.token, o, n).then(r => { toast(r.ok ? 'Berhasil' : 'Gagal', r.message, 'lock', r.ok ? '' : 'gold'); if (r.ok) $$('#pwOld,#pwNew,#pwNew2').forEach(x => x.value = ''); }).catch(adminErr);
  };
}
function adminPreview() {
  const el = $('#aPrev'); if (!el) return;
  const saveAdj = ST.hijriAdjust; ST.hijriAdjust = ADM.draft.hijriAdjust; HC.clear();
  const t = times(TODAY.dt, ADM.draft.calc, LOC);
  ST.hijriAdjust = saveAdj; HC.clear();
  el.innerHTML = KEYS.map(k => '<div><small>' + PNAME[k] + '</small><b>' + fmt(t[k]) + '</b></div>').join('');
}
function adminErr(e) {
  const msg = (e && e.message) || String(e);
  toast('Gagal', msg, 'info', 'gold', 8000);
  if (/Sesi admin/.test(msg)) { ADM.token = null; closeModal('mAdmin'); }
}
function saveAdmin() {
  const btn = $('#aSave'); btn.disabled = true; btn.innerHTML = ic('refresh') + 'Menyimpan…';
  rpc('saveSettings', ADM.token, ADM.draft).then(r => {
    ST = r.settings; ADM.draft = clone(r.settings); ADM.dirty = false; if (MODE === 'api') LS.set('settingsCache', ST); applyAll();
    if (!LS.get('loc', null)) { LOC = normLoc(ST.defaultLocation); PTC.clear(); refreshDay(); renderAll(); }
    const n = new Date(); $('#aStatus').textContent = 'Tersimpan ✓ pukul ' + pad(n.getHours()) + ':' + pad(n.getMinutes());
    toast('Pengaturan disimpan', 'Perubahan langsung berlaku untuk semua pengunjung.', 'check');
  }).catch(adminErr).then(() => { btn.disabled = false; btn.innerHTML = ic('save') + 'Simpan Pengaturan'; });
}

/* ============================================================
 *  EVENT BINDING
 * ============================================================ */
function bindUI() {
  // logo 5x -> admin
  let taps = [];
  $('#brand').addEventListener('click', () => {
    const now = Date.now(); taps = taps.filter(t => now - t < 3000); taps.push(now);
    const lb = $('#logoBox'); lb.classList.remove('tap'); void lb.offsetWidth; lb.classList.add('tap');
    if (taps.length >= 5) { taps = []; openAdmin(); }
  });
  $('#themeToggle').addEventListener('change', e => setTheme(e.target.checked ? 'dark' : 'light'));
  $('#btnRefresh').addEventListener('click', () => {
    const b = $('#btnRefresh'); b.classList.remove('spin'); void b.offsetWidth; b.classList.add('spin');
    const done = ok => { applyAll(); lastStateKey = ''; LASTTXT.clear(); tick(); if (ok !== false) toast('Data diperbarui', 'Jadwal dan pengaturan terbaru telah dimuat.', 'refresh'); };
    if (MODE === 'gas') rpc('getPublicSettings').then(s => { if (s && s.appName) ST = s; }).catch(() => {}).then(done);
    else syncSettings(true).then(ok => done(ok !== false));
  });
  $('#btnFull').addEventListener('click', openKiosk);
  $('#kExit').addEventListener('click', closeKiosk);
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && kioskOpen) closeKiosk(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { if (kioskOpen) closeKiosk(); $$('.modal.open').forEach(m => m.classList.remove('open')); }
  });
  $('#btnRemind').addEventListener('click', () => { renderRemModal(); openModal('mRem'); });
  $('#agSet').addEventListener('click', () => { renderRemModal(); openModal('mRem'); });
  $$('.modal').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
    $$('[data-close]', m).forEach(b => b.addEventListener('click', () => m.classList.remove('open')));
  });
  // lokasi
  $('#btnLoc').addEventListener('click', () => { $('#locQ').value = ''; $('#locResults').innerHTML = ''; renderCities(''); fillManual(); openModal('mLoc'); });
  $('#useGeo').addEventListener('click', () => locateMe(false));
  $('#locQ').addEventListener('input', e => {
    const q = e.target.value.trim(); renderCities(q); clearTimeout(searchTimer);
    if (q.length >= 3) searchTimer = setTimeout(() => searchPlaces(q), 650); else $('#locResults').innerHTML = '';
  });
  $('#locQ').addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.value.trim().length >= 2) { clearTimeout(searchTimer); searchPlaces(e.target.value.trim()); } });
  $('#cityList').addEventListener('click', e => { const b = e.target.closest('[data-city]'); if (!b) return; const c = D.CITIES.find(x => x[0] === b.dataset.city); if (c) setLocation(cityObj(c)); });
  $('#locResults').addEventListener('click', e => {
    const b = e.target.closest('[data-pi]'); if (!b) return; const p = (window.__places || [])[+b.dataset.pi]; if (!p) return;
    setLocation({ name: p.name, region: p.region, country: p.country, countryCode: p.countryCode, lat: +(+p.lat).toFixed(5), lng: +(+p.lng).toFixed(5), tz: tzFor(p, false), elev: 0 });
  });
  $('#mSave').addEventListener('click', () => {
    const lat = parseFloat($('#mLat').value), lng = parseFloat($('#mLng').value);
    if (!isFinite(lat) || !isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return toast('Koordinat tidak valid', 'Periksa kembali lintang dan bujur.', 'info', 'gold');
    setLocation(Object.assign({}, LOC, { name: $('#mName').value || 'Lokasi Kustom', lat: lat, lng: lng, tz: +$('#mTz').value, elev: +$('#mElev').value || 0 }));
  });
  // tab & bulanan
  $('#tabs').addEventListener('click', e => { const b = e.target.closest('.tab'); if (b) showTab(b.dataset.tab); });
  window.addEventListener('resize', positionInk);
  $('#mMode').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; MV.mode = b.dataset.mode; renderMonthly(); });
  $('#mPrev').onclick = () => stepMonth(-1); $('#mNext').onclick = () => stepMonth(1);
  $('#mToday').onclick = () => { resetMonthView(); renderMonthly(); };
  $('#mRamadan').onclick = () => { MV.mode = 'hijri'; MV.hm = 9; MV.hy = TODAY.h.m > 9 ? TODAY.h.y + 1 : TODAY.h.y; renderMonthly(); };
  $('#mPrint').onclick = () => { try { window.print(); } catch (e) { toast('Tidak dapat mencetak', 'Buka aplikasi di tab penuh lalu coba lagi.', 'print', 'gold'); } };
  // kalender
  $('#cPrev').onclick = () => { CV.m--; if (CV.m < 1) { CV.m = 12; CV.y--; } renderCalendar(); };
  $('#cNext').onclick = () => { CV.m++; if (CV.m > 12) { CV.m = 1; CV.y++; } renderCalendar(); };
  $('#cToday').onclick = () => { CV.y = TODAY.p.y; CV.m = TODAY.p.m; renderCalendar(); };
  $('#calGrid').addEventListener('click', e => { const b = e.target.closest('[data-d]'); if (b) openDay(b.dataset.d); });
  // kiblat & mutiara
  $('#qSensor').onclick = enableSensor;
  $('#qNext').onclick = () => renderQuote(true);
  $('#qCopy').onclick = () => { const q = allQuotes()[QI]; copyText((q.ar ? q.ar + '\n\n' : '') + '“' + q.id + '”\n— ' + q.src + '\n\n(' + (ST.appName || 'WAQTY') + ')'); };
  // admin
  $('#loginForm').addEventListener('submit', e => {
    e.preventDefault(); const btn = $('#loginBtn'), err = $('#loginErr');
    btn.disabled = true; btn.innerHTML = ic('refresh') + 'Memeriksa…'; err.classList.add('hidden');
    rpc('adminLogin', $('#loginPw').value).then(r => {
      if (!r || !r.ok) { err.textContent = (r && r.message) || 'Gagal masuk.'; err.classList.remove('hidden'); return; }
      ADM.token = r.token; ADM.defaults = r.defaults; ADM.draft = clone(r.settings); ADM.dirty = false; ADM.sec = 'umum';
      closeModal('mLogin'); showAdmin();
      if (r.usingDefaultPassword) toast('Segera ganti password', 'Anda masih memakai password bawaan. Buka menu Keamanan & Data.', 'shield', 'accent', 9000);
    }).catch(e2 => { err.textContent = e2.message || String(e2); err.classList.remove('hidden'); })
      .then(() => { btn.disabled = false; btn.innerHTML = ic('lock') + 'Masuk'; });
  });
  $('#aNav').addEventListener('click', e => { const b = e.target.closest('[data-sec]'); if (b) { ADM.sec = b.dataset.sec; renderAdminSec(); } });
  $('#aSave').addEventListener('click', saveAdmin);
  $('#aLogout').addEventListener('click', () => { rpc('adminLogout', ADM.token).catch(() => {}); ADM.token = null; ADM.draft = null; closeModal('mAdmin'); toast('Keluar dari admin', 'Sesi admin telah diakhiri.', 'logout'); });
  document.addEventListener('pointerdown', () => audio(), { once: true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { lastStateKey = ''; tick(); } });
}

/* ============================================================
 *  MULAI
 * ============================================================ */
function idle(fn) { (window.requestIdleCallback || (f => setTimeout(f, 60)))(() => fn(), { timeout: 1500 }); }
/* Hentikan animasi dekoratif saat tidak terlihat di layar */
function watchVisibility() {
  if (!window.IntersectionObserver) return;
  const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('off', !e.isIntersecting)));
  ['#hero', '#marquee'].forEach(s => { const x = $(s); if (x) io.observe(x); });
}
/* Versi GitHub Pages: ambil pengaturan terbaru dari Apps Script, simpan sebagai cache */
function syncSettings(manual) {
  if (MODE === 'gas') return Promise.resolve(false);
  return rpc('getPublicSettings').then(s => {
    if (!s || !s.appName) return false;
    const changed = JSON.stringify(s) !== JSON.stringify(ST);
    ST = s; if (MODE === 'api') LS.set('settingsCache', s);
    if (!LS.get('loc', null)) LOC = normLoc(ST.defaultLocation);
    if (changed) applyAll();
    return changed ? 'changed' : 'same';
  }).catch(e => { if (manual) toast('Tidak terhubung ke server', 'Memakai data yang tersimpan di perangkat. ' + (e.message || ''), 'info', 'gold', 8000); return false; });
}
function init() {
  hydrateIcons(document);
  bindUI();
  applySettings();
  refreshDay();
  resetMonthView();
  renderAll();
  loop();
  watchVisibility();
  if (MODE === 'api') setTimeout(() => syncSettings(false), 300);
  if (MODE !== 'gas' && 'serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
  if (!LS.get('loc', null) && ST.autoLocate) setTimeout(() => locateMe(true), 800);
  if (!HF) console.warn('WAQTY: kalender Umm al-Qura tidak tersedia, memakai algoritma tabular.');
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
