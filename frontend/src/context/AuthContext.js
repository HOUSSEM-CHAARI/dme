import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('dme_token');
    const savedUser = localStorage.getItem('dme_user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('dme_token');
        localStorage.removeItem('dme_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const { data } = await authAPI.login(email, password);
      localStorage.setItem('dme_token', data.access_token);
      localStorage.setItem('dme_user', JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Erreur de connexion. Vérifiez vos identifiants.';
      setError(msg);
      throw new Error(msg);
    }
  }, []);

  const signup = useCallback(async (formData) => {
    setError(null);
    try {
      const { data } = await authAPI.signup(formData);
      localStorage.setItem('dme_token', data.access_token);
      localStorage.setItem('dme_user', JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (err) {
      const msg = err.response?.data?.message || 'Erreur lors de la création du compte.';
      setError(msg);
      throw new Error(msg);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('dme_token');
    localStorage.removeItem('dme_user');
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
