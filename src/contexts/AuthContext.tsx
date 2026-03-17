import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { User } from '../services/auth.service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData?: User) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Parse token strictly to establish initial state without fetching to avoid delay
  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();
      
      if (token) {
        setIsAuthenticated(true);
        // Optimistically set user from localStorage if available
        const localUser = authService.getUser();
        if (localUser) {
          setUser(localUser);
        }
        
        // Fetch fresh user data in background
        try {
          await fetchUser();
        } catch (error) {
          // Handled inside fetchUser (which triggers logout on 401)
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    };

    initAuth();

    // Listen for global auth events dispatched by auth.service.ts
    const handleLogin = () => {
      setIsAuthenticated(true);
      setUser(authService.getUser());
    };

    const handleLogout = () => {
      setIsAuthenticated(false);
      setUser(null);
    };

    window.addEventListener('auth-login', handleLogin);
    window.addEventListener('auth-logout', handleLogout);

    return () => {
      window.removeEventListener('auth-login', handleLogin);
      window.removeEventListener('auth-logout', handleLogout);
    };
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to fetch user', error);
      logout();
    }
  };

  const login = (token: string, userData?: User) => {
    // Ensuring it's base64 encoded by auth.service later, but store it
    localStorage.setItem('auth_token', token);
    if (userData) {
       localStorage.setItem('auth_user', JSON.stringify(userData));
       setUser(userData);
    }
    setIsAuthenticated(true);
    window.dispatchEvent(new Event('auth-login'));
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setIsAuthenticated(false);
    setUser(null);
    window.dispatchEvent(new Event('auth-logout'));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
