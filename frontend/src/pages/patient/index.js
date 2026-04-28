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

// Common styles
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
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  quickActionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-lg)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    width: '100%',
  },
  quickActionIcon: {
    width: '44px',
    height: '44px',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontWeight: 600,
    fontSize: '14px',
    color: 'var(--text-primary)',
    marginBottom: '2px',
  },
  quickActionDesc: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '24px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid var(--border-light)',
  },
  infoLabel: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  infoValue: {
    fontWeight: 500,
    color: 'var(--text-primary)',
    fontSize: '14px',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '24px',
    background: 'linear-gradient(135deg, var(--color-secondary-50) 0%, #ffffff 100%)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border-light)',
    marginBottom: '24px',
  },
  profileName: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '8px',
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
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
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

// Patient Dashboard
export function PatientDashboard() {
  const { user } = useAuth();
  const { data: profile, loading } = useMyPatientProfile();

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const quickActions = [
    {
      icon: <Icons.FileText size={22} />,
      title: 'Mon dossier médical',
      desc: 'Consulter mes documents',
      color: 'var(--color-primary-100)',
      iconColor: 'var(--color-primary-600)',
      href: '/my-records',
    },
    {
      icon: <Icons.User size={22} />,
      title: 'Mon profil',
      desc: 'Modifier mes informations',
      color: 'var(--color-secondary-100)',
      iconColor: 'var(--color-secondary-600)',
      href: '/profile',
    },
    {
      icon: <Icons.Clipboard size={22} />,
      title: 'Mes ordonnances',
      desc: 'Voir mes traitements',
      color: '#ede9fe',
      iconColor: '#7c3aed',
      href: '/my-records',
    },
    {
      icon: <Icons.Activity size={22} />,
      title: 'Mes analyses',
      desc: 'Résultats d\'examens',
      color: '#fef3c7',
      iconColor: '#f59e0b',
      href: '/my-records',
    },
  ];

  return (
    <AppLayout title="Mon espace santé">
      {/* Welcome Header */}
      <div style={styles.pageHeader}>
        <p style={styles.welcomeDate}>
          <Icons.Calendar size={18} />
          {today.charAt(0).toUpperCase() + today.slice(1)}
        </p>
        <h2 style={styles.welcomeTitle}>
          Bienvenue, <span style={{ color: 'var(--color-secondary-600)' }}>{user?.name}</span>
        </h2>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
          <Spinner />
        </div>
      ) : profile && (
        <>
          {/* Info Cards */}
          <div style={styles.infoGrid}>
            <Card>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Icons.User size={18} />
                Mes informations
              </h4>
              {[
                ['Date de naissance', profile.dob, <Icons.Calendar size={16} key="cal" />],
                ['Téléphone', profile.phone_number, <Icons.Phone size={16} key="phone" />],
                ['Groupe sanguin', profile.blood_type, <Icons.Heart size={16} key="heart" />],
                ['Allergies', profile.allergies, <Icons.AlertTriangle size={16} key="alert" />],
              ].map(([label, value, icon]) => value && (
                <div key={label} style={styles.infoRow}>
                  <span style={styles.infoLabel}>
                    {icon}
                    {label}
                  </span>
                  <span style={styles.infoValue}>{value}</span>
                </div>
              ))}
            </Card>

            <Card>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Icons.Zap size={18} />
                Actions rapides
              </h4>
              <div style={styles.quickActionsGrid}>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    style={styles.quickActionButton}
                    onClick={() => window.location.href = action.href}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary-300)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-light)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      ...styles.quickActionIcon,
                      background: action.color,
                      color: action.iconColor,
                    }}>
                      {action.icon}
                    </div>
                    <div style={styles.quickActionText}>
                      <div style={styles.quickActionTitle}>{action.title}</div>
                      <div style={styles.quickActionDesc}>{action.desc}</div>
                    </div>
                    <Icons.ChevronRight size={18} style={{ color: 'var(--text-tertiary)' }} />
                  </button>
                ))}
              </div>
            </Card>
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
