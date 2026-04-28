import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f6fa 0%, #e8f4fc 100%)',
      padding: 20,
    }}>
      <Card style={{ maxWidth: 480, textAlign: 'center', padding: '48px 40px' }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>404</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>
          Page non trouvée
        </h1>
        <p style={{ color: '#6b6b6b', fontSize: 14, marginBottom: 32 }}>
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            ← Retour
          </Button>
          <Button onClick={() => navigate('/dashboard')}>
            Tableau de bord
          </Button>
        </div>
      </Card>
    </div>
  );
}

export function NotAuthorizedPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f6fa 0%, #fef3f3 100%)',
      padding: 20,
    }}>
      <Card style={{ maxWidth: 480, textAlign: 'center', padding: '48px 40px' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🚫</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>
          Accès non autorisé
        </h1>
        <p style={{ color: '#6b6b6b', fontSize: 14, marginBottom: 32 }}>
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            ← Retour
          </Button>
          <Button onClick={() => navigate('/dashboard')}>
            Tableau de bord
          </Button>
        </div>
      </Card>
    </div>
  );
}
