import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout';
import { StatCard, Card, Button, Badge, Avatar, Spinner, EmptyState } from '../../components/ui';
import { usePatients, useDashboardStats } from '../../hooks';

export function StaffDashboard() {
  const { data: stats, loading: statsLoading } = useDashboardStats();
  const { data: patients, loading: patientsLoading } = usePatients();
  const navigate = useNavigate();

  return (
    <AppLayout title="Tableau de bord administratif">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 28 }}>
        <StatCard label="Total patients" value={statsLoading ? '…' : stats?.total_patients ?? 0} icon="👥" color="#1B6FE8" />
        <StatCard label="Rapports générés" value={statsLoading ? '…' : stats?.total_records ?? 0} icon="📊" color="#0F6E56" />
        <StatCard label="Documents" value={statsLoading ? '…' : stats?.total_analyses ?? 0} icon="📁" color="#7F77DD" />
      </div>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600 }}>Tous les patients</h3>
          <Button onClick={() => navigate('/reports')}>Générer rapport</Button>
        </div>
        {patientsLoading
          ? <Spinner />
          : !patients || patients.length === 0
          ? <EmptyState icon="👥" title="Aucun patient enregistré" />
          : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                {['ID', 'Patient', 'Date de naissance', 'Téléphone', 'Groupe sanguin', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontSize: 12, fontWeight: 500, color: '#6b6b6b', paddingBottom: 10, paddingRight: 14 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id_patient} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                  <td style={{ padding: '12px 14px 12px 0', fontSize: 12, color: '#999', fontFamily: 'monospace' }}>P-{String(p.id_patient).padStart(7,'0')}</td>
                  <td style={{ paddingRight: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={`${p.first_name} ${p.last_name}`} size={32} />
                      <span style={{ fontWeight: 500, fontSize: 14 }}>{p.first_name} {p.last_name}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 13, color: '#6b6b6b', paddingRight: 14 }}>{p.dob || '—'}</td>
                  <td style={{ fontSize: 13, color: '#6b6b6b', paddingRight: 14 }}>{p.phone_number || '—'}</td>
                  <td style={{ paddingRight: 14 }}>{p.blood_type ? <Badge variant="blue">{p.blood_type}</Badge> : '—'}</td>
                  <td>
                    <Button size="sm" variant="secondary" onClick={() => navigate(`/patients/${p.id_patient}`)}>Voir</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </AppLayout>
  );
}
