import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Alert, Icons } from '../../components/ui';

// Styles for the auth pages
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    fontFamily: 'var(--font-family)',
  },
  leftPanel: {
    width: '45%',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 40%, #2563eb 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '60px',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: '-100px',
    right: '-100px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: '-150px',
    left: '-150px',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.03)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '48px',
    position: 'relative',
    zIndex: 1,
  },
  logoIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoTitle: {
    fontSize: '32px',
    fontWeight: 800,
    letterSpacing: '-1px',
  },
  logoSubtitle: {
    fontSize: '14px',
    opacity: 0.8,
    marginTop: '2px',
  },
  headline: {
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: 1.3,
    marginBottom: '20px',
    position: 'relative',
    zIndex: 1,
  },
  description: {
    opacity: 0.85,
    fontSize: '16px',
    lineHeight: 1.75,
    marginBottom: '40px',
    maxWidth: '420px',
    position: 'relative',
    zIndex: 1,
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    position: 'relative',
    zIndex: 1,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 18px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '2px',
  },
  featureDesc: {
    fontSize: '12px',
    opacity: 0.75,
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
  },
  formCard: {
    width: '100%',
    maxWidth: '440px',
    background: '#ffffff',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  },
  formSubtitle: {
    color: 'var(--text-secondary)',
    fontSize: '15px',
    marginBottom: '32px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    margin: '24px 0',
    color: 'var(--text-tertiary)',
    fontSize: '13px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: 'var(--border-light)',
  },
  ssoButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '14px',
    border: '1px solid var(--border-light)',
    borderRadius: '12px',
    background: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  linkText: {
    textAlign: 'center',
    marginTop: '28px',
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
  link: {
    color: 'var(--color-primary-600)',
    fontWeight: 600,
    textDecoration: 'none',
    marginLeft: '4px',
  },
  testHint: {
    marginTop: '28px',
    padding: '16px',
    background: 'var(--bg-tertiary)',
    borderRadius: '12px',
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  stepIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
  },
  stepDot: (active, completed) => ({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: completed || active ? 'var(--color-primary-600)' : 'var(--bg-tertiary)',
    color: completed || active ? '#ffffff' : 'var(--text-tertiary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
  }),
  stepLine: (completed) => ({
    flex: 1,
    height: '2px',
    background: completed ? 'var(--color-primary-600)' : 'var(--border-light)',
    borderRadius: '1px',
    transition: 'all 0.3s ease',
  }),
  stepText: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    fontWeight: 500,
    marginLeft: '8px',
  },
  roleCard: (selected) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '18px',
    border: `2px solid ${selected ? 'var(--color-primary-500)' : 'var(--border-light)'}`,
    borderRadius: '14px',
    marginBottom: '12px',
    cursor: 'pointer',
    background: selected ? 'var(--color-primary-50)' : '#ffffff',
    transition: 'all 0.2s ease',
  }),
  roleRadio: {
    marginTop: '2px',
    width: '20px',
    height: '20px',
    accentColor: 'var(--color-primary-600)',
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 600,
    fontSize: '15px',
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },
  roleDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  forgotPassword: {
    background: 'none',
    border: 'none',
    color: 'var(--color-primary-600)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    padding: 0,
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0 16px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
};

// Features data
const FEATURES = [
  {
    icon: Icons.Shield,
    title: 'Sécurité maximale',
    desc: 'Données chiffrées et protégées 24/7',
  },
  {
    icon: Icons.CheckCircle,
    title: 'Conforme RGPD',
    desc: 'Respect total de vos droits numériques',
  },
  {
    icon: Icons.Zap,
    title: 'Accès instantané',
    desc: 'Consultez votre dossier en temps réel',
  },
  {
    icon: Icons.Users,
    title: 'Multi-utilisateurs',
    desc: 'Patient, médecin et staff médical',
  },
];

// Role options for signup
const ROLE_OPTIONS = [
  {
    value: 'patient',
    icon: Icons.User,
    label: 'Patient',
    desc: 'Consulter et gérer mes informations médicales',
  },
  {
    value: 'doctor',
    icon: Icons.Stethoscope,
    label: 'Médecin',
    desc: 'Gérer les dossiers médicaux de mes patients',
  },
  {
    value: 'staff',
    icon: Icons.Building,
    label: 'Staff médical',
    desc: 'Administration et gestion des données',
  },
];

