# SnapBooth Frame - Photobooth dengan Border

HTML + CSS + JavaScript + Bootstrap 5. Dibuka lewat browser HP.
Kamera tampil apa adanya, lalu aplikasi memasang **frame/border** di atas foto.
Tanpa AI, jadi ringan dan cepat. Yang terlihat di preview = hasil akhir.

## Alur
1. Cara penggunaan (4 langkah, bisa digeser)
2. Take picture: pilih kamera depan/belakang, pilih frame, timer, tombol shutter
3. Hasil: Download atau Retake

## Orientasi Portrait / Landscape
Di halaman kamera ada tombol **Portrait | Landscape**. Memilih orientasi akan mengubah bentuk preview,
ukuran hasil foto, dan daftar frame yang tampil. Pilihan frame diingat untuk masing-masing orientasi.

| Orientasi | Ukuran kanvas / frame |
|-----------|-----------------------|
| portrait  | 900 x 1200 px         |
| landscape | 1200 x 900 px         |

Frame portrait dan landscape disimpan di **array `FRAMES` yang sama**, dibedakan oleh field `orientation`.

## Sample frame (assets/frames/)
Portrait: Paskah (default), Polaroid, Film Strip, Neon Arcade, Pastel Cheese, Royal Gold, Party Time.
Landscape (file berakhiran `-land`): Paskah, Polaroid, Film Strip, Neon Arcade.

## Menjalankan
Kamera hanya jalan di **HTTPS** atau **localhost**, jadi jangan buka dengan klik dua kali (file://).

Lokal (laptop):
    cd photobooth-border
    python3 -m http.server 8000
    # buka http://localhost:8000

Tes di HP: deploy ke hosting HTTPS (Netlify, Vercel, GitHub Pages, Cloudflare Pages)
atau pakai tunnel HTTPS (mis. `cloudflared tunnel --url http://localhost:8000`).

## Menambah / mengganti frame
1. Buat gambar frame **PNG transparan** (atau SVG): **900x1200 px** untuk portrait atau **1200x900 px** untuk landscape.
   Bagian tengah yang ingin menampilkan foto harus transparan.
2. Taruh di `assets/frames/`.
3. Daftarkan di array `FRAMES` pada bagian atas `app.js` (isi `orientation` dengan `'portrait'` atau `'landscape'`):

       {
         id: 'ulangtahun', name: 'Ulang Tahun', orientation: 'portrait', src: 'assets/frames/ulangtahun.png',
         win: { x: 60, y: 60, w: 780, h: 990 },
         caption: { text: 'PESTA RINA', size: 56, color: '#ff3d81', shadow: '#ffd23f', y: 1138 },
         date: { size: 24, color: '#2a1553', y: 1184 }
       }

- `win`     : area (x, y, lebar, tinggi) tempat foto kamera ditampilkan, ukurannya mengikuti bukaan transparan frame.
- `caption` : (opsional) tulisan di frame. `size` = ukuran huruf, `y` = posisi baseline, `shadow` = bayangan,
  `maxW` = lebar maksimum teks (huruf mengecil otomatis jika teks terlalu panjang).
  Font bawaan caption adalah Bungee (huruf kapital semua). Untuk huruf besar-kecil, set `font` dan `weight`
  (contoh: `font: 'Fredoka', weight: 600`, font harus ikut dimuat di `index.html`).
  Untuk mengganti tulisan frame Paskah, ubah `caption.text` pada entri `easter`.
- `date`    : (opsional) tanggal dan jam otomatis.

## Pengaturan lain (app.js)
- `SIZES`: resolusi hasil foto per orientasi (samakan dengan ukuran file frame)
- `TIMER_OPTIONS`: pilihan timer (detik)

## Catatan
- Perlu internet saat pertama dibuka (Bootstrap dan font dimuat dari CDN).
- Ingin sekaligus ganti background? Gabungkan dengan versi background (`photobooth/`): pemisahan orang
  dilakukan dulu, lalu frame digambar paling atas.
