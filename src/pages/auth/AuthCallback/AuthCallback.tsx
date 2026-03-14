import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Routes } from '@config/constants';

/**
 * Auth Callback — redirects to dashboard after login.
 * OAuth via Supabase has been removed; this page now just redirects.
 */
export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(Routes.DASHBOARD, { replace: true });
    }, 500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Redirecting...
        </h2>
        <p className="text-gray-400">
          Please wait while we redirect you
        </p>
      </div>
    </div>
  );
}

