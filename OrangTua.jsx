import { useState } from 'react';
import {
  Card, Badge, Avatar, Input, Toast, StarRating, IuranBanner,
  formatDate, formatRupiah, avatarColor,
} from './components.jsx';

export default function OrangTua({ students, sessions, settings, onBack }) {
  const [code, setCode]       = useState('');
  const [student, setStudent] = useState(null);
  const [toast, setToast]     = useState(null);

  function showToast(msg, type = 'error') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleLogin() {
    const found = students.find(s => s.code === code.trim().toUpperCase());
    if (found) setStudent(found);
    else showToast('Kode tidak valid. Minta kode anak ke guru.');
  }

  // ── Login Screen ─────────────────────────────────────────────────────────────
  if (!student) return (
    <div style={{
      minHeight: '100vh', background: '#020817', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px',
      backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #1a3a2a44, transparent)',
    }}>
      {toast && <Toast {...toast} />}
      <Card style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '52px', marginBottom: '12px' }}>👨‍👩‍👧</div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: '22px',
            color: '#f1f5f9', margin: '0 0 6px' }}>Portal Orang Tua</h2>
          <p style={{ color: '#64748b', fontSize: '13px' }}>Masukkan kode anak yang diberikan oleh guru</p>
        </div>
        <Input label="Kode Anak" value={code} onChange={setCode} placeholder="Contoh: BT-001" />
        <button
          onClick={handleLogin}
          style={{
            width: '100%', background: 'linear-gradient(135deg, #065f46, #1a3a2a)',
            border: '1px solid #4ade8044', color: '#4ade80', borderRadius: '10px',
            padding: '13px', fontWeight: 800, fontSize: '15px', cursor: 'pointer',
          }}
        >Lihat Laporan</button>
        <button
          onClick={onBack}
          style={{ width: '100%', background: 'transparent', border: 'none',
            color: '#475569', marginTop: '10px', cursor: 'pointer', fontSize: '13px', padding: '8px' }}
        >← Kembali ke Beranda</button>
      </Card>
    </div>
  );

  // ── Report Screen ────────────────────────────────────────────────────────────
  const studentSessions = sessions
    .filter(s => s.studentId === student.id)
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  const hadirCount = studentSessions.filter(s => s.kehadiran === 'hadir').length;
  const avgP = studentSessions.length
    ? (studentSessions.reduce((a, s) => a + s.pemahaman, 0) / studentSessions.length).toFixed(1) : '-';
  const avgK = studentSessions.length
    ? (studentSessions.reduce((a, s) => a + s.keaktifan, 0) / studentSessions.length).toFixed(1) : '-';
  const color = avatarColor(student.kelas);

  return (
    <div style={{ minHeight: '100vh', background: '#020817' }}>
      {toast && <Toast {...toast} />}

      {/* Top Nav */}
      <nav style={{
        background: '#0a1628', borderBottom: '1px solid #1e293b',
        padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button onClick={() => setStudent(null)} style={{
          background: '#1e293b', border: 'none', color: '#94a3b8',
          borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', fontSize: '14px',
        }}>←</button>
        <div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, color: '#f1f5f9', fontSize: '15px' }}>
            Laporan Perkembangan
          </div>
          <div style={{ color: '#64748b', fontSize: '12px' }}>Portal Orang Tua</div>
        </div>
      </nav>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px 16px 80px' }}>
        {/* Profile Card */}
        <Card style={{ marginBottom: '16px', background: `linear-gradient(160deg, ${color}11, #0f172a)`, border: `1px solid ${color}33` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <Avatar initials={student.avatar} size={56} color={color} />
            <div>
              <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '20px' }}>{student.name}</div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '4px', alignItems: 'center' }}>
                <Badge label={student.kelas} />
              </div>
              <div style={{ color: '#475569', fontSize: '11px', marginTop: '4px' }}>
                Kode: <span style={{ color }}>{student.code}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
            {[
              { label: 'Total Sesi', value: studentSessions.length, icon: '📋' },
              { label: 'Hadir', value: hadirCount, icon: '✅' },
              { label: 'Pemahaman', value: avgP === '-' ? '-' : avgP + '★', icon: '🧠' },
              { label: 'Keaktifan', value: avgK === '-' ? '-' : avgK + '★', icon: '⚡' },
            ].map(st => (
              <div key={st.label} style={{
                background: '#0f172a', borderRadius: '10px', padding: '10px',
                textAlign: 'center', border: '1px solid #1e293b',
              }}>
                <div style={{ fontSize: '16px' }}>{st.icon}</div>
                <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '17px' }}>{st.value}</div>
                <div style={{ color: '#64748b', fontSize: '10px', marginTop: '2px' }}>{st.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Iuran Banner */}
        <IuranBanner 
  hadirCount={hadirCount} 
  iuran={student.iuran || settings.iuran} 
  paketSesi={student.paketSesi || 4} 
/>

        {/* Session History */}
        <div style={{ color: '#64748b', fontSize: '11px', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Riwayat Sesi ({studentSessions.length})
        </div>

        {studentSessions.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', color: '#475569', padding: '32px 0' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📭</div>
              Belum ada catatan sesi
            </div>
          </Card>
        ) : studentSessions.map(ses => (
          <SessionCard key={ses.id} ses={ses} />
        ))}
      </div>
    </div>
  );
}

function SessionCard({ ses }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px',
      marginBottom: '12px', overflow: 'hidden', transition: 'border-color 0.2s',
    }}>
      {/* Header - always visible */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          padding: '14px 18px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
        }}
      >
        <div>
          <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '15px' }}>
            Sesi ke-{ses.sesi}
          </div>
          <div style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>
            {formatDate(ses.tanggal)} &middot; {ses.waktuMulai}–{ses.waktuSelesai}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge label={ses.kehadiran} />
          <span style={{ color: '#475569', fontSize: '12px' }}>{open ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Collapsed preview */}
      {!open && (
        <div style={{ padding: '0 18px 14px', color: '#64748b', fontSize: '13px',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {ses.materi}
        </div>
      )}

      {/* Expanded detail */}
      {open && (
        <div style={{ padding: '0 18px 18px', borderTop: '1px solid #1e293b' }}>
          <div style={{ paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <InfoBlock title="📖 Materi" color="#60a5fa" content={ses.materi} />
            <InfoBlock title="🎯 Kegiatan Belajar" color="#818cf8" content={ses.kegiatan} />
            <div style={{
              background: '#020817', borderRadius: '10px', padding: '14px',
              display: 'flex', gap: '24px',
            }}>
              <StarRating value={ses.pemahaman} label="Pemahaman" color="#f59e0b" />
              <StarRating value={ses.keaktifan} label="Keaktifan" color="#4ade80" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoBlock({ title, color, content }) {
  return (
    <div style={{ background: '#020817', borderRadius: '10px', padding: '12px' }}>
      <div style={{ color, fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '5px' }}>
        {title}
      </div>
      <div style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.6 }}>{content}</div>
    </div>
  );
}
