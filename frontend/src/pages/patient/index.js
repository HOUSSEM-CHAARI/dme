import React, { useState, useCallback } from 'react';
import { AppLayout } from '../../components/layout';
import {
  Badge, Avatar, Card, Button, Tabs, Spinner, EmptyState, Alert,
  Modal, Input, Select, Textarea, Icons
} from '../../components/ui';
import {
  useMyPatientProfile, usePrescriptions, useAnalyses, useDocuments,
  useMedicalRecords, useMyChronicDiseases, useMutation
} from '../../hooks';
import { useAuth } from '../../context/AuthContext';
import { patientsAPI, chronicDiseasesAPI } from '../../api';

// Patient Dashboard - Soft Healthcare Wellness Theme

const styles = {
  // Soft Calming Header
  pageHeader: {
    marginBottom: '28px',
    padding: '28px 32px',
    background: 'linear-gradient(135deg, #f4faf7 0%, #e5f5ed 50%, #f0f7ff 100%)',
    borderRadius: '20px',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #c8ebda',
  },
  pageHeaderPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(circle at 90% 20%, rgba(74, 173, 128, 0.08) 0%, transparent 50%)`,
    pointerEvents: 'none',
  },
  pageHeaderDecor: {
    position: 'absolute',
    top: '-40px',
    right: '-20px',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(74, 173, 128, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
  },
  welcomeDate: {
    color: '#3a9168',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 500,
    position: 'relative',
    zIndex: 1,
  },
  welcomeTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#214d3b',
    marginTop: '8px',
    letterSpacing: '-0.02em',
    position: 'relative',
    zIndex: 1,
  },
  welcomeHighlight: {
    color: '#4aad80',
  },
  welcomeSubtitle: {
    color: '#3a9168',
    fontSize: '14px',
    marginTop: '8px',
    position: 'relative',
    zIndex: 1,
  },
  welcomeStats: {
    display: 'flex',
    gap: '16px',
    marginTop: '20px',
    position: 'relative',
    zIndex: 1,
  },
  welcomeStat: {
    background: '#ffffff',
    padding: '14px 20px',
    borderRadius: '14px',
    border: '1px solid #c8ebda',
    boxShadow: '0 2px 8px rgba(74, 173, 128, 0.06)',
  },
  welcomeStatValue: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#214d3b',
  },
  welcomeStatLabel: {
    fontSize: '12px',
    color: '#3a9168',
    marginTop: '2px',
  },
  // Quick Actions - Soft Wellness Cards
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  quickActionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px',
    background: '#ffffff',
    border: '1px solid #e8e6e1',
    borderRadius: '14px',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    textAlign: 'left',
    width: '100%',
  },
  quickActionIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontWeight: 600,
    fontSize: '14px',
    color: '#1a1918',
    marginBottom: '2px',
  },
  quickActionDesc: {
    fontSize: '12px',
    color: '#5c5854',
  },
  quickActionArrow: {
    width: '32px',
    height: '32px',
    borderRadius: '10px',
    background: '#f4faf7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4aad80',
  },
  // Info Grid - Health Overview Cards
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '28px',
  },
  infoCard: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '24px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.08)',
  },
  infoCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '2px solid #ecfdf5',
  },
  infoCardIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    boxShadow: '0 4px 12px -2px rgba(5, 150, 105, 0.4)',
  },
  infoCardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#064e3b',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  infoLabel: {
    color: '#6b7280',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  infoLabelIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '10px',
    background: '#f0fdf4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#059669',
  },
  infoValue: {
    fontWeight: 600,
    color: '#064e3b',
    fontSize: '14px',
    background: '#f0fdf4',
    padding: '6px 12px',
    borderRadius: '8px',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '28px',
    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #cffafe 100%)',
    borderRadius: '24px',
    border: '1px solid #a7f3d0',
    marginBottom: '28px',
    boxShadow: '0 8px 30px -10px rgba(5, 150, 105, 0.2)',
    position: 'relative',
    overflow: 'hidden',
  },
  profileHeaderDecor: {
    position: 'absolute',
    top: '-50%',
    right: '-10%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
  },
  profileName: {
    fontSize: '22px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--font-display)',
    letterSpacing: '-0.02em',
  },
  profileMeta: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  badgeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
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
  prescriptionCard: {
    padding: '18px',
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-primary)',
    marginBottom: '12px',
    transition: 'all 200ms',
  },
  medicationName: {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'var(--font-display)',
  },
  dosageInfo: {
    display: 'flex',
    gap: '20px',
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '8px',
  },
  tableHeader: {
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-tertiary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '12px 16px 12px 0',
  },
  recordItem: {
    padding: '18px 0',
    borderBottom: '1px solid var(--border-light)',
  },
  recordHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  recordTitle: {
    fontWeight: 600,
    fontSize: '15px',
    color: 'var(--text-primary)',
  },
  recordDate: {
    fontSize: '13px',
    color: 'var(--text-tertiary)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  diseaseCard: {
    padding: '18px 0',
    borderBottom: '1px solid var(--border-light)',
  },
  diseaseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  diseaseName: {
    fontWeight: 600,
    fontSize: '16px',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
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
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0 16px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px',
  },
  uploadZone: {
    border: '2px dashed var(--border-light)',
    borderRadius: 'var(--radius-lg)',
    padding: '32px',
    textAlign: 'center',
    background: 'var(--bg-secondary)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
};

// Patient Dashboard - Premium Wellness Experience
export function PatientDashboard() {
  const { user } = useAuth();
  const { data: profile, loading } = useMyPatientProfile();
  const { data: prescriptions } = usePrescriptions(profile?.id_patient);
  const { data: analyses } = useAnalyses(profile?.id_patient);

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const quickActions = [
    {
      icon: <Icons.FileText size={24} />,
      title: 'Mon dossier médical',
      desc: 'Consulter mes documents',
      gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      href: '/my-records',
    },
    {
      icon: <Icons.User size={24} />,
      title: 'Mon profil',
      desc: 'Modifier mes informations',
      gradient: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
      href: '/profile',
    },
    {
      icon: <Icons.Clipboard size={24} />,
      title: 'Mes ordonnances',
      desc: 'Voir mes traitements actifs',
      gradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
      href: '/my-records',
    },
    {
      icon: <Icons.Activity size={24} />,
      title: 'Mes analyses',
      desc: 'Résultats d\'examens',
      gradient: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
      href: '/my-records',
    },
  ];

  const activePrescriptions = prescriptions?.filter(p => p.status === 'active')?.length || 0;
  const pendingAnalyses = analyses?.filter(a => a.status === 'pending')?.length || 0;

  return (
    <AppLayout title="Mon espace santé">
      {/* Premium Welcome Header */}
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderPattern} />
        <div style={styles.pageHeaderDecor} />
        <p style={styles.welcomeDate}>
          <Icons.Calendar size={16} />
          {today.charAt(0).toUpperCase() + today.slice(1)}
        </p>
        <h2 style={styles.welcomeTitle}>
          Bonjour, <span style={styles.welcomeHighlight}>{user?.name}</span>
        </h2>
        <p style={styles.welcomeSubtitle}>
          Bienvenue dans votre espace santé personnel
        </p>

        {/* Quick Stats in Header */}
        <div style={styles.welcomeStats}>
          <div style={styles.welcomeStat}>
            <div style={styles.welcomeStatValue}>{activePrescriptions}</div>
            <div style={styles.welcomeStatLabel}>Ordonnances actives</div>
          </div>
          <div style={styles.welcomeStat}>
            <div style={styles.welcomeStatValue}>{pendingAnalyses}</div>
            <div style={styles.welcomeStatLabel}>Analyses en attente</div>
          </div>
          <div style={styles.welcomeStat}>
            <div style={styles.welcomeStatValue}>{analyses?.length || 0}</div>
            <div style={styles.welcomeStatLabel}>Total analyses</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
          <Spinner />
        </div>
      ) : profile && (
        <>
          {/* Info Cards */}
          <div style={styles.infoGrid}>
            {/* My Health Info Card */}
            <div style={styles.infoCard}>
              <div style={styles.infoCardHeader}>
                <div style={styles.infoCardIcon}>
                  <Icons.Heart size={22} />
                </div>
                <span style={styles.infoCardTitle}>Mes informations de santé</span>
              </div>
              {[
                ['Date de naissance', profile.dob, <Icons.Calendar size={16} key="cal" />],
                ['Téléphone', profile.phone_number, <Icons.Phone size={16} key="phone" />],
                ['Groupe sanguin', profile.blood_type, <Icons.Heart size={16} key="heart" />],
                ['Allergies', profile.allergies, <Icons.AlertTriangle size={16} key="alert" />],
              ].map(([label, value, icon]) => value && (
                <div key={label} style={styles.infoRow}>
                  <span style={styles.infoLabel}>
                    <div style={styles.infoLabelIcon}>{icon}</div>
                    {label}
                  </span>
                  <span style={styles.infoValue}>{value}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions Card */}
            <div style={styles.infoCard}>
              <div style={styles.infoCardHeader}>
                <div style={styles.infoCardIcon}>
                  <Icons.Zap size={22} />
                </div>
                <span style={styles.infoCardTitle}>Accès rapide</span>
              </div>
              <div style={styles.quickActionsGrid}>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    style={styles.quickActionButton}
                    onClick={() => window.location.href = action.href}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 40px -10px rgba(5, 150, 105, 0.25)';
                      e.currentTarget.style.borderColor = '#10b981';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#d1fae5';
                    }}
                  >
                    <div style={{
                      ...styles.quickActionIcon,
                      background: action.gradient,
                      color: '#ffffff',
                      boxShadow: '0 4px 12px -2px rgba(5, 150, 105, 0.3)',
                    }}>
                      {action.icon}
                    </div>
                    <div style={styles.quickActionText}>
                      <div style={styles.quickActionTitle}>{action.title}</div>
                      <div style={styles.quickActionDesc}>{action.desc}</div>
                    </div>
                    <div style={styles.quickActionArrow}>
                      <Icons.ChevronRight size={18} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </AppLayout>
  );
}

// Patient Dossier View
export function PatientDossierView() {
  const { data: profile, loading } = useMyPatientProfile();
  const patientId = profile?.id_patient;
  const [tab, setTab] = useState('prescriptions');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAddDiseaseModal, setShowAddDiseaseModal] = useState(false);

  const { data: prescriptions } = usePrescriptions(patientId);
  const { data: analyses } = useAnalyses(patientId);
  const { data: documents, refetch: refetchDocuments } = useDocuments(patientId);
  const { data: records } = useMedicalRecords(patientId);
  const { data: chronicDiseases, refetch: refetchDiseases } = useMyChronicDiseases();

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

  if (loading || !profile) {
    return (
      <AppLayout title="Mon dossier médical">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
          <Spinner />
        </div>
      </AppLayout>
    );
  }

  const name = `${profile.first_name} ${profile.last_name}`;
  const allergies = profile.allergies ? profile.allergies.split(',').map(a => a.trim()) : [];

  const tabs = [
    { key: 'prescriptions', label: 'Ordonnances', icon: <Icons.Clipboard size={16} />, count: prescriptions?.length || 0 },
    { key: 'analyses', label: 'Analyses', icon: <Icons.Activity size={16} />, count: analyses?.length || 0 },
    { key: 'records', label: 'Consultations', icon: <Icons.FileText size={16} />, count: records?.length || 0 },
    { key: 'diseases', label: 'Maladies chroniques', icon: <Icons.Heart size={16} />, count: chronicDiseases?.length || 0 },
    { key: 'documents', label: 'Documents', icon: <Icons.Folder size={16} />, count: documents?.length || 0 },
  ];

  return (
    <AppLayout title="Mon dossier médical">
      {/* Profile Header */}
      <div style={styles.profileHeader}>
        <Avatar name={name} size={72} />
        <div>
          <h2 style={styles.profileName}>{name}</h2>
          <div style={styles.profileMeta}>
            <span style={{
              fontFamily: 'var(--font-family-mono)',
              background: 'var(--bg-tertiary)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
            }}>
              P-{String(profile.id_patient).padStart(7, '0')}
            </span>
            {profile.dob && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icons.Calendar size={14} />
                {profile.dob}
              </span>
            )}
          </div>
          <div style={styles.badgeContainer}>
            {profile.blood_type && <Badge variant="primary">{profile.blood_type}</Badge>}
            {allergies.map(a => (
              <Badge key={a} variant="danger">
                <Icons.AlertTriangle size={12} style={{ marginRight: '4px' }} />
                {a}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      {/* Prescriptions Tab */}
      {tab === 'prescriptions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!prescriptions || prescriptions.length === 0 ? (
            <Card>
              <EmptyState
                icon={<Icons.Clipboard size={48} />}
                title="Aucune ordonnance"
                message="Vos ordonnances apparaîtront ici."
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
                    <div style={{
                      fontSize: '13px',
                      color: 'var(--text-tertiary)',
                      marginTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Icons.Calendar size={14} />
                      Prescrit le {p.prescribed_on}
                      {p.doctor && ` par Dr. ${p.doctor.first_name} ${p.doctor.last_name}`}
                    </div>
                  </div>
                  <Badge variant={p.status === 'active' ? 'success' : 'default'}>
                    {p.status === 'active' ? 'Active' : 'Expirée'}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Analyses Tab */}
      {tab === 'analyses' && (
        <Card>
          {!analyses || analyses.length === 0 ? (
            <EmptyState
              icon={<Icons.Activity size={48} />}
              title="Aucune analyse"
              message="Vos résultats d'analyses apparaîtront ici."
            />
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                  {['Date', 'Examen', 'Résultat', 'Référence', 'Statut'].map(h => (
                    <th key={h} style={styles.tableHeader}>{h}</th>
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
                        a.status === 'elevated' ? 'danger' : 'warning'
                      }>
                        {a.status === 'normal' ? 'Normal' :
                         a.status === 'elevated' ? 'Élevé' : 'Bas'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      )}

      {/* Records Tab */}
      {tab === 'records' && (
        <Card>
          {!records || records.length === 0 ? (
            <EmptyState
              icon={<Icons.FileText size={48} />}
              title="Aucune consultation"
              message="Vos consultations apparaîtront ici."
            />
          ) : (
            records.map(r => (
              <div key={r.id_record} style={styles.recordItem}>
                <div style={styles.recordHeader}>
                  <span style={styles.recordTitle}>
                    <Icons.FileText size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    {r.visit_reason || 'Consultation'}
                  </span>
                  <span style={styles.recordDate}>
                    <Icons.Calendar size={14} />
                    {new Date(r.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                {r.doctor_name && (
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icons.User size={14} />
                    {r.doctor_name}
                  </div>
                )}
                {r.diagnosis && (
                  <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    <strong>Diagnostic :</strong> {r.diagnosis}
                  </p>
                )}
                {r.treatment && (
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <strong>Traitement :</strong> {r.treatment}
                  </p>
                )}
              </div>
            ))
          )}
        </Card>
      )}

      {/* Diseases Tab */}
      {tab === 'diseases' && (
        <Card>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              <Icons.Heart size={20} />
              Mes maladies chroniques
            </h3>
            <Button size="sm" onClick={() => setShowAddDiseaseModal(true)}>
              <Icons.Plus size={16} style={{ marginRight: '6px' }} />
              Ajouter
            </Button>
          </div>
          {!chronicDiseases || chronicDiseases.length === 0 ? (
            <EmptyState
              icon={<Icons.Heart size={48} />}
              title="Aucune maladie chronique"
              message="Ajoutez vos conditions médicales chroniques pour un meilleur suivi."
            />
          ) : (
            chronicDiseases.map(d => (
              <div key={d.id_chronic_disease} style={styles.diseaseCard}>
                <div style={styles.diseaseHeader}>
                  <div style={styles.diseaseName}>
                    <Icons.Heart size={18} />
                    {d.disease_name}
                    {d.severity && (
                      <Badge
                        variant={
                          d.severity === 'Sévère' ? 'danger' :
                          d.severity === 'Modérée' ? 'warning' : 'success'
                        }
                        size="sm"
                      >
                        {d.severity}
                      </Badge>
                    )}
                  </div>
                  {d.diagnosed_at && (
                    <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Icons.Calendar size={14} />
                      Diagnostiqué: {new Date(d.diagnosed_at).toLocaleDateString('fr-FR')}
                    </span>
                  )}
                </div>
                {d.description && (
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    {d.description}
                  </p>
                )}
                {d.current_treatment && (
                  <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    <strong>Traitement:</strong> {d.current_treatment}
                  </p>
                )}
                {d.notes && (
                  <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '8px', fontStyle: 'italic' }}>
                    {d.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </Card>
      )}

      {/* Documents Tab */}
      {tab === 'documents' && (
        <Card>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>
              <Icons.Folder size={20} />
              Mes documents
            </h3>
            <Button size="sm" onClick={() => setShowUploadModal(true)}>
              <Icons.Upload size={16} style={{ marginRight: '6px' }} />
              Ajouter
            </Button>
          </div>
          {!documents || documents.length === 0 ? (
            <EmptyState
              icon={<Icons.Folder size={48} />}
              title="Aucun document"
              message="Vous pouvez télécharger vos documents médicaux ici."
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
              </div>
            ))
          )}
        </Card>
      )}

      {/* Modals */}
      <PatientUploadDocumentModal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        patientId={patientId}
        onSuccess={refetchDocuments}
      />
      <AddChronicDiseaseModal
        open={showAddDiseaseModal}
        onClose={() => setShowAddDiseaseModal(false)}
        patientId={patientId}
        onSuccess={refetchDiseases}
      />
    </AppLayout>
  );
}

// Upload Document Modal
function PatientUploadDocumentModal({ open, onClose, patientId, onSuccess }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const { mutate, loading, error } = useMutation(useCallback((formData) => patientsAPI.addDocument(patientId, formData), [patientId]));

  const submit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    if (name) formData.append('name', name);

    try {
      await mutate(formData);
      onSuccess?.();
      onClose();
      setFile(null);
      setName('');
    } catch (e) {
      // Error handled by useMutation
    }
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
    <Modal open={open} onClose={onClose} title="Ajouter un document médical">
      {error && <Alert variant="error">{error}</Alert>}
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Téléchargez vos documents médicaux (analyses, radiographies, ordonnances, etc.)
      </p>
      <Input
        label="Nom du document (optionnel)"
        placeholder="Ex: Résultat analyse sang - Mars 2024"
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
            ...styles.uploadZone,
            borderColor: dragActive ? 'var(--color-primary-500)' : 'var(--border-light)',
            background: dragActive ? 'var(--color-primary-50)' : 'var(--bg-secondary)',
          }}
          onClick={() => document.getElementById('patient-file-upload').click()}
        >
          <input
            id="patient-file-upload"
            type="file"
            onChange={e => setFile(e.target.files[0])}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
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
                PDF, JPG, PNG, DOC (max 10MB)
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={styles.buttonGroup}>
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button onClick={submit} loading={loading} disabled={!file}>
          <Icons.Upload size={16} style={{ marginRight: '6px' }} />
          Télécharger
        </Button>
      </div>
    </Modal>
  );
}

// Add Chronic Disease Modal
function AddChronicDiseaseModal({ open, onClose, patientId, onSuccess }) {
  const [form, setForm] = useState({
    disease_name: '',
    description: '',
    diagnosed_at: '',
    severity: '',
    current_treatment: '',
    notes: '',
  });
  const { mutate, loading, error } = useMutation(useCallback((data) => chronicDiseasesAPI.create(patientId, data), [patientId]));
  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.disease_name) return;
    try {
      await mutate(form);
      onSuccess?.();
      onClose();
      setForm({
        disease_name: '',
        description: '',
        diagnosed_at: '',
        severity: '',
        current_treatment: '',
        notes: '',
      });
    } catch (e) {
      // Error handled by useMutation
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Ajouter une maladie chronique">
      {error && <Alert variant="error">{error}</Alert>}
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Enregistrez vos conditions médicales chroniques pour un meilleur suivi par vos médecins.
      </p>
      <Input
        label="Nom de la maladie *"
        placeholder="Ex: Diabète de type 2, Hypertension..."
        value={form.disease_name}
        onChange={handle('disease_name')}
        icon={<Icons.Heart size={18} />}
      />
      <Textarea
        label="Description"
        placeholder="Décrivez brièvement votre condition..."
        value={form.description}
        onChange={handle('description')}
        rows={2}
      />
      <div style={styles.formGrid}>
        <Input
          label="Date de diagnostic"
          type="date"
          value={form.diagnosed_at}
          onChange={handle('diagnosed_at')}
          icon={<Icons.Calendar size={18} />}
        />
        <Select
          label="Sévérité"
          value={form.severity}
          onChange={handle('severity')}
        >
          <option value="">Sélectionner...</option>
          <option value="Légère">Légère</option>
          <option value="Modérée">Modérée</option>
          <option value="Sévère">Sévère</option>
        </Select>
      </div>
      <Textarea
        label="Traitement actuel"
        placeholder="Médicaments, régime alimentaire, etc."
        value={form.current_treatment}
        onChange={handle('current_treatment')}
        rows={2}
      />
      <Textarea
        label="Notes supplémentaires"
        placeholder="Informations complémentaires..."
        value={form.notes}
        onChange={handle('notes')}
        rows={2}
      />
      <div style={styles.buttonGroup}>
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button onClick={submit} loading={loading} disabled={!form.disease_name}>
          <Icons.Save size={16} style={{ marginRight: '6px' }} />
          Enregistrer
        </Button>
      </div>
    </Modal>
  );
}
