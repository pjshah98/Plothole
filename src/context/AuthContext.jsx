import { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth';

const TOKEN_KEY = 'plothole_token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .me()
      .then((u) => {
        setUser(u);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (username, password) => {
    const result = await authApi.login(username, password);
    if (result.ok) {
      localStorage.setItem(TOKEN_KEY, result.token);
      setUser(result.user);
    }
    return result;
  };

  const signup = async (username, password) => {
    const result = await authApi.signup(username, password);
    if (result.ok) {
      localStorage.setItem(TOKEN_KEY, result.token);
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
