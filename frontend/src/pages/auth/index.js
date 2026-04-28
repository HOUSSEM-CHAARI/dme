import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Alert } from '../../components/ui';

function AuthCard({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f5ee 100%)', display: 'flex' }}>
      {/* Left panel */}
      <div style={{ width: '42%', background: '#1B6FE8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 50px', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>♡</div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>DME</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>Dossiers Médicaux Électroniques</div>
          </div>
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35, marginBottom: 16 }}>
          La sécurité de vos données de santé, notre priorité.
        </h2>
        <p style={{ opacity: 0.8, fontSize: 14, lineHeight: 1.75, marginBottom: 32 }}>
          Une plateforme unifiée pour patients, médecins et personnel médical — conforme RGPD et sécurisée par JWT.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['🔒 Données chiffrées et sécurisées', '✓ Conforme RGPD / HIPAA', '⚡ Accès instantané au dossier', '👥 Multi-rôles (patient, médecin, staff)'].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, opacity: 0.9 }}>{f}</div>
          ))}
        </div>
      </div>
      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const handle = (k) => (e) => { clearError(); setLocalError(''); setForm(f => ({ ...f, [k]: e.target.value })); };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setLocalError('Veuillez remplir tous les champs.'); return; }
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'patient' ? '/dashboard' : '/dashboard');
    } catch {
      // error shown via context
    } finally {
      setLoading(false);
    }
  };

  const displayError = localError || error;

  return (
    <AuthCard>
      <h3 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>Se connecter</h3>
      <p style={{ color: '#6b6b6b', fontSize: 14, marginBottom: 28 }}>Accédez à votre espace médical sécurisé</p>

      {displayError && <Alert variant="error">{displayError}</Alert>}

      <form onSubmit={submit}>
        <Input label="Adresse email" type="email" placeholder="votre.email@exemple.com" value={form.email} onChange={handle('email')} required />
        <div style={{ marginBottom: 8 }}>
          <Input label="Mot de passe" type="password" placeholder="••••••••" value={form.password} onChange={handle('password')} required />
        </div>
        <div style={{ textAlign: 'right', marginBottom: 20 }}>
          <button type="button" style={{ background: 'none', border: 'none', color: '#1B6FE8', fontSize: 12, cursor: 'pointer' }}>Mot de passe oublié ?</button>
        </div>
        <Button type="submit" loading={loading} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
          Se connecter
        </Button>
      </form>

      <div style={{ textAlign: 'center', margin: '20px 0 10px', color: '#bbb', fontSize: 12 }}>— ou —</div>
      <button style={{ width: '100%', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 10, padding: 11, fontSize: 13, cursor: 'pointer', background: 'transparent', color: '#6b6b6b', fontWeight: 500 }}>
        🔐 Authentification SSO entreprise
      </button>

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: '#6b6b6b' }}>
        Pas encore de compte ?{' '}
        <Link to="/signup" style={{ color: '#1B6FE8', fontWeight: 600, textDecoration: 'none' }}>Créer un compte</Link>
      </p>

      {/* Dev hint */}
      <div style={{ marginTop: 24, padding: '12px 14px', background: '#f5f6fa', borderRadius: 8, fontSize: 11, color: '#888' }}>
        <strong>Comptes de test :</strong><br />
        doctor@dme.fr / patient@dme.fr / staff@dme.fr<br />
        Mot de passe : <code>Password123!</code>
      </div>
    </AuthCard>
  );
}

