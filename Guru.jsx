import { useState, useEffect } from 'react';
import {
  Card, Badge, Avatar, Input, Select, Toast, StarRating, IuranBanner,
  formatDate, formatRupiah, generateId, generateCode, getInitials, avatarColor,
} from './components.jsx';

// ─── Main Guru Portal ──────────────────────────────────────────────────────────
export default function Guru({ students, sessions, settings, onUpdateStudents, onUpdateSessions, onUpdateSettings, onBack }) {
  const [view, setView]           = useState('login'); // login | dashboard | addStudent | addSession | detail | settings
  const [pin, setPin]             = useState('');
  const [toast, setToast]         = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sessionForm, setSessionForm]         = useState(null);
  const [studentForm, setStudentForm]         = useState({ name: '', kelas: 'Baca Tulis' });

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  // ── Auth ───────────────────────────────────────────────────────────────────
  function handleLogin() {
    if (pin === settings.guruPin) setView('dashboard');
    else { showToast('PIN salah!', 'error'); setPin(''); }
  }

  // ── Add Student ────────────────────────────────────────────────────────────
  function handleAddStudent() {
    if (!studentForm.name.trim()) return showToast('Nama tidak boleh kosong', 'error');
    const code = generateCode(studentForm.kelas, students.length + 1);
    const ns = {
      id: generateId(),
      name: studentForm.name.trim(),
      kelas: studentForm.kelas,
      code,
      avatar: getInitials(studentForm.name),
    };
    onUpdateStudents([...students, ns]);
    setStudentForm({ name: '', kelas: 'Baca Tulis' });
    setView('dashboard');
    showToast(`${ns.name} ditambahkan! Kode: ${code}`);
  }

  // ── Init Session Form ──────────────────────────────────────────────────────
  function openSessionForm(studentId) {
    const today = new Date().toISOString().slice(0, 10);
    setSessionForm({
      studentId, tanggal: today,
      waktuMulai: '14:00', waktuSelesai: '15:30',
      kehadiran: 'hadir', materi: '', kegiatan: '',
      pemahaman: 3, keaktifan: 3,
    });
    setView('addSession');
  }

  // ── Save Session ───────────────────────────────────────────────────────────
  function handleSaveSession() {
    if (!sessionForm.materi.trim()) return showToast('Materi wajib diisi', 'error');
    if (!sessionForm.kegiatan.trim()) return showToast('Kegiatan wajib diisi', 'error');
    const sesiCount = sessions.filter(s => s.studentId === sessionForm.studentId).length + 1;
    const ns = { ...sessionForm, id: generateId(), sesi: sesiCount };
    onUpdateSessions([...sessions, ns]);
    setView('detail');
    showToast('Sesi berhasil disimpan! 🎉');
  }

  // ── Save Settings ──────────────────────────────────────────────────────────
  function handleSaveSettings(s) {
    onUpdateSettings(s);
    setView('dashboard');
    showToast('Pengaturan disimpan!');
  }

  // ─────────────────────────────────────────────────────────────────────────
  if (view === 'login') return (
    <div style={{
      minHeight: '100vh', background: '#020817', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px',
      backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #1e3a5f44, transparent)',
    }}>
      {toast && <Toast {...toast} />}
      <Card style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '52px', marginBottom: '12px' }}>👩🏼‍🏫</div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: '22px',
            color: '#f1f5f9', margin: '0 0 6px' }}>Portal Guru</h2>
          <p style={{ color: '#64748b', fontSize: '13px' }}>
            Masukkan PIN untuk mengakses dashboard
          </p>
        </div>
        <Input label="PIN Guru" type="password" value={pin} onChange={setPin} placeholder="••••" />
        <button onClick={handleLogin} style={{
          width: '100%', background: 'linear-gradient(135deg, #1e3a5f, #1e40af)',
          border: '1px solid #3b82f644', color: '#60a5fa', borderRadius: '10px',
          padding: '13px', fontWeight: 800, fontSize: '15px', cursor: 'pointer',
        }}>Masuk</button>
        <button onClick={onBack} style={{
          width: '100%', background: 'transparent', border: 'none',
          color: '#475569', marginTop: '10px', cursor: 'pointer', fontSize: '13px', padding: '8px',
        }}>← Kembali ke Beranda</button>
      </Card>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#020817' }}>
      {toast && <Toast {...toast} />}
      {/* Top Nav */}
      <nav style={{
        background: '#0a1628', borderBottom: '1px solid #1e293b',
        padding: '12px 16px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>📚</span>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, color: '#f1f5f9', fontSize: '15px' }}>CPS</span>
          <span style={{ color: '#334155', fontSize: '12px' }}>· Portal Guru</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setView('settings')} style={{
            background: '#1e293b', border: 'none', color: '#94a3b8',
            borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '16px',
          }}>⚙️</button>
          <button onClick={() => { setView('login'); setPin(''); onBack(); }} style={{
            background: '#1e293b', border: 'none', color: '#94a3b8',
            borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '13px',
          }}>Keluar</button>
        </div>
      </nav>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '16px 16px 80px' }}>
        {view === 'settings' && (
          <SettingsView settings={settings} onSave={handleSaveSettings} onBack={() => setView('dashboard')} />
        )}
        {view === 'addStudent' && (
          <AddStudentView
            form={studentForm} onChange={setStudentForm}
            onSave={handleAddStudent} onBack={() => setView('dashboard')}
          />
        )}
        {view === 'addSession' && sessionForm && (
          <AddSessionView
            form={sessionForm} onChange={setSessionForm}
            studentName={students.find(s => s.id === sessionForm.studentId)?.name}
            onSave={handleSaveSession} onBack={() => setView('detail')}
          />
        )}
        {view === 'detail' && selectedStudent && (
          <StudentDetail
            student={selectedStudent}
            sessions={sessions.filter(s => s.studentId === selectedStudent.id)}
            settings={settings}
            onBack={() => setView('dashboard')}
            onAddSession={() => openSessionForm(selectedStudent.id)}
          />
        )}
        {view === 'dashboard' && (
          <Dashboard
            students={students} sessions={sessions}
            onAddStudent={() => setView('addStudent')}
            onAddSession={openSessionForm}
            onViewDetail={s => { setSelectedStudent(s); setView('detail'); }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ students, sessions, onAddStudent, onAddSession, onViewDetail }) {
  const [search, setSearch] = useState('');
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '20px', paddingTop: '4px' }}>
        {[
          { label: 'Total Siswa', value: students.length, icon: '👥', color: '#3b82f6' },
          { label: 'Total Sesi',  value: sessions.length, icon: '📋', color: '#8b5cf6' },
          { label: 'Kelas Aktif', value: 3,               icon: '🏫', color: '#4ade80' },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ fontSize: '24px' }}>{s.icon}</div>
            <div style={{ color: s.color, fontWeight: 900, fontSize: '26px',
              fontFamily: "'Poppins', sans-serif", lineHeight: 1 }}>{s.value}</div>
            <div style={{ color: '#64748b', fontSize: '11px', marginTop: '4px' }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Cari siswa atau kode..."
          style={{ flex: 1, background: '#0f172a', border: '1px solid #1e293b',
            borderRadius: '10px', padding: '10px 14px', color: '#e2e8f0',
            fontSize: '14px', outline: 'none' }}
        />
        <button onClick={onAddStudent} style={{
          background: 'linear-gradient(135deg, #1e3a5f, #1e40af)',
          border: '1px solid #3b82f644', color: '#60a5fa', borderRadius: '10px',
          padding: '10px 16px', fontWeight: 800, cursor: 'pointer',
          fontSize: '13px', whiteSpace: 'nowrap',
        }}>＋ Siswa</button>
      </div>

      {/* Students by class */}
      {['Baca Tulis', 'Jarimatika', 'Kelas Bermain'].map(kelas => {
        const list = filtered.filter(s => s.kelas === kelas);
        if (!list.length) return null;
        return (
          <div key={kelas} style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Badge label={kelas} />
              <span style={{ color: '#475569', fontSize: '12px' }}>{list.length} siswa</span>
            </div>
            {list.map(s => {
              const sSessions = sessions.filter(x => x.studentId === s.id);
              const hadir = sSessions.filter(x => x.kehadiran === 'hadir').length;
              const due   = hadir > 0 && hadir % 4 === 0;
              return (
                <Card key={s.id} style={{ marginBottom: '10px' }}
                  onClick={() => onViewDetail(s)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Avatar initials={s.avatar} size={42} color={avatarColor(s.kelas)} />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '15px' }}>{s.name}</div>
                      <div style={{ color: '#475569', fontSize: '12px', marginTop: '1px' }}>
                        Kode: <span style={{ color: avatarColor(s.kelas) }}>{s.code}</span>
                        &nbsp;&middot;&nbsp;{sSessions.length} sesi
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {due && <span title="Iuran jatuh tempo" style={{ fontSize: '18px' }}>🔔</span>}
                      <button
                        onClick={e => { e.stopPropagation(); onAddSession(s.id); }}
                        style={{ background: '#1e3a5f', border: '1px solid #3b82f644',
                          color: '#60a5fa', borderRadius: '8px', padding: '6px 12px',
                          cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}
                      >＋ Sesi</button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        );
      })}

      {filtered.length === 0 && (
        <Card>
          <div style={{ textAlign: 'center', color: '#475569', padding: '32px 0' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
            Tidak ada siswa ditemukan
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Student Detail ────────────────────────────────────────────────────────────
function StudentDetail({ student, sessions, settings, onBack, onAddSession }) {
  const sorted    = [...sessions].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  const hadir     = sessions.filter(s => s.kehadiran === 'hadir').length;
  const avgP      = sessions.length ? (sessions.reduce((a,s) => a+s.pemahaman,0)/sessions.length).toFixed(1) : '-';
  const avgK      = sessions.length ? (sessions.reduce((a,s) => a+s.keaktifan,0)/sessions.length).toFixed(1) : '-';
  const color     = avatarColor(student.kelas);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <button onClick={onBack} style={{ background: '#1e293b', border: 'none', color: '#94a3b8',
          borderRadius: '8px', padding: '8px 12px', cursor: 'pointer' }}>←</button>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: '18px',
            color: '#f1f5f9', margin: 0 }}>{student.name}</h2>
          <div style={{ display: 'flex', gap: '6px', marginTop: '4px', alignItems: 'center' }}>
            <Badge label={student.kelas} />
            <span style={{ color, fontSize: '11px' }}>{student.code}</span>
          </div>
        </div>
        <button onClick={onAddSession} style={{ background: 'linear-gradient(135deg,#1e3a5f,#1e40af)',
          border: '1px solid #3b82f644', color: '#60a5fa', borderRadius: '10px',
          padding: '8px 14px', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}>
          ＋ Sesi
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '16px' }}>
        {[
          { label: 'Sesi', value: sessions.length, icon: '📋' },
          { label: 'Hadir', value: hadir, icon: '✅' },
          { label: 'Pemahaman', value: avgP === '-' ? '-' : avgP+'★', icon: '🧠' },
          { label: 'Keaktifan', value: avgK === '-' ? '-' : avgK+'★', icon: '⚡' },
        ].map(st => (
          <Card key={st.label} style={{ padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '16px' }}>{st.icon}</div>
            <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '16px' }}>{st.value}</div>
            <div style={{ color: '#64748b', fontSize: '10px', marginTop: '2px' }}>{st.label}</div>
          </Card>
        ))}
      </div>

      <IuranBanner hadirCount={hadir} iuran={settings.iuran} />

      <div style={{ color: '#64748b', fontSize: '11px', fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
        Riwayat Sesi ({sessions.length})
      </div>

      {sorted.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', color: '#475569', padding: '32px 0' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📭</div>
            Belum ada sesi. Klik "＋ Sesi" untuk mulai.
          </div>
        </Card>
      ) : sorted.map(ses => (
        <Card key={ses.id} style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div>
              <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '14px' }}>Sesi ke-{ses.sesi}</div>
              <div style={{ color: '#64748b', fontSize: '12px' }}>
                {formatDate(ses.tanggal)} &middot; {ses.waktuMulai}–{ses.waktuSelesai}
              </div>
            </div>
            <Badge label={ses.kehadiran} />
          </div>
          <div style={{ background:'#020817', borderRadius:'8px', padding:'10px', marginBottom:'8px' }}>
            <div style={{ color:'#60a5fa', fontSize:'11px', fontWeight:700, marginBottom:'3px' }}>MATERI</div>
            <div style={{ color:'#cbd5e1', fontSize:'13px', lineHeight:1.6 }}>{ses.materi}</div>
          </div>
          <div style={{ background:'#020817', borderRadius:'8px', padding:'10px', marginBottom:'12px' }}>
            <div style={{ color:'#818cf8', fontSize:'11px', fontWeight:700, marginBottom:'3px' }}>KEGIATAN</div>
            <div style={{ color:'#cbd5e1', fontSize:'13px', lineHeight:1.6 }}>{ses.kegiatan}</div>
          </div>
          <div style={{ display:'flex', gap:'24px' }}>
            <StarRating value={ses.pemahaman} label="Pemahaman" color="#f59e0b" />
            <StarRating value={ses.keaktifan} label="Keaktifan"  color="#4ade80" />
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── Add Student Form ──────────────────────────────────────────────────────────
function AddStudentView({ form, onChange, onSave, onBack }) {
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
        <button onClick={onBack} style={{ background:'#1e293b', border:'none', color:'#94a3b8',
          borderRadius:'8px', padding:'8px 12px', cursor:'pointer' }}>←</button>
        <h2 style={{ fontFamily:"'Poppins', sans-serif", fontWeight:900, fontSize:'18px',
          color:'#f1f5f9', margin:0 }}>Tambah Siswa Baru</h2>
      </div>
      <Card>
        <Input label="Nama Lengkap" value={form.name}
          onChange={v => onChange({...form, name: v})} placeholder="Nama lengkap siswa" />
        <Select label="Kelas" value={form.kelas}
          onChange={v => onChange({...form, kelas: v})}
          options={['Baca Tulis','Jarimatika','Kelas Bermain'].map(k=>({value:k,label:k}))} />
        <div style={{ background:'#020817', borderRadius:'10px', padding:'12px', marginBottom:'16px',
          border:'1px solid #1e293b' }}>
          <div style={{ color:'#64748b', fontSize:'12px' }}>
            Kode akan dibuat otomatis berdasarkan kelas:
            <span style={{ color:'#60a5fa', fontWeight:700 }}>
              {' '}{form.kelas === 'Baca Tulis' ? 'BT' : form.kelas === 'Jarimatika' ? 'JM' : 'KB'}-XXX
            </span>
          </div>
        </div>
        <button onClick={onSave} style={{ width:'100%',
          background:'linear-gradient(135deg,#1e3a5f,#1e40af)',
          border:'1px solid #3b82f644', color:'#60a5fa', borderRadius:'10px',
          padding:'13px', fontWeight:800, cursor:'pointer', fontSize:'15px' }}>
          Simpan Siswa
        </button>
      </Card>
    </div>
  );
}

// ─── Add Session Form ──────────────────────────────────────────────────────────
function AddSessionView({ form, onChange, studentName, onSave, onBack }) {
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
        <button onClick={onBack} style={{ background:'#1e293b', border:'none', color:'#94a3b8',
          borderRadius:'8px', padding:'8px 12px', cursor:'pointer' }}>←</button>
        <div>
          <h2 style={{ fontFamily:"'Poppins', sans-serif", fontWeight:900, fontSize:'18px',
            color:'#f1f5f9', margin:0 }}>Input Penilaian</h2>
          <div style={{ color:'#64748b', fontSize:'12px' }}>{studentName}</div>
        </div>
      </div>
      <Card>
        <Input label="Tanggal Les" type="date" value={form.tanggal}
          onChange={v => onChange({...form, tanggal:v})} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
          <Input label="Waktu Mulai" type="time" value={form.waktuMulai}
            onChange={v => onChange({...form, waktuMulai:v})} />
          <Input label="Waktu Selesai" type="time" value={form.waktuSelesai}
            onChange={v => onChange({...form, waktuSelesai:v})} />
        </div>
        <Select label="Kehadiran" value={form.kehadiran}
          onChange={v => onChange({...form, kehadiran:v})}
          options={[
            {value:'hadir',       label:'✅  Hadir'},
            {value:'tidak hadir', label:'❌  Tidak Hadir'},
          ]} />
        <Input label="Materi yang Dipelajari" type="textarea" value={form.materi}
          onChange={v => onChange({...form, materi:v})}
          placeholder="Contoh: Membaca huruf vokal, penjumlahan 1–10..." />
        <Input label="Kegiatan Belajar" type="textarea" value={form.kegiatan}
          onChange={v => onChange({...form, kegiatan:v})}
          placeholder="Deskripsi kegiatan dan perkembangan siswa selama sesi..." />

        {/* Star ratings */}
        <div style={{ background:'#020817', borderRadius:'12px', padding:'16px',
          marginBottom:'16px', border:'1px solid #1e293b' }}>
          <div style={{ color:'#64748b', fontSize:'11px', fontWeight:700,
            letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'16px' }}>
            Penilaian Siswa
          </div>
          <div style={{ display:'flex', gap:'32px' }}>
            <StarRating value={form.pemahaman} label="Pemahaman" color="#f59e0b"
              onChange={v => onChange({...form, pemahaman:v})} />
            <StarRating value={form.keaktifan} label="Keaktifan" color="#4ade80"
              onChange={v => onChange({...form, keaktifan:v})} />
          </div>
        </div>

        <button onClick={onSave} style={{ width:'100%',
          background:'linear-gradient(135deg,#1e3a5f,#1e40af)',
          border:'1px solid #3b82f644', color:'#60a5fa', borderRadius:'10px',
          padding:'13px', fontWeight:800, cursor:'pointer', fontSize:'15px' }}>
          💾  Simpan Penilaian
        </button>
      </Card>
    </div>
  );
}

// ─── Settings View ─────────────────────────────────────────────────────────────
function SettingsView({ settings, onSave, onBack }) {
  const [iuran, setIuran] = useState(String(settings.iuran));
  const [pin, setPin]     = useState(settings.guruPin);
  const [newPin, setNewPin] = useState('');

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
        <button onClick={onBack} style={{ background:'#1e293b', border:'none', color:'#94a3b8',
          borderRadius:'8px', padding:'8px 12px', cursor:'pointer' }}>←</button>
        <h2 style={{ fontFamily:"'Poppins', sans-serif", fontWeight:900, fontSize:'18px',
          color:'#f1f5f9', margin:0 }}>Pengaturan</h2>
      </div>
      <Card style={{ marginBottom:'14px' }}>
        <div style={{ color:'#94a3b8', fontSize:'11px', fontWeight:700,
          letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'16px' }}>
          💰 Iuran
        </div>
      <Input label="Nominal Iuran (Rp) per 8 Sesi Hadir" value={iuran}
  onChange={setIuran} placeholder="150000" />
        <div style={{ color:'#64748b', fontSize:'12px', marginTop:'-8px' }}>
          Notifikasi akan muncul setiap {8} sesi kehadiran
        </div>
      </Card>
      <Card style={{ marginBottom:'14px' }}>
        <div style={{ color:'#94a3b8', fontSize:'11px', fontWeight:700,
          letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'16px' }}>
          🔐 Keamanan
        </div>
        <Input label="PIN Saat Ini" type="password" value={pin} onChange={setPin} placeholder="PIN lama" />
        <Input label="PIN Baru (kosongkan jika tidak diubah)" type="password"
          value={newPin} onChange={setNewPin} placeholder="PIN baru" />
      </Card>
      <button
        onClick={() => onSave({
          ...settings,
          iuran: parseInt(iuran) || 0,
          guruPin: newPin.trim() ? newPin.trim() : settings.guruPin,
        })}
        style={{ width:'100%', background:'linear-gradient(135deg,#1e3a5f,#1e40af)',
          border:'1px solid #3b82f644', color:'#60a5fa', borderRadius:'10px',
          padding:'13px', fontWeight:800, cursor:'pointer', fontSize:'15px' }}
      >Simpan Pengaturan</button>
    </div>
  );
}
