import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Github,
  Chrome,
  Sparkles,
  KeyRound,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Fingerprint,
  Facebook,
  Twitter
} from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';

type AuthView = 'login' | 'register' | 'reset';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ========== SECURITY UTILITIES ==========

function getPasswordStrength(password: string): { score: number; label: string; color: string; tips: string[] } {
  let score = 0;
  const tips: string[] = [];

  if (password.length >= 8) score++; else tips.push('At least 8 characters');
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++; else tips.push('Mix upper & lowercase');
  if (/\d/.test(password)) score++; else tips.push('Add numbers');
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++; else tips.push('Add special characters');

  if (score <= 1) return { score, label: 'Weak', color: 'red', tips };
  if (score <= 2) return { score, label: 'Fair', color: 'amber', tips };
  if (score <= 3) return { score, label: 'Good', color: 'cyan', tips };
  if (score <= 4) return { score, label: 'Strong', color: 'sky', tips };
  return { score, label: 'Very Strong', color: 'sky', tips: [] };
}

// ========== PASSWORD STRENGTH BAR ==========
function PasswordStrengthBar({ password }: { password: string }) {
  if (!password) return null;
  const { score, label, color, tips } = getPasswordStrength(password);
  const percentage = (score / 5) * 100;

  const barColorMap: Record<string, string> = {
    red: 'from-red-500 to-red-400',
    amber: 'from-amber-500 to-amber-400',
    cyan: 'from-secondary to-primary',
    sky: 'from-primary to-secondary',
  };

  const textColorMap: Record<string, string> = {
    red: 'text-red-400',
    amber: 'text-amber-400',
    cyan: 'text-secondary',
    sky: 'text-primary',
  };

  const iconMap: Record<string, typeof ShieldAlert> = {
    red: ShieldAlert,
    amber: ShieldAlert,
    cyan: Shield,
    sky: ShieldCheck,
  };

  const Icon = iconMap[color];

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${barColorMap[color]}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className={`flex items-center gap-1 ${textColorMap[color]}`}>
          <Icon className="w-3 h-3" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
        </div>
      </div>
      {tips.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tips.map((tip, i) => (
            <span key={i} className="text-[10px] text-gray-500 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
              {tip}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ========== RATE LIMIT WARNING ==========
function RateLimitWarning({ attemptsLeft, cooldownSeconds }: { attemptsLeft: number; cooldownSeconds: number }) {
  const [timeLeft, setTimeLeft] = useState(cooldownSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (cooldownSeconds > 0 && timeLeft > 0) {
    return (
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20"
      >
        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-xs font-semibold text-red-400">Too many attempts</p>
          <p className="text-[10px] text-red-400/60">
            Please wait <span className="font-bold text-red-300">{timeLeft}s</span> before trying again
          </p>
        </div>
      </motion.div>
    );
  }

  if (attemptsLeft <= 2 && attemptsLeft > 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/20"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-[10px] text-amber-400">
          {attemptsLeft} attempt{attemptsLeft !== 1 ? 's' : ''} remaining before lockout
        </span>
      </motion.div>
    );
  }

  return null;
}

// ========== MAIN COMPONENT ==========
export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<AuthView>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const maxAttempts = 5;
  const formOpenTime = useRef(Date.now());
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '', terms: false });
  const [resetForm, setResetForm] = useState({ email: '' });

  // Get auth context
  const { } = useAuth();

  useEffect(() => { formOpenTime.current = Date.now(); }, [isOpen, view]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = originalOverflow;
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const isRateLimited = cooldown > 0;

  // Handle Google OAuth Sign In — not available (OAuth removed)
  const handleGoogleSignIn = async () => {
    setError('Google login tidak tersedia. Silakan gunakan email/password.');
  };

  // Handle GitHub OAuth Sign In — not available (OAuth removed)
  const handleGithubSignIn = async () => {
    setError('GitHub login tidak tersedia. Silakan gunakan email/password.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Security checks
    if (honeypot) return;
    if (Date.now() - formOpenTime.current < 500) return;
    if (view === 'login' && isRateLimited) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (view === 'login') {
        // Login
        const response = await authService.login({
          email: loginForm.email,
          password: loginForm.password,
          remember: loginForm.remember,
        });

        setSuccess(response.message || 'Login successful!');

        // Reset attempts on successful login
        setLoginAttempts(0);

        // Close modal after successful login
        setTimeout(() => {
          handleClose();
        }, 1000);

      } else if (view === 'register') {
        // Register
        if (registerForm.password !== registerForm.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        if (!registerForm.terms) {
          setError('Please accept the terms and conditions');
          setLoading(false);
          return;
        }

        const response = await authService.register({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
        });

        setSuccess(response.message || 'Registration successful!');

        // Close modal after successful registration
        setTimeout(() => {
          handleClose();
        }, 1000);

      } else if (view === 'reset') {
        // Password reset request
        const response = await authService.forgotPassword(resetForm.email);

        setSuccess(response.message || 'Password reset link sent!');
        setResetSent(true);
      }
    } catch (err: unknown) {
      // Handle error messages
      const error = err as { response?: { data?: { message?: string; errors?: Record<string, unknown> } }; message?: string };
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0];
        setError(Array.isArray(firstError) ? firstError[0] : String(firstError));
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('An error occurred. Please try again.');
      }

      // Increment login attempts on failed login
      if (view === 'login') {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        if (newAttempts >= maxAttempts) {
          setCooldown(30);
          const cooldownTimer = setInterval(() => {
            setCooldown((prev) => {
              if (prev <= 1) {
                clearInterval(cooldownTimer);
                setLoginAttempts(0);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const switchView = (newView: AuthView) => {
    setView(newView);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setResetSent(false);
    setError('');
    setSuccess('');
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setView('login');
      setShowPassword(false);
      setShowConfirmPassword(false);
      setResetSent(false);
      setLoading(false);
      setHoneypot('');
      setError('');
      setSuccess('');
      setLoginForm({ email: '', password: '', remember: false });
      setRegisterForm({ name: '', email: '', password: '', confirmPassword: '', terms: false });
      setResetForm({ email: '' });
    }, 300);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? 300 : -300, opacity: 0 }),
  };

  const viewDirection = view === 'login' ? 0 : view === 'register' ? 1 : -1;

  // Shared input classes using site colors
  const inputBase = 'w-full py-3 rounded-sm bg-white/[0.02] border border-white/5 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 text-sm font-mono';
  const inputFocusLogin = 'focus:border-red-500/30 focus:bg-white/[0.05]';
  const inputFocusRegister = 'focus:border-red-500/30 focus:bg-white/[0.05]';
  const inputFocusReset = 'focus:border-red-500/30 focus:bg-white/[0.05]';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md mx-4 z-10 max-h-[90vh] overflow-y-auto scrollbar-hide font-sans"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a]">
              {/* Gradient Top Accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-red-500/50" />

              {/* Decorative Glow - Subtle */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 p-2 rounded-sm bg-white/5 border border-white/5 text-gray-400 hover:text-red-400 hover:bg-white/10 transition-all duration-200 hover:border-red-500/30"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="relative p-8">
                {/* Honeypot */}
                <div className="absolute" style={{ left: '-9999px', position: 'absolute' }} aria-hidden="true">
                  <label htmlFor="auth_website_url">Website</label>
                  <input type="text" id="auth_website_url" name="website_url" tabIndex={-1} autoComplete="off"
                    value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </div>

                <AnimatePresence mode="wait" custom={viewDirection}>

                  {/* ==================== LOGIN VIEW ==================== */}
                  {view === 'login' && (
                    <motion.div key="login" custom={viewDirection} variants={slideVariants}
                      initial="enter" animate="center" exit="exit"
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {/* Header */}
                      <div className="text-center mb-8">
                        <div className="inline-flex p-3 rounded-sm bg-red-500/5 border border-red-500/10 mb-4">
                          <Shield className="w-7 h-7 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Welcome Back</h2>
                        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Sign in to your Neverland Studio account</p>
                      </div>

                      {/* Rate Limit */}
                      <RateLimitWarning attemptsLeft={maxAttempts - loginAttempts} cooldownSeconds={cooldown} />

                      {/* Social Login */}
                      <div className="grid grid-cols-4 gap-2 mb-6 mt-4">
                        <button 
                          type="button" 
                          onClick={handleGoogleSignIn}
                          disabled={loading}
                          title="Continue with Google" 
                          className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-sm bg-white/[0.02] border border-white/5 text-gray-300 text-xs font-medium hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Chrome className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          <span>Google</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={handleGithubSignIn}
                          disabled={loading}
                          title="Continue with GitHub" 
                          className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-sm bg-white/[0.02] border border-white/5 text-gray-300 text-xs font-medium hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          <span>GitHub</span>
                        </button>
                        <button 
                          type="button" 
                          disabled 
                          title="Facebook - Coming Soon" 
                          className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-sm bg-white/[0.02] border border-white/5 text-gray-300 text-xs font-medium opacity-40 cursor-not-allowed"
                        >
                          <Facebook className="w-4 h-4" />
                          <span>Soon</span>
                        </button>
                        <button 
                          type="button" 
                          disabled 
                          title="Twitter - Coming Soon" 
                          className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-sm bg-white/[0.02] border border-white/5 text-gray-300 text-xs font-medium opacity-40 cursor-not-allowed"
                        >
                          <Twitter className="w-4 h-4" />
                          <span>Soon</span>
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold">or</span>
                        <div className="flex-1 h-px bg-white/5" />
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Error Message */}
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20"
                          >
                            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-400 flex-1">{error}</p>
                          </motion.div>
                        )}

                        {/* Success Message */}
                        {success && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-start gap-3 p-3.5 rounded-xl bg-green-500/10 border border-green-500/20"
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-green-400 flex-1">{success}</p>
                          </motion.div>
                        )}

                        <div>
                          <label className="block text-xs font-bold font-mono text-gray-300 mb-2 uppercase tracking-widest">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input type="email" placeholder="Enter your email" required
                              value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                              className={`${inputBase} ${inputFocusLogin} pl-11 pr-4`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold font-mono text-gray-300 mb-2 uppercase tracking-widest">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" required
                              value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                              className={`${inputBase} ${inputFocusLogin} pl-11 pr-12`}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative">
                              <input type="checkbox" checked={loginForm.remember}
                                onChange={(e) => setLoginForm({ ...loginForm, remember: e.target.checked })}
                                className="sr-only peer" />
                              <div className="w-4 h-4 rounded-sm border border-white/10 bg-white/5 peer-checked:bg-red-500 peer-checked:border-red-500 transition-all duration-200 flex items-center justify-center">
                                {loginForm.remember && <CheckCircle2 className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                            <span className="text-xs font-mono text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-widest">Remember me</span>
                          </label>
                          <button type="button" onClick={() => switchView('reset')}
                            className="relative text-[10px] font-mono uppercase tracking-widest text-red-500 hover:text-red-400 font-bold transition-colors group">
                            Forgot password?
                            <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-red-500 group-hover:w-full transition-all duration-300" />
                          </button>
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={loading || isRateLimited}
                          className="w-full py-3.5 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold font-mono text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                            <><Shield className="w-4 h-4" /> Sign In Securely</>
                          )}
                        </button>
                      </form>

                      {/* Security Badge */}
                      <div className="flex items-center justify-center gap-1.5 mt-4 text-[10px] text-gray-500">
                        <Fingerprint className="w-3 h-3" />
                        <span>Protected by end-to-end encryption</span>
                      </div>

                      {/* Footer */}
                      <p className="text-center text-[10px] font-mono uppercase tracking-widest text-gray-400 mt-5">
                        Don't have an account?{' '}
                        <button onClick={() => switchView('register')}
                          className="relative text-red-500 hover:text-red-400 font-bold transition-colors group ml-1">
                          Create Account
                          <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-red-500 group-hover:w-full transition-all duration-300" />
                        </button>
                      </p>
                    </motion.div>
                  )}

                  {/* ==================== REGISTER VIEW ==================== */}
                  {view === 'register' && (
                    <motion.div key="register" custom={viewDirection} variants={slideVariants}
                      initial="enter" animate="center" exit="exit"
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {/* Header */}
                      <div className="text-center mb-8">
                        <div className="inline-flex p-3 rounded-sm bg-red-500/5 border border-red-500/10 mb-4">
                          <Sparkles className="w-7 h-7 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Create Account</h2>
                        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Join Neverland Studio today</p>
                      </div>

                      {/* Social Login */}
                      <div className="grid grid-cols-4 gap-2 mb-6">
                        <button 
                          type="button" 
                          onClick={handleGoogleSignIn}
                          disabled={loading}
                          title="Continue with Google" 
                          className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-sm bg-white/[0.02] border border-white/5 text-gray-300 text-xs font-medium hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Chrome className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          <span>Google</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={handleGithubSignIn}
                          disabled={loading}
                          title="Continue with GitHub" 
                          className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-sm bg-white/[0.02] border border-white/5 text-gray-300 text-xs font-medium hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          <span>GitHub</span>
                        </button>
                        <button 
                          type="button" 
                          disabled 
                          title="Facebook - Coming Soon" 
                          className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-sm bg-white/[0.02] border border-white/5 text-gray-300 text-xs font-medium opacity-40 cursor-not-allowed"
                        >
                          <Facebook className="w-4 h-4" />
                          <span>Soon</span>
                        </button>
                        <button 
                          type="button" 
                          disabled 
                          title="Twitter - Coming Soon" 
                          className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-sm bg-white/[0.02] border border-white/5 text-gray-300 text-xs font-medium opacity-40 cursor-not-allowed"
                        >
                          <Twitter className="w-4 h-4" />
                          <span>Soon</span>
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold">or</span>
                        <div className="flex-1 h-px bg-white/5" />
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Error Message */}
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-start gap-3 p-3.5 rounded-sm bg-red-500/10 border border-red-500/20"
                          >
                            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-xs font-mono text-red-400 flex-1">{error}</p>
                          </motion.div>
                        )}

                        {/* Success Message */}
                        {success && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-start gap-3 p-3.5 rounded-sm bg-green-500/10 border border-green-500/20"
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs font-mono text-green-400 flex-1">{success}</p>
                          </motion.div>
                        )}

                        <div>
                          <label className="block text-xs font-bold font-mono text-gray-300 mb-2 uppercase tracking-widest">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input type="text" placeholder="Enter your full name" required
                              value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                              className={`${inputBase} ${inputFocusRegister} pl-11 pr-4`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold font-mono text-gray-300 mb-2 uppercase tracking-widest">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input type="email" placeholder="Enter your email" required
                              value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                              className={`${inputBase} ${inputFocusRegister} pl-11 pr-4`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold font-mono text-gray-300 mb-2 uppercase tracking-widest">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" required minLength={8}
                              value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                              className={`${inputBase} ${inputFocusRegister} pl-11 pr-12`}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          <PasswordStrengthBar password={registerForm.password} />
                        </div>

                        <div>
                          <label className="block text-xs font-bold font-mono text-gray-300 mb-2 uppercase tracking-widest">Confirm Password</label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm your password" required
                              value={registerForm.confirmPassword}
                              onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                              className={`${inputBase} pl-11 pr-12 ${registerForm.confirmPassword && registerForm.confirmPassword !== registerForm.password
                                  ? 'border-red-500/50 focus:border-red-500/50'
                                  : registerForm.confirmPassword && registerForm.confirmPassword === registerForm.password
                                    ? 'border-red-500/30 focus:border-red-500/50'
                                    : inputFocusRegister
                                }`}
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          {registerForm.confirmPassword && registerForm.confirmPassword !== registerForm.password && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1 font-mono uppercase tracking-widest">
                              <AlertTriangle className="w-3 h-3" /> Passwords do not match
                            </motion.p>
                          )}
                          {registerForm.confirmPassword && registerForm.confirmPassword === registerForm.password && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              className="mt-1.5 text-[11px] text-red-500 flex items-center gap-1 font-mono">
                              <CheckCircle2 className="w-3 h-3" /> Passwords match
                            </motion.p>
                          )}
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-2.5 cursor-pointer group">
                          <div className="relative mt-0.5">
                            <input type="checkbox" checked={registerForm.terms}
                              onChange={(e) => setRegisterForm({ ...registerForm, terms: e.target.checked })}
                              className="sr-only peer" />
                            <div className="w-4 h-4 rounded-sm border border-white/10 bg-white/5 peer-checked:bg-red-500 peer-checked:border-red-500 transition-all duration-200 flex items-center justify-center">
                              {registerForm.terms && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                          <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                            I agree to the{' '}
                            <span className="text-red-500 hover:text-red-400 font-medium">Terms of Service</span>
                            {' '}and{' '}
                            <span className="text-red-500 hover:text-red-400 font-medium">Privacy Policy</span>
                          </span>
                        </label>

                        {/* Submit */}
                        <button type="submit"
                          disabled={loading || !registerForm.terms || registerForm.password !== registerForm.confirmPassword}
                          className="w-full py-3.5 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold font-mono text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                            <><Sparkles className="w-4 h-4" /> Create Secure Account</>
                          )}
                        </button>
                      </form>

                      {/* Security Badge */}
                      <div className="flex items-center justify-center gap-1.5 mt-4 text-[10px] text-gray-500">
                        <Fingerprint className="w-3 h-3" />
                        <span>Your data is encrypted and secure</span>
                      </div>

                      {/* Footer */}
                      <p className="text-center text-[10px] uppercase font-mono tracking-widest text-gray-400 mt-5">
                        Already have an account?{' '}
                        <button onClick={() => switchView('login')}
                          className="relative text-red-500 hover:text-red-400 font-bold transition-colors group ml-1">
                          Sign In
                          <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-red-500 group-hover:w-full transition-all duration-300" />
                        </button>
                      </p>
                    </motion.div>
                  )}

                  {/* ==================== RESET PASSWORD VIEW ==================== */}
                  {view === 'reset' && (
                    <motion.div key="reset" custom={viewDirection} variants={slideVariants}
                      initial="enter" animate="center" exit="exit"
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {/* Back Button */}
                      <button onClick={() => switchView('login')}
                        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                      </button>

                      {/* Header */}
                      <div className="text-center mb-8">
                        <div className="inline-flex p-3 rounded-sm bg-red-500/5 border border-red-500/10 mb-4">
                          <KeyRound className="w-7 h-7 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Reset Password</h2>
                        <p className="text-xs font-mono uppercase tracking-widest text-gray-400 max-w-xs mx-auto">
                          Enter your email address and we'll send you a secure link to reset your password
                        </p>
                      </div>

                      {resetSent ? (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm bg-red-500/10 border border-red-500/20 mb-4">
                            <CheckCircle2 className="w-8 h-8 text-red-500" />
                          </div>
                          <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">Email Sent!</h3>
                          <p className="text-xs font-mono text-gray-400 mb-6 max-w-sm mx-auto uppercase tracking-widest">
                            Check your inbox for a password reset link. It may take a few minutes to arrive.
                          </p>
                          <button onClick={() => switchView('login')}
                            className="relative text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors group">
                            Return to Sign In
                            <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-red-500 group-hover:w-full transition-all duration-300" />
                          </button>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                          {/* Error Message */}
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-start gap-3 p-3.5 rounded-sm bg-red-500/10 border border-red-500/20"
                            >
                              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                              <p className="text-xs font-mono text-red-400 flex-1">{error}</p>
                            </motion.div>
                          )}

                          <div>
                            <label className="block text-xs font-bold font-mono text-gray-300 mb-2 uppercase tracking-widest">Email Address</label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                              <input type="email" placeholder="Enter your email" required
                                value={resetForm.email} onChange={(e) => setResetForm({ email: e.target.value })}
                                className={`${inputBase} ${inputFocusReset} pl-11 pr-4`}
                              />
                            </div>
                          </div>

                          <button type="submit" disabled={loading}
                            className="w-full py-3.5 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold font-mono text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                              <><Mail className="w-4 h-4" /> Send Secure Reset Link</>
                            )}
                          </button>
                        </form>
                      )}

                      {/* Security Note */}
                      <div className="flex items-center justify-center gap-1.5 mt-6 text-[10px] text-gray-500">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Reset links expire after 15 minutes for security</span>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Bottom Gradient Accent */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-red-500/30" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