export function SignupPage() {
  const { signup, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    role: '', email: '', password: '', confirmPassword: '',
    first_name: '', last_name: '', dob: '', phone_number: '', address: '',
    specialization: '', license_number: '', hospital_affiliation: '',
  });
  const [errors, setErrors] = useState({});

  const handle = (k) => (e) => { clearError(); setForm(f => ({ ...f, [k]: e.target.value })); setErrors(er => ({ ...er, [k]: '' })); };

  const validateStep1 = () => {
    const errs = {};
    if (!form.role) errs.role = 'Choisissez un rôle';
    if (!form.email) errs.email = 'Email requis';
    if (!form.password || form.password.length < 8) errs.password = 'Au moins 8 caractères';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Les mots de passe ne correspondent pas';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!form.first_name) errs.first_name = 'Prénom requis';
    if (!form.last_name) errs.last_name = 'Nom requis';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    if (!validateStep2()) return;
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = form;
      await signup(payload);
      navigate('/dashboard');
    } catch {
      // shown via context
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'patient', label: '👤 Patient', desc: 'Consulter et gérer mes informations médicales' },
    { value: 'doctor',  label: '⚕ Médecin',  desc: 'Gérer les dossiers médicaux de mes patients' },
    { value: 'staff',   label: '🏥 Staff',    desc: 'Administration et gestion des données' },
  ];

  return (
    <AuthCard>
      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
        {[1, 2].map(s => (
          <React.Fragment key={s}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: step >= s ? '#1B6FE8' : '#e0e0e0', color: step >= s ? '#fff' : '#999', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>{s}</div>
            {s < 2 && <div style={{ flex: 1, height: 2, background: step > s ? '#1B6FE8' : '#e0e0e0', borderRadius: 1 }} />}
          </React.Fragment>
        ))}
        <span style={{ fontSize: 12, color: '#6b6b6b', marginLeft: 4 }}>Étape {step}/2</span>
      </div>

      {step === 1 && (
        <>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>Créer un compte</h3>
          <p style={{ color: '#6b6b6b', fontSize: 14, marginBottom: 24 }}>Choisissez votre profil et vos identifiants</p>

          {error && <Alert variant="error">{error}</Alert>}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#6b6b6b', marginBottom: 8 }}>Je suis *</label>
            {roleOptions.map(opt => (
              <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: `1.5px solid ${form.role === opt.value ? '#1B6FE8' : 'rgba(0,0,0,0.12)'}`, borderRadius: 10, marginBottom: 8, cursor: 'pointer', background: form.role === opt.value ? '#E6F1FB' : '#fff' }}>
                <input type="radio" name="role" value={opt.value} checked={form.role === opt.value} onChange={handle('role')} style={{ accentColor: '#1B6FE8' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a' }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: '#6b6b6b' }}>{opt.desc}</div>
                </div>
              </label>
            ))}
            {errors.role && <p style={{ fontSize: 12, color: '#E24B4A' }}>{errors.role}</p>}
          </div>

          <Input label="Email *" type="email" placeholder="votre.email@exemple.com" value={form.email} onChange={handle('email')} error={errors.email} />
          <Input label="Mot de passe *" type="password" placeholder="Minimum 8 caractères" value={form.password} onChange={handle('password')} error={errors.password} />
          <Input label="Confirmer le mot de passe *" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={handle('confirmPassword')} error={errors.confirmPassword} />

          <Button onClick={() => validateStep1() && setStep(2)} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            Suivant →
          </Button>
          <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: '#6b6b6b' }}>
            Déjà un compte ? <Link to="/login" style={{ color: '#1B6FE8', fontWeight: 600, textDecoration: 'none' }}>Se connecter</Link>
          </p>
        </>
      )}

      {step === 2 && (
        <>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>Informations personnelles</h3>
          <p style={{ color: '#6b6b6b', fontSize: 14, marginBottom: 24 }}>Complétez votre profil pour commencer</p>

          {error && <Alert variant="error">{error}</Alert>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Input label="Prénom *" placeholder="Marie" value={form.first_name} onChange={handle('first_name')} error={errors.first_name} />
            <Input label="Nom *" placeholder="Dupont" value={form.last_name} onChange={handle('last_name')} error={errors.last_name} />
          </div>
          <Input label="Date de naissance" type="date" value={form.dob} onChange={handle('dob')} />
          <Input label="Téléphone" placeholder="+33 6 00 00 00 00" value={form.phone_number} onChange={handle('phone_number')} />

          {form.role === 'doctor' && (
            <>
              <Input label="Spécialisation" placeholder="Médecine générale" value={form.specialization} onChange={handle('specialization')} />
              <Input label="Numéro de licence" placeholder="MED-2024-XXX" value={form.license_number} onChange={handle('license_number')} />
              <Input label="Établissement" placeholder="Hôpital Saint-Louis" value={form.hospital_affiliation} onChange={handle('hospital_affiliation')} />
            </>
          )}
          {form.role === 'patient' && (
            <Input label="Adresse" placeholder="12 rue des Lilas, Paris" value={form.address} onChange={handle('address')} />
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="secondary" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center' }}>← Retour</Button>
            <Button onClick={submit} loading={loading} style={{ flex: 2, justifyContent: 'center' }}>Créer mon compte</Button>
          </div>
        </>
      )}
    </AuthCard>
  );
}
