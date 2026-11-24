# WAQTY — Jadwal Imsakiyah & Kalender Islami

Web app jadwal shalat & imsakiyah, kalender Hijriah–Masehi, hari besar Islam, peristiwa penting, mutiara harian, arah kiblat, dan pengingat ibadah. Ada juga Panel Admin tersembunyi: ketuk logo 5×.

**Arsitektur**

```
Pengunjung ──► GitHub Pages (index.html, cepat, bisa offline/PWA)
                   │  pengaturan admin & pencarian kota
                   ▼
               Google Apps Script (Code.gs) — backend JSON + penyimpanan pengaturan
```

Jadwal shalat dihitung langsung di perangkat pengunjung. Jadi jadwal tetap tampil walaupun server Apps Script sedang lambat atau offline.

---

## Struktur folder

```
index.html               ← halaman utama GitHub Pages (hasil build)
manifest.webmanifest     ← PWA (bisa di-"Install" ke layar utama HP)
sw.js                    ← service worker (cache & offline)
assets/css/style.css     ← tampilan
assets/js/config.js      ← ★ URL Apps Script (apiUrl)
assets/js/data.js        ← data kota, hari besar, peristiwa, mutiara
assets/js/app.js         ← logika aplikasi
assets/js/defaults.js    ← pengaturan bawaan (hasil build dari Code.gs)
assets/img/              ← logo & ikon
apps-script/             ← file untuk Google Apps Script (backend + versi web app GAS)
  Code.gs, Index.html, Styles.html, Data.html, App.html, appsscript.json
tools/build.js           ← penyusun ulang file hasil build
tools/index.template.html
```

---

## Langkah 1 — Perbarui Google Apps Script (wajib)

Backend perlu diperbarui agar bisa melayani GitHub Pages.

1. Buka proyek Apps Script WAQTY Anda.
2. Ganti isi file berikut dengan isi file dari folder `apps-script/`:
   `Code.gs`, `Index`, `Styles`, `Data`, `App`.
3. Klik **Simpan**.
4. Klik **Terapkan → Kelola deployment**, lalu klik ikon ✏️ pada deployment yang sudah ada.
   - **Versi**: pilih **Versi baru**
   - **Jalankan sebagai**: *Saya*
   - **Yang memiliki akses**: ***Siapa saja*** (wajib; bila "Siapa saja yang memiliki Akun Google", GitHub Pages tidak bisa terhubung)
   - Klik **Terapkan**. URL `/exec` **tetap sama**, jadi tidak perlu mengubah `config.js`.
5. Uji di browser: buka
   `URL_EXEC?api=1&action=ping`
   Hasilnya harus berupa teks JSON seperti `{"result":{"ok":true,"version":"1.1.0",...}}`.

## Langkah 2 — Upload ke GitHub

1. Masuk ke github.com, lalu klik **New repository**.
   - Nama, misalnya `waqty`
   - Pilih **Public**, lalu klik **Create repository**.
2. Di halaman repo, klik **uploading an existing file** (atau **Add file → Upload files**).
3. Ekstrak ZIP, lalu **seret seluruh isi folder** (bukan foldernya) ke halaman upload. Pastikan folder `assets`, `apps-script`, dan `tools` ikut.
4. Klik **Commit changes**.

## Langkah 3 — Aktifkan GitHub Pages

1. Buka **Settings → Pages**.
2. Di bagian **Source**, pilih **Deploy from a branch**. Untuk **Branch**, pilih **main** dan folder **/ (root)**, lalu klik **Save**.
3. Tunggu 1–2 menit. Alamatnya akan muncul di halaman yang sama:
   `https://NAMA-AKUN.github.io/waqty/`

Selesai. Buka alamat tersebut, ketuk logo 5×, lalu masuk dengan password admin Anda.

> Domain sendiri (misal `waqty.beecomp.id`) bisa diatur di **Settings → Pages → Custom domain**.

---

## Panel Admin

- Ketuk logo **5×** dalam 3 detik.
- Password awal: `admin123`. Ganti di **Keamanan & Data**.
- Lupa password? Di editor Apps Script, jalankan fungsi `resetAdminPassword`.
- Pengaturan tersimpan di server Apps Script dan berlaku untuk semua pengunjung, baik di versi GitHub maupun di URL Apps Script.
- **Tampilan → Mode performa**:
  - *Otomatis*: menjadi ringan di HP dengan RAM/CPU kecil.
  - *Penuh*: semua animasi aktif.
  - *Ringan*: tanpa lentera & animasi masuk.

## Mengubah kode (opsional)

Untuk mengubah kode, edit file sumber: `tools/index.template.html`, `assets/css/style.css`, `assets/js/*.js`, `apps-script/Code.gs`. Setelah itu jalankan:

```bash
node tools/build.js
```

Perintah ini menyusun ulang `index.html`, `assets/js/defaults.js`, `sw.js`, dan file HTML di `apps-script/`. Naikkan `APP_VERSION` di `Code.gs` agar cache pengunjung ikut diperbarui.

## Catatan

- Metode bawaan adalah **LF PBNU**: Subuh 20°, Isya 18°, Dhuha 4,5°, terbit/terbenam 0°54′, Dzuhur +1 menit, Imsak −10 menit. Pilihan lain: Kemenag, Muhammadiyah, MWL, atau Kustom.
- Tanggal Hijriah memakai kalender Umm al-Qura. Gunakan *Koreksi tanggal Hijriah* bila berbeda dengan keputusan isbat.
- Pengingat berjalan selama halaman terbuka. Di GitHub Pages, notifikasi browser & layar penuh asli bisa dipakai karena halaman tidak lagi berada di dalam bingkai Google.

---
Aplikasi ini dibuat oleh Bahruddin | © 2026 BeeCOMP
