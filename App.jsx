import { useState, useEffect } from 'react';
import { loadData, saveData } from './storage.js';
import Landing  from './Landing.jsx';
import Guru     from './Guru.jsx';
import OrangTua from './OrangTua.jsx';

// ─── Default seed data ─────────────────────────────────────────────────────────
const DEFAULT_STUDENTS = [
  { 
    id: 's001', 
    name: 'Kia', 
    kelas: 'Kelas Bermain', 
    code: 'KB009', 
    avatar: 'K', 
    iuran: 400000, 
    paketSesi: 4 
  },
  { 
    id: 's002', 
    name: 'Kia', 
    kelas: 'Baca Tulis', 
    code: 'BT008', 
    avatar: 'K', 
    iuran: 600000, 
    paketSesi: 8 
  },
  {
    id: 's003', 
    name: 'Julio Himawan', 
    kelas: 'Jarimatika', 
    code: 'JM001', 
    avatar: 'JH', 
    iuran: 300000, 
    paketSesi: 4
  },
  { 
    id: 's004', 
    name: 'Rasendria Nararya Al Falah', 
    kelas: 'Baca Tulis', 
    code: 'BT001', 
    avatar: 'RN', 
    iuran: 650000, 
    paketSesi: 8 
  },
  { 
    id: 's005', 
    name: 'Zeno Zeiss Rire Sontara', 
    kelas: 'Baca Tulis', 
    code: 'BT002', 
    avatar: 'ZZ', 
    iuran: 450000, 
    paketSesi: 8 
  },{ 
    id: 's006', 
    name: 'Falisha Azmi Syafiqa', 
    kelas: 'Baca Tulis', 
    code: 'BT003', 
    avatar: 'FA', 
    iuran: 500000, 
    paketSesi: 8 
  },
  { 
    id: 's007', 
    name: 'Gibran Ghani Dalimunthe', 
    kelas: 'Baca Tulis', 
    code: 'BT004', 
    avatar: 'GG', 
    iuran: 450000, 
    paketSesi: 8 
  },
  { 
    id: 's008', 
    name: 'Zhenya Zea Rire Sontara', 
    kelas: 'Jarimatika', 
    code: 'JM002', 
    avatar: 'ZZ', 
    iuran: 550000, 
    paketSesi: 8 
  },
  { 
    id: 's009', 
    name: 'Zeno Zeiss Rire Sontara', 
    kelas: 'Jarimatika', 
    code: 'JM003', 
    avatar: 'ZZ', 
    iuran: 550000, 
    paketSesi: 8 
  },
  { 
    id: 's010', 
    name: 'Evy', 
    kelas: 'Baca Tulis', 
    code: 'BT005', 
    avatar: 'K', 
    iuran: 600000, 
    paketSesi: 8 
  },
];

const DEFAULT_SESSIONS = [];

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
