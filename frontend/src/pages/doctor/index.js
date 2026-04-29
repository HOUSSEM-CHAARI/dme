import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout';
import {
  Badge, Avatar, StatCard, Card, Button, Input, Textarea, Select,
  Modal, Tabs, Spinner, EmptyState, Alert, Icons
} from '../../components/ui';
import {
  usePatients, usePatient, useMedicalRecords, usePrescriptions,
  useAnalyses, useDocuments, useDashboardStats, useMutation
} from '../../hooks';
import { patientsAPI } from '../../api';
import { useAuth } from '../../context/AuthContext';

// Common styles - Premium SaaS Design
const styles = {
  pageHeader: {
    marginBottom: '28px',
  },
  welcomeText: {
    color: 'var(--text-secondary)',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: 500,
  },
  welcomeTitle: {
    fontSize: '26px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginTop: '6px',
    letterSpacing: '-0.02em',
    fontFamily: 'var(--font-display)',
  },
  welcomeHighlight: {
    color: 'var(--color-primary-600)',
  },
  userName: {
    color: 'var(--text-primary)',
    fontWeight: 600,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '28px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '14px',
    borderBottom: '1px solid var(--border-primary)',
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'var(--font-display)',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  patientRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  patientInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  patientName: {
    fontWeight: 500,
    fontSize: '14px',
    color: 'var(--text-primary)',
  },
  patientMeta: {
    fontSize: '12px',
    color: 'var(--text-tertiary)',
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '24px',
  },
  breadcrumbLink: {
    background: 'none',
    border: 'none',
    color: 'var(--color-primary-600)',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  breadcrumbCurrent: {
    color: 'var(--text-primary)',
    fontWeight: 500,
  },
  patientHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '24px',
    padding: '24px',
    background: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border-primary)',
    marginBottom: '24px',
    boxShadow: 'var(--shadow-sm)',
  },
  patientAvatar: {
    flexShrink: 0,
  },
  patientDetails: {
    flex: 1,
  },
  patientFullName: {
    fontSize: '22px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    letterSpacing: '-0.02em',
    fontFamily: 'var(--font-display)',
  },
  patientId: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '12px',
  },
  badgeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  patientActions: {
    display: 'flex',
    gap: '12px',
    flexShrink: 0,
  },
  recordCard: {
    padding: '20px',
    borderBottom: '1px solid var(--border-light)',
    transition: 'background 0.2s ease',
  },
  recordHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  recordTitle: {
    fontWeight: 600,
    fontSize: '15px',
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },
  recordMeta: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  recordActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  recordContent: {
    fontSize: '14px',
    color: 'var(--text-primary)',
    lineHeight: 1.6,
  },
  prescriptionCard: {
    padding: '20px',
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-light)',
    marginBottom: '12px',
    transition: 'box-shadow 0.2s ease',
  },
  medicationName: {
    fontSize: '17px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  dosageInfo: {
    display: 'flex',
    gap: '20px',
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '8px',
  },
  documentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 0',
    borderBottom: '1px solid var(--border-light)',
  },
  documentIcon: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontWeight: 500,
    fontSize: '15px',
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },
  documentMeta: {
    fontSize: '13px',
    color: 'var(--text-tertiary)',
  },
  sectionDivider: {
    marginTop: '32px',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-light)',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  sectionSubtitle: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginTop: '4px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0 16px',
  },
  formGrid3: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '0 16px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px',
  },
};

