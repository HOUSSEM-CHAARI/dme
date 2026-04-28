import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { authAPI } from '../api';

// Mock the API module
jest.mock('../api', () => ({
  authAPI: {
    login: jest.fn(),
    signup: jest.fn(),
  },
}));

// Helper component to test useAuth
function TestConsumer({ action }) {
  const { user, error, login, signup, logout } = useAuth();
  return (
    <div>
      <div data-testid="user">{user ? JSON.stringify(user) : 'null'}</div>
      <div data-testid="error">{error || ''}</div>
      <button onClick={() => login('test@test.com', 'pass123')} data-testid="login">Login</button>
      <button onClick={() => signup({ email: 'new@test.com', password: 'pass123', role: 'patient', first_name: 'New', last_name: 'User' })} data-testid="signup">Signup</button>
      <button onClick={logout} data-testid="logout">Logout</button>
    </div>
  );
}

function renderWithAuth() {
  return render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('starts with no user', () => {
    renderWithAuth();
    expect(screen.getByTestId('user').textContent).toBe('null');
  });

  it('sets user after successful login', async () => {
    const mockUser = { id: 1, email: 'test@test.com', role: 'doctor', name: 'Dr. Test' };
    authAPI.login.mockResolvedValue({ data: { access_token: 'jwt-token', user: mockUser } });

    renderWithAuth();
    await act(async () => {
      await userEvent.click(screen.getByTestId('login'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toContain('doctor');
    });
    expect(localStorage.getItem('dme_token')).toBe('jwt-token');
  });

  it('sets error on failed login', async () => {
    authAPI.login.mockRejectedValue({
      response: { data: { message: 'Email ou mot de passe incorrect' } },
    });

    renderWithAuth();
    await act(async () => {
      try { await userEvent.click(screen.getByTestId('login')); } catch {}
    });

    await waitFor(() => {
      expect(screen.getByTestId('error').textContent).toBe('Email ou mot de passe incorrect');
    });
  });

  it('clears user and localStorage on logout', async () => {
    const mockUser = { id: 1, email: 'test@test.com', role: 'patient', name: 'Test' };
    authAPI.login.mockResolvedValue({ data: { access_token: 'token', user: mockUser } });

    renderWithAuth();
    await act(async () => { await userEvent.click(screen.getByTestId('login')); });
    await waitFor(() => expect(screen.getByTestId('user').textContent).not.toBe('null'));

    await act(async () => { await userEvent.click(screen.getByTestId('logout')); });
    expect(screen.getByTestId('user').textContent).toBe('null');
    expect(localStorage.getItem('dme_token')).toBeNull();
  });

  it('rehydrates user from localStorage on mount', () => {
    const savedUser = { id: 1, email: 'saved@test.com', role: 'staff' };
    localStorage.setItem('dme_token', 'existing-token');
    localStorage.setItem('dme_user', JSON.stringify(savedUser));

    renderWithAuth();
    expect(screen.getByTestId('user').textContent).toContain('staff');
  });

  it('handles corrupt localStorage gracefully', () => {
    localStorage.setItem('dme_token', 'some-token');
    localStorage.setItem('dme_user', 'invalid-json{{{');

    renderWithAuth();
    expect(screen.getByTestId('user').textContent).toBe('null');
    expect(localStorage.getItem('dme_token')).toBeNull();
  });

  it('sets user after successful signup', async () => {
    const mockUser = { id: 2, email: 'new@test.com', role: 'patient', name: 'New User' };
    authAPI.signup.mockResolvedValue({ data: { access_token: 'signup-token', user: mockUser } });

    renderWithAuth();
    await act(async () => { await userEvent.click(screen.getByTestId('signup')); });

    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toContain('patient');
    });
    expect(localStorage.getItem('dme_token')).toBe('signup-token');
  });
});
