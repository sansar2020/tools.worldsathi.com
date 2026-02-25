import { useState, useEffect } from 'react';

interface AdminAuthState {
  isAuthenticated: boolean;
  adminEmail: string | null;
}

const ADMIN_SESSION_KEY = 'admin_session';
const ADMIN_CREDENTIALS = {
  email: 'mamamadhur@gmail.com',
  password: 'Admin@1988!!'
};

export function useAdminAuth() {
  const [authState, setAuthState] = useState<AdminAuthState>({
    isAuthenticated: false,
    adminEmail: null
  });

  // Check for existing session on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem(ADMIN_SESSION_KEY);
    if (storedEmail) {
      setAuthState({
        isAuthenticated: true,
        adminEmail: storedEmail
      });
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem(ADMIN_SESSION_KEY, email);
      setAuthState({
        isAuthenticated: true,
        adminEmail: email
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthState({
      isAuthenticated: false,
      adminEmail: null
    });
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    adminEmail: authState.adminEmail,
    login,
    logout
  };
}