// ─── Doctor Dashboard ────────────────────────────────────────
export function DoctorDashboard() {
  const { user } = useAuth();
  const { data: stats, loading } = useDashboardStats();
  const { data: patients } = usePatients();
  const navigate = useNavigate();

  const recentPatients = patients?.slice(0, 5) || [];
  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <AppLayout title="Tableau de bord">
      {/* Welcome Header */}
      <div style={styles.pageHeader}>
        <p style={styles.welcomeText}>
          <Icons.Calendar size={18} />
          {today.charAt(0).toUpperCase() + today.slice(1)}
        </p>
        <h2 style={styles.welcomeTitle}>
          Bienvenue, <span style={styles.welcomeHighlight}>{user?.name}</span>
        </h2>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <StatCard
          label="Total patients"
          value={loading ? '...' : stats?.total_patients ?? 0}
          icon={Icons.Users}
          iconSize={24}
          color="primary"
          trend={stats?.patients_trend}
        />
        <StatCard
          label="Consultations aujourd'hui"
          value={loading ? '...' : stats?.total_records ?? 0}
          icon={Icons.Stethoscope}
          iconSize={24}
          color="teal"
          trend={stats?.records_trend}
        />
        <StatCard
          label="Ordonnances actives"
          value={loading ? '...' : stats?.total_prescriptions ?? 0}
          icon={Icons.Clipboard}
          iconSize={24}
          color="purple"
          trend={stats?.prescriptions_trend}
        />
        <StatCard
          label="Analyses en attente"
          value={loading ? '...' : stats?.total_analyses ?? 0}
          icon={Icons.Activity}
          iconSize={24}
          color="warning"
          trend={stats?.analyses_trend}
        />
      </div>

      {/* Recent Patients */}
      <Card>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>
            <Icons.Users size={20} />
            Patients récents
          </h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/patients')}>
            Voir tous
            <Icons.ArrowRight size={16} style={{ marginLeft: '6px' }} />
          </Button>
        </div>

        {recentPatients.length === 0 ? (
          <EmptyState
            icon={<Icons.Users size={48} />}
            title="Aucun patient"
            message="Les patients s'afficheront ici une fois enregistrés."
          />
        ) : (
          <div style={styles.tableContainer}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                  {['Patient', 'Date de naissance', 'Téléphone', 'Actions'].map(h => (
                    <th key={h} style={{
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--text-tertiary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      padding: '12px 16px 12px 0',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentPatients.map(p => (
                  <tr
                    key={p.id_patient}
                    style={{ borderBottom: '1px solid var(--border-light)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '16px 16px 16px 0' }}>
                      <div style={styles.patientRow}>
                        <Avatar name={`${p.first_name} ${p.last_name}`} size={40} />
                        <div style={styles.patientInfo}>
                          <span style={styles.patientName}>{p.first_name} {p.last_name}</span>
                          {p.blood_type && (
                            <span style={styles.patientMeta}>{p.blood_type}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '14px', color: 'var(--text-secondary)', padding: '16px 16px 16px 0' }}>
                      {p.dob || '—'}
                    </td>
                    <td style={{ fontSize: '14px', color: 'var(--text-secondary)', padding: '16px 16px 16px 0' }}>
                      {p.phone_number || '—'}
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => navigate(`/patients/${p.id_patient}`)}
                      >
                        <Icons.Eye size={16} style={{ marginRight: '6px' }} />
                        Voir dossier
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

// ─── Patient List Page ────────────────────────────────────────
export function PatientListPage() {
  const [search, setSearch] = useState('');
  const { data: patients, loading } = usePatients(search);
  const navigate = useNavigate();

  return (
    <AppLayout title="Patients">
      <Card>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-tertiary)',
            }}>
              <Icons.Search size={20} />
            </div>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher par nom, prénom, téléphone..."
              style={{
                width: '100%',
                padding: '12px 16px 12px 48px',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
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
          <Button onClick={() => navigate('/patients/new')}>
            <Icons.UserPlus size={18} style={{ marginRight: '8px' }} />
            Nouveau patient
          </Button>
        </div>

        {loading ? (
          <Spinner />
        ) : patients?.length === 0 ? (
          <EmptyState
            icon={<Icons.Search size={48} />}
            title="Aucun résultat"
            message="Essayez un autre terme de recherche."
          />
        ) : (
          <div style={styles.tableContainer}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                  {['ID', 'Patient', 'Date de naissance', 'Téléphone', 'Actions'].map(h => (
                    <th key={h} style={{
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--text-tertiary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      padding: '12px 16px 12px 0',
                    }}>{h}</th>
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
                      padding: '16px 16px 16px 0',
                      fontSize: '13px',
                      color: 'var(--text-tertiary)',
                      fontFamily: 'var(--font-family-mono)',
                    }}>
                      P-{String(p.id_patient).padStart(7, '0')}
                    </td>
                    <td style={{ padding: '16px 16px 16px 0' }}>
                      <div style={styles.patientRow}>
                        <Avatar name={`${p.first_name} ${p.last_name}`} size={42} />
                        <div style={styles.patientInfo}>
                          <span style={styles.patientName}>{p.first_name} {p.last_name}</span>
                          {p.blood_type && <Badge variant="primary" size="sm">{p.blood_type}</Badge>}
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '14px', color: 'var(--text-secondary)', padding: '16px 16px 16px 0' }}>
                      {p.dob || '—'}
                    </td>
                    <td style={{ fontSize: '14px', color: 'var(--text-secondary)', padding: '16px 16px 16px 0' }}>
                      {p.phone_number || '—'}
                    </td>
                    <td style={{ padding: '16px 0' }}>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => navigate(`/patients/${p.id_patient}`)}
                      >
                        <Icons.Eye size={16} style={{ marginRight: '6px' }} />
                        Voir dossier
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

// ─── Patient Dossier Page ─────────────────────────────────────
export function PatientDossierPage({ patientId, role = 'doctor' }) {
  const [tab, setTab] = useState('resume');
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [showAddAnalysis, setShowAddAnalysis] = useState(false);
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const navigate = useNavigate();

  const { data: patient, loading } = usePatient(patientId);
  const { data: records, refetch: refetchRecords } = useMedicalRecords(patientId);
  const { data: prescriptions, refetch: refetchPrescriptions } = usePrescriptions(patientId);
  const { data: analyses, refetch: refetchAnalyses } = useAnalyses(patientId);
  const { data: documents, refetch: refetchDocuments } = useDocuments(patientId);

  const handleDownload = async (docId, fileName) => {
    try {
      const response = await patientsAPI.downloadDocument(patientId, docId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      alert("Erreur lors du téléchargement du fichier.");
    }
  };

  const handleDeleteRecord = async (recordId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette consultation ?')) return;
    setDeleteLoading(`record-${recordId}`);
    try {
      await patientsAPI.deleteRecord(patientId, recordId);
      refetchRecords();
    } catch (err) {
      alert("Erreur lors de la suppression.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleDeletePrescription = async (prescriptionId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette ordonnance ?')) return;
    setDeleteLoading(`prescription-${prescriptionId}`);
    try {
      await patientsAPI.deletePrescription(patientId, prescriptionId);
      refetchPrescriptions();
    } catch (err) {
      alert("Erreur lors de la suppression.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleDeleteAnalysis = async (analysisId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette analyse ?')) return;
    setDeleteLoading(`analysis-${analysisId}`);
    try {
      await patientsAPI.deleteAnalysis(patientId, analysisId);
      refetchAnalyses();
    } catch (err) {
      alert("Erreur lors de la suppression.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) return;
    setDeleteLoading(`document-${documentId}`);
    try {
      await patientsAPI.deleteDocument(patientId, documentId);
      refetchDocuments();
    } catch (err) {
      alert("Erreur lors de la suppression.");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <AppLayout title="Dossier patient">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
          <Spinner />
        </div>
      </AppLayout>
    );
  }

  if (!patient) {
    return (
      <AppLayout title="Dossier patient">
        <Alert variant="error">Patient non trouvé.</Alert>
      </AppLayout>
    );
  }

  const name = `${patient.first_name} ${patient.last_name}`;
  const allergies = patient.allergies ? patient.allergies.split(',').map(a => a.trim()) : [];
  const diseases = patient.chronic_diseases ? patient.chronic_diseases.split(',').map(d => d.trim()) : [];

  const tabs = [
    { key: 'resume', label: 'Résumé', icon: <Icons.User size={16} /> },
    { key: 'dossier', label: 'Dossier médical', icon: <Icons.FileText size={16} /> },
    { key: 'prescriptions', label: 'Ordonnances', icon: <Icons.Clipboard size={16} />, count: prescriptions?.length || 0 },
    { key: 'analyses', label: 'Analyses', icon: <Icons.Activity size={16} />, count: analyses?.length || 0 },
    { key: 'documents', label: 'Documents', icon: <Icons.Folder size={16} />, count: documents?.length || 0 },
  ];

  return (
    <AppLayout title="Dossier Patient">
      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <button onClick={() => navigate('/patients')} style={styles.breadcrumbLink}>
          <Icons.ArrowLeft size={16} />
          Patients
        </button>
        <Icons.ChevronRight size={16} />
        <span style={styles.breadcrumbCurrent}>{name}</span>
      </div>

      {/* Patient Header Card */}
      <div style={styles.patientHeader}>
        <div style={styles.patientAvatar}>
          <Avatar name={name} size={80} />
        </div>
        <div style={styles.patientDetails}>
          <h2 style={styles.patientFullName}>{name}</h2>
          <div style={styles.patientId}>
            <span style={{
              fontFamily: 'var(--font-family-mono)',
              background: 'var(--bg-tertiary)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
            }}>
              P-{String(patient.id_patient).padStart(7, '0')}
            </span>
            {patient.dob && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icons.Calendar size={14} />
                Né(e) le {patient.dob}
              </span>
            )}
            {patient.phone_number && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icons.Phone size={14} />
                {patient.phone_number}
              </span>
            )}
          </div>
          <div style={styles.badgeContainer}>
            {patient.blood_type && <Badge variant="primary">{patient.blood_type}</Badge>}
            {allergies.map(a => (
              <Badge key={a} variant="danger">
                <Icons.AlertTriangle size={12} style={{ marginRight: '4px' }} />
                {a}
              </Badge>
            ))}
            {diseases.map(d => (
              <Badge key={d} variant="warning">{d}</Badge>
            ))}
          </div>
        </div>
        {role === 'doctor' && (
          <div style={styles.patientActions}>
            <Button onClick={() => setShowAddPrescription(true)}>
              <Icons.Plus size={16} style={{ marginRight: '6px' }} />
              Ordonnance
            </Button>
            <Button variant="secondary" onClick={() => setShowAddRecord(true)}>
              <Icons.Plus size={16} style={{ marginRight: '6px' }} />
              Consultation
            </Button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      {/* Tab Content */}
      {tab === 'resume' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <Card>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.User size={18} />
              Informations personnelles
            </h4>
            {[
              ['Email', patient.user?.email, <Icons.Mail size={16} key="mail" />],
              ['Téléphone', patient.phone_number, <Icons.Phone size={16} key="phone" />],
              ['Adresse', patient.address, <Icons.MapPin size={16} key="map" />],
              ['Date de naissance', patient.dob, <Icons.Calendar size={16} key="cal" />],
            ].map(([label, value, icon]) => value && (
              <div key={label} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid var(--border-light)',
              }}>
                <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                  {icon}
                  {label}
                </span>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '14px' }}>{value}</span>
              </div>
            ))}
          </Card>
          <Card>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.Heart size={18} />
              Antécédents médicaux
            </h4>
            {diseases.length === 0 ? (
              <EmptyState
                icon={<Icons.CheckCircle size={40} />}
                title="Aucun antécédent"
                message="Le patient n'a pas d'antécédents médicaux enregistrés."
              />
            ) : (
              diseases.map(d => (
                <div key={d} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border-light)',
                  fontSize: '14px',
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--color-primary-500)',
                  }} />
                  {d}
                </div>
              ))
            )}
          </Card>
        </div>
      )}

      {tab === 'dossier' && (
        <Card>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              <Icons.FileText size={20} />
              Historique des consultations
            </h3>
            {role === 'doctor' && (
              <Button size="sm" onClick={() => setShowAddRecord(true)}>
                <Icons.Plus size={16} style={{ marginRight: '6px' }} />
                Ajouter
              </Button>
            )}
          </div>
          {!records || records.length === 0 ? (
            <EmptyState
              icon={<Icons.FileText size={48} />}
              title="Aucune consultation"
              message="Les consultations apparaîtront ici."
            />
          ) : (
            records.map(r => (
              <div
                key={r.id_record}
                style={styles.recordCard}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={styles.recordHeader}>
                  <div>
                    <div style={styles.recordTitle}>{r.visit_reason || 'Consultation'}</div>
                    <div style={styles.recordMeta}>
                      <Icons.User size={14} />
                      {r.doctor_name || 'Médecin'}
                    </div>
                  </div>
                  <div style={styles.recordActions}>
                    <Badge variant={
                      r.status === 'completed' ? 'success' :
                      r.status === 'in_progress' ? 'warning' : 'info'
                    }>
                      {r.status === 'completed' ? 'Terminée' :
                       r.status === 'in_progress' ? 'En cours' : 'Planifiée'}
                    </Badge>
                    <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                      {new Date(r.created_at).toLocaleDateString('fr-FR')}
                    </span>
                    {role === 'doctor' && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteRecord(r.id_record)}
                        loading={deleteLoading === `record-${r.id_record}`}
                      >
                        <Icons.Trash2 size={14} />
                      </Button>
                    )}
                  </div>
                </div>
                {r.diagnosis && (
                  <p style={styles.recordContent}>
                    <strong>Diagnostic :</strong> {r.diagnosis}
                  </p>
                )}
                {r.treatment && (
                  <p style={{ ...styles.recordContent, color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <strong>Traitement :</strong> {r.treatment}
                  </p>
                )}
              </div>
            ))
          )}
        </Card>
      )}

      {tab === 'prescriptions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {role === 'doctor' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setShowAddPrescription(true)}>
                <Icons.Plus size={16} style={{ marginRight: '6px' }} />
                Nouvelle ordonnance
              </Button>
            </div>
          )}
          {!prescriptions || prescriptions.length === 0 ? (
            <Card>
              <EmptyState
                icon={<Icons.Clipboard size={48} />}
                title="Aucune ordonnance"
                message="Les ordonnances apparaîtront ici."
              />
            </Card>
          ) : (
            prescriptions.map(p => (
              <div
                key={p.id_prescription}
                style={styles.prescriptionCard}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={styles.medicationName}>
                      <Icons.Pill size={20} />
                      {p.medication}
                    </div>
                    <div style={styles.dosageInfo}>
                      <span><strong>Posologie:</strong> {p.dosage}</span>
                      <span><strong>Fréquence:</strong> {p.frequency}</span>
                      <span><strong>Durée:</strong> {p.duration}</span>
                    </div>
                    {p.instructions && (
                      <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                        <strong>Instructions:</strong> {p.instructions}
                      </div>
                    )}
                    <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Icons.Calendar size={14} />
                      Prescrit le {p.prescribed_on}
                      {p.doctor && ` par Dr. ${p.doctor.first_name} ${p.doctor.last_name}`}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Badge variant={
                      p.status === 'active' ? 'success' :
                      p.status === 'expired' ? 'default' : 'danger'
                    }>
                      {p.status === 'active' ? 'Active' :
                       p.status === 'expired' ? 'Expirée' : 'Annulée'}
                    </Badge>
                    {role === 'doctor' && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeletePrescription(p.id_prescription)}
                        loading={deleteLoading === `prescription-${p.id_prescription}`}
                      >
                        <Icons.Trash2 size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'analyses' && (
        <Card>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              <Icons.Activity size={20} />
              Résultats d'analyses
            </h3>
            {role === 'doctor' && (
              <Button size="sm" onClick={() => setShowAddAnalysis(true)}>
                <Icons.Plus size={16} style={{ marginRight: '6px' }} />
                Ajouter
              </Button>
            )}
          </div>
          {!analyses || analyses.length === 0 ? (
            <EmptyState
              icon={<Icons.Activity size={48} />}
              title="Aucune analyse"
              message="Les résultats d'analyses apparaîtront ici."
            />
          ) : (
            <div style={styles.tableContainer}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                    {['Date', 'Examen', 'Résultat', 'Référence', 'Statut', ...(role === 'doctor' ? ['Actions'] : [])].map(h => (
                      <th key={h} style={{
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--text-tertiary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        padding: '12px 16px 12px 0',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {analyses.map(a => (
                    <tr
                      key={a.id_analysis}
                      style={{ borderBottom: '1px solid var(--border-light)' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '16px 16px 16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        {a.date_of_analysis}
                      </td>
                      <td style={{ padding: '16px 16px 16px 0', fontWeight: 500, fontSize: '14px' }}>
                        {a.exam_name}
                      </td>
                      <td style={{ padding: '16px 16px 16px 0', fontSize: '14px' }}>
                        {a.result || '—'}
                      </td>
                      <td style={{ padding: '16px 16px 16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        {a.reference_range || '—'}
                      </td>
                      <td style={{ padding: '16px 16px 16px 0' }}>
                        <Badge variant={
                          a.status === 'normal' ? 'success' :
                          a.status === 'elevated' ? 'danger' :
                          a.status === 'low' ? 'warning' : 'default'
                        }>
                          {a.status === 'normal' ? 'Normal' :
                           a.status === 'elevated' ? 'Élevé' :
                           a.status === 'low' ? 'Bas' : 'En attente'}
                        </Badge>
                      </td>
                      {role === 'doctor' && (
                        <td style={{ padding: '16px 0' }}>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDeleteAnalysis(a.id_analysis)}
                            loading={deleteLoading === `analysis-${a.id_analysis}`}
                          >
                            <Icons.Trash2 size={14} />
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {tab === 'documents' && (
        <Card>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              <Icons.Folder size={20} />
              Documents
            </h3>
            {role !== 'patient' && (
              <Button size="sm" onClick={() => setShowAddDocument(true)}>
                <Icons.Upload size={16} style={{ marginRight: '6px' }} />
                Ajouter
              </Button>
            )}
          </div>
          {!documents || documents.length === 0 ? (
            <EmptyState
              icon={<Icons.Folder size={48} />}
              title="Aucun document"
              message="Les documents apparaîtront ici."
            />
          ) : (
            documents.map(d => (
              <div key={d.id_document} style={styles.documentItem}>
                <div style={{
                  ...styles.documentIcon,
                  background: d.file_type === 'PDF' ? 'var(--color-error-50)' : 'var(--color-primary-50)',
                  color: d.file_type === 'PDF' ? 'var(--color-error-600)' : 'var(--color-primary-600)',
                }}>
                  {d.file_type === 'PDF' ? <Icons.FileText size={24} /> : <Icons.Image size={24} />}
                </div>
                <div style={styles.documentInfo}>
                  <div style={styles.documentName}>{d.name}</div>
                  <div style={styles.documentMeta}>
                    {d.file_size} · {d.added_by} · {new Date(d.date_added).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                <Badge variant={d.file_type === 'PDF' ? 'danger' : 'primary'}>{d.file_type}</Badge>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDownload(d.id_document, d.name)}
                >
                  <Icons.Download size={16} style={{ marginRight: '6px' }} />
                  Télécharger
                </Button>
                {(role === 'doctor' || role === 'staff') && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteDocument(d.id_document)}
                    loading={deleteLoading === `document-${d.id_document}`}
                  >
                    <Icons.Trash2 size={14} />
                  </Button>
                )}
              </div>
            ))
          )}
        </Card>
      )}

      {/* Modals */}
      <AddRecordModal open={showAddRecord} onClose={() => setShowAddRecord(false)} patientId={patientId} onSuccess={refetchRecords} />
      <AddPrescriptionModal open={showAddPrescription} onClose={() => setShowAddPrescription(false)} patientId={patientId} onSuccess={refetchPrescriptions} />
      <AddAnalysisModal open={showAddAnalysis} onClose={() => setShowAddAnalysis(false)} patientId={patientId} onSuccess={refetchAnalyses} />
      <AddDocumentModal open={showAddDocument} onClose={() => setShowAddDocument(false)} patientId={patientId} onSuccess={refetchDocuments} />
    </AppLayout>
  );
}

// ─── Add Record Modal ────────────────────────────────────────
function AddRecordModal({ open, onClose, patientId, onSuccess }) {
  const [form, setForm] = useState({ visit_reason: '', diagnosis: '', treatment: '', status: 'completed' });
  const { mutate, loading, error } = useMutation(useCallback((data) => patientsAPI.addRecord(patientId, data), [patientId]));
  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    await mutate(form);
    onSuccess?.();
    onClose();
    setForm({ visit_reason: '', diagnosis: '', treatment: '', status: 'completed' });
  };

  return (
    <Modal open={open} onClose={onClose} title="Nouvelle consultation">
      {error && <Alert variant="error">{error}</Alert>}
      <Input
        label="Motif de consultation"
        placeholder="Ex: Contrôle régulier"
        value={form.visit_reason}
        onChange={handle('visit_reason')}
        icon={<Icons.FileText size={18} />}
      />
      <Textarea
        label="Diagnostic"
        placeholder="Description du diagnostic..."
        value={form.diagnosis}
        onChange={handle('diagnosis')}
      />
      <Textarea
        label="Traitement"
        placeholder="Plan de traitement..."
        value={form.treatment}
        onChange={handle('treatment')}
      />
      <Select label="Statut" value={form.status} onChange={handle('status')}>
        <option value="completed">Terminée</option>
        <option value="in_progress">En cours</option>
        <option value="scheduled">Planifiée</option>
      </Select>
      <div style={styles.buttonGroup}>
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button onClick={submit} loading={loading}>
          <Icons.Save size={16} style={{ marginRight: '6px' }} />
          Enregistrer
        </Button>
      </div>
    </Modal>
  );
}

// ─── Add Prescription Modal ──────────────────────────────────
function AddPrescriptionModal({ open, onClose, patientId, onSuccess }) {
  const [form, setForm] = useState({
    medication: '', dosage: '', frequency: '', duration: '',
    instructions: '', prescribed_on: new Date().toISOString().split('T')[0]
  });
  const { mutate, loading, error } = useMutation(useCallback((data) => patientsAPI.addPrescription(patientId, data), [patientId]));
  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.medication) return;
    await mutate(form);
    onSuccess?.();
    onClose();
    setForm({ medication: '', dosage: '', frequency: '', duration: '', instructions: '', prescribed_on: new Date().toISOString().split('T')[0] });
  };

  return (
    <Modal open={open} onClose={onClose} title="Nouvelle ordonnance">
      {error && <Alert variant="error">{error}</Alert>}
      <div style={styles.formGrid}>
        <Input
          label="Médicament *"
          placeholder="Amlodipine 5mg"
          value={form.medication}
          onChange={handle('medication')}
          icon={<Icons.Pill size={18} />}
        />
        <Input label="Posologie" placeholder="1 comprimé" value={form.dosage} onChange={handle('dosage')} />
        <Input label="Fréquence" placeholder="1 fois par jour" value={form.frequency} onChange={handle('frequency')} />
        <Input label="Durée" placeholder="30 jours" value={form.duration} onChange={handle('duration')} />
      </div>
      <Textarea label="Instructions" placeholder="Prendre le matin avant le petit déjeuner..." value={form.instructions} onChange={handle('instructions')} />
      <Input
        label="Date de prescription"
        type="date"
        value={form.prescribed_on}
        onChange={handle('prescribed_on')}
        icon={<Icons.Calendar size={18} />}
      />
      <div style={styles.buttonGroup}>
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button onClick={submit} loading={loading}>
          <Icons.Check size={16} style={{ marginRight: '6px' }} />
          Valider et envoyer
        </Button>
      </div>
    </Modal>
  );
}

// ─── Add Analysis Modal ──────────────────────────────────────
function AddAnalysisModal({ open, onClose, patientId, onSuccess }) {
  const [form, setForm] = useState({
    exam_name: '', result: '', reference_range: '', status: 'pending',
    category: 'Examens de sang', date_of_analysis: new Date().toISOString().split('T')[0]
  });
  const { mutate, loading, error } = useMutation(useCallback((data) => patientsAPI.addAnalysis(patientId, data), [patientId]));
  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.exam_name) return;
    await mutate(form);
    onSuccess?.();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Nouvelle analyse">
      {error && <Alert variant="error">{error}</Alert>}
      <div style={styles.formGrid}>
        <Input
          label="Examen *"
          placeholder="NFS, Glycémie..."
          value={form.exam_name}
          onChange={handle('exam_name')}
          icon={<Icons.Activity size={18} />}
        />
        <Select label="Catégorie" value={form.category} onChange={handle('category')}>
          <option>Examens de sang</option>
          <option>Urines</option>
          <option>Radiologie</option>
          <option>Autres</option>
        </Select>
        <Input label="Résultat" placeholder="1.25 g/L" value={form.result} onChange={handle('result')} />
        <Input label="Valeurs de référence" placeholder="0.70-1.10 g/L" value={form.reference_range} onChange={handle('reference_range')} />
      </div>
      <Select label="Statut" value={form.status} onChange={handle('status')}>
        <option value="normal">Normal</option>
        <option value="elevated">Élevé</option>
        <option value="low">Bas</option>
        <option value="pending">En attente</option>
      </Select>
      <Input
        label="Date d'analyse"
        type="date"
        value={form.date_of_analysis}
        onChange={handle('date_of_analysis')}
        icon={<Icons.Calendar size={18} />}
      />
      <div style={styles.buttonGroup}>
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button onClick={submit} loading={loading}>
          <Icons.Save size={16} style={{ marginRight: '6px' }} />
          Enregistrer
        </Button>
      </div>
    </Modal>
  );
}

// ─── Add Document Modal ──────────────────────────────────────
function AddDocumentModal({ open, onClose, patientId, onSuccess }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const { mutate, loading, error } = useMutation(useCallback((formData) => patientsAPI.addDocument(patientId, formData), [patientId]));

  const submit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    if (name) formData.append('name', name);

    await mutate(formData);
    onSuccess?.();
    onClose();
    setFile(null);
    setName('');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Ajouter un document">
      {error && <Alert variant="error">{error}</Alert>}
      <Input
        label="Nom du document (optionnel)"
        placeholder="Ex: IRM Genou"
        value={name}
        onChange={e => setName(e.target.value)}
        icon={<Icons.FileText size={18} />}
      />
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--text-secondary)',
          marginBottom: '8px',
        }}>
          Fichier *
        </label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragActive ? 'var(--color-primary-500)' : 'var(--border-light)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            textAlign: 'center',
            background: dragActive ? 'var(--color-primary-50)' : 'var(--bg-secondary)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <input
            id="file-upload"
            type="file"
            onChange={e => setFile(e.target.files[0])}
            style={{ display: 'none' }}
          />
          <Icons.Upload size={40} style={{ color: 'var(--color-primary-500)', marginBottom: '12px' }} />
          {file ? (
            <div>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{file.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {(file.size / 1024).toFixed(1)} KB
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                Glissez un fichier ici ou cliquez pour parcourir
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                PDF, images, documents Word...
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={styles.buttonGroup}>
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button onClick={submit} loading={loading} disabled={!file}>
          <Icons.Upload size={16} style={{ marginRight: '6px' }} />
          Uploader
        </Button>
      </div>
    </Modal>
  );
}

// ─── Reports Page ────────────────────────────────────────────
export function ReportsPage() {
  const { data: patients } = usePatients();
  const [form, setForm] = useState({ patientId: '', type: 'full', startDate: '', endDate: '' });
  const [report, setReport] = useState(null);
  const { mutate, loading, error } = useMutation(
    useCallback(() => {
      const { reportsAPI } = require('../../api');
      return reportsAPI.getPatientReport(form.patientId, form.type, form.startDate, form.endDate);
    }, [form])
  );

  const generate = async () => {
    if (!form.patientId) return;
    const data = await mutate();
    setReport(data);
  };

  return (
    <AppLayout title="Rapports">
      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '24px' }}>
        <Card>
          <h3 style={{ ...styles.cardTitle, marginBottom: '24px' }}>
            <Icons.BarChart size={20} />
            Générer un rapport
          </h3>
          <Select
            label="Patient"
            value={form.patientId}
            onChange={e => setForm(f => ({ ...f, patientId: e.target.value }))}
          >
            <option value="">Sélectionner un patient...</option>
            {patients?.map(p => (
              <option key={p.id_patient} value={p.id_patient}>
                {p.first_name} {p.last_name}
              </option>
            ))}
          </Select>
          <Select
            label="Type de rapport"
            value={form.type}
            onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
          >
            <option value="full">Rapport complet</option>
            <option value="records">Consultations</option>
            <option value="prescriptions">Ordonnances</option>
            <option value="analyses">Analyses</option>
          </Select>
          <div style={styles.formGrid}>
            <Input
              label="Date début"
              type="date"
              value={form.startDate}
              onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
              icon={<Icons.Calendar size={18} />}
            />
            <Input
              label="Date fin"
              type="date"
              value={form.endDate}
              onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
              icon={<Icons.Calendar size={18} />}
            />
          </div>
          {error && <Alert variant="error">{error}</Alert>}
          <Button onClick={generate} loading={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
            <Icons.BarChart size={18} style={{ marginRight: '8px' }} />
            Générer le rapport
          </Button>
        </Card>

        <Card>
          <h3 style={{ ...styles.cardTitle, marginBottom: '20px' }}>
            <Icons.FileText size={20} />
            Résultat
          </h3>
          {!report ? (
            <EmptyState
              icon={<Icons.BarChart size={48} />}
              title="Aucun rapport généré"
              message="Sélectionnez un patient et générez un rapport."
            />
          ) : (
            <div>
              <div style={{
                padding: '20px',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '20px',
              }}>
                <div style={{ fontWeight: 600, fontSize: '18px', color: 'var(--text-primary)' }}>
                  {report.patient.name}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Généré le {new Date(report.generated_at).toLocaleString('fr-FR')}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {report.medical_records && (
                  <div style={{
                    background: 'var(--color-primary-50)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '16px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-primary-600)' }}>
                      {report.medical_records.length}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>consultations</div>
                  </div>
                )}
                {report.prescriptions && (
                  <div style={{
                    background: 'var(--color-secondary-50)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '16px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-secondary-600)' }}>
                      {report.prescriptions.length}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>ordonnances</div>
                  </div>
                )}
                {report.analyses && (
                  <div style={{
                    background: 'var(--color-warning-50)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '16px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-warning-600)' }}>
                      {report.analyses.length}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>analyses</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}

// ─── Create Patient Page ────────────────────────────────────────
export function CreatePatientPage() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', password: '',
    dob: '', phone_number: '', address: '', blood_type: '',
    allergies: '', chronic_diseases: '', cin: '', gender: '',
    emergency_contact: '', emergency_contact_phone: '',
  });
  const { mutate, loading, error } = useMutation(useCallback((data) => patientsAPI.create(data), []));
  const navigate = useNavigate();

  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email) return;
    try {
      const res = await mutate(form);
      if (res && res.id_patient) {
        navigate(`/patients/${res.id_patient}`);
      } else {
        navigate('/patients');
      }
    } catch (err) {
      // Error handled by useMutation
    }
  };

  return (
    <AppLayout title="Nouveau Patient">
      <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--color-primary-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icons.UserPlus size={28} style={{ color: 'var(--color-primary-600)' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Créer un dossier patient
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Remplissez les informations du nouveau patient
            </p>
          </div>
        </div>

        {error && <Alert variant="error" style={{ marginBottom: '24px' }}>{error}</Alert>}

        <form onSubmit={submit}>
          {/* Account Information */}
          <div style={styles.sectionDivider}>
            <h3 style={styles.sectionTitle}>
              <Icons.Shield size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Informations de compte
            </h3>
            <p style={styles.sectionSubtitle}>Le patient pourra se connecter avec ces identifiants</p>
          </div>
          <div style={styles.formGrid}>
            <Input
              label="Email *"
              type="email"
              value={form.email}
              onChange={handle('email')}
              placeholder="patient@email.com"
              icon={<Icons.Mail size={18} />}
              required
            />
            <Input
              label="Mot de passe"
              type="password"
              value={form.password}
              onChange={handle('password')}
              placeholder="Par défaut: Password123!"
              icon={<Icons.Lock size={18} />}
            />
          </div>

          {/* Personal Information */}
          <div style={styles.sectionDivider}>
            <h3 style={styles.sectionTitle}>
              <Icons.User size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Informations personnelles
            </h3>
          </div>
          <div style={styles.formGrid}>
            <Input label="Prénom *" value={form.first_name} onChange={handle('first_name')} required />
            <Input label="Nom *" value={form.last_name} onChange={handle('last_name')} required />
          </div>
          <div style={styles.formGrid3}>
            <Input
              label="Date de naissance"
              type="date"
              value={form.dob}
              onChange={handle('dob')}
              icon={<Icons.Calendar size={18} />}
            />
            <Input label="CIN" value={form.cin} onChange={handle('cin')} placeholder="Numéro CIN" />
            <Select label="Genre" value={form.gender} onChange={handle('gender')}>
              <option value="">Sélectionner...</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
              <option value="other">Autre</option>
            </Select>
          </div>
          <div style={styles.formGrid}>
            <Input
              label="Téléphone"
              type="tel"
              value={form.phone_number}
              onChange={handle('phone_number')}
              icon={<Icons.Phone size={18} />}
            />
            <Input
              label="Adresse"
              value={form.address}
              onChange={handle('address')}
              icon={<Icons.MapPin size={18} />}
            />
          </div>

          {/* Emergency Contact */}
          <div style={styles.sectionDivider}>
            <h3 style={styles.sectionTitle}>
              <Icons.AlertTriangle size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Contact d'urgence
            </h3>
          </div>
          <div style={styles.formGrid}>
            <Input
              label="Nom du contact"
              value={form.emergency_contact}
              onChange={handle('emergency_contact')}
              placeholder="Ex: Marie Dupont"
            />
            <Input
              label="Téléphone du contact"
              type="tel"
              value={form.emergency_contact_phone}
              onChange={handle('emergency_contact_phone')}
              icon={<Icons.Phone size={18} />}
            />
          </div>

          {/* Medical Information */}
          <div style={styles.sectionDivider}>
            <h3 style={styles.sectionTitle}>
              <Icons.Heart size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Informations médicales
            </h3>
          </div>
          <Select label="Groupe sanguin" value={form.blood_type} onChange={handle('blood_type')}>
            <option value="">Sélectionner...</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => (
              <option key={bt} value={bt}>{bt}</option>
            ))}
          </Select>
          <Textarea
            label="Allergies (séparées par des virgules)"
            placeholder="Ex: Pénicilline, Arachides"
            value={form.allergies}
            onChange={handle('allergies')}
            rows={2}
          />
          <Textarea
            label="Maladies chroniques (séparées par des virgules)"
            placeholder="Ex: Diabète, Hypertension"
            value={form.chronic_diseases}
            onChange={handle('chronic_diseases')}
            rows={2}
          />

          <div style={styles.buttonGroup}>
            <Button variant="secondary" type="button" onClick={() => navigate('/patients')}>
              Annuler
            </Button>
            <Button type="submit" loading={loading}>
              <Icons.Check size={18} style={{ marginRight: '8px' }} />
              Créer le patient
            </Button>
          </div>
        </form>
      </Card>
    </AppLayout>
  );
}
