import React, { useState } from 'react';
import { AppLayout } from '../../components/layout';
import { Badge, Avatar, Card, Button, Tabs, Spinner, EmptyState, Alert } from '../../components/ui';
import { useMyPatientProfile, usePrescriptions, useAnalyses, useDocuments, useMedicalRecords } from '../../hooks';
import { useAuth } from '../../context/AuthContext';

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

          {/* Appointment placeholder */}
          <Card style={{ background: 'linear-gradient(135deg, #E6F1FB, #f0f8ff)', border: '1px solid #1B6FE822' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#0C44A0' }}>📅 Prochain rendez-vous</h4>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>Dr. Martin Dupont</div>
            <div style={{ fontSize: 13, color: '#6b6b6b' }}>Médecine générale</div>
            <div style={{ fontSize: 13, color: '#0C44A0', marginTop: 8, fontWeight: 500 }}>Lundi 20 mai 2024 à 10h00</div>
            <Button size="sm" style={{ marginTop: 12 }}>Confirmer</Button>
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

  const { data: prescriptions } = usePrescriptions(patientId);
  const { data: analyses } = useAnalyses(patientId);
  const { data: documents } = useDocuments(patientId);
  const { data: records } = useMedicalRecords(patientId);

  const handleDownload = async (docId, fileName) => {
    try {
      const { patientsAPI } = require('../../api');
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <Badge variant={p.status === 'active' ? 'green' : 'gray'}>
                    {p.status === 'active' ? 'Active' : 'Expirée'}
                  </Badge>
                  <Button size="sm" variant="secondary">⬇ PDF</Button>
                </div>
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

      {tab === 'documents' && (
        <Card>
          {!documents || documents.length === 0
            ? <EmptyState icon="📁" title="Aucun document" />
            : documents.map(d => (
            <div key={d.id_document} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FCEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📄</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{d.name}</div>
                <div style={{ fontSize: 12, color: '#999' }}>{d.file_size} · {new Date(d.date_added).toLocaleDateString('fr-FR')}</div>
              </div>
              <Button size="sm" variant="secondary" onClick={() => handleDownload(d.id_document, d.name)}>⬇ Télécharger</Button>
            </div>
          ))}
        </Card>
      )}
    </AppLayout>
  );
}
