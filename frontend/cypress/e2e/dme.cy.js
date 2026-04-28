// cypress/e2e/dme.cy.js
// Run with: npx cypress run  or  npx cypress open

describe('DME - Authentication flows', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('shows login page at root', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
    cy.contains('Se connecter').should('be.visible');
    cy.contains('DME').should('be.visible');
  });

  it('shows validation error when submitting empty form', () => {
    cy.visit('/login');
    cy.get('button[type="submit"]').click();
    cy.contains('Veuillez remplir tous les champs').should('be.visible');
  });

  it('shows error on invalid credentials', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: { message: 'Email ou mot de passe incorrect' },
    }).as('loginFail');

    cy.visit('/login');
    cy.get('input[type="email"]').type('wrong@test.com');
    cy.get('input[type="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFail');
    cy.contains('Email ou mot de passe incorrect').should('be.visible');
  });

  it('redirects to dashboard after successful doctor login', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        access_token: 'mock-jwt-token',
        user: { id: 1, email: 'doctor@dme.fr', role: 'doctor', name: 'Dr. Martin Dupont' },
      },
    }).as('loginSuccess');

    cy.visit('/login');
    cy.get('input[type="email"]').type('doctor@dme.fr');
    cy.get('input[type="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginSuccess');
    cy.url().should('include', '/dashboard');
    cy.contains('Tableau de bord').should('be.visible');
  });

  it('redirects to dashboard after successful patient login', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        access_token: 'patient-jwt-token',
        user: { id: 2, email: 'patient@dme.fr', role: 'patient', name: 'Marie Dupont' },
      },
    }).as('patientLogin');

    cy.visit('/login');
    cy.get('input[type="email"]').type('patient@dme.fr');
    cy.get('input[type="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();

    cy.wait('@patientLogin');
    cy.url().should('include', '/dashboard');
    cy.contains('Mon espace santé').should('be.visible');
  });
});

describe('DME - Signup flow', () => {
  it('navigates to signup from login', () => {
    cy.visit('/login');
    cy.contains('Créer un compte').click();
    cy.url().should('include', '/signup');
  });

  it('completes patient signup step 1 and advances to step 2', () => {
    cy.visit('/signup');
    cy.get('input[name="role"][value="patient"]').click();
    cy.get('input[type="email"]').type('newpatient@test.com');
    cy.get('input[type="password"]').first().type('SecurePass123!');
    cy.get('input[type="password"]').last().type('SecurePass123!');
    cy.contains('Suivant').click();
    cy.contains('Informations personnelles').should('be.visible');
  });

  it('shows error if passwords do not match', () => {
    cy.visit('/signup');
    cy.get('input[name="role"][value="patient"]').click();
    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').first().type('Password123!');
    cy.get('input[type="password"]').last().type('DifferentPass!');
    cy.contains('Suivant').click();
    cy.contains('Les mots de passe ne correspondent pas').should('be.visible');
  });
});

