import { useState, useEffect } from 'react';
import { authService, User } from '@/services/auth.service';

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = authService.getToken();
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Ada token — coba ambil user dari localStorage dulu
      const storedUser = authService.getUser();
      if (storedUser) {
        setIsAuthenticated(true);
        setUser(storedUser);
        setIsLoading(false);
        return;
      }

      // Token ada tapi user data belum ada (kasus OAuth callback)
      // Fetch dari server
      try {
        const freshUser = await authService.getCurrentUser();
        setIsAuthenticated(true);
        setUser(freshUser);
      } catch {
        // Token tidak valid — bersihkan
        authService.logout().catch(() => null);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen to auth events
    const handleAuthChange = () => {
      const token = authService.getToken();
      const userData = authService.getUser();
      setIsAuthenticated(!!token);
      setUser(userData);
    };

    window.addEventListener('auth-login', handleAuthChange);
    window.addEventListener('auth-logout', handleAuthChange);

    return () => {
      window.removeEventListener('auth-login', handleAuthChange);
      window.removeEventListener('auth-logout', handleAuthChange);
    };
  }, []);

  return { user, isAuthenticated, isLoading };
}

export default useAuthState;
