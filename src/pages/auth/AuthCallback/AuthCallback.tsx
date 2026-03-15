import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertTriangle } from 'lucide-react';
import { authService } from '@/services/auth.service';

/**
 * Auth Callback — handles OAuth redirect from backend.
 * Backend redirects here with ?token=xxx (success) or ?error=xxx (failure).
 * After saving token, fetch user data then redirect ke halaman utama.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (error) {
      const msg = decodeURIComponent(error);
      if (msg === 'google_not_configured') {
        setErrorMsg('Google OAuth belum dikonfigurasi. Silakan hubungi administrator.');
      } else if (msg === 'github_not_configured') {
        setErrorMsg('GitHub OAuth belum dikonfigurasi. Silakan hubungi administrator.');
      } else {
        setErrorMsg(msg);
      }
      setTimeout(() => navigate('/', { replace: true }), 3000);
      return;
    }

    if (token) {
      // Simpan token ke localStorage
      localStorage.setItem('auth_token', token);

      // Fetch user data dari server supaya Navbar langsung update
      authService.getCurrentUser()
        .then(() => {
          window.dispatchEvent(new Event('auth-login'));
          navigate('/', { replace: true });
        })
        .catch(() => {
          // Tetap redirect ke home meski gagal fetch user
          window.dispatchEvent(new Event('auth-login'));
          navigate('/', { replace: true });
        });
      return;
    }

    // Tidak ada token maupun error — redirect ke home
    navigate('/', { replace: true });
  }, [navigate]);

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

