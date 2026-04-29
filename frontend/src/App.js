import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import { LoginPage, SignupPage } from './pages/auth';
import { DoctorDashboard, PatientListPage, PatientDossierPage, ReportsPage, CreatePatientPage } from './pages/doctor';
import { PatientDashboard, PatientDossierView } from './pages/patient';
import { StaffDashboard } from './pages/staff';
import { ProfilePage } from './pages/profile';
import { NotFoundPage, NotAuthorizedPage } from './pages/errors';
import { LandingPage } from './pages/landing';
import { Spinner } from './components/ui';

// ── Route guard ─────────────────────────────────────────────
function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spinner size={48} />
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/not-authorized" replace />;
  return children;
}

// ── Wrapper for PatientDossierPage (reads :id from URL) ─────
function PatientDossierWrapper() {
  const { id } = useParams();
  const { user } = useAuth();
  return <PatientDossierPage patientId={Number(id)} role={user?.role} />;
}

// ── Role-based dashboard redirect ───────────────────────────
function DashboardRouter() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'doctor') return <DoctorDashboard />;
  if (user.role === 'patient') return <PatientDashboard />;
  if (user.role === 'staff') return <StaffDashboard />;
  return <Navigate to="/login" replace />;
}

// ── Public-only route (redirect if logged in) ───────────────
function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

// ── Landing page redirect (public homepage) ─────────────────
function LandingOrDashboard() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return <LandingPage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingOrDashboard />} />

          {/* Public Auth */}
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

          {/* All authenticated users */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

          {/* Doctor & Staff */}
          <Route path="/patients" element={<ProtectedRoute roles={['doctor','staff']}><PatientListPage /></ProtectedRoute>} />
          <Route path="/patients/new" element={<ProtectedRoute roles={['doctor','staff']}><CreatePatientPage /></ProtectedRoute>} />
          <Route path="/patients/:id" element={<ProtectedRoute roles={['doctor','staff']}><PatientDossierWrapper /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute roles={['doctor','staff']}><ReportsPage /></ProtectedRoute>} />

          {/* Patient only */}
          <Route path="/my-records" element={<ProtectedRoute roles={['patient']}><PatientDossierView /></ProtectedRoute>} />
          <Route path="/my-prescriptions" element={<ProtectedRoute roles={['patient']}><PatientDossierView /></ProtectedRoute>} />
          <Route path="/my-analyses" element={<ProtectedRoute roles={['patient']}><PatientDossierView /></ProtectedRoute>} />
          <Route path="/my-documents" element={<ProtectedRoute roles={['patient']}><PatientDossierView /></ProtectedRoute>} />

          {/* Error pages */}
          <Route path="/not-authorized" element={<NotAuthorizedPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />

          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
