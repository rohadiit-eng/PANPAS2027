/* =====================================================
   SnapBooth Frame - Photobooth dengan border/frame
   Bootstrap 5 + Canvas. Tanpa AI, ringan, cepat, bisa dipakai di HP lawas.
   Frame ditambahkan oleh aplikasi di atas foto (live preview = hasil akhir).
   ===================================================== */

/* ================= KONFIGURASI ================= */
// Tambah / ganti frame di sini. Frame portrait dan landscape disimpan di array yang sama.
//  - orientation : 'portrait' (kanvas 900x1200) atau 'landscape' (kanvas 1200x900). Kosong = portrait
//  - src     : gambar frame (PNG/SVG transparan, ukuran sesuai orientasi, bagian tengah dibiarkan transparan)
//  - win     : area tempat foto kamera ditampilkan (x, y, lebar, tinggi) pada kanvas sesuai orientasi
//  Frame pertama di array menentukan orientasi awal saat aplikasi dibuka.
//  - caption : (opsional) tulisan di frame. size = ukuran font, y = posisi baseline, shadow = bayangan,
//              maxW = lebar maksimum teks (huruf mengecil otomatis jika teks terlalu panjang)
//  - date    : (opsional) tanggal & jam otomatis
const FRAMES = [
  {
    id: 'easter', name: 'Paskah', orientation: 'portrait', src: 'assets/frames/easter.svg',
    win: { x: 60, y: 60, w: 780, h: 950 },
    caption: { text: 'PANPAS 2027 - St. Bartolomeus', font: 'Fredoka', weight: 600, size: 54, maxW: 760, color: '#5b2a86', shadow: '#f3d77a', y: 1128 },
  },
  {
    id: 'palma', name: 'Minggu Palma', orientation: 'portrait', src: 'assets/frames/Minggu-palma.png',
    win: { x: 110, y: 80, w: 710, h: 1070 },
    caption: { text: 'PANPAS 2027 - St. Bartolomeus', font: 'Fredoka', weight: 600, size: 54, maxW: 760, color: '#5b2a86', shadow: '#f3d77a', y: 1128 },
  },
  {
    id: 'polaroid', name: 'Polaroid', orientation: 'portrait', src: 'assets/frames/polaroid.svg',
    win: { x: 50, y: 50, w: 800, h: 940 },
    caption: { text: 'PANPAS 2027 - St. Bartolomeus', size: 45, color: '#ff3d81', shadow: '#ffd23f', y: 1112 },
    date: { size: 26, color: '#2a1553', y: 1166 },
  },
  {
    id: 'film', name: 'Film Strip', orientation: 'portrait', src: 'assets/frames/film-strip.svg',
    win: { x: 110, y: 70, w: 680, h: 1060 },
    caption: { text: 'PANPAS 2027 - St. Bartolomeus', size: 30, color: '#ffb300', y: 1178 },
  },
  {
    id: 'neon', name: 'Neon Arcade', orientation: 'portrait', src: 'assets/frames/neon-arcade.svg',
    win: { x: 60, y: 60, w: 780, h: 990 },
    caption: { text: 'PANPAS 2027 - St. Bartolomeus', size: 45, color: '#ffd23f', shadow: '#ff3d81', y: 1138 },
  },
  {
    id: 'pastel', name: 'Pastel Cheese', orientation: 'portrait', src: 'assets/frames/pastel-cheese.svg',
    win: { x: 60, y: 60, w: 780, h: 990 },
    caption: { text: 'PANPAS 2027 - St. Bartolomeus', size: 45, color: '#ff5c9d', shadow: '#ffffff', y: 1122 },
    date: { size: 22, color: '#c24c82', y: 1156 },
  },
  {
    id: 'gold', name: 'Royal Gold', orientation: 'portrait', src: 'assets/frames/royal-gold.svg',
    win: { x: 70, y: 70, w: 760, h: 990 },
    caption: { text: 'PANPAS 2027 - St. Bartolomeus', size: 45, color: '#f3d77a', shadow: '#7a5a14', y: 1142 },
  },
  {
    id: 'party', name: 'Party Time', orientation: 'portrait', src: 'assets/frames/party-time.svg',
    win: { x: 24, y: 24, w: 852, h: 1056 },
    caption: { text: 'PANPAS 2027 - St. Bartolomeus', size: 45, color: '#ff3d81', shadow: '#ffd23f', y: 1130 },
    date: { size: 22, color: '#2a1553', y: 1164 },
  },

  /* ---------- LANDSCAPE (kanvas 1200 x 900) ---------- */
  {
    id: 'easter-land', name: 'Paskah', orientation: 'landscape', src: 'assets/frames/easter-land.svg',
    win: { x: 60, y: 40, w: 1080, h: 705 },
    caption: { text: 'PANPAS 2027 - St. Bartolomeus', font: 'Fredoka', weight: 600, size: 54, maxW: 1000, color: '#5b2a86', shadow: '#f3d77a', y: 838 },
  },
  {
    id: 'polaroid-land', name: 'Polaroid', orientation: 'landscape', src: 'assets/frames/polaroid-land.svg',
    win: { x: 40, y: 40, w: 1120, h: 700 },
    caption: { text: 'PANPAS 2027 - St. Bartolomeus', size: 56, color: '#ff3d81', shadow: '#ffd23f', y: 822 },
    date: { size: 24, color: '#2a1553', y: 872 },
  },
  // {
  //   id: 'film-land', name: 'Film Strip', orientation: 'landscape', src: 'assets/frames/film-strip-land.svg',
  //   win: { x: 70, y: 110, w: 1060, h: 680 },
  // },
  {
    id: 'neon-land', name: 'Neon Arcade', orientation: 'landscape', src: 'assets/frames/neon-arcade-land.svg',
    win: { x: 60, y: 50, w: 1080, h: 700 },
    caption: { text: 'PANPAS 2027 - St. Bartolomeus', size: 56, color: '#ffd23f', shadow: '#ff3d81', y: 835 },
  },
];
// Ukuran kanvas / hasil foto (px) per orientasi - samakan dengan ukuran file frame
const SIZES = {
  portrait: { w: 900, h: 1200 },
  landscape: { w: 1200, h: 900 },
};
const TIMER_OPTIONS = [0, 3, 5];

