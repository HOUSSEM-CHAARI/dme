import React from 'react';

// ── Badge ──────────────────────────────────────────────
export function Badge({ children, variant = 'blue', size = 'sm' }) {
  const variants = {
    blue:   { bg: '#E6F1FB', color: '#0C44A0' },
    green:  { bg: '#EAF3DE', color: '#0F6E56' },
    red:    { bg: '#FCEBEB', color: '#E24B4A' },
    amber:  { bg: '#FAEEDA', color: '#633806' },
    purple: { bg: '#F0EEFF', color: '#533AB7' },
    gray:   { bg: '#F1F1EF', color: '#555' },
  };
  const s = variants[variant] || variants.blue;
  return (
    <span style={{
      background: s.bg, color: s.color,
      fontSize: size === 'sm' ? 11 : 13,
      fontWeight: 600, padding: size === 'sm' ? '2px 8px' : '4px 12px',
      borderRadius: 20, whiteSpace: 'nowrap', display: 'inline-block',
    }}>
      {children}
    </span>
  );
}

// ── Avatar ─────────────────────────────────────────────
export function Avatar({ name = '', size = 36 }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const palette = ['#1B6FE8', '#0F6E56', '#D4537E', '#BA7517', '#533AB7'];
  const color = palette[name.charCodeAt(0) % palette.length] || palette[0];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color + '22', color, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.34, flexShrink: 0,
      border: `1.5px solid ${color}33`,
    }}>
      {initials}
    </div>
  );
}

// ── Button ─────────────────────────────────────────────
export function Button({ children, variant = 'primary', size = 'md', loading, disabled, onClick, type = 'button', style = {} }) {
  const variants = {
    primary:  { bg: '#1B6FE8', color: '#fff',  border: 'none' },
    secondary:{ bg: 'transparent', color: '#6b6b6b', border: '1px solid rgba(0,0,0,0.12)' },
    danger:   { bg: '#FCEBEB', color: '#E24B4A', border: '1px solid #E24B4A44' },
    success:  { bg: '#EAF3DE', color: '#0F6E56', border: 'none' },
    ghost:    { bg: 'transparent', color: '#1B6FE8', border: 'none' },
  };
  const sizes = {
    sm: { padding: '6px 12px', fontSize: 12 },
    md: { padding: '9px 18px', fontSize: 14 },
    lg: { padding: '12px 24px', fontSize: 15 },
  };
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        background: v.bg, color: v.color, border: v.border,
        borderRadius: 8, fontWeight: 500, cursor: (disabled || loading) ? 'not-allowed' : 'pointer',
        opacity: (disabled || loading) ? 0.6 : 1,
        display: 'inline-flex', alignItems: 'center', gap: 6,
        transition: 'opacity 0.15s',
        ...s, ...style,
      }}
    >
      {loading && <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
      {children}
    </button>
  );
}

// ── Input ──────────────────────────────────────────────
export function Input({ label, error, type = 'text', ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#6b6b6b', marginBottom: 6 }}>{label}</label>}
      <input
        type={type}
        style={{
          width: '100%', padding: '10px 14px', boxSizing: 'border-box',
          border: `1px solid ${error ? '#E24B4A' : 'rgba(0,0,0,0.12)'}`,
          borderRadius: 8, fontSize: 14, outline: 'none',
          background: '#fff', color: '#1a1a1a',
          transition: 'border-color 0.15s',
        }}
        {...props}
      />
      {error && <p style={{ fontSize: 12, color: '#E24B4A', marginTop: 4 }}>{error}</p>}
    </div>
  );
}

// ── Select ─────────────────────────────────────────────
export function Select({ label, children, error, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#6b6b6b', marginBottom: 6 }}>{label}</label>}
      <select
        style={{
          width: '100%', padding: '10px 14px', boxSizing: 'border-box',
          border: `1px solid ${error ? '#E24B4A' : 'rgba(0,0,0,0.12)'}`,
          borderRadius: 8, fontSize: 14, outline: 'none', background: '#fff',
        }}
        {...props}
      >
        {children}
      </select>
      {error && <p style={{ fontSize: 12, color: '#E24B4A', marginTop: 4 }}>{error}</p>}
    </div>
  );
}

// ── Textarea ───────────────────────────────────────────
export function Textarea({ label, error, rows = 3, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#6b6b6b', marginBottom: 6 }}>{label}</label>}
      <textarea
        rows={rows}
        style={{
          width: '100%', padding: '10px 14px', boxSizing: 'border-box',
          border: `1px solid ${error ? '#E24B4A' : 'rgba(0,0,0,0.12)'}`,
          borderRadius: 8, fontSize: 14, outline: 'none', resize: 'vertical',
        }}
        {...props}
      />
      {error && <p style={{ fontSize: 12, color: '#E24B4A', marginTop: 4 }}>{error}</p>}
    </div>
  );
}

// ── Card ───────────────────────────────────────────────
export function Card({ children, style = {}, padding = '20px 24px' }) {
  return (
    <div style={{
      background: '#fff', border: '0.5px solid rgba(0,0,0,0.1)',
      borderRadius: 14, padding, ...style,
    }}>
      {children}
    </div>
  );
}

// ── StatCard ───────────────────────────────────────────
export function StatCard({ label, value, icon, color = '#1B6FE8' }) {
  return (
    <Card style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 700, color, lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 12, color: '#6b6b6b', marginTop: 2 }}>{label}</div>
      </div>
    </Card>
  );
}

// ── Alert ──────────────────────────────────────────────
export function Alert({ children, variant = 'error' }) {
  const variants = {
    error:   { bg: '#FCEBEB', color: '#E24B4A', icon: '⚠' },
    success: { bg: '#EAF3DE', color: '#0F6E56', icon: '✓' },
    info:    { bg: '#E6F1FB', color: '#0C44A0', icon: 'ℹ' },
    warning: { bg: '#FAEEDA', color: '#633806', icon: '⚡' },
  };
  const v = variants[variant] || variants.error;
  return (
    <div style={{ background: v.bg, color: v.color, borderRadius: 8, padding: '10px 14px', fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 16 }}>
      <span>{v.icon}</span>
      <span>{children}</span>
    </div>
  );
}

// ── Spinner ────────────────────────────────────────────
export function Spinner({ size = 32 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
      <div style={{
        width: size, height: size,
        border: `3px solid rgba(27,111,232,0.2)`,
        borderTopColor: '#1B6FE8',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────
export function Modal({ open, onClose, title, children, width = 540 }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: width,
        maxHeight: '90vh', overflow: 'auto', padding: '28px 32px',
        boxShadow: '0 8px 60px rgba(0,0,0,0.18)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#999', lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Tabs ───────────────────────────────────────────────
export function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.1)', marginBottom: 20 }}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          style={{
            padding: '10px 18px', border: 'none', background: 'transparent',
            color: active === tab.key ? '#1B6FE8' : '#6b6b6b',
            fontWeight: active === tab.key ? 600 : 400,
            fontSize: 13.5, cursor: 'pointer',
            borderBottom: active === tab.key ? '2px solid #1B6FE8' : '2px solid transparent',
            marginBottom: -1,
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ── Empty State ────────────────────────────────────────
export function EmptyState({ icon = '📋', title, message }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      {title && <div style={{ fontWeight: 600, fontSize: 15, color: '#555', marginBottom: 6 }}>{title}</div>}
      {message && <div style={{ fontSize: 13 }}>{message}</div>}
    </div>
  );
}
