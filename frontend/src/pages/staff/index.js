import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout';
import { Card, Button, Badge, Avatar, Spinner, EmptyState, Icons } from '../../components/ui';
import { usePatients, useDashboardStats } from '../../hooks';
import { useAuth } from '../../context/AuthContext';

// Staff Dashboard - Soft Admin Theme
const styles = {
  // Soft Admin Header
  pageHeader: {
    marginBottom: '28px',
    padding: '24px 28px',
    background: 'linear-gradient(135deg, #fff8f6 0%, #ffefeb 50%, #f0f7ff 100%)',
    borderRadius: '20px',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #ffddd4',
  },
  pageHeaderPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(circle at 90% 30%, rgba(248, 126, 98, 0.08) 0%, transparent 50%)`,
    pointerEvents: 'none',
  },
  pageHeaderGrid: {
    display: 'none',
  },
  welcomeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
    zIndex: 1,
  },
  welcomeDate: {
    color: '#c5503a',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 500,
  },
  welcomeTitle: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#86372a',
    marginTop: '8px',
    letterSpacing: '-0.02em',
  },
  welcomeHighlight: {
    color: '#f87e62',
  },
  welcomeSubtitle: {
    color: '#c5503a',
    fontSize: '14px',
    marginTop: '6px',
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
    position: 'relative',
    zIndex: 1,
  },
  headerButton: {
    padding: '10px 18px',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'all 200ms',
    border: 'none',
  },
  headerButtonPrimary: {
    background: 'linear-gradient(135deg, #f87e62 0%, #e5654a 100%)',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(248, 126, 98, 0.25)',
  },
  headerButtonSecondary: {
    background: '#ffffff',
    color: '#86372a',
    border: '1px solid #ffddd4',
  },
  // Stats Grid - Soft Cards
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  statCard: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #e8e6e1',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 200ms',
  },
  statCardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
  },
  statIcon: {
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '14px',
  },
  statValue: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#1a1918',
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '13px',
    color: '#5c5854',
    fontWeight: 500,
  },
  statTrend: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    marginTop: '10px',
  },
  // Search & Filters Bar
  searchBar: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
  },
  filterChips: {
    display: 'flex',
    gap: '8px',
  },
  filterChip: {
    padding: '10px 18px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 200ms',
    border: '1px solid #e5e7eb',
    background: '#ffffff',
    color: '#6b7280',
  },
  filterChipActive: {
    background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
    color: '#ffffff',
    border: '1px solid #ea580c',
    boxShadow: '0 4px 12px -2px rgba(234, 88, 12, 0.3)',
  },
  // Premium Card Header
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '20px',
    borderBottom: '2px solid #fff7ed',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  cardTitleIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    boxShadow: '0 4px 12px -2px rgba(234, 88, 12, 0.4)',
  },
  cardActions: {
    display: 'flex',
    gap: '12px',
  },
  // Table Styles
  tableContainer: {
    overflowX: 'auto',
  },
  tableHeader: {
    textAlign: 'left',
    fontSize: '11px',
    fontWeight: 700,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    padding: '14px 16px 14px 0',
    borderBottom: '2px solid #f3f4f6',
  },
  tableRow: {
    borderBottom: '1px solid #f3f4f6',
    transition: 'all 200ms',
  },
  tableRowHover: {
    background: '#fffbeb',
  },
  patientRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  patientAvatar: {
    position: 'relative',
  },
  patientOnline: {
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#10b981',
    border: '2px solid #ffffff',
  },
  patientInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  patientName: {
    fontWeight: 600,
    fontSize: '14px',
    color: '#1f2937',
  },
  patientMeta: {
    fontSize: '12px',
    color: '#9ca3af',
    marginTop: '2px',
  },
  actionButton: {
    padding: '8px 14px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    transition: 'all 200ms',
    border: 'none',
    background: '#fff7ed',
    color: '#ea580c',
  },
  actionButtonHover: {
    background: '#ea580c',
    color: '#ffffff',
  },
};

export function StaffDashboard() {
  const { user } = useAuth();
  const { data: stats, loading: statsLoading } = useDashboardStats();
  const { data: patients, loading: patientsLoading } = usePatients();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const filteredPatients = patients?.filter(p => {
    const matchesSearch = !search ||
      `${p.first_name} ${p.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      p.phone_number?.includes(search);
    return matchesSearch;
  }) || [];

  const statCards = [
    {
      icon: <Icons.Users size={26} />,
      value: statsLoading ? '...' : stats?.total_patients ?? 0,
      label: 'Total patients',
      gradient: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
      bgLight: '#fff7ed',
      trend: '+12%',
      trendUp: true,
    },
    {
      icon: <Icons.FileText size={26} />,
      value: statsLoading ? '...' : stats?.total_records ?? 0,
      label: 'Dossiers médicaux',
      gradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
      bgLight: '#ecfeff',
      trend: '+8%',
      trendUp: true,
    },
    {
      icon: <Icons.Activity size={26} />,
      value: statsLoading ? '...' : stats?.total_analyses ?? 0,
      label: 'Analyses',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
      bgLight: '#f5f3ff',
      trend: '+15%',
      trendUp: true,
    },
    {
      icon: <Icons.Clipboard size={26} />,
      value: statsLoading ? '...' : stats?.total_prescriptions ?? 0,
      label: 'Ordonnances',
      gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      bgLight: '#ecfdf5',
      trend: '+5%',
      trendUp: true,
    },
  ];

  return (
    <AppLayout title="Centre de commande administratif">
      {/* Premium Command Center Header */}
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderPattern} />
        <div style={styles.pageHeaderGrid} />
        <div style={styles.welcomeRow}>
          <div>
            <p style={styles.welcomeDate}>
              <Icons.Calendar size={16} />
              {today.charAt(0).toUpperCase() + today.slice(1)}
            </p>
            <h2 style={styles.welcomeTitle}>
              Bienvenue, <span style={styles.welcomeHighlight}>{user?.name}</span>
            </h2>
            <p style={styles.welcomeSubtitle}>
              Centre de gestion des dossiers médicaux
            </p>
          </div>
          <div style={styles.headerActions}>
            <button
              style={{...styles.headerButton, ...styles.headerButtonSecondary}}
              onClick={() => navigate('/reports')}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
            >
              <Icons.BarChart size={18} />
              Rapports
            </button>
            <button
              style={{...styles.headerButton, ...styles.headerButtonPrimary}}
              onClick={() => navigate('/patients/new')}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Icons.UserPlus size={18} />
              Nouveau patient
            </button>
          </div>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div style={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <div
            key={index}
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px -10px rgba(234, 88, 12, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px -5px rgba(234, 88, 12, 0.1)';
            }}
          >
            <div style={{...styles.statCardAccent, background: stat.gradient}} />
            <div style={{
              ...styles.statIcon,
              background: stat.gradient,
              color: '#ffffff',
              boxShadow: `0 4px 12px -2px ${stat.gradient.includes('ea580c') ? 'rgba(234, 88, 12, 0.4)' : 'rgba(0,0,0,0.2)'}`,
            }}>
              {stat.icon}
            </div>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
            <div style={{
              ...styles.statTrend,
              color: stat.trendUp ? '#10b981' : '#ef4444',
            }}>
              {stat.trendUp ? <Icons.TrendingUp size={14} /> : <Icons.TrendingDown size={14} />}
              <span>{stat.trend} ce mois</span>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div style={styles.searchBar}>
        <div style={styles.searchInput}>
          <div style={styles.searchIcon}>
            <Icons.Search size={20} />
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un patient par nom ou téléphone..."
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              border: '2px solid #f3f4f6',
              borderRadius: '14px',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 200ms',
              background: '#ffffff',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#f97316';
              e.target.style.boxShadow = '0 0 0 4px rgba(249, 115, 22, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#f3f4f6';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <div style={styles.filterChips}>
          {['all', 'recent', 'active'].map(f => (
            <button
              key={f}
              style={{
                ...styles.filterChip,
                ...(filter === f ? styles.filterChipActive : {}),
              }}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Tous' : f === 'recent' ? 'Récents' : 'Actifs'}
            </button>
          ))}
        </div>
      </div>

      {/* Patients Table Card */}
      <Card style={{ borderRadius: '20px', border: '1px solid #fed7aa' }}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>
            <div style={styles.cardTitleIcon}>
              <Icons.Users size={20} />
            </div>
            Gestion des patients
            <Badge variant="warning" style={{ marginLeft: '12px' }}>
              {filteredPatients.length} patients
            </Badge>
          </h3>
          <div style={styles.cardActions}>
            <Button variant="secondary" size="sm">
              <Icons.Download size={16} style={{ marginRight: '6px' }} />
              Exporter
            </Button>
          </div>
        </div>

        {patientsLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
            <Spinner />
          </div>
        ) : filteredPatients.length === 0 ? (
          <EmptyState
            icon={<Icons.Users size={48} />}
            title={search ? "Aucun résultat" : "Aucun patient enregistré"}
            message={search ? "Essayez un autre terme de recherche." : "Les patients apparaîtront ici une fois créés."}
          />
        ) : (
          <div style={styles.tableContainer}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['ID', 'Patient', 'Date de naissance', 'Téléphone', 'Groupe sanguin', 'Statut', 'Actions'].map(h => (
                    <th key={h} style={styles.tableHeader}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((p, index) => (
                  <tr
                    key={p.id_patient}
                    style={styles.tableRow}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fffbeb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{
                      padding: '18px 16px 18px 0',
                      fontSize: '13px',
                      color: '#9ca3af',
                      fontFamily: 'var(--font-family-mono)',
                    }}>
                      <span style={{
                        background: '#fff7ed',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        color: '#ea580c',
                        fontWeight: 500,
                      }}>
                        P-{String(p.id_patient).padStart(5, '0')}
                      </span>
                    </td>
                    <td style={{ padding: '18px 16px 18px 0' }}>
                      <div style={styles.patientRow}>
                        <div style={styles.patientAvatar}>
                          <Avatar name={`${p.first_name} ${p.last_name}`} size={42} />
                          {index % 3 === 0 && <div style={styles.patientOnline} />}
                        </div>
                        <div style={styles.patientInfo}>
                          <span style={styles.patientName}>{p.first_name} {p.last_name}</span>
                          <span style={styles.patientMeta}>{p.user?.email || 'Email non défini'}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '18px 16px 18px 0', fontSize: '14px', color: '#6b7280' }}>
                      {p.dob || '—'}
                    </td>
                    <td style={{ padding: '18px 16px 18px 0', fontSize: '14px', color: '#6b7280' }}>
                      {p.phone_number || '—'}
                    </td>
                    <td style={{ padding: '18px 16px 18px 0' }}>
                      {p.blood_type ? (
                        <Badge variant="warning" style={{
                          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                          color: '#92400e',
                          border: '1px solid #fcd34d',
                        }}>
                          {p.blood_type}
                        </Badge>
                      ) : '—'}
                    </td>
                    <td style={{ padding: '18px 16px 18px 0' }}>
                      <Badge variant={index % 2 === 0 ? 'success' : 'default'}>
                        {index % 2 === 0 ? 'Actif' : 'Inactif'}
                      </Badge>
                    </td>
                    <td style={{ padding: '18px 0' }}>
                      <button
                        style={styles.actionButton}
                        onClick={() => navigate(`/patients/${p.id_patient}`)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#ea580c';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fff7ed';
                          e.currentTarget.style.color = '#ea580c';
                        }}
                      >
                        <Icons.Eye size={16} />
                        Voir dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </AppLayout>
  );
}
