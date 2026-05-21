# 📚 Catatan Penilaian Siswa

Platform laporan belajar anak yang transparan antara guru dan orang tua.

## ✨ Fitur

- **Portal Guru** (PIN default: `1234`)
  - Dashboard statistik siswa & sesi
  - Tambah siswa baru (kode otomatis dibuat)
  - Input penilaian lengkap: tanggal, waktu, kehadiran, materi, kegiatan
  - Penilaian bintang (pemahaman & keaktifan)
  - Notifikasi iuran otomatis setiap 4 sesi hadir
  - Pengaturan nominal iuran & PIN

- **Portal Orang Tua**
  - Login dengan kode anak dari guru
  - Lihat statistik anak (total sesi, kehadiran, rata-rata nilai)
  - Riwayat lengkap setiap sesi
  - Notifikasi iuran

## 🚀 Deploy ke Vercel (5 menit)

### Cara 1 — Via GitHub (Rekomendasi)

1. **Upload ke GitHub**
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/catatan-penilaian-siswa.git
   git push -u origin main
   ```

2. **Connect ke Vercel**
   - Buka [vercel.com](https://vercel.com) → Sign up / Login
   - Klik **"New Project"** → Import dari GitHub
   - Pilih repo `catatan-penilaian-siswa`
   - Framework: **Vite** (otomatis terdeteksi)
   - Klik **Deploy**
   - Tunggu ~1 menit → dapat link seperti `https://catatan-penilaian-siswa.vercel.app`

### Cara 2 — Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Cara 3 — Via Netlify (alternatif)

```bash
npm run build
# Upload folder `dist/` ke netlify.com → Add new site → Drag & drop
```

## 💻 Jalankan Lokal

```bash
npm install
npm run dev
# Buka http://localhost:5173
```

## 💾 Penyimpanan Data

Data tersimpan di **localStorage** browser. Artinya:
- Data bertahan walau halaman di-refresh
- Data berbeda per device/browser (guru pakai laptop, tidak sinkron ke HP)
- Jika ingin sinkron antar device, upgrade ke Firebase Firestore

## 📱 Kompatibel

- Desktop (Chrome, Firefox, Safari, Edge)
- Mobile (iOS Safari, Android Chrome)

## 🔐 Keamanan

- Ganti PIN guru di ⚙️ Pengaturan setelah pertama login
- Kode anak bersifat case-insensitive (BT-001 = bt-001)
