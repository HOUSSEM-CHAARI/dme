import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dme_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle 401 globally — redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('dme_token');
      localStorage.removeItem('dme_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// ── Auth ──────────────────────────────────────────────
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (data) => api.post('/auth/signup', data),
  getMe: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
};

// ── Patients ──────────────────────────────────────────
export const patientsAPI = {
  getAll: (search) => api.get('/patients', { params: { search } }),
  getOne: (id) => api.get(`/patients/${id}`),
  getMe: () => api.get('/patients/me'),
  create: (data) => api.post('/patients', data),
  update: (id, data) => api.put(`/patients/${id}`, data),

  getRecords: (id) => api.get(`/patients/${id}/records`),
  addRecord: (id, data) => api.post(`/patients/${id}/records`, data),
  updateRecord: (patientId, recordId, data) =>
    api.put(`/patients/${patientId}/records/${recordId}`, data),

  getPrescriptions: (id) => api.get(`/patients/${id}/prescriptions`),
  addPrescription: (id, data) => api.post(`/patients/${id}/prescriptions`, data),
  updatePrescription: (patientId, prescriptionId, data) =>
    api.put(`/patients/${patientId}/prescriptions/${prescriptionId}`, data),

  getAnalyses: (id) => api.get(`/patients/${id}/analyses`),
  addAnalysis: (id, data) => api.post(`/patients/${id}/analyses`, data),

  getDocuments: (id) => api.get(`/patients/${id}/documents`),
  addDocument: (id, formData) => api.post(`/patients/${id}/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  downloadDocument: (patientId, documentId) => api.get(`/patients/${patientId}/documents/${documentId}/download`, { responseType: 'blob' }),
};

// ── Doctors ───────────────────────────────────────────
export const doctorsAPI = {
  getAll: () => api.get('/doctors'),
  getOne: (id) => api.get(`/doctors/${id}`),
  update: (id, data) => api.put(`/doctors/${id}`, data),
};

// ── Reports ───────────────────────────────────────────
export const reportsAPI = {
  getStats: () => api.get('/reports/stats'),
  getPatientReport: (id, type, startDate, endDate) =>
    api.get(`/reports/patient/${id}`, { params: { type, startDate, endDate } }),
};

export default api;
