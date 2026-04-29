import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Icons, FeatureCard, BlogCard, HeroSearchBar, CTAButton
} from '../../components/ui';

// ============================================
// DME.tn Landing Page - Inspired by Med.tn
// ============================================

// Styles
const styles = {
  // Header
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '16px 0',
    transition: 'all 0.3s ease',
  },
  headerScrolled: {
    background: 'rgba(255, 255, 255, 0.98)',
    boxShadow: 'var(--shadow-md)',
    backdropFilter: 'blur(10px)',
  },
  headerInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  },
  logoIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 800,
    letterSpacing: '-0.5px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  navLink: {
    fontSize: '15px',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  // Hero
  hero: {
    background: 'var(--bg-hero)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '80px',
    position: 'relative',
    overflow: 'hidden',
  },
  heroInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '60px 24px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'center',
  },
  heroContent: {
    color: '#fff',
  },
  heroTitle: {
    fontSize: '52px',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: '24px',
    letterSpacing: '-1px',
  },
  heroSubtitle: {
    fontSize: '18px',
    opacity: 0.9,
    lineHeight: 1.6,
    marginBottom: '36px',
    maxWidth: '500px',
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  heroIllustration: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Search Section
  searchSection: {
    background: 'var(--bg-section-alt)',
    padding: '60px 0',
    marginTop: '-40px',
    position: 'relative',
    zIndex: 10,
    borderRadius: '40px 40px 0 0',
  },
  searchInner: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '24px',
    textAlign: 'center',
  },

  // Features Section
  features: {
    padding: '100px 0',
    background: 'var(--bg-primary)',
  },
  featuresInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  sectionLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-primary-500)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '12px',
  },
  sectionTitle: {
    fontSize: '40px',
    fontWeight: 800,
    color: 'var(--text-primary)',
    marginBottom: '16px',
    letterSpacing: '-0.5px',
  },
  sectionSubtitle: {
    fontSize: '18px',
    color: 'var(--text-secondary)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
  },

  // Stats Section
  stats: {
    padding: '80px 0',
    background: 'var(--bg-hero)',
  },
  statsInner: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 24px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
  },
  statItem: {
    textAlign: 'center',
    color: '#fff',
  },
  statValue: {
    fontSize: '56px',
    fontWeight: 800,
    marginBottom: '8px',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '16px',
    opacity: 0.9,
  },

  // Blog Section
  blog: {
    padding: '100px 0',
    background: 'var(--bg-section-alt)',
  },
  blogInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  },
  blogGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
  },

  // CTA Section
  cta: {
    padding: '100px 0',
    background: 'var(--bg-primary)',
    textAlign: 'center',
  },
  ctaInner: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '0 24px',
  },
  ctaTitle: {
    fontSize: '40px',
    fontWeight: 800,
    color: 'var(--text-primary)',
    marginBottom: '16px',
    letterSpacing: '-0.5px',
  },
  ctaSubtitle: {
    fontSize: '18px',
    color: 'var(--text-secondary)',
    marginBottom: '36px',
    lineHeight: 1.6,
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  // Footer
  footer: {
    background: 'var(--color-primary-900)',
    color: '#fff',
    padding: '60px 0 24px',
  },
  footerInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '40px',
    marginBottom: '40px',
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
  },
  footerDesc: {
    fontSize: '14px',
    opacity: 0.8,
    lineHeight: 1.6,
    marginBottom: '20px',
  },
  footerTitle: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  footerLink: {
    display: 'block',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  footerBottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    opacity: 0.7,
  },
  socialLinks: {
    display: 'flex',
    gap: '12px',
  },
  socialLink: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s ease',
    cursor: 'pointer',
  },
};

// Medical Illustration SVG Component
function MedicalIllustration() {
  return (
    <svg viewBox="0 0 500 400" style={{ width: '100%', maxWidth: '500px' }}>
      {/* Background circle */}
      <circle cx="250" cy="200" r="180" fill="rgba(255,255,255,0.1)" />
      <circle cx="250" cy="200" r="140" fill="rgba(255,255,255,0.1)" />

      {/* Medical folder/document */}
      <rect x="150" y="100" width="200" height="240" rx="16" fill="white" />
      <rect x="165" y="130" width="170" height="8" rx="4" fill="#e2e8f0" />
      <rect x="165" y="150" width="130" height="8" rx="4" fill="#e2e8f0" />
      <rect x="165" y="170" width="150" height="8" rx="4" fill="#e2e8f0" />

      {/* Medical cross/heart */}
      <circle cx="250" cy="260" r="40" fill="var(--color-primary-500)" />
      <path d="M250 235 L250 285 M225 260 L275 260" stroke="white" strokeWidth="8" strokeLinecap="round" />

      {/* Person silhouette */}
      <circle cx="350" cy="180" r="30" fill="var(--color-secondary-400)" />
      <path d="M320 280 Q350 220 380 280" fill="var(--color-secondary-400)" />

      {/* Doctor silhouette */}
      <circle cx="120" cy="200" r="25" fill="var(--color-cta-400)" />
      <path d="M95 280 Q120 230 145 280" fill="var(--color-cta-400)" />
      <rect x="108" y="165" width="24" height="8" rx="4" fill="white" opacity="0.8" />

      {/* Floating elements */}
      <circle cx="400" cy="120" r="8" fill="var(--color-cta-400)" />
      <circle cx="80" cy="280" r="6" fill="var(--color-secondary-400)" />
      <circle cx="420" cy="300" r="10" fill="white" opacity="0.3" />
      <circle cx="60" cy="150" r="8" fill="white" opacity="0.3" />
    </svg>
  );
}

