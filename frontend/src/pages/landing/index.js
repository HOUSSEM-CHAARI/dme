import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../components/ui';

// ============================================
// DME.tn Healthcare Landing Page
// Soft, Calming, Professional Design
// Following IHM Best Practices
// ============================================

export function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Icons.Shield,
      title: 'Sécurité certifiée',
      description: 'Chiffrement de bout en bout et conformité RGPD pour la protection de vos données médicales.',
      color: '#4a9eff',
      bgColor: '#f0f7ff',
    },
    {
      icon: Icons.Zap,
      title: 'Accès rapide',
      description: 'Consultez votre dossier médical en temps réel depuis n\'importe quel appareil.',
      color: '#4aad80',
      bgColor: '#f4faf7',
    },
    {
      icon: Icons.Users,
      title: 'Partage simplifié',
      description: 'Partagez vos documents médicaux avec vos praticiens en toute confiance.',
      color: '#f87e62',
      bgColor: '#fff8f6',
    },
    {
      icon: Icons.Activity,
      title: 'Suivi personnalisé',
      description: 'Visualisez l\'évolution de votre santé grâce à des tableaux de bord intuitifs.',
      color: '#a97aff',
      bgColor: '#faf8ff',
    },
  ];

  const stats = [
    { value: '50,000+', label: 'Patients inscrits', icon: Icons.Users },
    { value: '2,500+', label: 'Professionnels de santé', icon: Icons.Stethoscope },
    { value: '99.9%', label: 'Disponibilité', icon: Icons.CheckCircle },
    { value: '100%', label: 'Sécurisé', icon: Icons.Shield },
  ];

  const steps = [
    {
      number: '01',
      title: 'Créez votre compte',
      description: 'Inscription simple et rapide en quelques minutes.',
      icon: Icons.UserPlus,
    },
    {
      number: '02',
      title: 'Complétez votre profil',
      description: 'Ajoutez vos informations médicales essentielles.',
      icon: Icons.FileText,
    },
    {
      number: '03',
      title: 'Accédez à votre dossier',
      description: 'Consultez et partagez vos données en toute sécurité.',
      icon: Icons.Folder,
    },
  ];

  const testimonials = [
    {
      quote: "DME.tn facilite grandement le suivi de mes patients. L'interface est intuitive et professionnelle.",
      author: "Dr. Sarah Ben Ali",
      role: "Cardiologue",
      avatar: "S"
    },
    {
      quote: "Je peux enfin accéder à mon historique médical complet depuis mon téléphone. Très pratique !",
      author: "Mohamed Trabelsi",
      role: "Patient",
      avatar: "M"
    },
    {
      quote: "Une solution moderne qui répond parfaitement aux besoins de notre clinique.",
      author: "Amira Khelifi",
      role: "Directrice de clinique",
      avatar: "A"
    },
  ];

  return (
    <div style={{
      background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 50%, #f4faf7 100%)',
      minHeight: '100vh',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '16px 0',
        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.04)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: '1140px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4a9eff 0%, #4aad80 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(74, 158, 255, 0.25)',
            }}>
              <Icons.Heart size={20} color="#fff" />
            </div>
            <span style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1a1918',
              letterSpacing: '-0.3px'
            }}>DME.tn</span>
          </div>

          {/* Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {['Fonctionnalités', 'Comment ça marche', 'Témoignages'].map(item => (
              <button key={item} style={{
                background: 'none',
                border: 'none',
                color: '#5c5854',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.2s',
                padding: 0,
              }}
              onMouseEnter={e => e.target.style.color = '#1a1918'}
              onMouseLeave={e => e.target.style.color = '#5c5854'}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#5c5854',
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#1a1918'}
              onMouseLeave={e => e.target.style.color = '#5c5854'}
            >
              Connexion
            </button>
            <button
              onClick={() => navigate('/signup')}
              style={{
                background: 'linear-gradient(135deg, #4a9eff 0%, #3b8ae8 100%)',
                border: 'none',
                color: '#fff',
                padding: '10px 22px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(74, 158, 255, 0.25)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 6px 16px rgba(74, 158, 255, 0.3)';
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(74, 158, 255, 0.25)';
              }}
            >
              Créer un compte
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: '#f0f7ff',
            borderRadius: '20px',
            marginBottom: '24px',
            border: '1px solid #e0efff',
          }}>
            <Icons.Shield size={14} style={{ color: '#4a9eff' }} />
            <span style={{ fontSize: '13px', color: '#3b8ae8', fontWeight: 500 }}>
              Plateforme certifiée et sécurisée
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: '48px',
            fontWeight: 700,
            color: '#1a1918',
            lineHeight: 1.2,
            marginBottom: '20px',
            letterSpacing: '-0.5px',
          }}>
            Votre dossier médical,
            <br />
            <span style={{ color: '#4a9eff' }}>accessible et sécurisé</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '18px',
            color: '#5c5854',
            lineHeight: 1.6,
            marginBottom: '36px',
            maxWidth: '600px',
            margin: '0 auto 36px',
          }}>
            Centralisez vos informations de santé, partagez-les avec vos médecins
            et gardez le contrôle de votre parcours médical en toute simplicité.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '48px' }}>
            <button
              onClick={() => navigate('/signup')}
              style={{
                background: 'linear-gradient(135deg, #4a9eff 0%, #3b8ae8 100%)',
                border: 'none',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(74, 158, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 24px rgba(74, 158, 255, 0.35)';
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(74, 158, 255, 0.3)';
              }}
            >
              Commencer gratuitement
              <Icons.ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: '#ffffff',
                border: '1px solid #e8e6e1',
                color: '#1a1918',
                padding: '14px 28px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = '#4a9eff';
                e.target.style.background = '#f0f7ff';
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = '#e8e6e1';
                e.target.style.background = '#ffffff';
              }}
            >
              <Icons.Eye size={18} />
              Voir la démo
            </button>
          </div>

          {/* Trust indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            color: '#a8a49c',
            fontSize: '13px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icons.CheckCircle size={16} style={{ color: '#4aad80' }} />
              <span>Conforme RGPD</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icons.CheckCircle size={16} style={{ color: '#4aad80' }} />
              <span>Chiffrement SSL</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icons.CheckCircle size={16} style={{ color: '#4aad80' }} />
              <span>Support 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '60px 0',
        background: '#ffffff',
        borderTop: '1px solid #f5f3f0',
        borderBottom: '1px solid #f5f3f0',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            textAlign: 'center',
          }}>
            {stats.map((stat, index) => (
              <div key={index}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: '#f0f7ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                }}>
                  <stat.icon size={22} style={{ color: '#4a9eff' }} />
                </div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#1a1918',
                  marginBottom: '4px',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '14px', color: '#5c5854' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#1a1918',
              marginBottom: '12px',
              letterSpacing: '-0.3px',
            }}>
              Tout ce dont vous avez besoin
            </h2>
            <p style={{ fontSize: '16px', color: '#5c5854', maxWidth: '500px', margin: '0 auto' }}>
              Une plateforme complète pour gérer votre santé de manière simple et sécurisée.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: '28px',
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e8e6e1',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: feature.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}>
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#1a1918',
                  marginBottom: '10px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#5c5854',
                  lineHeight: 1.6,
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#1a1918',
              marginBottom: '12px',
            }}>
              Comment ça marche ?
            </h2>
            <p style={{ fontSize: '16px', color: '#5c5854' }}>
              Trois étapes simples pour prendre le contrôle de votre santé
            </p>
          </div>

          <div style={{ display: 'flex', gap: '32px' }}>
            {steps.map((step, index) => (
              <div key={index} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #4a9eff 0%, #4aad80 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                  boxShadow: '0 8px 24px rgba(74, 158, 255, 0.2)',
                }}>
                  <step.icon size={28} color="#fff" />
                </div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#4a9eff',
                  marginBottom: '8px',
                  letterSpacing: '1px',
                }}>
                  ÉTAPE {step.number}
                </div>
                <h3 style={{
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#1a1918',
                  marginBottom: '8px',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#5c5854',
                  lineHeight: 1.5,
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#1a1918',
              marginBottom: '12px',
            }}>
              Ils nous font confiance
            </h2>
            <p style={{ fontSize: '16px', color: '#5c5854' }}>
              Découvrez ce que nos utilisateurs disent de DME.tn
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  padding: '28px',
                  background: '#faf9f7',
                  borderRadius: '18px',
                  border: '1px solid #e8e6e1',
                }}
              >
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#fbbf24',
                    }} />
                  ))}
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#5c5854',
                  lineHeight: 1.7,
                  marginBottom: '20px',
                  fontStyle: 'italic',
                }}>
                  "{testimonial.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4a9eff 0%, #4aad80 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a1918' }}>
                      {testimonial.author}
                    </div>
                    <div style={{ fontSize: '13px', color: '#a8a49c' }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #4a9eff 0%, #4aad80 100%)',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '16px',
          }}>
            Prêt à simplifier votre santé ?
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            Rejoignez des milliers d'utilisateurs qui font confiance à DME.tn
            pour gérer leur dossier médical.
          </p>
          <button
            onClick={() => navigate('/signup')}
            style={{
              background: '#ffffff',
              border: 'none',
              color: '#3b8ae8',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}
          >
            Créer mon compte gratuit
            <Icons.ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '48px 0 32px',
        background: '#1a1918',
        color: '#ffffff',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '40px',
          }}>
            {/* Logo */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #4a9eff 0%, #4aad80 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icons.Heart size={18} color="#fff" />
                </div>
                <span style={{ fontSize: '18px', fontWeight: 700 }}>DME.tn</span>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', maxWidth: '280px', lineHeight: 1.6 }}>
                Votre dossier médical électronique, accessible et sécurisé.
              </p>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '64px' }}>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '16px', color: 'rgba(255,255,255,0.9)' }}>
                  Produit
                </h4>
                {['Fonctionnalités', 'Sécurité', 'Tarifs'].map(link => (
                  <button key={link} style={{
                    display: 'block',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '13px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    padding: 0,
                  }}>
                    {link}
                  </button>
                ))}
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '16px', color: 'rgba(255,255,255,0.9)' }}>
                  Support
                </h4>
                {['Centre d\'aide', 'Contact', 'FAQ'].map(link => (
                  <button key={link} style={{
                    display: 'block',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '13px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    padding: 0,
                  }}>
                    {link}
                  </button>
                ))}
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '16px', color: 'rgba(255,255,255,0.9)' }}>
                  Légal
                </h4>
                {['Confidentialité', 'CGU', 'Mentions légales'].map(link => (
                  <button key={link} style={{
                    display: 'block',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '13px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    padding: 0,
                  }}>
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
              © 2024 DME.tn. Tous droits réservés.
            </span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Icons.Mail size={18} style={{ color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }} />
              <Icons.Phone size={18} style={{ color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }} />
              <Icons.MapPin size={18} style={{ color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