(() => {
  'use strict';

  const $ = (sel) => document.querySelector(sel);

  /* ---------- elemen ---------- */
  const screens = {
    intro: $('#screen-intro'),
    camera: $('#screen-camera'),
    result: $('#screen-result'),
  };
  const video = $('#video');
  const live = $('#live');
  const ctx = live.getContext('2d');
  const stageEl = $('.stage');
  const orientBtns = document.querySelectorAll('.orient-btn');

  const els = {
    loading: $('#loading'), loadingText: $('#loadingText'),
    camError: $('#camError'), camErrorText: $('#camErrorText'),
    picker: $('#bgPicker'), bgName: $('#bgName'), camName: $('#camName'),
    shutter: $('#btnShutter'), countdown: $('#countdown'), flash: $('#flash'),
    timerBtn: $('#btnTimer'), timerLabel: $('#timerLabel'),
    resultImg: $('#resultImg'), confetti: $('#confettiLayer'),
  };

  /* ---------- state ---------- */
  let facing = 'user';          // 'user' = depan, 'environment' = belakang
  let mirror = true;
  let stream = null;
  let running = false;
  let rafId = 0;
  let capturing = false;
  let timerIdx = 0;
  const orientOf = (f) => (f.orientation === 'landscape' ? 'landscape' : 'portrait');
  const framesOf = (o) => FRAMES.filter((f) => orientOf(f) === o);
  let orient = orientOf(FRAMES[0]);       // orientasi awal = orientasi frame pertama
  let cw = SIZES[orient].w;               // ukuran kanvas aktif
  let ch = SIZES[orient].h;
  let currentId = FRAMES[0].id;
  const lastFrame = {};                   // frame terakhir yang dipilih untuk tiap orientasi
  const frameCanvases = {};     // frame yang sudah di-rasterize (lebih ringan saat dirender tiap frame)
  let resultBlob = null;
  let resultUrl = '';

  /* =================================================
     NAVIGASI
     ================================================= */
  function show(name) {
    Object.entries(screens).forEach(([k, el]) => el.classList.toggle('active', k === name));
  }

  /* ---------- intro / carousel ---------- */
  const carouselEl = $('#stepCarousel');
  const carousel = new bootstrap.Carousel(carouselEl, { interval: false, wrap: false, touch: true });
  const btnNext = $('#btnNext');
  const totalSteps = carouselEl.querySelectorAll('.carousel-item').length;
  let stepIdx = 0;

  function updateNextLabel() {
    btnNext.innerHTML = stepIdx === totalSteps - 1
      ? '<i class="bi bi-camera-fill me-2"></i>Mulai Foto!'
      : 'Lanjut <i class="bi bi-arrow-right ms-1"></i>';
  }
  carouselEl.addEventListener('slid.bs.carousel', (e) => { stepIdx = e.to; updateNextLabel(); });
  btnNext.addEventListener('click', () => { stepIdx < totalSteps - 1 ? carousel.next() : enterCamera(); });
  $('#btnSkip').addEventListener('click', enterCamera);

  /* =================================================
     FRAME
     ================================================= */
  const currentFrame = () => FRAMES.find((f) => f.id === currentId);

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Gagal memuat ' + src));
      img.src = src;
    });
  }

  async function preloadFrame(f) {
    if (frameCanvases[f.id]) return;
    const sz = SIZES[orientOf(f)];
    const img = await loadImage(f.src);
    const c = document.createElement('canvas');
    c.width = sz.w; c.height = sz.h;
    c.getContext('2d').drawImage(img, 0, 0, sz.w, sz.h);
    frameCanvases[f.id] = c;
  }

  // daftar thumbnail hanya berisi frame dengan orientasi yang sedang dipilih
  function buildPicker() {
    els.picker.innerHTML = '';
    els.picker.dataset.orient = orient;
    els.picker.scrollLeft = 0;
    framesOf(orient).forEach((f) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'bg-item' + (f.id === currentId ? ' active' : '');
      b.dataset.id = f.id;
      b.title = f.name;
      b.setAttribute('aria-label', 'Frame ' + f.name);
      b.innerHTML = '<img src="' + f.src + '" alt="">';
      b.addEventListener('click', () => selectFrame(f.id));
      els.picker.appendChild(b);
      preloadFrame(f).catch(console.warn);
    });
    els.bgName.textContent = currentFrame().name;
  }

  function selectFrame(id) {
    currentId = id;
    document.querySelectorAll('.bg-item').forEach((x) => x.classList.toggle('active', x.dataset.id === id));
    els.bgName.textContent = currentFrame().name;
    if (navigator.vibrate) navigator.vibrate(10);
  }

  /* =================================================
     ORIENTASI (portrait / landscape)
     ================================================= */
  function applyOrientation(o, force) {
    if (!framesOf(o).length || (o === orient && !force)) return;
    lastFrame[orient] = currentId;              // ingat pilihan frame di orientasi sebelumnya
    orient = o;
    cw = SIZES[o].w; ch = SIZES[o].h;
    live.width = cw; live.height = ch;          // mengubah ukuran kanvas = preview ikut berubah

    stageEl.classList.toggle('landscape', o === 'landscape');
    stageEl.classList.remove('swap'); void stageEl.offsetWidth; stageEl.classList.add('swap');
    orientBtns.forEach((b) => {
      const on = b.dataset.orient === o;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    const list = framesOf(o);
    currentId = (list.find((f) => f.id === lastFrame[o]) || list[0]).id;
    buildPicker();
    if (!force && navigator.vibrate) navigator.vibrate(10);   // getar hanya saat pengguna menekan tombol
  }

  orientBtns.forEach((b) => {
    if (!framesOf(b.dataset.orient).length) b.disabled = true;   // tidak ada frame untuk orientasi ini
    b.addEventListener('click', () => { if (!capturing) applyOrientation(b.dataset.orient); });
  });

  /* =================================================
     RENDER (video + frame + teks)
     ================================================= */
  let dateCache = { t: 0, s: '' };
  function dateText() {
    const now = Date.now();
    if (now - dateCache.t > 20000) {
      dateCache = {
        t: now,
        s: new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      };
    }
    return dateCache.s;
  }

  // gambar video ke dalam "jendela" frame dengan mode cover (tanpa gepeng), mirror untuk kamera depan
  function drawVideo(c, win) {
    const vw = video.videoWidth, vh = video.videoHeight;
    if (!vw || !vh) return;
    const p = 4; // sedikit melebar ke bawah frame supaya tidak ada celah di tepi
    const x = Math.max(0, win.x - p), y = Math.max(0, win.y - p);
    const w = Math.min(cw, win.x + win.w + p) - x;
    const h = Math.min(ch, win.y + win.h + p) - y;
    const s = Math.max(w / vw, h / vh);
    const dw = vw * s, dh = vh * s;
    const dx = x + (w - dw) / 2, dy = y + (h - dh) / 2;

    c.save();
    c.beginPath(); c.rect(x, y, w, h); c.clip();
    if (mirror) { c.translate(2 * x + w, 0); c.scale(-1, 1); }
    c.drawImage(video, dx, dy, dw, dh);
    c.restore();
  }

  function drawText(c, t, text, weight) {
    c.textAlign = 'center';
    c.textBaseline = 'alphabetic';
    // font bawaan: Bungee (huruf kapital) untuk caption, Poppins untuk tanggal. Bisa diganti per frame lewat t.font / t.weight
    const fam = t.font ? "'" + t.font + "', Arial, sans-serif"
      : (weight === 'date' ? 'Poppins, Arial, sans-serif' : 'Bungee, Impact, sans-serif');
    const pre = t.weight ? t.weight + ' ' : (weight === 'date' ? '600 ' : '');
    let size = t.size;
    c.font = pre + size + 'px ' + fam;
    if (t.maxW) { // teks terlalu panjang? kecilkan otomatis agar muat di dalam pita
      const w = c.measureText(text).width;
      if (w > t.maxW) { size = Math.floor(size * t.maxW / w); c.font = pre + size + 'px ' + fam; }
    }
    if (t.shadow) { c.fillStyle = t.shadow; c.fillText(text, cw / 2 + 3, t.y + 3); }
    c.fillStyle = t.color;
    c.fillText(text, cw / 2, t.y);
  }

  function render() {
    const f = currentFrame();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, cw, ch);
    drawVideo(ctx, f.win);
    const fc = frameCanvases[f.id];
    if (fc) ctx.drawImage(fc, 0, 0);
    if (f.caption) drawText(ctx, f.caption, f.caption.text);
    if (f.date) drawText(ctx, f.date, dateText(), 'date');
  }

  function startLoop() {
    if (running) return;
    running = true;
    const loop = () => {
      if (!running) return;
      if (video.readyState >= 2) render();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
  }

  function stopLoop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  /* =================================================
     KAMERA
     ================================================= */
  function setLoading(on, text) {
    if (text) els.loadingText.textContent = text;
    els.loading.classList.toggle('d-none', !on);
  }

  function showError(msg) {
    stopLoop();
    setLoading(false);
    els.camErrorText.textContent = msg;
    els.camError.classList.remove('d-none');
  }

  function errorMessage(err) {
    switch (err && err.name) {
      case 'NotAllowedError':
      case 'SecurityError':
        return 'Akses kamera ditolak. Izinkan kamera di pengaturan browser, lalu coba lagi.';
      case 'NotFoundError':
      case 'OverconstrainedError':
        return 'Kamera tidak ditemukan di perangkat ini.';
      case 'NotReadableError':
        return 'Kamera sedang dipakai aplikasi lain. Tutup aplikasi itu lalu coba lagi.';
      default:
        return 'Kamera tidak bisa dibuka. Pastikan halaman dibuka lewat HTTPS.';
    }
  }

  function stopStream() {
    if (stream) stream.getTracks().forEach((t) => t.stop());
    stream = null;
    video.srcObject = null;
  }

  async function openCamera() {
    els.camError.classList.add('d-none');
    setLoading(true, 'Membuka kamera...');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showError('Browser memblokir kamera. Buka halaman ini lewat HTTPS (atau localhost).');
      return;
    }

    try {
      stopStream();
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facing }, width: { ideal: 1920 }, height: { ideal: 1920 } },
        audio: false,
      });
    } catch (err) {
      showError(errorMessage(err));
      return;
    }

    // sesuaikan mirror dengan kamera yang benar-benar terpakai
    const track = stream.getVideoTracks()[0];
    const settings = track.getSettings ? track.getSettings() : {};
    mirror = settings.facingMode ? settings.facingMode === 'user' : facing === 'user';
    els.camName.textContent = facing === 'user' ? 'Depan' : 'Belakang';

    video.srcObject = stream;
    try { await video.play(); } catch (_) { /* autoplay sudah di-handle atribut */ }

    setLoading(false);
    startLoop();
  }

  async function enterCamera() {
    show('camera');
    stopLoop();
    await openCamera();
  }

  function leaveCamera() {
    stopLoop();
    stopStream();
    show('intro');
  }

  $('#btnBack').addEventListener('click', leaveCamera);
  $('#btnRetry').addEventListener('click', () => { stopLoop(); openCamera(); });

  $('#btnFlip').addEventListener('click', async (e) => {
    if (capturing) return;
    const btn = e.currentTarget;
    btn.classList.remove('spin'); void btn.offsetWidth; btn.classList.add('spin');
    facing = facing === 'user' ? 'environment' : 'user';
    stopLoop();
    await openCamera();
  });

  els.timerBtn.addEventListener('click', () => {
    timerIdx = (timerIdx + 1) % TIMER_OPTIONS.length;
    const t = TIMER_OPTIONS[timerIdx];
    els.timerLabel.textContent = t ? t + 's' : 'Off';
    els.timerBtn.classList.toggle('on', t > 0);
  });

  /* =================================================
     CAPTURE
     ================================================= */
  function runCountdown(n) {
    return new Promise((resolve) => {
      let i = n;
      const tick = () => {
        if (i === 0) { els.countdown.classList.remove('show'); els.countdown.textContent = ''; resolve(); return; }
        els.countdown.textContent = i;
        els.countdown.classList.remove('show'); void els.countdown.offsetWidth; els.countdown.classList.add('show');
        if (navigator.vibrate) navigator.vibrate(15);
        i--; setTimeout(tick, 1000);
      };
      tick();
    });
  }

  function doFlash() {
    els.flash.classList.remove('go'); void els.flash.offsetWidth; els.flash.classList.add('go');
    if (navigator.vibrate) navigator.vibrate(40);
  }

  async function capture() {
    if (capturing || !running) return;
    capturing = true;
    els.shutter.disabled = true;

    if (TIMER_OPTIONS[timerIdx] > 0) await runCountdown(TIMER_OPTIONS[timerIdx]);

    doFlash();
    render();           // pastikan frame terakhir (video + frame + teks) sudah tergambar
    stopLoop();

    const blob = await new Promise((res) => live.toBlob(res, 'image/jpeg', 0.93));
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    resultBlob = blob;
    resultUrl = URL.createObjectURL(blob);
    els.resultImg.src = resultUrl;

    setTimeout(() => {
      show('result');
      launchConfetti();
      capturing = false;
      els.shutter.disabled = false;
    }, 350);
  }
  els.shutter.addEventListener('click', capture);

  /* =================================================
     HASIL: DOWNLOAD & RETAKE
     ================================================= */
  $('#btnDownload').addEventListener('click', () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'snapbooth-' + currentId + '-' + Date.now() + '.jpg';
    document.body.appendChild(a);
    a.click();
    a.remove();
  });

  $('#btnRetake').addEventListener('click', async () => {
    show('camera');
    if (stream && stream.active) startLoop();
    else await openCamera();
  });

  function launchConfetti() {
    const colors = ['#ff3d81', '#ffd23f', '#2de2e6', '#7a2bd0', '#fffdf7'];
    els.confetti.innerHTML = '';
    for (let i = 0; i < 36; i++) {
      const p = document.createElement('i');
      p.className = 'confetti';
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = 2.2 + Math.random() * 2.2 + 's';
      p.style.animationDelay = Math.random() * 0.8 + 's';
      p.style.borderRadius = i % 3 === 0 ? '50%' : '2px';
      els.confetti.appendChild(p);
    }
    setTimeout(() => { els.confetti.innerHTML = ''; }, 6000);
  }

  /* ---------- hemat baterai saat tab disembunyikan ---------- */
  document.addEventListener('visibilitychange', () => {
    if (!screens.camera.classList.contains('active')) return;
    if (document.hidden) stopLoop();
    else if (stream && stream.active && !capturing) startLoop();
  });
  window.addEventListener('pagehide', stopStream);

  /* ---------- init ---------- */
  applyOrientation(orient, true);     // set ukuran kanvas, tombol orientasi, dan daftar frame awal
  updateNextLabel();
  if (document.fonts && document.fonts.load) {
    document.fonts.load('48px Bungee');
    document.fonts.load('600 24px Poppins');
    document.fonts.load('600 48px Fredoka');
  }
})();
