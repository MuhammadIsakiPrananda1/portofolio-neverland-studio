import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertTriangle } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Auth Callback — handles OAuth redirect from backend.
 * Backend redirects here with ?token=xxx (base64 encoded, success) or ?error=xxx (failure).
 * After saving token, fetch user data then redirect ke halaman utama.
 * 
 * FLOW:
 * 1. Parse URL params (token from backend)
 * 2. Validate token is base64
 * 3. Decode token using authService.handleOAuthCallback()
 * 4. Token disimpan, user data di-fetch
 * 5. Redirect ke home
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const encodedToken = params.get('token');
        const error = params.get('error');
        const provider = params.get('provider') || 'unknown';

        // ERROR dari OAuth provider
        if (error) {
          const msg = decodeURIComponent(error);
          console.error(`OAuth Error (${provider}):`, msg);
          setErrorMsg(msg);
          setTimeout(() => navigate('/', { replace: true }), 3000);
          return;
        }

        // TOKEN dari OAuth provider
        if (encodedToken) {
          try {
            // Decode & validate token menggunakan authService
            const user = await authService.handleOAuthCallback(encodedToken, provider);
            
            console.log(`✓ OAuth login successful via ${provider}`, user);
            
            // Redirect ke home setelah token & user tersimpan
            setTimeout(() => navigate('/', { replace: true }), 500);
            return;
          } catch (tokenError) {
            console.error('Token handling error:', tokenError);
            setErrorMsg('Token tidak valid. Silakan coba login ulang.');
            setTimeout(() => navigate('/', { replace: true }), 3000);
            return;
          }
        }

        // Tidak ada token maupun error — redirect ke home
        console.warn('No token or error in callback');
        navigate('/', { replace: true });
      } catch (err) {
        console.error('AuthCallback error:', err);
        setErrorMsg('Terjadi kesalahan. Silakan coba lagi.');
        setTimeout(() => navigate('/', { replace: true }), 3000);
      }
    };

    handleCallback();
  }, [navigate, login]);

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-bold text-white mb-2">Login Gagal</h2>
          <p className="text-gray-400 mb-4">{errorMsg}</p>
          <p className="text-sm text-gray-500">Mengalihkan ke halaman utama...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Sedang masuk...
        </h2>
        <p className="text-gray-400">
          Mohon tunggu sebentar
        </p>
      </div>
    </div>
  );
}

