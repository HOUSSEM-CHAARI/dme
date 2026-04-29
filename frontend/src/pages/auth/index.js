import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Alert, Icons } from '../../components/ui';

// Premium Healthcare Auth Styles - Soft & Calming
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    fontFamily: 'var(--font-family)',
    background: 'linear-gradient(135deg, #f0f7ff 0%, #f8fbff 50%, #f4faf7 100%)',
  },
  leftPanel: {
    width: '48%',
    background: 'linear-gradient(160deg, #4a9eff 0%, #3b8ae8 40%, #4aad80 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '60px 50px',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  // Soft decorative shapes
  decorativeShape1: {
    position: 'absolute',
    top: '10%',
    right: '-5%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.08)',
    filter: 'blur(40px)',
  },
  decorativeShape2: {
    position: 'absolute',
    bottom: '15%',
    left: '-10%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'rgba(74, 173, 128, 0.15)',
    filter: 'blur(60px)',
  },
  decorativeShape3: {
    position: 'absolute',
    top: '50%',
    right: '10%',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '48px',
    position: 'relative',
    zIndex: 1,
  },
  logoIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoTitle: {
    fontSize: '28px',
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  logoSubtitle: {
    fontSize: '12px',
    opacity: 0.9,
    marginTop: '2px',
    letterSpacing: '0.3px',
  },
  headline: {
    fontSize: '34px',
    fontWeight: 700,
    lineHeight: 1.3,
    marginBottom: '20px',
    position: 'relative',
    zIndex: 1,
    letterSpacing: '-0.3px',
  },
  description: {
    opacity: 0.9,
    fontSize: '15px',
    lineHeight: 1.7,
    marginBottom: '36px',
    maxWidth: '380px',
    position: 'relative',
    zIndex: 1,
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    position: 'relative',
    zIndex: 1,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 16px',
    background: 'rgba(255, 255, 255, 0.12)',
    borderRadius: '14px',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.2s ease',
  },
  featureIcon: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
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
    opacity: 0.8,
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  formCard: {
    width: '100%',
    maxWidth: '440px',
    background: '#ffffff',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.03)',
    border: '1px solid rgba(0, 0, 0, 0.04)',
  },
  formTitle: {
    fontSize: '26px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    letterSpacing: '-0.3px',
  },
  formSubtitle: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    marginBottom: '28px',
    lineHeight: 1.5,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
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
    padding: '12px',
    border: '1px solid var(--border-medium)',
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
    marginTop: '24px',
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
    marginTop: '24px',
    padding: '14px',
    background: 'var(--color-primary-50)',
    borderRadius: '12px',
    fontSize: '12px',
    color: 'var(--text-secondary)',
    border: '1px solid var(--color-primary-100)',
  },
  stepIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '28px',
  },
  stepDot: (active, completed) => ({
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: completed || active ? 'var(--color-primary-500)' : 'var(--bg-tertiary)',
    color: completed || active ? '#ffffff' : 'var(--text-tertiary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 600,
    transition: 'all 0.2s ease',
    boxShadow: completed || active ? 'var(--shadow-primary)' : 'none',
  }),
  stepLine: (completed) => ({
    flex: 1,
    height: '2px',
    background: completed ? 'var(--color-primary-500)' : 'var(--border-light)',
    borderRadius: '2px',
    transition: 'all 0.2s ease',
  }),
  stepText: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    fontWeight: 500,
    marginLeft: '6px',
  },
  roleCard: (selected) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    padding: '16px',
    border: `2px solid ${selected ? 'var(--color-primary-500)' : 'var(--border-light)'}`,
    borderRadius: '14px',
    marginBottom: '10px',
    cursor: 'pointer',
    background: selected ? 'var(--color-primary-50)' : '#ffffff',
    transition: 'all 0.2s ease',
  }),
  roleRadio: {
    marginTop: '2px',
    width: '18px',
    height: '18px',
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
    fontSize: '14px',
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },
  roleDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: 1.4,
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
    gap: '0 14px',
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
    desc: 'Données chiffrées et protégées',
  },
  {
    icon: Icons.CheckCircle,
    title: 'Conforme RGPD',
    desc: 'Respect de vos droits numériques',
  },
  {
    icon: Icons.Zap,
    title: 'Accès instantané',
    desc: 'Consultez votre dossier en temps réel',
  },
  {
    icon: Icons.Users,
    title: 'Multi-profils',
    desc: 'Patient, médecin et personnel',
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
    label: 'Personnel médical',
    desc: 'Administration et gestion des données',
  },
];