// Main Landing Page Component
export function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchTab, setSearchTab] = useState('medecin');

  // Handle scroll for header styling
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Icons.Shield,
      title: 'Accès rapide et sécurisé',
      description: 'Vos données médicales protégées par les standards de sécurité les plus élevés.',
      color: 'primary',
    },
    {
      icon: Icons.Zap,
      title: 'Partage instantané',
      description: 'Partagez votre dossier médical avec vos médecins en un clic.',
      color: 'secondary',
    },
    {
      icon: Icons.FileText,
      title: 'Historique complet',
      description: 'Consultez l\'ensemble de votre parcours médical en un seul endroit.',
      color: 'cta',
    },
    {
      icon: Icons.Lock,
      title: 'Conformité RGPD',
      description: 'Vos données personnelles respectent les normes européennes de protection.',
      color: 'success',
    },
  ];

  const blogPosts = [
    {
      category: 'Santé',
      title: 'Comment bien préparer sa consultation médicale',
      excerpt: 'Découvrez nos conseils pour optimiser votre temps avec votre médecin.',
      date: '28 Avril 2024',
    },
    {
      category: 'Prévention',
      title: 'Les examens de santé essentiels par tranche d\'âge',
      excerpt: 'Un guide complet des bilans de santé recommandés à chaque étape de la vie.',
      date: '25 Avril 2024',
    },
    {
      category: 'Digital',
      title: 'Le dossier médical numérique en Tunisie',
      excerpt: 'L\'évolution de la santé connectée et ses avantages pour les patients.',
      date: '22 Avril 2024',
    },
    {
      category: 'Bien-être',
      title: 'Gérer son stress au quotidien',
      excerpt: 'Des techniques simples pour améliorer votre bien-être mental.',
      date: '20 Avril 2024',
    },
  ];

  const handleSearch = (query, tab) => {
    console.log('Search:', query, 'Tab:', tab);
    // Navigate to search results
  };

  return (
    <div style={{ fontFamily: 'var(--font-family)' }}>
      {/* Header */}
      <header style={{
        ...styles.header,
        ...(scrolled ? styles.headerScrolled : {}),
      }}>
        <div style={styles.headerInner}>
          <a href="/" style={styles.logo}>
            <div style={styles.logoIcon}>
              <Icons.Heart size={24} />
            </div>
            <span style={{
              ...styles.logoText,
              color: scrolled ? 'var(--color-primary-600)' : '#fff',
            }}>DME.tn</span>
          </a>

          <nav style={styles.nav}>
            {['Accueil', 'Médecins', 'Laboratoires', 'Magazine', 'Tarifs'].map((item) => (
              <button
                key={item}
                style={{
                  ...styles.navLink,
                  color: scrolled ? 'var(--text-primary)' : '#fff',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-cta-500)'}
                onMouseLeave={(e) => e.target.style.color = scrolled ? 'var(--text-primary)' : '#fff'}
              >
                {item}
              </button>
            ))}
          </nav>

          <div style={styles.headerActions}>
            <CTAButton variant={scrolled ? 'primary' : 'outline'} size="sm" onClick={() => navigate('/login')}>
              Connexion
            </CTAButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        {/* Background decorations */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0,180,216,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        <div style={styles.heroInner}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Votre Dossier Médical en Ligne, en Toute Sécurité
            </h1>
            <p style={styles.heroSubtitle}>
              Centralisez, consultez et partagez votre dossier médical avec vos médecins.
              Une plateforme moderne pour une meilleure prise en charge de votre santé.
            </p>
            <div style={styles.heroButtons}>
              <CTAButton variant="primary" size="lg" onClick={() => navigate('/signup')}>
                <Icons.Plus size={20} />
                Créer mon dossier
              </CTAButton>
              <CTAButton variant="outline" size="lg" onClick={() => navigate('/login')}>
                Espace professionnel
              </CTAButton>
            </div>
          </div>
          <div style={styles.heroIllustration}>
            <MedicalIllustration />
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section style={styles.searchSection}>
        <div style={styles.searchInner}>
          <h2 style={styles.searchTitle}>Trouvez un professionnel de santé</h2>
          <HeroSearchBar
            tabs={[
              { key: 'medecin', label: 'Médecin' },
              { key: 'laboratoire', label: 'Laboratoire' },
              { key: 'specialite', label: 'Spécialité' },
            ]}
            activeTab={searchTab}
            onTabChange={setSearchTab}
            onSearch={handleSearch}
            placeholder={
              searchTab === 'medecin' ? 'Rechercher un médecin...' :
              searchTab === 'laboratoire' ? 'Rechercher un laboratoire...' :
              'Rechercher une spécialité...'
            }
          />
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.featuresInner}>
          <div style={styles.sectionHeader}>
            <p style={styles.sectionLabel}>Pourquoi choisir DME.tn ?</p>
            <h2 style={styles.sectionTitle}>Une solution complète pour votre santé</h2>
            <p style={styles.sectionSubtitle}>
              DME.tn vous offre tous les outils nécessaires pour gérer efficacement
              votre dossier médical et faciliter la communication avec vos professionnels de santé.
            </p>
          </div>
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.stats}>
        <div style={styles.statsInner}>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>+50,000</div>
              <div style={styles.statLabel}>Patients inscrits</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>+2,000</div>
              <div style={styles.statLabel}>Médecins partenaires</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>+500</div>
              <div style={styles.statLabel}>Laboratoires connectés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section style={styles.blog}>
        <div style={styles.blogInner}>
          <div style={styles.sectionHeader}>
            <p style={styles.sectionLabel}>Magazine Santé</p>
            <h2 style={styles.sectionTitle}>Actualités et conseils santé</h2>
            <p style={styles.sectionSubtitle}>
              Restez informé des dernières actualités médicales et découvrez
              nos conseils pour prendre soin de votre santé au quotidien.
            </p>
          </div>
          <div style={styles.blogGrid}>
            {blogPosts.map((post, index) => (
              <BlogCard
                key={index}
                category={post.category}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <div style={styles.ctaInner}>
          <h2 style={styles.ctaTitle}>Rejoignez DME.tn aujourd'hui</h2>
          <p style={styles.ctaSubtitle}>
            Créez votre dossier médical en ligne gratuitement et prenez le contrôle
            de votre santé. Des milliers de patients nous font déjà confiance.
          </p>
          <div style={styles.ctaButtons}>
            <CTAButton variant="primary" size="lg" onClick={() => navigate('/signup')}>
              <Icons.UserPlus size={20} />
              Créer mon compte gratuit
            </CTAButton>
            <CTAButton variant="white" size="lg" onClick={() => navigate('/login')}>
              J'ai déjà un compte
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerGrid}>
            <div>
              <div style={styles.footerLogo}>
                <div style={{
                  ...styles.logoIcon,
                  width: '40px',
                  height: '40px',
                }}>
                  <Icons.Heart size={20} />
                </div>
                <span style={{ fontSize: '20px', fontWeight: 700 }}>DME.tn</span>
              </div>
              <p style={styles.footerDesc}>
                DME.tn est la plateforme de référence pour la gestion de dossiers
                médicaux en Tunisie. Sécurisée, moderne et accessible à tous.
              </p>
              <div style={styles.socialLinks}>
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                  <div key={social} style={styles.socialLink}>
                    <Icons.Zap size={16} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={styles.footerTitle}>Plateforme</h4>
              <span style={styles.footerLink}>Fonctionnalités</span>
              <span style={styles.footerLink}>Tarifs</span>
              <span style={styles.footerLink}>Sécurité</span>
              <span style={styles.footerLink}>API</span>
            </div>
            <div>
              <h4 style={styles.footerTitle}>Ressources</h4>
              <span style={styles.footerLink}>Magazine Santé</span>
              <span style={styles.footerLink}>FAQ</span>
              <span style={styles.footerLink}>Support</span>
              <span style={styles.footerLink}>Contact</span>
            </div>
            <div>
              <h4 style={styles.footerTitle}>Légal</h4>
              <span style={styles.footerLink}>Conditions d'utilisation</span>
              <span style={styles.footerLink}>Politique de confidentialité</span>
              <span style={styles.footerLink}>Mentions légales</span>
              <span style={styles.footerLink}>Cookies</span>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <span>&copy; 2024 DME.tn - Tous droits réservés</span>
            <span>Fabriqué avec soin en Tunisie</span>
          </div>
        </div>
      </footer>

      {/* Global styles for landing page */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        html {
          scroll-behavior: smooth;
        }

        @media (max-width: 1024px) {
          .hero-inner { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 640px) {
          .nav { display: none !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
