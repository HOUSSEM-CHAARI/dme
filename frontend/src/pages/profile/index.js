import React, { useState, useEffect } from 'react';
import { AppLayout } from '../../components/layout';
import { Card, Input, Button, Alert, Avatar, Select, Textarea } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../api';

export function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    authAPI.getMe()
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Impossible de charger le profil');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (user.role === 'patient' && profile?.patient) {
      setProfile({ ...profile, patient: { ...profile.patient, [name]: value } });
    } else if (user.role === 'doctor' && profile?.doctor) {
      setProfile({ ...profile, doctor: { ...profile.doctor, [name]: value } });
    } else if (user.role === 'staff' && profile?.staff) {
      setProfile({ ...profile, staff: { ...profile.staff, [name]: value } });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await authAPI.updateProfile({
        patient: user.role === 'patient' ? profile.patient : undefined,
        doctor: user.role === 'doctor' ? profile.doctor : undefined,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AppLayout title="Mon profil">Chargement...</AppLayout>;

  return (
    <AppLayout title="Mon profil">
      <Card style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 30 }}>
          <Avatar name={user?.name || ''} size={80} />
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700 }}>{user?.name}</h2>
            <p style={{ color: '#6b6b6b', textTransform: 'capitalize' }}>
              {user?.role === 'doctor' ? 'Médecin' : user?.role === 'staff' ? 'Staff administratif' : 'Patient'}
            </p>
          </div>
        </div>

        {error && <Alert variant="error">{error}</Alert>}
        {success && <Alert variant="success">Profil mis à jour avec succès</Alert>}

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>Compte utilisateur</h3>
            <Input label="Email" value={profile?.email || ''} disabled />
          </div>

          {user.role === 'patient' && profile?.patient && (
            <>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>Informations personnelles</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <Input label="Prénom" name="first_name" value={profile.patient.first_name || ''} onChange={handleChange} required />
                  <Input label="Nom" name="last_name" value={profile.patient.last_name || ''} onChange={handleChange} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 16px' }}>
                  <Input label="Date de naissance" name="dob" type="date" value={profile.patient.dob || ''} onChange={handleChange} />
                  <Input label="CIN" name="cin" value={profile.patient.cin || ''} onChange={handleChange} />
                  <Select label="Genre" name="gender" value={profile.patient.gender || ''} onChange={handleChange}>
                    <option value="">Sélectionner...</option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                    <option value="other">Autre</option>
                  </Select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <Input label="Téléphone" name="phone_number" type="tel" value={profile.patient.phone_number || ''} onChange={handleChange} />
                  <Input label="Adresse" name="address" value={profile.patient.address || ''} onChange={handleChange} />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>Contact d'urgence</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <Input label="Nom du contact" name="emergency_contact" value={profile.patient.emergency_contact || ''} onChange={handleChange} />
                  <Input label="Téléphone du contact" name="emergency_contact_phone" type="tel" value={profile.patient.emergency_contact_phone || ''} onChange={handleChange} />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>Informations médicales</h3>
                <Select label="Groupe sanguin" name="blood_type" value={profile.patient.blood_type || ''} onChange={handleChange}>
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
                <Textarea label="Allergies" name="allergies" value={profile.patient.allergies || ''} onChange={handleChange} rows={2} placeholder="Séparez les allergies par des virgules" />
              </div>
            </>
          )}

          {user.role === 'doctor' && profile?.doctor && (
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>Informations professionnelles</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Input label="Prénom" name="first_name" value={profile.doctor.first_name || ''} onChange={handleChange} required />
                <Input label="Nom" name="last_name" value={profile.doctor.last_name || ''} onChange={handleChange} required />
              </div>
              <Input label="Spécialité" name="specialization" value={profile.doctor.specialization || ''} onChange={handleChange} />
              <Input label="Numéro de licence" name="license_number" value={profile.doctor.license_number || ''} onChange={handleChange} />
              <Input label="Hôpital d'affiliation" name="hospital_affiliation" value={profile.doctor.hospital_affiliation || ''} onChange={handleChange} />
            </div>
          )}

          {(user.role === 'patient' || user.role === 'doctor') && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <Button type="submit" loading={saving}>Enregistrer les modifications</Button>
            </div>
          )}
        </form>
      </Card>
    </AppLayout>
  );
}
