import { useState, useEffect, useCallback } from 'react';
import { patientsAPI, reportsAPI } from '../api';

// Generic fetch hook
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetcher();
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { refetch(); }, [refetch]);

  return { data, loading, error, refetch };
}

// Patients list
export function usePatients(search = '') {
  return useFetch(() => patientsAPI.getAll(search), [search]);
}

// Single patient dossier
export function usePatient(id) {
  return useFetch(() => patientsAPI.getOne(id), [id]);
}

// Patient's own profile
export function useMyPatientProfile() {
  return useFetch(() => patientsAPI.getMe(), []);
}

// Medical records
export function useMedicalRecords(patientId) {
  return useFetch(() => patientsAPI.getRecords(patientId), [patientId]);
}

// Prescriptions
export function usePrescriptions(patientId) {
  return useFetch(() => patientsAPI.getPrescriptions(patientId), [patientId]);
}

// Analyses
export function useAnalyses(patientId) {
  return useFetch(() => patientsAPI.getAnalyses(patientId), [patientId]);
}

// Documents
export function useDocuments(patientId) {
  return useFetch(() => patientsAPI.getDocuments(patientId), [patientId]);
}

// Dashboard stats
export function useDashboardStats() {
  return useFetch(() => reportsAPI.getStats(), []);
}

// Mutation hook for POST/PUT operations
export function useMutation(mutationFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const mutate = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const result = await mutationFn(...args);
      setSuccess(true);
      return result.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Une erreur est survenue';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, [mutationFn]);

  const reset = useCallback(() => { setError(null); setSuccess(false); }, []);

  return { mutate, loading, error, success, reset };
}