// Auth Card wrapper component
function AuthCard({ children }) {
  return (
    <div style={styles.container}>
      {/* Left Panel - Branding */}
      <div style={styles.leftPanel}>
        <div style={styles.decorativeShape1} />
        <div style={styles.decorativeShape2} />
        <div style={styles.decorativeShape3} />

        {/* Logo */}
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <Icons.Heart size={26} color="#ffffff" />
          </div>
          <div style={styles.logoText}>
            <div style={styles.logoTitle}>DME.tn</div>
            <div style={styles.logoSubtitle}>Dossier Médical Électronique</div>
          </div>
        </div>

        {/* Headline */}
        <h2 style={styles.headline}>
          Votre santé, notre priorité
        </h2>

        {/* Description */}
        <p style={styles.description}>
          Centralisez et partagez votre dossier médical en toute sécurité.
          Une plateforme moderne pour une meilleure prise en charge.
        </p>

        {/* Features */}
        <div style={styles.featureList}>
          {FEATURES.map((feature, index) => (
            <div key={index} style={styles.featureItem}>
              <div style={styles.featureIcon}>
                <feature.icon size={18} color="#ffffff" />
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
      <h3 style={styles.formTitle}>Connexion</h3>
      <p style={styles.formSubtitle}>
        Accédez à votre espace médical sécurisé
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
          placeholder="Votre mot de passe"
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
          e.currentTarget.style.borderColor = 'var(--border-medium)';
        }}
      >
        <Icons.Shield size={18} />
        Authentification entreprise (SSO)
      </button>

      <p style={styles.linkText}>
        Pas encore de compte ?
        <Link to="/signup" style={styles.link}>
          Créer un compte
        </Link>
      </p>

      {/* Dev hint */}
      <div style={styles.testHint}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Icons.Info size={14} style={{ color: 'var(--color-primary-600)' }} />
          <strong style={{ color: 'var(--color-primary-700)' }}>Comptes de test</strong>
        </div>
        <div style={{ lineHeight: 1.6 }}>
          dr.martin@hopital.fr / marie.dupont@email.com
          <br />
          Mot de passe : <code style={{ background: 'var(--color-primary-100)', padding: '2px 6px', borderRadius: '4px' }}>Password123!</code>
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
    if (!form.role) newErrors.role = 'Veuillez choisir un profil';
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
          {step > 1 ? <Icons.Check size={14} /> : '1'}
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
          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginBottom: '10px',
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
                    e.currentTarget.style.background = 'var(--bg-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (form.role !== option.value) {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.background = '#ffffff';
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
                    <option.icon size={16} style={{ color: 'var(--color-primary-600)' }} />
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
            Complétez votre profil pour continuer
          </p>

          {error && (
            <div style={{ marginBottom: '20px' }}>
              <Alert variant="error">{error}</Alert>
            </div>
          )}

          <div style={styles.formGrid}>
            <Input
              label="Prénom *"
              placeholder="Votre prénom"
              value={form.first_name}
              onChange={handleChange('first_name')}
              error={errors.first_name}
            />
            <Input
              label="Nom *"
              placeholder="Votre nom"
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
            placeholder="+216 XX XXX XXX"
            value={form.phone_number}
            onChange={handleChange('phone_number')}
            icon={Icons.Phone}
          />

          {/* Doctor-specific fields */}
          {form.role === 'doctor' && (
            <>
              <Input
                label="Spécialisation"
                placeholder="Ex: Médecine générale"
                value={form.specialization}
                onChange={handleChange('specialization')}
                icon={Icons.Stethoscope}
              />
              <Input
                label="Numéro de licence"
                placeholder="Votre numéro de licence"
                value={form.license_number}
                onChange={handleChange('license_number')}
                icon={Icons.Award}
              />
              <Input
                label="Établissement"
                placeholder="Nom de l'établissement"
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
              placeholder="Votre adresse"
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