// Auth Card wrapper component
function AuthCard({ children }) {
  return (
    <div style={styles.container}>
      {/* Left Panel - Branding */}
      <div style={styles.leftPanel}>
        {/* Decorative circles */}
        <div style={styles.decorativeCircle1} />
        <div style={styles.decorativeCircle2} />

        {/* Logo */}
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <Icons.Heart size={28} color="#ffffff" />
          </div>
          <div style={styles.logoText}>
            <div style={styles.logoTitle}>DME</div>
            <div style={styles.logoSubtitle}>Dossiers Médicaux Électroniques</div>
          </div>
        </div>

        {/* Headline */}
        <h2 style={styles.headline}>
          La sécurité de vos données de santé, notre priorité.
        </h2>

        {/* Description */}
        <p style={styles.description}>
          Une plateforme unifiée pour patients, médecins et personnel médical.
          Gérez vos dossiers médicaux en toute sécurité.
        </p>

        {/* Features */}
        <div style={styles.featureList}>
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              style={{...styles.featureItem, cursor: 'default'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateX(8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={styles.featureIcon}>
                <feature.icon size={20} color="#ffffff" />
              </div>
              <div style={styles.featureText}>
                <div style={styles.featureTitle}>{feature.title}</div>
                <div style={styles.featureDesc}>{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div style={styles.rightPanel}>
        <div style={styles.formCard}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Login Page
export function LoginPage() {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (field) => (e) => {
    clearError();
    setLocalError('');
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setLocalError('Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch {
      // Error shown via context
    } finally {
      setLoading(false);
    }
  };

  const displayError = localError || error;

  return (
    <AuthCard>
      <h3 style={styles.formTitle}>Bienvenue</h3>
      <p style={styles.formSubtitle}>
        Connectez-vous à votre espace médical sécurisé
      </p>

      {displayError && (
        <div style={{ marginBottom: '20px' }}>
          <Alert variant="error">{displayError}</Alert>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Adresse email"
          type="email"
          placeholder="votre.email@exemple.com"
          value={form.email}
          onChange={handleChange('email')}
          icon={Icons.Mail}
          required
        />
        <Input
          label="Mot de passe"
          type="password"
          placeholder="Entrez votre mot de passe"
          value={form.password}
          onChange={handleChange('password')}
          icon={Icons.Lock}
          required
        />

        <div style={{ textAlign: 'right', marginBottom: '20px', marginTop: '-8px' }}>
          <button type="button" style={styles.forgotPassword}>
            Mot de passe oublié ?
          </button>
        </div>

        <Button
          type="submit"
          loading={loading}
          style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
        >
          <Icons.LogIn size={18} style={{ marginRight: '8px' }} />
          Se connecter
        </Button>
      </form>

      <div style={styles.divider}>
        <div style={styles.dividerLine} />
        <span>ou</span>
        <div style={styles.dividerLine} />
      </div>

      <button
        style={styles.ssoButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--bg-tertiary)';
          e.currentTarget.style.borderColor = 'var(--border-medium)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = 'var(--border-light)';
        }}
      >
        <Icons.Shield size={18} />
        Authentification SSO entreprise
      </button>

      <p style={styles.linkText}>
        Pas encore de compte ?
        <Link to="/signup" style={styles.link}>
          Créer un compte
        </Link>
      </p>

      {/* Dev hint */}
      <div style={styles.testHint}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Icons.Info size={14} />
          <strong>Comptes de test</strong>
        </div>
        <div style={{ lineHeight: 1.6 }}>
          dr.martin@hopital.fr / marie.dupont@email.com / julie.bernard@hopital.fr
          <br />
          Mot de passe : <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>Password123!</code>
        </div>
      </div>
    </AuthCard>
  );
}

// Signup Page
export function SignupPage() {
  const { signup, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    dob: '',
    phone_number: '',
    address: '',
    specialization: '',
    license_number: '',
    hospital_affiliation: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    clearError();
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!form.role) newErrors.role = 'Veuillez choisir un rôle';
    if (!form.email) newErrors.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email invalide';
    if (!form.password) newErrors.password = 'Mot de passe requis';
    else if (form.password.length < 8) newErrors.password = 'Minimum 8 caractères';
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!form.first_name) newErrors.first_name = 'Prénom requis';
    if (!form.last_name) newErrors.last_name = 'Nom requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = form;
      await signup(payload);
      navigate('/dashboard');
    } catch {
      // Error shown via context
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validateStep1()) setStep(2);
  };

  const prevStep = () => setStep(1);

  return (
    <AuthCard>
      {/* Step Indicator */}
      <div style={styles.stepIndicator}>
        <div style={styles.stepDot(step >= 1, step > 1)}>
          {step > 1 ? <Icons.Check size={16} /> : '1'}
        </div>
        <div style={styles.stepLine(step > 1)} />
        <div style={styles.stepDot(step >= 2, step > 2)}>2</div>
        <span style={styles.stepText}>Étape {step}/2</span>
      </div>

      {step === 1 && (
        <>
          <h3 style={styles.formTitle}>Créer un compte</h3>
          <p style={styles.formSubtitle}>
            Choisissez votre profil et créez vos identifiants
          </p>

          {error && (
            <div style={{ marginBottom: '20px' }}>
              <Alert variant="error">{error}</Alert>
            </div>
          )}

          {/* Role Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginBottom: '12px',
            }}>
              Je suis *
            </label>
            {ROLE_OPTIONS.map((option) => (
              <label
                key={option.value}
                style={styles.roleCard(form.role === option.value)}
                onMouseEnter={(e) => {
                  if (form.role !== option.value) {
                    e.currentTarget.style.borderColor = 'var(--border-medium)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (form.role !== option.value) {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                  }
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={form.role === option.value}
                  onChange={handleChange('role')}
                  style={styles.roleRadio}
                />
                <div style={styles.roleContent}>
                  <div style={styles.roleTitle}>
                    <option.icon size={18} />
                    {option.label}
                  </div>
                  <div style={styles.roleDesc}>{option.desc}</div>
                </div>
              </label>
            ))}
            {errors.role && (
              <p style={{ fontSize: '12px', color: 'var(--color-error-600)', marginTop: '4px' }}>
                {errors.role}
              </p>
            )}
          </div>

          <Input
            label="Email *"
            type="email"
            placeholder="votre.email@exemple.com"
            value={form.email}
            onChange={handleChange('email')}
            error={errors.email}
            icon={Icons.Mail}
          />
          <Input
            label="Mot de passe *"
            type="password"
            placeholder="Minimum 8 caractères"
            value={form.password}
            onChange={handleChange('password')}
            error={errors.password}
            icon={Icons.Lock}
          />
          <Input
            label="Confirmer le mot de passe *"
            type="password"
            placeholder="Retapez votre mot de passe"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={errors.confirmPassword}
            icon={Icons.Lock}
          />

          <Button
            onClick={nextStep}
            style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
          >
            Continuer
            <Icons.ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Button>

          <p style={styles.linkText}>
            Déjà un compte ?
            <Link to="/login" style={styles.link}>
              Se connecter
            </Link>
          </p>
        </>
      )}

      {step === 2 && (
        <>
          <h3 style={styles.formTitle}>Informations personnelles</h3>
          <p style={styles.formSubtitle}>
            Complétez votre profil pour commencer
          </p>

          {error && (
            <div style={{ marginBottom: '20px' }}>
              <Alert variant="error">{error}</Alert>
            </div>
          )}

          <div style={styles.formGrid}>
            <Input
              label="Prénom *"
              placeholder="Marie"
              value={form.first_name}
              onChange={handleChange('first_name')}
              error={errors.first_name}
            />
            <Input
              label="Nom *"
              placeholder="Dupont"
              value={form.last_name}
              onChange={handleChange('last_name')}
              error={errors.last_name}
            />
          </div>

          <Input
            label="Date de naissance"
            type="date"
            value={form.dob}
            onChange={handleChange('dob')}
            icon={Icons.Calendar}
          />

          <Input
            label="Téléphone"
            placeholder="+33 6 00 00 00 00"
            value={form.phone_number}
            onChange={handleChange('phone_number')}
            icon={Icons.Phone}
          />

          {/* Doctor-specific fields */}
          {form.role === 'doctor' && (
            <>
              <Input
                label="Spécialisation"
                placeholder="Médecine générale"
                value={form.specialization}
                onChange={handleChange('specialization')}
                icon={Icons.Stethoscope}
              />
              <Input
                label="Numéro de licence"
                placeholder="MED-2024-XXX"
                value={form.license_number}
                onChange={handleChange('license_number')}
                icon={Icons.Award}
              />
              <Input
                label="Établissement"
                placeholder="Hôpital Saint-Louis"
                value={form.hospital_affiliation}
                onChange={handleChange('hospital_affiliation')}
                icon={Icons.Building}
              />
            </>
          )}

          {/* Patient-specific fields */}
          {form.role === 'patient' && (
            <Input
              label="Adresse"
              placeholder="12 rue des Lilas, Paris"
              value={form.address}
              onChange={handleChange('address')}
              icon={Icons.MapPin}
            />
          )}

          <div style={styles.buttonGroup}>
            <Button
              variant="secondary"
              onClick={prevStep}
              style={{ flex: 1, justifyContent: 'center', padding: '14px' }}
            >
              <Icons.ArrowLeft size={18} style={{ marginRight: '8px' }} />
              Retour
            </Button>
            <Button
              onClick={handleSubmit}
              loading={loading}
              style={{ flex: 2, justifyContent: 'center', padding: '14px' }}
            >
              <Icons.UserPlus size={18} style={{ marginRight: '8px' }} />
              Créer mon compte
            </Button>
          </div>
        </>
      )}
    </AuthCard>
  );
}
