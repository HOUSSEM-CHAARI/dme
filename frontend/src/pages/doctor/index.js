import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout';
import { Badge, Avatar, StatCard, Card, Button, Input, Textarea, Select, Modal, Tabs, Spinner, EmptyState, Alert } from '../../components/ui';
import { usePatients, usePatient, useMedicalRecords, usePrescriptions, useAnalyses, useDocuments, useDashboardStats, useMutation } from '../../hooks';
import { patientsAPI } from '../../api';
import { useAuth } from '../../context/AuthContext';

// ─── Doctor Dashboard ────────────────────────────────────────
export function DoctorDashboard() {
  const { user } = useAuth();
  const { data: stats, loading } = useDashboardStats();
  const { data: patients } = usePatients();
  const navigate = useNavigate();

  const recentPatients = patients?.slice(0, 5) || [];

  return (
    <AppLayout title="Tableau de bord">
      <div style={{ marginBottom: 24 }}>
        <p style={{ color: '#6b6b6b', fontSize: 14 }}>Bienvenue, <strong>{user?.name}</strong> — {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 28 }}>
        <StatCard label="Total patients" value={loading ? '…' : stats?.total_patients ?? 0} icon="👥" color="#1B6FE8" />
        <StatCard label="Dossiers médicaux" value={loading ? '…' : stats?.total_records ?? 0} icon="📄" color="#0F6E56" />
        <StatCard label="Ordonnances" value={loading ? '…' : stats?.total_prescriptions ?? 0} icon="📋" color="#7F77DD" />
        <StatCard label="Analyses" value={loading ? '…' : stats?.total_analyses ?? 0} icon="🔬" color="#EF9F27" />
      </div>

      {/* Recent Patients */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a' }}>Patients récents</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/patients')}>Voir tous →</Button>
        </div>
        {recentPatients.length === 0
          ? <EmptyState icon="👥" title="Aucun patient" message="Les patients s'afficheront ici une fois enregistrés." />
          : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                {['Patient', 'Date de naissance', 'Téléphone', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontSize: 12, fontWeight: 500, color: '#6b6b6b', paddingBottom: 10, paddingRight: 16 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentPatients.map(p => (
                <tr key={p.id_patient} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                  <td style={{ padding: '12px 16px 12px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={`${p.first_name} ${p.last_name}`} size={32} />
                      <span style={{ fontWeight: 500, fontSize: 14 }}>{p.first_name} {p.last_name}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 13, color: '#6b6b6b', paddingRight: 16 }}>{p.dob || '—'}</td>
                  <td style={{ fontSize: 13, color: '#6b6b6b', paddingRight: 16 }}>{p.phone_number || '—'}</td>
                  <td>
                    <Button size="sm" variant="secondary" onClick={() => navigate(`/patients/${p.id_patient}`)}>Voir dossier</Button>
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

// ─── Patient List ────────────────────────────────────────────
export function PatientListPage() {
  const [search, setSearch] = useState('');
  const { data: patients, loading } = usePatients(search);
  const navigate = useNavigate();

  return (
    <AppLayout title="Patients">
      <Card>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par nom, prénom, téléphone..."
            style={{ flex: 1, padding: '10px 16px', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, fontSize: 14, outline: 'none' }}
          />
          <Button onClick={() => navigate('/patients/new')}>+ Nouveau patient</Button>
        </div>

        {loading
          ? <Spinner />
          : patients?.length === 0
          ? <EmptyState icon="🔍" title="Aucun résultat" message="Essayez un autre terme de recherche." />
          : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                {['ID', 'Patient', 'Date de naissance', 'Téléphone', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontSize: 12, fontWeight: 500, color: '#6b6b6b', paddingBottom: 10, paddingRight: 16 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id_patient} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                  <td style={{ padding: '12px 16px 12px 0', fontSize: 12, color: '#999', fontFamily: 'monospace' }}>P-{String(p.id_patient).padStart(7, '0')}</td>
                  <td style={{ paddingRight: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={`${p.first_name} ${p.last_name}`} size={34} />
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 14 }}>{p.first_name} {p.last_name}</div>
                        {p.blood_type && <Badge variant="blue" size="sm">{p.blood_type}</Badge>}
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 13, color: '#6b6b6b', paddingRight: 16 }}>{p.dob || '—'}</td>
                  <td style={{ fontSize: 13, color: '#6b6b6b', paddingRight: 16 }}>{p.phone_number || '—'}</td>
                  <td>
                    <Button size="sm" variant="secondary" onClick={() => navigate(`/patients/${p.id_patient}`)}>Voir dossier</Button>
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

// ─── Patient Dossier ─────────────────────────────────────────
export function PatientDossierPage({ patientId, role = 'doctor' }) {
  const [tab, setTab] = useState('dossier');
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [showAddAnalysis, setShowAddAnalysis] = useState(false);
  const [showAddDocument, setShowAddDocument] = useState(false);
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

  if (loading) return <AppLayout title="Dossier patient"><Spinner /></AppLayout>;
  if (!patient) return <AppLayout title="Dossier patient"><Alert variant="error">Patient non trouvé.</Alert></AppLayout>;

  const name = `${patient.first_name} ${patient.last_name}`;
  const allergies = patient.allergies ? patient.allergies.split(',').map(a => a.trim()) : [];
  const diseases = patient.chronic_diseases ? patient.chronic_diseases.split(',').map(d => d.trim()) : [];

  const tabs = [
    { key: 'resume', label: 'Résumé' },
    { key: 'dossier', label: 'Dossier médical' },
    { key: 'prescriptions', label: `Ordonnances (${prescriptions?.length || 0})` },
    { key: 'analyses', label: `Analyses (${analyses?.length || 0})` },
    { key: 'documents', label: `Documents (${documents?.length || 0})` },
  ];

  return (
    <AppLayout title="Dossier Patient">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b6b6b', marginBottom: 20 }}>
        <button onClick={() => navigate('/patients')} style={{ background: 'none', border: 'none', color: '#1B6FE8', cursor: 'pointer', fontSize: 13 }}>Patients</button>
        <span>›</span>
        <span style={{ color: '#1a1a1a', fontWeight: 500 }}>{name}</span>
      </div>

      {/* Patient header */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Avatar name={name} size={64} />
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{name}</h2>
            <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 8 }}>
              ID P-{String(patient.id_patient).padStart(7, '0')}
              {patient.dob && ` · Né(e) le ${patient.dob}`}
              {patient.phone_number && ` · ${patient.phone_number}`}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {patient.blood_type && <Badge variant="blue">{patient.blood_type}</Badge>}
              {allergies.map(a => <Badge key={a} variant="red">⚠ {a}</Badge>)}
              {diseases.map(d => <Badge key={d} variant="amber">{d}</Badge>)}
            </div>
          </div>
          {role === 'doctor' && (
            <div style={{ display: 'flex', gap: 10 }}>
              <Button size="sm" onClick={() => setShowAddPrescription(true)}>+ Ordonnance</Button>
              <Button size="sm" variant="secondary" onClick={() => setShowAddRecord(true)}>+ Consultation</Button>
            </div>
          )}
        </div>
      </Card>

      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      {/* ── RESUME ── */}
      {tab === 'resume' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Card>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Informations personnelles</h4>
            {[['Email', patient.user?.email], ['Téléphone', patient.phone_number], ['Adresse', patient.address], ['Date de naissance', patient.dob]].map(([k, v]) => v && (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)', fontSize: 13 }}>
                <span style={{ color: '#6b6b6b' }}>{k}</span>
                <span style={{ fontWeight: 500, color: '#1a1a1a', maxWidth: '55%', textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </Card>
          <Card>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Antécédents</h4>
            {diseases.length === 0 ? <EmptyState icon="✓" title="Aucun antécédent" /> : diseases.map(d => (
              <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)', fontSize: 13 }}>
                <span style={{ color: '#1B6FE8' }}>•</span> {d}
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* ── DOSSIER MÉDICAL ── */}
      {tab === 'dossier' && (
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Historique des consultations</h3>
            {role === 'doctor' && <Button size="sm" onClick={() => setShowAddRecord(true)}>+ Ajouter</Button>}
          </div>
          {!records || records.length === 0
            ? <EmptyState icon="📄" title="Aucune consultation" message="Les consultations apparaîtront ici." />
            : records.map(r => (
            <div key={r.id_record} style={{ padding: '16px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{r.visit_reason || 'Consultation'}</span>
                  <span style={{ fontSize: 12, color: '#6b6b6b', marginLeft: 10 }}>{r.doctor_name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Badge variant={r.status === 'completed' ? 'green' : r.status === 'in_progress' ? 'amber' : 'blue'}>
                    {r.status === 'completed' ? 'Terminée' : r.status === 'in_progress' ? 'En cours' : 'Planifiée'}
                  </Badge>
                  <span style={{ fontSize: 12, color: '#999' }}>{new Date(r.created_at).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              {r.diagnosis && <p style={{ fontSize: 13, color: '#1a1a1a', marginBottom: 4 }}><strong>Diagnostic :</strong> {r.diagnosis}</p>}
              {r.treatment && <p style={{ fontSize: 13, color: '#6b6b6b' }}><strong>Traitement :</strong> {r.treatment}</p>}
            </div>
          ))}
        </Card>
      )}

      {/* ── PRESCRIPTIONS ── */}
      {tab === 'prescriptions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {role === 'doctor' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setShowAddPrescription(true)}>+ Nouvelle ordonnance</Button>
            </div>
          )}
          {!prescriptions || prescriptions.length === 0
            ? <Card><EmptyState icon="📋" title="Aucune ordonnance" /></Card>
            : prescriptions.map(p => (
            <Card key={p.id_prescription}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{p.medication}</div>
                  <div style={{ fontSize: 13, color: '#6b6b6b' }}>Posologie : {p.dosage} · {p.frequency} · {p.duration}</div>
                  {p.instructions && <div style={{ fontSize: 13, color: '#6b6b6b', marginTop: 4 }}>Instructions : {p.instructions}</div>}
                  <div style={{ fontSize: 12, color: '#bbb', marginTop: 8 }}>Prescrit le {p.prescribed_on} {p.doctor && `par Dr. ${p.doctor.first_name} ${p.doctor.last_name}`}</div>
                </div>
                <Badge variant={p.status === 'active' ? 'green' : p.status === 'expired' ? 'gray' : 'red'}>
                  {p.status === 'active' ? 'Active' : p.status === 'expired' ? 'Expirée' : 'Annulée'}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── ANALYSES ── */}
      {tab === 'analyses' && (
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Résultats d'analyses</h3>
            {role === 'doctor' && <Button size="sm" onClick={() => setShowAddAnalysis(true)}>+ Ajouter</Button>}
          </div>
          {!analyses || analyses.length === 0
            ? <EmptyState icon="🔬" title="Aucune analyse" />
            : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  {['Date', 'Examen', 'Résultat', 'Référence', 'Statut'].map(h => (
                    <th key={h} style={{ textAlign: 'left', fontSize: 12, fontWeight: 500, color: '#6b6b6b', paddingBottom: 10, paddingRight: 16 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {analyses.map(a => (
                  <tr key={a.id_analysis} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                    <td style={{ padding: '12px 16px 12px 0', fontSize: 13, color: '#6b6b6b' }}>{a.date_of_analysis}</td>
                    <td style={{ fontWeight: 500, fontSize: 14, paddingRight: 16 }}>{a.exam_name}</td>
                    <td style={{ fontSize: 13, paddingRight: 16 }}>{a.result || '—'}</td>
                    <td style={{ fontSize: 13, color: '#6b6b6b', paddingRight: 16 }}>{a.reference_range || '—'}</td>
                    <td>
                      <Badge variant={a.status === 'normal' ? 'green' : a.status === 'elevated' ? 'red' : a.status === 'low' ? 'amber' : 'gray'}>
                        {a.status === 'normal' ? 'Normal' : a.status === 'elevated' ? 'Élevé' : a.status === 'low' ? 'Bas' : 'En attente'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      )}

      {/* ── DOCUMENTS ── */}
      {tab === 'documents' && (
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Documents</h3>
            {role !== 'patient' && <Button size="sm" onClick={() => setShowAddDocument(true)}>+ Ajouter</Button>}
          </div>
          {!documents || documents.length === 0
            ? <EmptyState icon="📁" title="Aucun document" />
            : documents.map(d => (
            <div key={d.id_document} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: d.file_type === 'PDF' ? '#FCEBEB' : '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                {d.file_type === 'PDF' ? '📄' : '🖼'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{d.name}</div>
                <div style={{ fontSize: 12, color: '#999' }}>{d.file_size} · {d.added_by} · {new Date(d.date_added).toLocaleDateString('fr-FR')}</div>
              </div>
              <Badge variant={d.file_type === 'PDF' ? 'red' : 'blue'}>{d.file_type}</Badge>
              <Button size="sm" variant="secondary" onClick={() => handleDownload(d.id_document, d.name)}>⬇ Télécharger</Button>
            </div>
          ))}
        </Card>
      )}

      {/* ── MODALS ── */}
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
  const { mutate, loading, error, success } = useMutation(useCallback((data) => patientsAPI.addRecord(patientId, data), [patientId]));
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
      <Input label="Motif de consultation" placeholder="Ex: Contrôle régulier" value={form.visit_reason} onChange={handle('visit_reason')} />
      <Textarea label="Diagnostic" placeholder="Description du diagnostic..." value={form.diagnosis} onChange={handle('diagnosis')} />
      <Textarea label="Traitement" placeholder="Plan de traitement..." value={form.treatment} onChange={handle('treatment')} />
      <Select label="Statut" value={form.status} onChange={handle('status')}>
        <option value="completed">Terminée</option>
        <option value="in_progress">En cours</option>
        <option value="scheduled">Planifiée</option>
      </Select>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button onClick={submit} loading={loading}>Enregistrer</Button>
      </div>
    </Modal>
  );
}

// ─── Add Prescription Modal ──────────────────────────────────
function AddPrescriptionModal({ open, onClose, patientId, onSuccess }) {
  const [form, setForm] = useState({ medication: '', dosage: '', frequency: '', duration: '', instructions: '', prescribed_on: new Date().toISOString().split('T')[0] });
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Input label="Médicament *" placeholder="Amlodipine 5mg" value={form.medication} onChange={handle('medication')} />
        <Input label="Posologie" placeholder="1 comprimé" value={form.dosage} onChange={handle('dosage')} />
        <Input label="Fréquence" placeholder="1 fois par jour" value={form.frequency} onChange={handle('frequency')} />
        <Input label="Durée" placeholder="30 jours" value={form.duration} onChange={handle('duration')} />
      </div>
      <Textarea label="Instructions" placeholder="Prendre le matin avant le petit déjeuner..." value={form.instructions} onChange={handle('instructions')} />
      <Input label="Date de prescription" type="date" value={form.prescribed_on} onChange={handle('prescribed_on')} />
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button onClick={submit} loading={loading}>Valider et envoyer</Button>
      </div>
    </Modal>
  );
}

// ─── Add Analysis Modal ──────────────────────────────────────
function AddAnalysisModal({ open, onClose, patientId, onSuccess }) {
  const [form, setForm] = useState({ exam_name: '', result: '', reference_range: '', status: 'pending', category: 'Examens de sang', date_of_analysis: new Date().toISOString().split('T')[0] });
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Input label="Examen *" placeholder="NFS, Glycémie..." value={form.exam_name} onChange={handle('exam_name')} />
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
      <Input label="Date d'analyse" type="date" value={form.date_of_analysis} onChange={handle('date_of_analysis')} />
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button onClick={submit} loading={loading}>Enregistrer</Button>
      </div>
    </Modal>
  );
}

// ─── Add Document Modal ──────────────────────────────────────
function AddDocumentModal({ open, onClose, patientId, onSuccess }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
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

  return (
    <Modal open={open} onClose={onClose} title="Ajouter un document">
      {error && <Alert variant="error">{error}</Alert>}
      <Input label="Nom du document (optionnel)" placeholder="Ex: IRM Genou" value={name} onChange={e => setName(e.target.value)} />
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#6b6b6b', marginBottom: 6 }}>Fichier *</label>
        <input type="file" onChange={e => setFile(e.target.files[0])} style={{ width: '100%', padding: '10px 0' }} />
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button onClick={submit} loading={loading} disabled={!file}>Uploader</Button>
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 20 }}>
        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20 }}>Générer un rapport</h3>
          <Select label="Patient" value={form.patientId} onChange={e => setForm(f => ({ ...f, patientId: e.target.value }))}>
            <option value="">Sélectionner un patient...</option>
            {patients?.map(p => <option key={p.id_patient} value={p.id_patient}>{p.first_name} {p.last_name}</option>)}
          </Select>
          <Select label="Type de rapport" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
            <option value="full">Rapport complet</option>
            <option value="records">Consultations</option>
            <option value="prescriptions">Ordonnances</option>
            <option value="analyses">Analyses</option>
          </Select>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Input label="Date début" type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
            <Input label="Date fin" type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
          </div>
          {error && <Alert variant="error">{error}</Alert>}
          <Button onClick={generate} loading={loading} style={{ width: '100%', justifyContent: 'center' }}>
            📊 Générer le rapport
          </Button>
        </Card>

        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Résultat</h3>
          {!report
            ? <EmptyState icon="📊" title="Aucun rapport généré" message="Sélectionnez un patient et générez un rapport." />
            : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{report.patient.name}</div>
                  <div style={{ fontSize: 12, color: '#999' }}>Généré le {new Date(report.generated_at).toLocaleString('fr-FR')}</div>
                </div>
                <Button size="sm" variant="secondary">⬇ Télécharger PDF</Button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {report.medical_records && <div style={{ background: '#f5f6fa', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}><strong>{report.medical_records.length}</strong> consultations</div>}
                {report.prescriptions && <div style={{ background: '#f5f6fa', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}><strong>{report.prescriptions.length}</strong> ordonnances</div>}
                {report.analyses && <div style={{ background: '#f5f6fa', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}><strong>{report.analyses.length}</strong> analyses</div>}
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
  const [form, setForm] = useState({ first_name: '', last_name: '', dob: '', phone_number: '', address: '', blood_type: '', allergies: '', chronic_diseases: '' });
  const { mutate, loading, error } = useMutation(useCallback((data) => patientsAPI.create(data), []));
  const navigate = useNavigate();

  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name) return;
    const res = await mutate(form);
    if (res && res.id_patient) {
      navigate(`/patients/${res.id_patient}`);
    } else {
      navigate('/patients');
    }
  };

  return (
    <AppLayout title="Nouveau Patient">
      <Card style={{ maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Créer un dossier patient</h2>
        {error && <Alert variant="error">{error}</Alert>}
        <form onSubmit={submit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Input label="Prénom *" value={form.first_name} onChange={handle('first_name')} required />
            <Input label="Nom *" value={form.last_name} onChange={handle('last_name')} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Input label="Date de naissance" type="date" value={form.dob} onChange={handle('dob')} />
            <Input label="Téléphone" type="tel" value={form.phone_number} onChange={handle('phone_number')} />
          </div>
          <Input label="Adresse" value={form.address} onChange={handle('address')} />
          
          <div style={{ marginTop: 24, marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>Informations médicales</h3>
          </div>
          
          <Select label="Groupe sanguin" value={form.blood_type} onChange={handle('blood_type')}>
            <option value="">Sélectionner...</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </Select>
          <Textarea label="Allergies (séparées par des virgules)" placeholder="Ex: Pénicilline, Arachides" value={form.allergies} onChange={handle('allergies')} rows={2} />
          <Textarea label="Maladies chroniques (séparées par des virgules)" placeholder="Ex: Diabète, Hypertension" value={form.chronic_diseases} onChange={handle('chronic_diseases')} rows={2} />
          
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
            <Button variant="secondary" type="button" onClick={() => navigate('/patients')}>Annuler</Button>
            <Button type="submit" loading={loading}>Créer le patient</Button>
          </div>
        </form>
      </Card>
    </AppLayout>
  );
}
