import React, { useState, useCallback } from 'react';
import { AppLayout } from '../../components/layout';
import { Badge, Avatar, Card, Button, Tabs, Spinner, EmptyState, Alert, Modal, Input, Select, Textarea } from '../../components/ui';
import { useMyPatientProfile, usePrescriptions, useAnalyses, useDocuments, useMedicalRecords, useMyChronicDiseases, useMutation } from '../../hooks';
import { useAuth } from '../../context/AuthContext';
import { patientsAPI, chronicDiseasesAPI } from '../../api';

export function PatientDashboard() {
  const { user } = useAuth();
  const { data: profile, loading } = useMyPatientProfile();

  return (
    <AppLayout title="Mon espace santé">
      <div style={{ marginBottom: 24 }}>
        <p style={{ color: '#6b6b6b', fontSize: 14 }}>
          Bienvenue, <strong>{user?.name}</strong>
        </p>
      </div>

      {loading ? <Spinner /> : profile && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          {/* Quick info */}
          <Card>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Mes informations</h4>
            {[
              ['Date de naissance', profile.dob],
              ['Téléphone', profile.phone_number],
              ['Groupe sanguin', profile.blood_type],
              ['Allergies', profile.allergies],
            ].map(([k, v]) => v && (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)', fontSize: 13 }}>
                <span style={{ color: '#6b6b6b' }}>{k}</span>
                <span style={{ fontWeight: 500, color: '#1a1a1a' }}>{v}</span>
              </div>
            ))}
          </Card>

          {/* Quick Actions */}
          <Card>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Actions rapides</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button size="sm" variant="secondary" onClick={() => window.location.href = '/my-records'} style={{ justifyContent: 'flex-start' }}>
                📄 Voir mon dossier médical
              </Button>
              <Button size="sm" variant="secondary" onClick={() => window.location.href = '/profile'} style={{ justifyContent: 'flex-start' }}>
                👤 Modifier mon profil
              </Button>
            </div>
          </Card>
        </div>
      )}
    </AppLayout>
  );
}

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

  if (loading || !profile) return <AppLayout title="Mon dossier médical"><Spinner /></AppLayout>;

  const name = `${profile.first_name} ${profile.last_name}`;
  const allergies = profile.allergies ? profile.allergies.split(',').map(a => a.trim()) : [];

  const tabs = [
    { key: 'prescriptions', label: `Ordonnances (${prescriptions?.length || 0})` },
    { key: 'analyses', label: `Analyses (${analyses?.length || 0})` },
    { key: 'records', label: `Consultations (${records?.length || 0})` },
    { key: 'diseases', label: `Maladies chroniques (${chronicDiseases?.length || 0})` },
    { key: 'documents', label: `Documents (${documents?.length || 0})` },
  ];

  return (
    <AppLayout title="Mon dossier médical">
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Avatar name={name} size={56} />
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{name}</h2>
            <div style={{ fontSize: 13, color: '#6b6b6b' }}>ID P-{String(profile.id_patient).padStart(7, '0')} · {profile.dob}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {profile.blood_type && <Badge variant="blue">{profile.blood_type}</Badge>}
              {allergies.map(a => <Badge key={a} variant="red">⚠ {a}</Badge>)}
            </div>
          </div>
        </div>
      </Card>

      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === 'prescriptions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {!prescriptions || prescriptions.length === 0
            ? <Card><EmptyState icon="📋" title="Aucune ordonnance" message="Vos ordonnances apparaîtront ici." /></Card>
            : prescriptions.map(p => (
            <Card key={p.id_prescription}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{p.medication}</div>
                  <div style={{ fontSize: 13, color: '#6b6b6b' }}>{p.dosage} · {p.frequency} · {p.duration}</div>
                  {p.instructions && <div style={{ fontSize: 13, color: '#6b6b6b', marginTop: 4 }}>{p.instructions}</div>}
                  <div style={{ fontSize: 12, color: '#bbb', marginTop: 8 }}>
                    Prescrit le {p.prescribed_on} {p.doctor && `par Dr. ${p.doctor.first_name} ${p.doctor.last_name}`}
                  </div>
                </div>
                <Badge variant={p.status === 'active' ? 'green' : 'gray'}>
                  {p.status === 'active' ? 'Active' : 'Expirée'}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'analyses' && (
        <Card>
          {!analyses || analyses.length === 0
            ? <EmptyState icon="🔬" title="Aucune analyse" message="Vos résultats d'analyses apparaîtront ici." />
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
                      <Badge variant={a.status === 'normal' ? 'green' : a.status === 'elevated' ? 'red' : 'amber'}>
                        {a.status === 'normal' ? 'Normal' : a.status === 'elevated' ? 'Élevé' : 'Bas'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      )}

      {tab === 'records' && (
        <Card>
          {!records || records.length === 0
            ? <EmptyState icon="📄" title="Aucune consultation" message="Vos consultations apparaîtront ici." />
            : records.map(r => (
            <div key={r.id_record} style={{ padding: '14px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{r.visit_reason || 'Consultation'}</span>
                <span style={{ fontSize: 12, color: '#999' }}>{new Date(r.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
              {r.doctor_name && <div style={{ fontSize: 12, color: '#6b6b6b', marginBottom: 6 }}>{r.doctor_name}</div>}
              {r.diagnosis && <p style={{ fontSize: 13, color: '#1a1a1a' }}><strong>Diagnostic :</strong> {r.diagnosis}</p>}
              {r.treatment && <p style={{ fontSize: 13, color: '#6b6b6b', marginTop: 4 }}><strong>Traitement :</strong> {r.treatment}</p>}
            </div>
          ))}
        </Card>
      )}

      {tab === 'diseases' && (
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Mes maladies chroniques</h3>
            <Button size="sm" onClick={() => setShowAddDiseaseModal(true)}>+ Ajouter</Button>
          </div>
          {!chronicDiseases || chronicDiseases.length === 0
            ? <EmptyState icon="🏥" title="Aucune maladie chronique enregistrée" message="Ajoutez vos conditions médicales chroniques pour un meilleur suivi." />
            : chronicDiseases.map(d => (
            <div key={d.id_chronic_disease} style={{ padding: '14px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{d.disease_name}</span>
                  {d.severity && <Badge variant={d.severity === 'Sévère' ? 'red' : d.severity === 'Modérée' ? 'amber' : 'green'} size="sm" style={{ marginLeft: 8 }}>{d.severity}</Badge>}
                </div>
                {d.diagnosed_at && <span style={{ fontSize: 12, color: '#999' }}>Diagnostiqué: {new Date(d.diagnosed_at).toLocaleDateString('fr-FR')}</span>}
              </div>
              {d.description && <p style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 4 }}>{d.description}</p>}
              {d.current_treatment && <p style={{ fontSize: 13, color: '#1a1a1a' }}><strong>Traitement:</strong> {d.current_treatment}</p>}
              {d.notes && <p style={{ fontSize: 12, color: '#999', marginTop: 4, fontStyle: 'italic' }}>{d.notes}</p>}
            </div>
          ))}
        </Card>
      )}

      {tab === 'documents' && (
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Mes documents</h3>
            <Button size="sm" onClick={() => setShowUploadModal(true)}>+ Ajouter un document</Button>
          </div>
          {!documents || documents.length === 0
            ? <EmptyState icon="📁" title="Aucun document" message="Vous pouvez télécharger vos documents médicaux ici." />
            : documents.map(d => (
            <div key={d.id_document} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FCEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📄</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{d.name}</div>
                <div style={{ fontSize: 12, color: '#999' }}>{d.file_size} · {d.added_by} · {new Date(d.date_added).toLocaleDateString('fr-FR')}</div>
              </div>
              <Button size="sm" variant="secondary" onClick={() => handleDownload(d.id_document, d.name)}>⬇ Télécharger</Button>
            </div>
          ))}
        </Card>
      )}

      {/* Upload Document Modal */}
      <PatientUploadDocumentModal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        patientId={patientId}
        onSuccess={refetchDocuments}
      />

      {/* Add Chronic Disease Modal */}
      <AddChronicDiseaseModal
        open={showAddDiseaseModal}
        onClose={() => setShowAddDiseaseModal(false)}
        patientId={patientId}
        onSuccess={refetchDiseases}
      />
    </AppLayout>
  );
}

// ─── Patient Upload Document Modal ────────────────────────────
function PatientUploadDocumentModal({ open, onClose, patientId, onSuccess }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
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
      // Error is handled by useMutation
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Ajouter un document médical">
      {error && <Alert variant="error">{error}</Alert>}
      <p style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 16 }}>
        Téléchargez vos documents médicaux (analyses, radiographies, ordonnances, etc.)
      </p>
      <Input
        label="Nom du document (optionnel)"
        placeholder="Ex: Résultat analyse sang - Mars 2024"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#6b6b6b', marginBottom: 6 }}>Fichier *</label>
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          style={{ width: '100%', padding: '10px 0' }}
        />
        <p style={{ fontSize: 11, color: '#999', marginTop: 4 }}>Formats acceptés: PDF, JPG, PNG, DOC</p>
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button onClick={submit} loading={loading} disabled={!file}>Télécharger</Button>
      </div>
    </Modal>
  );
}

// ─── Add Chronic Disease Modal ────────────────────────────────
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
      <p style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 16 }}>
        Enregistrez vos conditions médicales chroniques pour un meilleur suivi par vos médecins.
      </p>
      <Input
        label="Nom de la maladie *"
        placeholder="Ex: Diabète de type 2, Hypertension..."
        value={form.disease_name}
        onChange={handle('disease_name')}
      />
      <Textarea
        label="Description"
        placeholder="Décrivez brièvement votre condition..."
        value={form.description}
        onChange={handle('description')}
        rows={2}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Input
          label="Date de diagnostic"
          type="date"
          value={form.diagnosed_at}
          onChange={handle('diagnosed_at')}
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
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button onClick={submit} loading={loading} disabled={!form.disease_name}>Enregistrer</Button>
      </div>
    </Modal>
  );
}
