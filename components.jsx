// ─── Shared UI Components ──────────────────────────────────────────────────────

export function StarRating({ value, onChange, label, color = '#f59e0b' }) {
  return (
    <div>
      <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px', fontWeight: 700, letterSpacing: '0.05em' }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {[1, 2, 3, 4, 5].map(s => (
          <span
            key={s}
            onClick={() => onChange && onChange(s)}
            style={{
              fontSize: '26px',
              cursor: onChange ? 'pointer' : 'default',
              color: s <= value ? color : '#334155',
              transition: 'transform 0.1s, color 0.2s',
              display: 'inline-block',
              userSelect: 'none',
            }}
            onMouseEnter={e => onChange && (e.target.style.transform = 'scale(1.25)')}
            onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
          >★</span>
        ))}
      </div>
    </div>
  );
}

export function Badge({ label }) {
  const colors = {
    'Baca Tulis':   { bg: '#1e3a5f', text: '#60a5fa' },
    'Jarimatika':   { bg: '#1a3a2a', text: '#4ade80' },
    'Kelas Bermain':{ bg: '#3a1a3a', text: '#e879f9' },
    'hadir':        { bg: '#1a3a2a', text: '#4ade80' },
    'tidak hadir':  { bg: '#3a1a1a', text: '#f87171' },
  };
  const c = colors[label] || { bg: '#1e293b', text: '#94a3b8' };
  return (
    <span style={{
      background: c.bg, color: c.text, padding: '3px 12px',
      borderRadius: '20px', fontSize: '11px', fontWeight: 700,
      letterSpacing: '0.05em', whiteSpace: 'nowrap',
    }}>{label}</span>
  );
}

export function Avatar({ initials, size = 40, color = '#3b82f6' }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color + '22', border: `2px solid ${color}44`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color, fontWeight: 800, fontSize: size * 0.36, flexShrink: 0,
    }}>{initials}</div>
  );
}

export function Card({ children, style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#0f172a', border: '1px solid #1e293b',
        borderRadius: '16px', padding: '20px', ...style,
        cursor: onClick ? 'pointer' : 'default', transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => onClick && (
        e.currentTarget.style.borderColor = '#3b82f6',
        e.currentTarget.style.boxShadow = '0 0 0 1px #3b82f622'
      )}
      onMouseLeave={e => onClick && (
        e.currentTarget.style.borderColor = '#1e293b',
        e.currentTarget.style.boxShadow = 'none'
      )}
    >{children}</div>
  );
}

export function Input({ label, type = 'text', value, onChange, placeholder }) {
  const base = {
    width: '100%', background: '#020817', border: '1px solid #1e293b',
    borderRadius: '8px', padding: '10px 14px', color: '#e2e8f0',
    fontSize: '14px', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };
  const focus = e => (e.target.style.borderColor = '#3b82f6');
  const blur  = e => (e.target.style.borderColor = '#1e293b');
  return (
    <div style={{ marginBottom: '14px' }}>
      {label && (
        <label style={{ display: 'block', fontSize: '11px', color: '#64748b',
          marginBottom: '5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {label}
        </label>
      )}
      {type === 'textarea'
        ? <textarea value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} onFocus={focus} onBlur={blur}
            style={{ ...base, minHeight: '88px', resize: 'vertical' }} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} onFocus={focus} onBlur={blur} style={base} />
      }
    </div>
  );
}

export function Select({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      {label && (
        <label style={{ display: 'block', fontSize: '11px', color: '#64748b',
          marginBottom: '5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {label}
        </label>
      )}
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        width: '100%', background: '#020817', border: '1px solid #1e293b',
        borderRadius: '8px', padding: '10px 14px', color: '#e2e8f0',
        fontSize: '14px', outline: 'none', boxSizing: 'border-box', cursor: 'pointer',
      }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export function Toast({ msg, type }) {
  return (
    <div style={{
      position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
      background: type === 'error' ? '#3a1a1a' : '#1a3a2a',
      border: `1px solid ${type === 'error' ? '#f8717144' : '#4ade8044'}`,
      color: type === 'error' ? '#f87171' : '#4ade80',
      borderRadius: '12px', padding: '10px 22px', fontWeight: 700, fontSize: '13px',
      zIndex: 9999, whiteSpace: 'nowrap', boxShadow: '0 8px 32px #00000099',
      animation: 'fadeIn 0.2s ease',
    }}>
      {type === 'error' ? '❌ ' : '✅ '}{msg}
    </div>
  );
}

export function IuranBanner({ hadirCount, iuran }) {
  const due = hadirCount > 0 && hadirCount % 4 === 0;
  if (!due) return null;
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f59e0b18, #ef444418)',
      border: '1px solid #f59e0b44', borderRadius: '12px', padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
    }}>
      <span style={{ fontSize: '22px' }}>🔔</span>
      <div>
        <div style={{ color: '#fbbf24', fontWeight: 800, fontSize: '13px' }}>Pemberitahuan Iuran</div>
        <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '2px' }}>
          Sudah {hadirCount} sesi hadir &middot; Iuran {formatRupiah(iuran)} jatuh tempo
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
export function formatRupiah(n) { return 'Rp ' + Number(n).toLocaleString('id-ID'); }
export function formatDate(d) {
  if (!d) return '-';
  const [y, m, day] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${parseInt(day)} ${months[parseInt(m) - 1]} ${y}`;
}
export function generateId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
export function generateCode(kelas, n) {
  const prefix = { 'Baca Tulis': 'BT', 'Jarimatika': 'JM', 'Kelas Bermain': 'KB' }[kelas] || 'XX';
  return `${prefix}-${String(n).padStart(3, '0')}`;
}
export function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}
export function avatarColor(kelas) {
  return { 'Baca Tulis': '#3b82f6', 'Jarimatika': '#4ade80', 'Kelas Bermain': '#e879f9' }[kelas] || '#60a5fa';
}
