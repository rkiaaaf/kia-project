import { useState, useEffect } from 'react';
import { loadData, saveData } from './storage.js';
import Landing  from './Landing.jsx';
import Guru     from './Guru.jsx';
import OrangTua from './OrangTua.jsx';

// ─── Default seed data ─────────────────────────────────────────────────────────
const DEFAULT_STUDENTS = [
  { id: 's001', name: 'Aulia Rahmawati',  kelas: 'Baca Tulis',    code: 'BT-001', avatar: 'AR' },
  { id: 's002', name: 'Bintang Pratama',  kelas: 'Jarimatika',    code: 'JM-002', avatar: 'BP' },
  { id: 's003', name: 'Citra Dewi',       kelas: 'Kelas Bermain', code: 'KB-003', avatar: 'CD' },
];

const DEFAULT_SESSIONS = [
  {
    id: 'ses001', studentId: 's001', tanggal: '2026-05-01',
    waktuMulai: '14:00', waktuSelesai: '15:30', kehadiran: 'hadir',
    materi: 'Membaca huruf vokal A, I, U, E, O',
    kegiatan: 'Latihan membaca suku kata dasar dengan kartu huruf warna-warni. Siswa antusias dan aktif.',
    pemahaman: 4, keaktifan: 5, sesi: 1,
  },
  {
    id: 'ses002', studentId: 's001', tanggal: '2026-05-08',
    waktuMulai: '14:00', waktuSelesai: '15:30', kehadiran: 'hadir',
    materi: 'Membaca kata 2 suku kata (ba-ca, ma-kan)',
    kegiatan: 'Siswa menggabungkan suku kata menjadi kata. Sudah bisa membaca 10 kata dasar.',
    pemahaman: 4, keaktifan: 4, sesi: 2,
  },
  {
    id: 'ses003', studentId: 's001', tanggal: '2026-05-15',
    waktuMulai: '14:00', waktuSelesai: '15:30', kehadiran: 'hadir',
    materi: 'Menulis kata sederhana',
    kegiatan: 'Latihan menulis 5 kata di buku tulis. Tulisan sudah cukup rapi.',
    pemahaman: 3, keaktifan: 4, sesi: 3,
  },
  {
    id: 'ses004', studentId: 's001', tanggal: '2026-05-22',
    waktuMulai: '14:00', waktuSelesai: '15:30', kehadiran: 'hadir',
    materi: 'Membaca kalimat pendek',
    kegiatan: 'Siswa sudah bisa membaca kalimat "Ini buku Budi". Perkembangan sangat bagus!',
    pemahaman: 5, keaktifan: 5, sesi: 4,
  },
  {
    id: 'ses005', studentId: 's002', tanggal: '2026-05-05',
    waktuMulai: '15:00', waktuSelesai: '16:00', kehadiran: 'hadir',
    materi: 'Penjumlahan 1–5 dengan jari tangan',
    kegiatan: 'Pengenalan gerakan dasar jarimatika. Siswa mulai memahami konsep.',
    pemahaman: 3, keaktifan: 4, sesi: 1,
  },
  {
    id: 'ses006', studentId: 's003', tanggal: '2026-05-10',
    waktuMulai: '09:00', waktuSelesai: '10:00', kehadiran: 'hadir',
    materi: 'Mengenal warna dan bentuk dasar',
    kegiatan: 'Bermain susun balok warna-warni. Anak dapat mengelompokkan berdasarkan warna.',
    pemahaman: 4, keaktifan: 5, sesi: 1,
  },
];

const DEFAULT_SETTINGS = { iuran: 150000, guruPin: '1234' };

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [portal,   setPortal]   = useState('landing');
  const [students, setStudents] = useState(null);
  const [sessions, setSessions] = useState(null);
  const [settings, setSettings] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const s   = loadData('students');
    const ses = loadData('sessions');
    const cfg = loadData('settings');
    setStudents(s   || DEFAULT_STUDENTS);
    setSessions(ses || DEFAULT_SESSIONS);
    setSettings(cfg || DEFAULT_SETTINGS);
  }, []);

  function updateStudents(data) { setStudents(data); saveData('students', data); }
  function updateSessions(data) { setSessions(data); saveData('sessions', data); }
  function updateSettings(data) { setSettings(data); saveData('settings', data); }

  if (!students || !sessions || !settings) {
    return (
      <div style={{ minHeight: '100vh', background: '#020817', display: 'flex',
        alignItems: 'center', justifyContent: 'center', color: '#3b82f6',
        fontFamily: "'Poppins', sans-serif", fontSize: '18px', gap: '12px' }}>
        <span style={{ fontSize: '28px' }}>📚</span> Memuat data...
      </div>
    );
  }

  if (portal === 'guru') return (
    <Guru
      students={students} sessions={sessions} settings={settings}
      onUpdateStudents={updateStudents}
      onUpdateSessions={updateSessions}
      onUpdateSettings={updateSettings}
      onBack={() => setPortal('landing')}
    />
  );

  if (portal === 'orangtua') return (
    <OrangTua
      students={students} sessions={sessions} settings={settings}
      onBack={() => setPortal('landing')}
    />
  );

  return <Landing onSelectPortal={setPortal} />;
}
