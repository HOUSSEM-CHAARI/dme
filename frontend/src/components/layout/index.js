import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Icons, Avatar, Badge } from '../ui';

// Navigation configuration with SVG icons
const NAV_CONFIG = {
  doctor: [
    { path: '/dashboard', label: 'Tableau de bord', icon: 'Home', badge: null },
    { path: '/patients', label: 'Patients', icon: 'Users', badge: null },
    { path: '/reports', label: 'Rapports', icon: 'BarChart', badge: null },
  ],
  patient: [
    { path: '/dashboard', label: 'Mon espace', icon: 'Home', badge: null },
    { path: '/my-records', label: 'Dossier médical', icon: 'FileText', badge: null },
  ],
  staff: [
    { path: '/dashboard', label: 'Tableau de bord', icon: 'Home', badge: null },
    { path: '/patients', label: 'Patients', icon: 'Users', badge: null },
    { path: '/reports', label: 'Rapports', icon: 'BarChart', badge: null },
  ],
};

const QUICK_ACTIONS = {
  doctor: [
    { path: '/patients/new', label: 'Nouveau patient', icon: 'UserPlus' },
  ],
  staff: [
    { path: '/patients/new', label: 'Nouveau patient', icon: 'UserPlus' },
  ],
  patient: [],
};

// Styles object for better organization
const styles = {
  sidebar: {
    width: 'var(--sidebar-width)',
    background: 'var(--bg-sidebar)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    flexShrink: 0,
    position: 'relative',
    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.1)',
  },
  logoSection: {
    padding: '24px 20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '44px',
    height: '44px',
    borderRadius: 'var(--radius-xl)',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  logoText: {
    flex: 1,
  },
  logoTitle: {
    fontWeight: 800,
    fontSize: '20px',
    color: '#ffffff',
    letterSpacing: '-0.5px',
  },
  logoSubtitle: {
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: '2px',
    letterSpacing: '0.5px',
  },
  navSection: {
    flex: 1,
    padding: '20px 12px',
    overflowY: 'auto',
  },
  navLabel: {
    fontSize: '10px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    padding: '0 12px',
    marginBottom: '8px',
  },
  navItem: (isActive) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: 'var(--radius-lg)',
    border: 'none',
    background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
    color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
    fontWeight: isActive ? 600 : 400,
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '4px',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    position: 'relative',
    backdropFilter: isActive ? 'blur(10px)' : 'none',
  }),
  navItemHover: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
  },
  quickAction: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: 'var(--radius-lg)',
    border: '1px dashed rgba(255, 255, 255, 0.3)',
    background: 'transparent',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '13px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
  },
  userSection: {
    padding: '16px 12px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(0, 0, 0, 0.1)',
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: 'var(--radius-lg)',
    background: 'rgba(255, 255, 255, 0.08)',
    marginBottom: '8px',
  },
  userInfo: {
    flex: 1,
    overflow: 'hidden',
  },
  userName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  userRole: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'capitalize',
  },
  logoutBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    borderRadius: 'var(--radius-lg)',
    border: 'none',
    background: 'rgba(239, 68, 68, 0.15)',
    color: '#fca5a5',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  header: {
    background: 'var(--bg-primary)',
    borderBottom: '1px solid var(--border-light)',
    padding: '0 32px',
    height: 'var(--header-height)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 'var(--z-sticky)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  headerTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    letterSpacing: '-0.5px',
  },
  searchContainer: {
    position: 'relative',
    width: '320px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 16px 10px 44px',
    borderRadius: 'var(--radius-full)',
    border: '1px solid var(--border-light)',
    background: 'var(--bg-secondary)',
    fontSize: '14px',
    color: 'var(--text-primary)',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-tertiary)',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  iconButton: {
    width: '42px',
    height: '42px',
    borderRadius: 'var(--radius-lg)',
    border: 'none',
    background: 'transparent',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
  },
  notificationBadge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '8px',
    height: '8px',
    background: 'var(--color-error-500)',
    borderRadius: '50%',
    border: '2px solid var(--bg-primary)',
  },
  userButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '6px 12px 6px 6px',
    borderRadius: 'var(--radius-full)',
    border: '1px solid var(--border-light)',
    background: 'var(--bg-primary)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    width: '220px',
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
    border: '1px solid var(--border-light)',
    padding: '8px',
    zIndex: 'var(--z-dropdown)',
    animation: 'fadeInDown 0.15s ease',
  },
  dropdownItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: 'var(--radius-lg)',
    border: 'none',
    background: 'transparent',
    color: 'var(--text-primary)',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
  },
  dropdownDivider: {
    height: '1px',
    background: 'var(--border-light)',
    margin: '8px 0',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    padding: '32px',
    background: 'var(--bg-secondary)',
  },
};

