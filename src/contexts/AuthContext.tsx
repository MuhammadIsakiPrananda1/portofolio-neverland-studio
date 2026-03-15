import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '@/services/auth.service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          // Use stored user data immediately, then verify with server
          const storedUser = authService.getUser();
          if (storedUser) setUser(storedUser);
          try {
            const freshUser = await authService.getCurrentUser();
            setUser(freshUser);
          } catch {
            // Token invalid or expired — clear auth data
            authService.logout().catch(() => null);
            setUser(null);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const handleLogout = () => setUser(null);
    const handleLogin = async () => {
      const storedUser = authService.getUser();
      if (storedUser) {
        setUser(storedUser);
      } else if (authService.isAuthenticated()) {
        // OAuth callback: token sudah tersimpan tapi user data belum — fetch dari server
        try {
          const freshUser = await authService.getCurrentUser();
          setUser(freshUser);
        } catch {
          authService.logout().catch(() => null);
          setUser(null);
        }
      }
    };

    window.addEventListener('auth-logout', handleLogout);
    window.addEventListener('auth-login', handleLogin);
    return () => {
      window.removeEventListener('auth-logout', handleLogout);
      window.removeEventListener('auth-login', handleLogin);
    };
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setUser(response.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await authService.register({ name, email, password });
    setUser(response.user);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const freshUser = await authService.getCurrentUser();
      setUser(freshUser);
    } catch {
      await logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && authService.isAuthenticated(),
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;

