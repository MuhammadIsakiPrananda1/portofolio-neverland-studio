import { useState, useEffect } from 'react';
import { authService, User } from '@/services/auth.service';

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    const checkAuth = () => {
      const token = authService.getToken();
      const userData = authService.getUser();
      
      setIsAuthenticated(!!token);
      setUser(userData);
      setIsLoading(false);
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
