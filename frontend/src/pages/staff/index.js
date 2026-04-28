import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout';
import { StatCard, Card, Button, Badge, Avatar, Spinner, EmptyState, Icons } from '../../components/ui';
import { usePatients, useDashboardStats } from '../../hooks';
import { useAuth } from '../../context/AuthContext';

// Styles
const styles = {
  pageHeader: {
    marginBottom: '32px',
  },
  welcomeDate: {
    color: 'var(--text-secondary)',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  welcomeTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginTop: '8px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '32px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  tableHeader: {
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-tertiary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '12px 14px 12px 0',
  },
  patientRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  patientName: {
    fontWeight: 500,
    fontSize: '14px',
    color: 'var(--text-primary)',
  },
};

export function StaffDashboard() {
  const { user } = useAuth();
  const { data: stats, loading: statsLoading } = useDashboardStats();
  const { data: patients, loading: patientsLoading } = usePatients();
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <AppLayout title="Tableau de bord administratif">
      {/* Welcome Header */}
      <div style={styles.pageHeader}>
        <p style={styles.welcomeDate}>
          <Icons.Calendar size={18} />
          {today.charAt(0).toUpperCase() + today.slice(1)}
        </p>
        <h2 style={styles.welcomeTitle}>
          Bienvenue, <span style={{ color: 'var(--color-primary-600)' }}>{user?.name}</span>
        </h2>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <StatCard
          label="Total patients"
          value={statsLoading ? '...' : stats?.total_patients ?? 0}
          icon={<Icons.Users size={24} />}
          color="var(--color-primary-600)"
          trend={stats?.patients_trend}
        />
        <StatCard
          label="Dossiers médicaux"
          value={statsLoading ? '...' : stats?.total_records ?? 0}
          icon={<Icons.FileText size={24} />}
          color="var(--color-secondary-600)"
          trend={stats?.records_trend}
        />
        <StatCard
          label="Documents"
          value={statsLoading ? '...' : stats?.total_analyses ?? 0}
          icon={<Icons.Folder size={24} />}
          color="#7c3aed"
          trend={stats?.documents_trend}
        />
      </div>

      {/* Patients Table */}
      <Card>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>
            <Icons.Users size={20} />
            Tous les patients
          </h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={() => navigate('/patients/new')}>
              <Icons.UserPlus size={18} style={{ marginRight: '6px' }} />
              Nouveau patient
            </Button>
            <Button onClick={() => navigate('/reports')}>
              <Icons.BarChart size={18} style={{ marginRight: '6px' }} />
              Générer rapport
            </Button>
          </div>
        </div>

        {patientsLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <Spinner />
          </div>
        ) : !patients || patients.length === 0 ? (
          <EmptyState
            icon={<Icons.Users size={48} />}
            title="Aucun patient enregistré"
            message="Les patients apparaîtront ici une fois créés."
          />
        ) : (
          <div style={styles.tableContainer}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                  {['ID', 'Patient', 'Date de naissance', 'Téléphone', 'Groupe sanguin', 'Actions'].map(h => (
                    <th key={h} style={styles.tableHeader}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr
                    key={p.id_patient}
                    style={{ borderBottom: '1px solid var(--border-light)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{
                      padding: '16px 14px 16px 0',
                      fontSize: '13px',
                      color: 'var(--text-tertiary)',
                      fontFamily: 'var(--font-family-mono)',
                    }}>
                      P-{String(p.id_patient).padStart(7, '0')}
                    </td>
                    <td style={{ padding: '16px 14px 16px 0' }}>
                      <div style={styles.patientRow}>
                        <Avatar name={`${p.first_name} ${p.last_name}`} size={38} />
                        <span style={styles.patientName}>{p.first_name} {p.last_name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 14px 16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {p.dob || '—'}
                    </td>
                    <td style={{ padding: '16px 14px 16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {p.phone_number || '—'}
                    </td>
                    <td style={{ padding: '16px 14px 16px 0' }}>
                      {p.blood_type ? <Badge variant="primary">{p.blood_type}</Badge> : '—'}
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => navigate(`/patients/${p.id_patient}`)}
                      >
                        <Icons.Eye size={16} style={{ marginRight: '6px' }} />
                        Voir
                      </Button>
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