// Sidebar Component
export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const nav = NAV_CONFIG[user?.role] || [];
  const quickActions = QUICK_ACTIONS[user?.role] || [];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const getRoleLabel = (role) => {
    switch (role) {
      case 'doctor': return 'Médecin';
      case 'staff': return 'Staff médical';
      case 'patient': return 'Patient';
      default: return role;
    }
  };

  return (
    <aside style={styles.sidebar}>
      {/* Logo Section */}
      <div style={styles.logoSection}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <Icons.Heart size={24} />
          </div>
          <div style={styles.logoText}>
            <div style={styles.logoTitle}>DME</div>
            <div style={styles.logoSubtitle}>Dossiers Médicaux</div>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav style={styles.navSection}>
        <div style={styles.navLabel}>Menu principal</div>
        {nav.map(item => {
          const Icon = Icons[item.icon];
          const active = isActive(item.path);
          const hovered = hoveredItem === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                ...styles.navItem(active),
                ...(hovered && !active ? styles.navItemHover : {}),
              }}
            >
              {Icon && <Icon size={20} />}
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <Badge variant="primary" size="sm">{item.badge}</Badge>
              )}
              {active && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3px',
                  height: '24px',
                  background: '#ffffff',
                  borderRadius: '0 4px 4px 0',
                }} />
              )}
            </button>
          );
        })}

        {quickActions.length > 0 && (
          <>
            <div style={{ ...styles.navLabel, marginTop: '24px' }}>Actions rapides</div>
            {quickActions.map(action => {
              const Icon = Icons[action.icon];
              return (
                <button
                  key={action.path}
                  onClick={() => navigate(action.path)}
                  style={styles.quickAction}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                >
                  {Icon && <Icon size={18} />}
                  {action.label}
                </button>
              );
            })}
          </>
        )}

        {/* Settings link */}
        <div style={{ ...styles.navLabel, marginTop: '24px' }}>Paramètres</div>
        <button
          onClick={() => navigate('/profile')}
          onMouseEnter={() => setHoveredItem('profile')}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            ...styles.navItem(isActive('/profile')),
            ...(hoveredItem === 'profile' && !isActive('/profile') ? styles.navItemHover : {}),
          }}
        >
          <Icons.Settings size={20} />
          <span style={{ flex: 1 }}>Mon profil</span>
        </button>
      </nav>

      {/* User Section */}
      <div style={styles.userSection}>
        <div style={styles.userCard}>
          <Avatar
            name={user?.name || ''}
            size={40}
            style={{ border: '2px solid rgba(255, 255, 255, 0.3)' }}
          />
          <div style={styles.userInfo}>
            <div style={styles.userName}>{user?.name}</div>
            <div style={styles.userRole}>{getRoleLabel(user?.role)}</div>
          </div>
        </div>
        <button
          onClick={logout}
          style={styles.logoutBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
          }}
        >
          <Icons.LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

// Header Component
export function TopBar({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/patients?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'doctor': return 'Médecin';
      case 'staff': return 'Staff médical';
      case 'patient': return 'Patient';
      default: return role;
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerLeft}>
        <h1 style={styles.headerTitle}>{title}</h1>

        {/* Search - Only for doctors and staff */}
        {(user?.role === 'doctor' || user?.role === 'staff') && (
          <div style={styles.searchContainer}>
            <div style={styles.searchIcon}>
              <Icons.Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Rechercher un patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              style={styles.searchInput}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary-500)';
                e.target.style.boxShadow = '0 0 0 3px var(--color-primary-100)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-light)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        )}
      </div>

      <div style={styles.headerRight}>
        {/* Notifications */}
        <button
          style={styles.iconButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-tertiary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <Icons.Bell size={22} />
          <span style={styles.notificationBadge} />
        </button>

        {/* User Menu */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            style={styles.userButton}
            onClick={() => setShowDropdown(!showDropdown)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-medium)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-light)';
            }}
          >
            <Avatar name={user?.name || ''} size={32} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {user?.name?.split(' ')[0]}
              </div>
            </div>
            <Icons.ChevronDown size={16} style={{ color: 'var(--text-tertiary)' }} />
          </button>

          {showDropdown && (
            <div style={styles.dropdown}>
              <div style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {user?.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {user?.email}
                </div>
                <Badge variant="primary" size="sm" style={{ marginTop: '8px' }}>
                  {getRoleLabel(user?.role)}
                </Badge>
              </div>

              <div style={{ padding: '4px 0' }}>
                <button
                  style={styles.dropdownItem}
                  onClick={() => { navigate('/profile'); setShowDropdown(false); }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Icons.User size={18} style={{ color: 'var(--text-secondary)' }} />
                  Mon profil
                </button>
                <button
                  style={styles.dropdownItem}
                  onClick={() => { navigate('/profile'); setShowDropdown(false); }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Icons.Settings size={18} style={{ color: 'var(--text-secondary)' }} />
                  Paramètres
                </button>
              </div>

              <div style={styles.dropdownDivider} />

              <button
                style={{ ...styles.dropdownItem, color: 'var(--color-error-600)' }}
                onClick={() => { logout(); setShowDropdown(false); }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-error-50)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <Icons.LogOut size={18} />
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Main App Layout
export function AppLayout({ children, title }) {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--bg-secondary)',
      fontFamily: 'var(--font-family)',
    }}>
      {/* Global styles injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          font-size: 16px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          font-family: var(--font-family);
          color: var(--text-primary);
          background: var(--bg-secondary);
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Focus states */
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--border-focus) !important;
          box-shadow: 0 0 0 3px var(--color-primary-100) !important;
        }

        button:focus-visible {
          outline: 2px solid var(--border-focus);
          outline-offset: 2px;
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: var(--bg-tertiary);
          border-radius: 9999px;
        }

        ::-webkit-scrollbar-thumb {
          background: var(--color-gray-300);
          border-radius: 9999px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--color-gray-400);
        }

        /* Selection */
        ::selection {
          background-color: var(--color-primary-100);
          color: var(--color-primary-900);
        }
      `}</style>

      <Sidebar />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 0,
      }}>
        <TopBar title={title} />
        <main style={{
          ...styles.main,
          animation: 'fadeIn 0.3s ease',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}

// Export Header as alias for TopBar for backward compatibility
export const Header = TopBar;
