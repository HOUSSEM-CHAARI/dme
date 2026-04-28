import React, { useState, useEffect } from 'react';
import { AppLayout } from '../../components/layout';
import { Card, Input, Button, Alert, Avatar, Select, Textarea, Icons, Badge } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../api';

// Styles
const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '32px',
    padding: '24px',
    background: 'linear-gradient(135deg, var(--color-primary-50) 0%, #ffffff 100%)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border-light)',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: '26px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  },
  profileRole: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--text-secondary)',
    fontSize: '15px',
  },
  sectionDivider: {
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-light)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  sectionTitle: {
    fontSize: '17px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  sectionIcon: {
    width: '32px',
    height: '32px',
    borderRadius: 'var(--radius-lg)',
    background: 'var(--color-primary-100)',
    color: 'var(--color-primary-600)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSection: {
    marginBottom: '28px',
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
    justifyContent: 'flex-end',
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid var(--border-light)',
  },
};

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

  const getRoleLabel = (role) => {
    switch (role) {
      case 'doctor': return 'Médecin';
      case 'staff': return 'Staff administratif';
      case 'patient': return 'Patient';
      default: return role;
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'doctor': return <Icons.Stethoscope size={18} />;
      case 'staff': return <Icons.Building size={18} />;
      case 'patient': return <Icons.User size={18} />;
      default: return <Icons.User size={18} />;
    }
  };

  if (loading) {
    return (
      <AppLayout title="Mon profil">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
          <div style={{ textAlign: 'center' }}>
            <Icons.User size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '16px' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Chargement du profil...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Mon profil">
      <div style={styles.container}>
        <Card>
          {/* Profile Header */}
          <div style={styles.profileHeader}>
            <Avatar name={user?.name || ''} size={88} />
            <div style={styles.profileInfo}>
              <h2 style={styles.profileName}>{user?.name}</h2>
              <div style={styles.profileRole}>
                {getRoleIcon(user?.role)}
                <span>{getRoleLabel(user?.role)}</span>
                <Badge variant="primary" size="sm">{user?.role}</Badge>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div style={{ marginBottom: '20px' }}>
              <Alert variant="error">{error}</Alert>
            </div>
          )}
          {success && (
            <div style={{ marginBottom: '20px' }}>
              <Alert variant="success">
                <Icons.CheckCircle size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Profil mis à jour avec succès
              </Alert>
            </div>
          )}

          <form onSubmit={handleSave}>
            {/* Account Section */}
            <div style={styles.formSection}>
              <div style={styles.sectionDivider}>
                <div style={styles.sectionIcon}>
                  <Icons.Shield size={18} />
                </div>
                <h3 style={styles.sectionTitle}>Compte utilisateur</h3>
              </div>
              <Input
                label="Email"
                value={profile?.email || ''}
                disabled
                icon={<Icons.Mail size={18} />}
              />
            </div>

            {/* Patient Information */}
            {user.role === 'patient' && profile?.patient && (
              <>
                <div style={styles.formSection}>
                  <div style={styles.sectionDivider}>
                    <div style={styles.sectionIcon}>
                      <Icons.User size={18} />
                    </div>
                    <h3 style={styles.sectionTitle}>Informations personnelles</h3>
                  </div>
                  <div style={styles.formGrid}>
                    <Input
                      label="Prénom"
                      name="first_name"
                      value={profile.patient.first_name || ''}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Nom"
                      name="last_name"
                      value={profile.patient.last_name || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div style={styles.formGrid3}>
                    <Input
                      label="Date de naissance"
                      name="dob"
                      type="date"
                      value={profile.patient.dob || ''}
                      onChange={handleChange}
                      icon={<Icons.Calendar size={18} />}
                    />
                    <Input
                      label="CIN"
                      name="cin"
                      value={profile.patient.cin || ''}
                      onChange={handleChange}
                    />
                    <Select
                      label="Genre"
                      name="gender"
                      value={profile.patient.gender || ''}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner...</option>
                      <option value="male">Homme</option>
                      <option value="female">Femme</option>
                      <option value="other">Autre</option>
                    </Select>
                  </div>
                  <div style={styles.formGrid}>
                    <Input
                      label="Téléphone"
                      name="phone_number"
                      type="tel"
                      value={profile.patient.phone_number || ''}
                      onChange={handleChange}
                      icon={<Icons.Phone size={18} />}
                    />
                    <Input
                      label="Adresse"
                      name="address"
                      value={profile.patient.address || ''}
                      onChange={handleChange}
                      icon={<Icons.MapPin size={18} />}
                    />
                  </div>
                </div>

                <div style={styles.formSection}>
                  <div style={styles.sectionDivider}>
                    <div style={{ ...styles.sectionIcon, background: 'var(--color-error-100)', color: 'var(--color-error-600)' }}>
                      <Icons.AlertTriangle size={18} />
                    </div>
                    <h3 style={styles.sectionTitle}>Contact d'urgence</h3>
                  </div>
                  <div style={styles.formGrid}>
                    <Input
                      label="Nom du contact"
                      name="emergency_contact"
                      value={profile.patient.emergency_contact || ''}
                      onChange={handleChange}
                    />
                    <Input
                      label="Téléphone du contact"
                      name="emergency_contact_phone"
                      type="tel"
                      value={profile.patient.emergency_contact_phone || ''}
                      onChange={handleChange}
                      icon={<Icons.Phone size={18} />}
                    />
                  </div>
                </div>

                <div style={styles.formSection}>
                  <div style={styles.sectionDivider}>
                    <div style={{ ...styles.sectionIcon, background: 'var(--color-secondary-100)', color: 'var(--color-secondary-600)' }}>
                      <Icons.Heart size={18} />
                    </div>
                    <h3 style={styles.sectionTitle}>Informations médicales</h3>
                  </div>
                  <Select
                    label="Groupe sanguin"
                    name="blood_type"
                    value={profile.patient.blood_type || ''}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner...</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </Select>
                  <Textarea
                    label="Allergies"
                    name="allergies"
                    value={profile.patient.allergies || ''}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Séparez les allergies par des virgules"
                  />
                </div>
              </>
            )}

            {/* Doctor Information */}
            {user.role === 'doctor' && profile?.doctor && (
              <div style={styles.formSection}>
                <div style={styles.sectionDivider}>
                  <div style={styles.sectionIcon}>
                    <Icons.Stethoscope size={18} />
                  </div>
                  <h3 style={styles.sectionTitle}>Informations professionnelles</h3>
                </div>
                <div style={styles.formGrid}>
                  <Input
                    label="Prénom"
                    name="first_name"
                    value={profile.doctor.first_name || ''}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Nom"
                    name="last_name"
                    value={profile.doctor.last_name || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Input
                  label="Spécialité"
                  name="specialization"
                  value={profile.doctor.specialization || ''}
                  onChange={handleChange}
                  icon={<Icons.Award size={18} />}
                />
                <Input
                  label="Numéro de licence"
                  name="license_number"
                  value={profile.doctor.license_number || ''}
                  onChange={handleChange}
                />
                <Input
                  label="Hôpital d'affiliation"
                  name="hospital_affiliation"
                  value={profile.doctor.hospital_affiliation || ''}
                  onChange={handleChange}
                  icon={<Icons.Building size={18} />}
                />
              </div>
            )}

            {/* Save Button */}
            {(user.role === 'patient' || user.role === 'doctor') && (
              <div style={styles.buttonGroup}>
                <Button type="submit" loading={saving}>
                  <Icons.Save size={18} style={{ marginRight: '8px' }} />
                  Enregistrer les modifications
                </Button>
              </div>
            )}
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
