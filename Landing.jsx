export default function Landing({ onSelectPortal }) {
  return (
    <div style={{
      minHeight: '100vh', background: '#0b1120', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      backgroundImage: 'radial-gradient(ellipse 90% 60% at 50% -10%, #1e3a5f55, transparent)',
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ fontSize: '64px', marginBottom: '12px', filter: 'drop-shadow(0 0 24px #3b82f644)' }}>📚</div>
        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(30px, 6vw, 48px)',
          fontWeight: 900, color: '#f1f5f9', margin: 0, letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}>
          Catatan Penilaian
        </h1>
        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(30px, 6vw, 48px)',
          fontWeight: 900, margin: '0 0 16px',
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.03em', lineHeight: 1.1,
        }}>
          Siswa
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '360px', lineHeight: 1.6 }}>
          Platform laporan belajar antara guru dan orang tua
        </p>
      </div>

      {/* Portal Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', maxWidth: '460px' }}>
        <PortalCard
          emoji="👩🏼‍🏫"
          title="Portal Guru"
          desc="Input & kelola penilaian siswa"
          gradient="linear-gradient(160deg, #0c2040 0%, #0f172a 100%)"
          border="#3b82f644"
          hoverBorder="#3b82f6"
          glow="#3b82f622"
          onClick={() => onSelectPortal('guru')}
        />
        <PortalCard
          emoji="👨‍👩‍👧"
          title="Portal Orang Tua"
          desc="Lihat laporan perkembangan anak"
          gradient="linear-gradient(160deg, #0c2818 0%, #0f172a 100%)"
          border="#4ade8044"
          hoverBorder="#4ade80"
          glow="#4ade8022"
          onClick={() => onSelectPortal('orangtua')}
        />
      </div>

      <p style={{ color: '#1e293b', fontSize: '12px', marginTop: '48px', textAlign: 'center' }}>
        Orang tua: gunakan kode anak dari guru untuk masuk
      </p>
    </div>
  );
}

function PortalCard({ emoji, title, desc, gradient, border, hoverBorder, glow, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: gradient, border: `1px solid ${border}`,
        borderRadius: '20px', padding: '28px 16px', color: '#e2e8f0',
        cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 16px 40px ${glow}`;
        e.currentTarget.style.borderColor = hoverBorder;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.borderColor = border;
      }}
    >
      <span style={{ fontSize: '40px', filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.1))' }}>{emoji}</span>
      <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '15px' }}>{title}</div>
      <div style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.4 }}>{desc}</div>
    </button>
  );
}
