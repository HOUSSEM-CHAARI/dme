import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui';

const NAV = {
  doctor: [
    { path: '/dashboard',      label: 'Tableau de bord',    icon: '⊞' },
    { path: '/patients',       label: 'Patients',            icon: '👥' },
    { path: '/reports',        label: 'Rapports',            icon: '📊' },
    { path: '/profile',        label: 'Mon profil',          icon: '⚙' },
  ],
  patient: [
    { path: '/dashboard',      label: 'Mon espace',          icon: '⊞' },
    { path: '/my-records',     label: 'Dossier médical',     icon: '📄' },
    { path: '/profile',        label: 'Mon profil',          icon: '👤' },
  ],
  staff: [
    { path: '/dashboard',      label: 'Tableau de bord',    icon: '⊞' },
    { path: '/patients',       label: 'Patients',            icon: '👥' },
    { path: '/reports',        label: 'Rapports',            icon: '📊' },
    { path: '/profile',        label: 'Paramètres',          icon: '⚙' },
  ],
};

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const nav = NAV[user?.role] || [];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <aside style={{
      width: 224, background: '#fff', borderRight: '0.5px solid rgba(0,0,0,0.1)',
      display: 'flex', flexDirection: 'column', minHeight: '100vh', flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '22px 20px 16px', borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: '#1B6FE8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 18, fontWeight: 700,
          }}>♡</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#1a1a1a', letterSpacing: -0.3 }}>DME</div>
            <div style={{ fontSize: 10, color: '#999' }}>Dossiers Médicaux</div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: '10px 10px 0' }}>
        {nav.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, border: 'none',
              background: isActive(item.path) ? '#E6F1FB' : 'transparent',
              color: isActive(item.path) ? '#1B6FE8' : '#6b6b6b',
              fontWeight: isActive(item.path) ? 600 : 400,
              fontSize: 13.5, cursor: 'pointer', marginBottom: 2, textAlign: 'left',
              transition: 'all 0.15s',
            }}
          >
            <span style={{ fontSize: 15, width: 20, textAlign: 'center' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: '12px 10px', borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', marginBottom: 4 }}>
          <Avatar name={user?.name || ''} size={34} />
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: '#999', textTransform: 'capitalize' }}>
              {user?.role === 'doctor' ? 'Médecin' : user?.role === 'staff' ? 'Staff' : 'Patient'}
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 12px', borderRadius: 8, border: 'none',
            background: 'transparent', color: '#E24B4A',
            fontSize: 13.5, cursor: 'pointer', textAlign: 'left',
          }}
        >
          <span>⬡</span> Déconnexion
        </button>
      </div>
    </aside>
  );
}

export function TopBar({ title }) {
  const { user } = useAuth();
  return (
    <header style={{
      background: '#fff', borderBottom: '0.5px solid rgba(0,0,0,0.1)',
      padding: '13px 28px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <h1 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a' }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#6b6b6b', position: 'relative' }}>
          🔔
          <span style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, background: '#E24B4A', borderRadius: '50%', border: '1.5px solid #fff' }} />
        </button>
        <Avatar name={user?.name || ''} size={34} />
      </div>
    </header>
  );
}

export function AppLayout({ children, title }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa', fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        body { font-family: 'Segoe UI', system-ui, sans-serif; }
        input:focus, select:focus, textarea:focus { border-color: #1B6FE8 !important; box-shadow: 0 0 0 3px rgba(27,111,232,0.12); }
        button:focus-visible { outline: 2px solid #1B6FE8; outline-offset: 2px; }
      `}</style>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar title={title} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', animation: 'fadeIn 0.2s ease' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
