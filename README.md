# Scientific Calculator
Kalkulator ilmiah statis berbasis HTML, CSS, dan JavaScript ES Modules. Tidak membutuhkan bundler atau backend.
## Menjalankan secara lokal
Di folder proyek, jalankan:
```bash
python -m http.server 8000
```
Buka `http://localhost:8000` di browser. **Jangan** menggunakan `file://` karena ES Modules dapat diblokir oleh kebijakan CORS browser.
## Struktur
- `index.html`: struktur halaman dan pemuatan CSS/modul utama.
- `css/style.css`: tampilan utama, responsivitas, variabel warna.
- `css/effects.css`: keyframes dan tampilan efek.
- `js/main.js`: titik masuk aplikasi.
- `js/core/calculator.js`: evaluator matematika dan formatter.
- `js/core/special-results.js`: data dan pencocokan ekspresi khusus.
- `js/design/themes.js`: data dan aplikasi tema.
- `js/design/effects.js`: registrasi efek, termasuk partikel.
- `js/design/design-controller.js`: mengaktifkan dan membersihkan tema/efek.
- `js/ui/calculator-ui.js`: event tombol, mode sudut, pratinjau, tampilan hasil.
- `assets/images` dan `assets/audio`: tempat aset saat dibutuhkan.
## Menambah hasil khusus
Tambahkan entri dengan `id` **unik** pada `js/core/special-results.js`. Setiap entri dapat memiliki `expression`, `mode`, `message`, `hint`, dan `design` berisi `theme` serta `effects`.
## Menambah efek
Daftarkan efek pada `js/design/effects.js` dan gaya terkait pada `css/effects.css`. `apply({ layer, body, screen, result })` boleh mengembalikan fungsi cleanup untuk menghapus elemen/event buatan efek.
## Publikasi
Unggah ke GitHub lalu hubungkan repositori ke Netlify: build command kosong, publish directory `.`.
## Pengujian
Jalankan `node --experimental-default-type=module --test tests/*.test.mjs` (Node.js diperlukan hanya untuk pengujian, bukan untuk hosting).
## Catatan perubahan
Refaktor memindahkan komponen tanpa sengaja mengubah perilaku kalkulator; satu koreksi kecil adalah membuat kedua ID hasil khusus `half` berbeda agar pergantian ekspresi ditangani secara independen. Belum ada efek audio atau gambar baru.