describe('DME - Doctor workflows', () => {
  beforeEach(() => {
    // Authenticate as doctor
    localStorage.setItem('dme_token', 'doctor-token');
    localStorage.setItem('dme_user', JSON.stringify({ id: 1, name: 'Dr. Martin Dupont', role: 'doctor', email: 'doctor@dme.fr' }));

    cy.intercept('GET', '/api/reports/stats', { body: { total_patients: 12, total_records: 45, total_prescriptions: 38, total_analyses: 27 } }).as('stats');
    cy.intercept('GET', '/api/patients*', { body: [
      { id_patient: 1, first_name: 'Marie', last_name: 'Dupont', dob: '1968-05-12', phone_number: '+33612345678', blood_type: 'A+' },
      { id_patient: 2, first_name: 'Jean', last_name: 'Martin', dob: '1975-11-23', phone_number: '+33745678901', blood_type: 'O+' },
    ]}).as('patients');
  });

  it('displays dashboard stats', () => {
    cy.visit('/dashboard');
    cy.wait('@stats');
    cy.contains('12').should('be.visible');
    cy.contains('Total patients').should('be.visible');
  });

  it('shows patient list', () => {
    cy.visit('/patients');
    cy.wait('@patients');
    cy.contains('Marie Dupont').should('be.visible');
    cy.contains('Jean Martin').should('be.visible');
  });

  it('filters patients by search', () => {
    cy.visit('/patients');
    cy.wait('@patients');
    cy.get('input[placeholder*="Rechercher"]').type('Marie');
    cy.contains('Marie Dupont').should('be.visible');
  });

  it('navigates to patient dossier', () => {
    cy.intercept('GET', '/api/patients/1', { body: {
      id_patient: 1, first_name: 'Marie', last_name: 'Dupont',
      dob: '1968-05-12', blood_type: 'A+', allergies: 'Pénicilline',
      user: { id_user: 4, email: 'marie@dme.fr' },
    }}).as('patient');
    cy.intercept('GET', '/api/patients/1/records', { body: [] }).as('records');
    cy.intercept('GET', '/api/patients/1/prescriptions', { body: [] }).as('prescriptions');
    cy.intercept('GET', '/api/patients/1/analyses', { body: [] }).as('analyses');
    cy.intercept('GET', '/api/patients/1/documents', { body: [] }).as('documents');

    cy.visit('/patients/1');
    cy.wait('@patient');
    cy.contains('Marie Dupont').should('be.visible');
    cy.contains('Pénicilline').should('be.visible');
  });

  it('opens add prescription modal', () => {
    cy.intercept('GET', '/api/patients/1', { body: { id_patient: 1, first_name: 'Marie', last_name: 'Dupont', user: {} } }).as('patient');
    cy.intercept('GET', '/api/patients/1/*', { body: [] });

    cy.visit('/patients/1');
    cy.wait('@patient');
    cy.contains('+ Ordonnance').click();
    cy.contains('Nouvelle ordonnance').should('be.visible');
    cy.get('input[placeholder="Amlodipine 5mg"]').type('Metformine 500mg');
  });
});

describe('DME - Patient workflows', () => {
  beforeEach(() => {
    localStorage.setItem('dme_token', 'patient-token');
    localStorage.setItem('dme_user', JSON.stringify({ id: 4, name: 'Marie Dupont', role: 'patient', email: 'marie@dme.fr', patientId: 1 }));

    cy.intercept('GET', '/api/patients/me', { body: {
      id_patient: 1, first_name: 'Marie', last_name: 'Dupont',
      dob: '1968-05-12', blood_type: 'A+', phone_number: '+33612345678',
      prescriptions: [], analyses: [], documents: [], medical_records: [],
    }}).as('profile');
  });

  it('shows patient dashboard', () => {
    cy.visit('/dashboard');
    cy.wait('@profile');
    cy.contains('Mon espace santé').should('be.visible');
    cy.contains('Marie Dupont').should('be.visible');
  });

  it('cannot navigate to /patients (doctor-only route)', () => {
    cy.visit('/patients');
    cy.url().should('include', '/dashboard');
  });

  it('shows prescriptions in dossier', () => {
    cy.intercept('GET', '/api/patients/1/prescriptions', { body: [
      { id_prescription: 1, medication: 'Amlodipine 5mg', dosage: '1 comprimé', frequency: '1x/jour', duration: '30 jours', status: 'active', prescribed_on: '2024-05-13' },
    ]}).as('prescriptions');
    cy.intercept('GET', '/api/patients/1/*', { body: [] });

    cy.visit('/my-prescriptions');
    cy.wait('@profile');
    cy.contains('Amlodipine 5mg').should('be.visible');
    cy.contains('Active').should('be.visible');
  });
});

describe('DME - Navigation', () => {
  it('redirects to /login when not authenticated', () => {
    cy.clearLocalStorage();
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });

  it('redirects from /login to /dashboard when already authenticated', () => {
    localStorage.setItem('dme_token', 'token');
    localStorage.setItem('dme_user', JSON.stringify({ id: 1, role: 'doctor', name: 'Dr. Test' }));
    cy.visit('/login');
    cy.url().should('include', '/dashboard');
  });
});
