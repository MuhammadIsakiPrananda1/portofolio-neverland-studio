import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Bell,
  Eye,
  EyeOff,
  Settings as SettingsIcon,
  UserCircle,
  Key,
  Shield,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Camera,
  Loader2,
  Save,
  X,
} from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/atoms/Button';
import Input from '@components/atoms/Input';

// API base URL
const API_BASE = (import.meta.env.VITE_API_URL || '') + (import.meta.env.VITE_API_VERSION || '/api/v1');

function apiFetch(path: string, options?: RequestInit) {
  const token = localStorage.getItem('auth_token');
  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    },
  });
}

// LocalStorage keys
const STORAGE_KEYS = {
  PROFILE: 'settings_profile',
  PROFILE_PHOTO: 'settings_profile_photo',
  NOTIFICATIONS: 'settings_notifications',
  PRIVACY: 'settings_privacy',
  SECURITY: 'settings_security',
};

// Types
interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  securityAlerts: boolean;
  marketingUpdates: boolean;
}

interface PrivacySettings {
  profileVisibility: boolean;
  activityStatus: boolean;
  dataAnalytics: boolean;
  thirdPartySharing: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
}

interface ActiveSession {
  id: number;
  device: string;
  browser: string;
  os: string;
  ip_address: string;
  location: string;
  last_active: string;
  created_at: string;
  current: boolean;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Helper to load from localStorage
function loadFromStorage<T>(key: string, defaults: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return { ...defaults, ...JSON.parse(stored) };
  } catch { }
  return defaults;
}

// Helper to save to localStorage
function saveToStorage(key: string, data: any): void {
  localStorage.setItem(key, JSON.stringify(data));
}

const ToggleSwitch = ({ enabled, onToggle, color = 'bg-red-500' }: { enabled: boolean; onToggle: () => void; color?: string }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`relative inline-flex h-6 w-11 items-center rounded-sm transition-colors ${enabled ? color : 'bg-[#0B1120] border border-white/20'
      }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-sm bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
    />
  </button>
);

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Redirect to home if user logs out while on Settings
  useEffect(() => {
    const handleLogout = () => navigate('/');
    window.addEventListener('auth-logout', handleLogout);
    return () => window.removeEventListener('auth-logout', handleLogout);
  }, [navigate]);

  // Profile photo state - persisted in localStorage as base64
  const [profilePhoto, setProfilePhoto] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.PROFILE_PHOTO);
  });

  // Toast state
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Get user data from AuthContext (localStorage)
  const getAuthUser = useCallback(() => {
    try {
      const userData = localStorage.getItem('auth_user');
      if (userData) return JSON.parse(userData);
    } catch { }
    return null;
  }, []);

  // Profile Data - load from authenticated user + stored settings
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const authUser = (() => {
      try {
        const userData = localStorage.getItem('auth_user');
        if (userData) return JSON.parse(userData);
      } catch { }
      return null;
    })();

    const stored = loadFromStorage<Partial<ProfileData>>(STORAGE_KEYS.PROFILE, {});

    return {
      fullName: stored.fullName || authUser?.name || '',
      email: authUser?.email || stored.email || '',
      phone: stored.phone || '',
      company: stored.company || '',
      role: stored.role || '',
    };
  });

  // Original profile data for cancel
  const [originalProfileData, setOriginalProfileData] = useState<ProfileData>({ ...profileData });

  // Notification settings
  const [notifications, setNotifications] = useState<NotificationSettings>(() =>
    loadFromStorage(STORAGE_KEYS.NOTIFICATIONS, {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      securityAlerts: true,
      marketingUpdates: false,
    })
  );

  // Privacy settings
  const [privacy, setPrivacy] = useState<PrivacySettings>(() =>
    loadFromStorage(STORAGE_KEYS.PRIVACY, {
      profileVisibility: true,
      activityStatus: false,
      dataAnalytics: false,
      thirdPartySharing: false,
    })
  );

  // Security settings
  const [security, setSecurity] = useState<SecuritySettings>(() =>
    loadFromStorage(STORAGE_KEYS.SECURITY, {
      twoFactorEnabled: false,
      lastPasswordChange: new Date().toISOString(),
    })
  );

  // Password form
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Sessions — real-time from API
  const [sessions, setSessions] = useState<ActiveSession[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [showSessions, setShowSessions] = useState(false);

  const fetchSessions = useCallback(async () => {
    setSessionsLoading(true);
    try {
      const res = await apiFetch('/auth/sessions');
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions ?? []);
      }
    } catch {
      // ignore
    } finally {
      setSessionsLoading(false);
    }
  }, []);

  // Poll every 30 seconds when sessions panel is open
  useEffect(() => {
    if (!showSessions) return;
    fetchSessions();
    const interval = setInterval(fetchSessions, 30_000);
    return () => clearInterval(interval);
  }, [showSessions, fetchSessions]);

  // Delete account confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
  };

  // Tabs configuration
  const tabs = [
    { id: 'profile', label: 'Personal Info', icon: UserCircle },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Eye },
  ];

  // Profile handlers
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);

    // Simulate save delay
    setTimeout(() => {
      saveToStorage(STORAGE_KEYS.PROFILE, profileData);

      // Also update auth_user in localStorage if name changed
      const authUser = getAuthUser();
      if (authUser) {
        authUser.name = profileData.fullName;
        localStorage.setItem('auth_user', JSON.stringify(authUser));
      }

      setOriginalProfileData({ ...profileData });
      setIsSaving(false);
      showToast('success', 'Profile updated successfully!');
    }, 800);
  };

  const handleCancelProfile = () => {
    setProfileData({ ...originalProfileData });
    showToast('success', 'Changes discarded');
  };

  // Notification handlers
  const handleToggleNotification = (key: keyof NotificationSettings) => {
    setNotifications(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      saveToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
  };

  // Privacy handlers
  const handleTogglePrivacy = (key: keyof PrivacySettings) => {
    setPrivacy(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      saveToStorage(STORAGE_KEYS.PRIVACY, updated);
      return updated;
    });
  };

  // ── 2FA State ──────────────────────────────────────────────────────
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  // setup modal steps: 'idle' | 'qr' | 'confirm' | 'recovery' | 'disable'
  const [twoFactorModal, setTwoFactorModal] = useState<'idle'|'qr'|'confirm'|'recovery'|'disable'>('idle');
  const [twoFactorSetup, setTwoFactorSetup] = useState<{ secret: string; qr_code_url: string } | null>(null);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorCodeError, setTwoFactorCodeError] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

  // Fetch 2FA status on mount (only if authenticated)
  useEffect(() => {
    if (!localStorage.getItem('auth_token')) return;
    apiFetch('/auth/2fa/status').then(r => r.ok ? r.json() : null).then(data => {
      if (data) setTwoFactorEnabled(data.enabled);
    }).catch(() => {});
  }, []);

  const handleToggle2FA = async () => {
    if (twoFactorEnabled) {
      setTwoFactorCode('');
      setTwoFactorCodeError('');
      setTwoFactorModal('disable');
    } else {
      setTwoFactorLoading(true);
      try {
        const res = await apiFetch('/auth/2fa/setup', { method: 'POST' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Setup gagal');
        setTwoFactorSetup(data);
        setTwoFactorCode('');
        setTwoFactorCodeError('');
        setTwoFactorModal('qr');
      } catch (e: any) {
        showToast('error', e.message || 'Gagal memulai setup 2FA');
      } finally {
        setTwoFactorLoading(false);
      }
    }
  };

  const handleConfirm2FA = async () => {
    if (twoFactorCode.length !== 6) { setTwoFactorCodeError('Masukkan 6 digit kode.'); return; }
    setTwoFactorLoading(true);
    setTwoFactorCodeError('');
    try {
      const res = await apiFetch('/auth/2fa/confirm', { method: 'POST', body: JSON.stringify({ code: twoFactorCode }) });
      const data = await res.json();
      if (!res.ok) { setTwoFactorCodeError(data.message || 'Kode tidak valid.'); return; }
      setTwoFactorEnabled(true);
      setRecoveryCodes(data.recovery_codes || []);
      setTwoFactorModal('recovery');
      showToast('success', '2FA berhasil diaktifkan!');
    } catch {
      setTwoFactorCodeError('Gagal memverifikasi kode.');
    } finally {
      setTwoFactorLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!twoFactorCode) { setTwoFactorCodeError('Masukkan kode 2FA atau recovery code.'); return; }
    setTwoFactorLoading(true);
    setTwoFactorCodeError('');
    try {
      const res = await apiFetch('/auth/2fa/disable', { method: 'POST', body: JSON.stringify({ code: twoFactorCode }) });
      const data = await res.json();
      if (!res.ok) { setTwoFactorCodeError(data.message || 'Kode tidak valid.'); return; }
      setTwoFactorEnabled(false);
      setTwoFactorModal('idle');
      showToast('success', '2FA berhasil dinonaktifkan.');
    } catch {
      setTwoFactorCodeError('Gagal menonaktifkan 2FA.');
    } finally {
      setTwoFactorLoading(false);
    }
  };

  const handleChangePassword = () => {
    if (!passwordForm.currentPassword) {
      showToast('error', 'Please enter your current password');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      showToast('error', 'New password must be at least 8 characters');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('error', 'Passwords do not match');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      const updated = { ...security, lastPasswordChange: new Date().toISOString() };
      setSecurity(updated);
      saveToStorage(STORAGE_KEYS.SECURITY, updated);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      setIsSaving(false);
      showToast('success', 'Password updated successfully!');
    }, 800);
  };

  const handleRevokeSession = async (sessionId: number, deviceName: string) => {
    try {
      const res = await apiFetch(`/auth/sessions/${sessionId}`, { method: 'DELETE' });
      if (res.ok) {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        showToast('success', `Session "${deviceName}" has been revoked`);
      } else {
        showToast('error', 'Failed to revoke session');
      }
    } catch {
      showToast('error', 'Network error');
    }
  };

  const handleRevokeAllSessions = async () => {
    try {
      const res = await apiFetch('/auth/sessions', { method: 'DELETE' });
      if (res.ok) {
        setSessions(prev => prev.filter(s => s.current));
        showToast('success', 'All other sessions have been revoked');
      } else {
        showToast('error', 'Failed to revoke sessions');
      }
    } catch {
      showToast('error', 'Network error');
    }
  };

  // Delete account
  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'DELETE') {
      showToast('error', 'Please type DELETE to confirm');
      return;
    }

    // Clear all settings
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    window.dispatchEvent(new Event('auth-logout'));
    showToast('success', 'Account deleted successfully');
    setShowDeleteConfirm(false);
    setDeleteConfirmText('');
    // Navigation handled by auth-logout event listener
  };

  const getTimeSincePasswordChange = () => {
    const lastChange = new Date(security.lastPasswordChange);
    const now = new Date();
    const diffMs = now.getTime() - lastChange.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Changed today';
    if (diffDays === 1) return 'Changed yesterday';
    if (diffDays < 30) return `Changed ${diffDays} days ago`;
    const diffMonths = Math.floor(diffDays / 30);
    return `Changed ${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -50, x: '-50%' }}
              className={`fixed top-6 left-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-2xl border ${toast.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
                } backdrop-blur-xl`}
            >
              {toast.type === 'success' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{toast.message}</span>
              <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100">
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#0f172a] border border-red-500/20 mb-6 w-fit">
            <SettingsIcon className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 uppercase">Settings</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-mono font-black mb-4 uppercase tracking-tighter text-white">
            Account Settings
          </h1>

          <p className="text-sm font-mono text-gray-400 max-w-2xl mx-auto">
            Manage your account preferences and security settings
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:items-start">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-2 max-h-[calc(100vh-10rem)] overflow-visible">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 ${activeTab === tab.id
                        ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-[#0f172a] border border-transparent'
                        }`}
                    >
                      <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-red-500' : ''
                        }`} />
                      <span className="font-mono tracking-widest uppercase font-bold text-[10px]">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {/* Personal Information */}
                {activeTab === 'profile' && (
                  <>
                    <div className="rounded-sm p-6 bg-[#0f172a] border border-white/10">
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-mono font-bold uppercase tracking-tight text-white mb-2">
                            Personal Information
                          </h2>
                          <p className="text-xs font-mono text-gray-400">Update your personal details and contact information</p>
                        </div>
                        <div className="p-2 rounded-sm bg-red-500/10">
                          <UserCircle className="w-5 h-5 text-red-500" />
                        </div>
                      </div>

                      {/* Profile Picture */}
                      <div className="mb-6 pb-6 border-b border-white/10">
                        <label className="block font-mono text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Profile Picture</label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/gif"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            if (file.size > 5 * 1024 * 1024) {
                              showToast('error', 'File too large. Max 5MB');
                              return;
                            }
                            if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                              showToast('error', 'Only JPG, PNG, or GIF allowed');
                              return;
                            }
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const base64 = ev.target?.result as string;
                              setProfilePhoto(base64);
                              localStorage.setItem(STORAGE_KEYS.PROFILE_PHOTO, base64);
                              showToast('success', 'Profile photo updated!');
                            };
                            reader.readAsDataURL(file);
                            e.target.value = '';
                          }}
                        />
                        <div className="flex items-center gap-6">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-sm bg-red-500/10 flex items-center justify-center border border-red-500/20 overflow-hidden">
                              {profilePhoto ? (
                                <img src={profilePhoto} alt="Profile" loading="lazy" className="w-full h-full object-cover" />
                              ) : (
                                <UserCircle className="w-12 h-12 text-red-500" />
                              )}
                            </div>
                            <button
                              aria-label="Change profile picture"
                              onClick={() => fileInputRef.current?.click()}
                              className="absolute bottom-0 right-0 p-2 rounded-sm bg-red-500 hover:bg-red-600 transition-colors border border-red-500/50"
                            >
                              <Camera className="w-4 h-4 text-white" />
                            </button>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                Upload Photo
                              </Button>
                              {profilePhoto && (
                                <button
                                  onClick={() => {
                                    setProfilePhoto(null);
                                    localStorage.removeItem(STORAGE_KEYS.PROFILE_PHOTO);
                                    showToast('success', 'Profile photo removed');
                                  }}
                                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-colors"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 5MB</p>
                          </div>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input
                            label="Full Name"
                            name="fullName"
                            value={profileData.fullName}
                            onChange={handleProfileChange}
                          />
                          <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            disabled
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input
                            label="Phone Number"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            placeholder="Enter your phone number"
                          />
                          <Input
                            label="Company"
                            name="company"
                            value={profileData.company}
                            onChange={handleProfileChange}
                            placeholder="Enter your company"
                          />
                        </div>

                        <Input
                          label="Role/Position"
                          name="role"
                          value={profileData.role}
                          onChange={handleProfileChange}
                          placeholder="Enter your role or position"
                        />
                      </div>

                      <div className="mt-8 flex items-center justify-end gap-3">
                        <Button variant="outline" size="md" onClick={handleCancelProfile}>
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          size="md"
                          rightIcon={isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                        >
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <>
                    <div className="rounded-sm p-6 bg-[#0f172a] border border-white/10">
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-mono font-bold uppercase tracking-tight text-white mb-2">
                            Security Settings
                          </h2>
                          <p className="text-xs font-mono text-gray-400">Manage your password and authentication methods</p>
                        </div>
                        <div className="p-2 rounded-sm bg-red-500/10">
                          <Lock className="w-5 h-5 text-red-500" />
                        </div>
                      </div>

                      <div className="space-y-6">
                        {/* Change Password */}
                        <div className="p-5 rounded-sm bg-[#0B1120] border border-white/10">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-sm bg-red-500/10">
                                <Key className="w-5 h-5 text-red-500" />
                              </div>
                              <div>
                                <h3 className="text-sm font-mono tracking-widest uppercase font-bold text-white">Change Password</h3>
                                <p className="text-xs font-mono text-gray-400 mt-1">{getTimeSincePasswordChange()}</p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="font-mono tracking-widest uppercase text-[10px] rounded-sm"
                              onClick={() => setShowPasswordForm(!showPasswordForm)}
                            >
                              {showPasswordForm ? 'Cancel' : 'Update'}
                            </Button>
                          </div>

                          <AnimatePresence>
                            {showPasswordForm && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 space-y-4 pt-4 border-t border-white/10">
                                  {/* Current Password */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                                    <div className="relative">
                                      <input
                                        type={showPasswords.current ? 'text' : 'password'}
                                        value={passwordForm.currentPassword}
                                        onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/30 transition-all text-sm"
                                        placeholder="Enter current password"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                      >
                                        {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                      </button>
                                    </div>
                                  </div>

                                  {/* New Password */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                                    <div className="relative">
                                      <input
                                        type={showPasswords.new ? 'text' : 'password'}
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/30 transition-all text-sm"
                                        placeholder="Enter new password (min 8 characters)"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                      >
                                        {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                      </button>
                                    </div>
                                  </div>

                                  {/* Confirm Password */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                                    <div className="relative">
                                      <input
                                        type={showPasswords.confirm ? 'text' : 'password'}
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/30 transition-all text-sm"
                                        placeholder="Confirm new password"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                      >
                                        {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                      </button>
                                    </div>
                                  </div>

                                  <Button
                                    variant="primary"
                                    size="md"
                                    onClick={handleChangePassword}
                                    disabled={isSaving}
                                    className="w-full"
                                  >
                                    {isSaving ? (
                                      <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Updating...
                                      </>
                                    ) : 'Update Password'}
                                  </Button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <p className="text-xs text-gray-500 mt-2">
                            We recommend changing your password every 90 days for better security
                          </p>
                        </div>

                        {/* Two-Factor Authentication */}
                        <div className="p-5 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-accent/10">
                                <Smartphone className="w-5 h-5 text-accent" />
                              </div>
                              <div>
                                <h3 className="text-base font-semibold text-white">Two-Factor Authentication</h3>
                                <p className={`text-sm flex items-center gap-1.5 ${twoFactorEnabled ? 'text-accent' : 'text-gray-400'}`}>
                                  {twoFactorEnabled ? (
                                    <>
                                      <CheckCircle className="w-4 h-4" />
                                      Enabled
                                    </>
                                  ) : (
                                    'Disabled'
                                  )}
                                </p>
                              </div>
                            </div>
                            <ToggleSwitch
                              enabled={twoFactorEnabled}
                              onToggle={handleToggle2FA}
                              color="bg-accent"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Add an extra layer of security to your account using an authenticator app (Google Authenticator, Authy, etc.)
                          </p>
                        </div>

                        {/* 2FA Modal */}
                        <AnimatePresence>
                          {twoFactorModal !== 'idle' && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                              onClick={(e) => { if (e.target === e.currentTarget) setTwoFactorModal('idle'); }}
                            >
                              <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="bg-[#0f172a] border border-white/10 rounded-sm p-6 w-full max-w-md shadow-2xl"
                              >
                                {/* STEP 1: QR Code */}
                                {twoFactorModal === 'qr' && twoFactorSetup && (
                                  <>
                                    <div className="flex items-center justify-between mb-5">
                                      <h3 className="text-lg font-bold font-mono tracking-widest uppercase text-white">Setup 2FA</h3>
                                      <button onClick={() => setTwoFactorModal('idle')} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4">
                                      Scan QR code ini dengan aplikasi authenticator kamu (Google Authenticator, Authy, dll), lalu masukkan kode 6 digit yang muncul.
                                    </p>
                                    {/* QR Code via Google Charts API */}
                                    <div className="flex justify-center mb-4">
                                      <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(twoFactorSetup.qr_code_url)}`}
                                        alt="QR Code 2FA"
                                        className="w-48 h-48 rounded-sm border border-white/10"
                                      />
                                    </div>
                                    <p className="text-xs text-gray-500 text-center mb-1">Tidak bisa scan? Masukkan kode manual:</p>
                                    <p className="text-xs font-mono text-center bg-white/5 rounded p-2 tracking-widest mb-5 select-all text-white">{twoFactorSetup.secret}</p>
                                    <div className="mb-3">
                                      <label className="block text-sm font-medium text-gray-300 mb-1">Kode Verifikasi (6 digit)</label>
                                      <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        value={twoFactorCode}
                                        onChange={e => { setTwoFactorCode(e.target.value.replace(/\D/g,'')); setTwoFactorCodeError(''); }}
                                        placeholder="000000"
                                        className="w-full px-4 py-3 rounded bg-white/[0.04] border border-white/10 text-white text-center tracking-[0.5em] text-xl placeholder-gray-600 focus:outline-none focus:border-accent/40"
                                        onKeyDown={e => e.key === 'Enter' && handleConfirm2FA()}
                                      />
                                      {twoFactorCodeError && <p className="text-xs text-red-400 mt-1">{twoFactorCodeError}</p>}
                                    </div>
                                    <Button variant="primary" size="md" className="w-full" onClick={handleConfirm2FA} disabled={twoFactorLoading}>
                                      {twoFactorLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Memverifikasi...</> : 'Aktifkan 2FA'}
                                    </Button>
                                  </>
                                )}

                                {/* STEP 2: Recovery Codes */}
                                {twoFactorModal === 'recovery' && (
                                  <>
                                    <div className="flex items-center justify-between mb-5">
                                      <h3 className="text-lg font-bold font-mono tracking-widest uppercase text-white flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        2FA Aktif!
                                      </h3>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4">
                                      Simpan recovery codes ini di tempat yang aman. Setiap kode hanya bisa digunakan sekali jika kamu kehilangan akses ke authenticator.
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 mb-5">
                                      {recoveryCodes.map((code, i) => (
                                        <div key={i} className="font-mono text-sm text-white bg-white/5 rounded p-2 text-center tracking-wider select-all">
                                          {code}
                                        </div>
                                      ))}
                                    </div>
                                    <Button variant="primary" size="md" className="w-full" onClick={() => setTwoFactorModal('idle')}>
                                      Saya sudah menyimpan recovery codes
                                    </Button>
                                  </>
                                )}

                                {/* DISABLE 2FA */}
                                {twoFactorModal === 'disable' && (
                                  <>
                                    <div className="flex items-center justify-between mb-5">
                                      <h3 className="text-lg font-bold font-mono tracking-widest uppercase text-white">Nonaktifkan 2FA</h3>
                                      <button onClick={() => setTwoFactorModal('idle')} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4">
                                      Masukkan kode 6 digit dari aplikasi authenticator kamu, atau salah satu recovery code untuk menonaktifkan 2FA.
                                    </p>
                                    <div className="mb-3">
                                      <label className="block text-sm font-medium text-gray-300 mb-1">Kode 2FA / Recovery Code</label>
                                      <input
                                        type="text"
                                        value={twoFactorCode}
                                        onChange={e => { setTwoFactorCode(e.target.value.toUpperCase()); setTwoFactorCodeError(''); }}
                                        placeholder="000000 atau XXXXX-XXXXX"
                                        className="w-full px-4 py-3 rounded bg-white/[0.04] border border-white/10 text-white text-center tracking-widest placeholder-gray-600 focus:outline-none focus:border-red-400/40"
                                        onKeyDown={e => e.key === 'Enter' && handleDisable2FA()}
                                      />
                                      {twoFactorCodeError && <p className="text-xs text-red-400 mt-1">{twoFactorCodeError}</p>}
                                    </div>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="md" className="flex-1" onClick={() => setTwoFactorModal('idle')}>Batal</Button>
                                      <Button variant="primary" size="md" className="flex-1 bg-red-500 hover:bg-red-600 border-red-500" onClick={handleDisable2FA} disabled={twoFactorLoading}>
                                        {twoFactorLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Memproses...</> : 'Nonaktifkan'}
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Active Sessions */}
                        <div className="p-5 rounded-sm bg-[#0B1120] border border-white/10">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-sm bg-red-500/10">
                                <Shield className="w-5 h-5 text-red-500" />
                              </div>
                              <div>
                                <h3 className="text-sm font-mono tracking-widest uppercase font-bold text-white">Active Sessions</h3>
                                <p className="text-xs font-mono text-gray-400 mt-1">Manage where you're logged in</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {showSessions && sessions.filter(s => !s.current).length > 0 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="font-mono tracking-widest uppercase text-[10px] rounded-sm text-red-400 border-red-400/30 hover:bg-red-400/10"
                                  onClick={handleRevokeAllSessions}
                                >
                                  Revoke All
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="font-mono tracking-widest uppercase text-[10px] rounded-sm"
                                onClick={() => setShowSessions(!showSessions)}
                              >
                                {showSessions ? 'Hide' : 'View All'}
                              </Button>
                            </div>
                          </div>

                          <AnimatePresence>
                            {showSessions && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 space-y-3 pt-4 border-t border-white/10">
                                  {sessionsLoading && sessions.length === 0 ? (
                                    <div className="flex items-center justify-center py-6 text-gray-500">
                                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                      <span className="text-xs font-mono">Loading sessions…</span>
                                    </div>
                                  ) : sessions.length === 0 ? (
                                    <p className="text-xs text-gray-500 text-center py-4">No active sessions found.</p>
                                  ) : (
                                    sessions.map((session) => (
                                      <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-medium text-white flex items-center gap-2">
                                            {session.browser} on {session.os}
                                            {session.current && (
                                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold rounded bg-primary/20 text-primary">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                                Current
                                              </span>
                                            )}
                                          </p>
                                          <p className="text-xs text-gray-500 truncate">
                                            {session.device} · {session.ip_address} · {session.location}
                                          </p>
                                          <p className="text-xs text-gray-600 mt-0.5">
                                            Last active: {session.last_active}
                                          </p>
                                        </div>
                                        {!session.current && (
                                          <button
                                            onClick={() => handleRevokeSession(session.id, `${session.browser} on ${session.os}`)}
                                            className="ml-3 text-xs text-red-400 hover:text-red-300 font-medium transition-colors flex-shrink-0"
                                          >
                                            Revoke
                                          </button>
                                        )}
                                      </div>
                                    ))
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <p className="text-xs text-gray-500 mt-2">
                            Monitor and manage devices accessing your account · auto-refreshes every 30s
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <>
                    <div className="rounded-sm p-6 bg-[#0f172a] border border-white/10">
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-mono font-bold uppercase tracking-tight text-white mb-2">
                            Notification Preferences
                          </h2>
                          <p className="text-xs font-mono text-gray-400">Control how you receive notifications</p>
                        </div>
                        <div className="p-2 rounded-sm bg-red-500/10">
                          <Bell className="w-5 h-5 text-red-500" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        {([
                          { key: 'emailNotifications' as const, title: 'Email Notifications', description: 'Receive updates via email' },
                          { key: 'smsNotifications' as const, title: 'SMS Notifications', description: 'Get text messages for important alerts' },
                          { key: 'pushNotifications' as const, title: 'Push Notifications', description: 'Browser and mobile app notifications' },
                          { key: 'securityAlerts' as const, title: 'Security Alerts', description: 'Immediate alerts for security events' },
                          { key: 'marketingUpdates' as const, title: 'Marketing Updates', description: 'News, offers and product updates' },
                        ]).map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-4 rounded-sm bg-[#0B1120] border border-white/10">
                            <div>
                              <h3 className="text-sm font-mono tracking-widest uppercase font-bold text-white mb-1">{item.title}</h3>
                              <p className="text-xs font-mono text-gray-400">{item.description}</p>
                            </div>
                            <ToggleSwitch
                              enabled={notifications[item.key]}
                              onToggle={() => handleToggleNotification(item.key)}
                              color="bg-red-500"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 rounded-sm bg-[#0B1120] border border-white/10">
                        <p className="text-xs font-mono text-gray-400 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-red-500" />
                          Changes are saved automatically
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <>
                    <div className="rounded-xl p-6 bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-2">
                            Privacy Settings
                          </h2>
                          <p className="text-sm text-gray-400">Control your data and visibility preferences</p>
                        </div>
                        <div className="p-2 rounded-lg bg-secondary/10">
                          <Eye className="w-5 h-5 text-secondary" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        {([
                          { key: 'profileVisibility' as const, title: 'Profile Visibility', description: 'Make your profile visible to other users' },
                          { key: 'activityStatus' as const, title: 'Activity Status', description: 'Show when you were last active' },
                          { key: 'dataAnalytics' as const, title: 'Data Analytics', description: 'Share anonymous usage data to improve services' },
                          { key: 'thirdPartySharing' as const, title: 'Third-party Sharing', description: 'Allow data sharing with partners' },
                        ]).map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                            <div>
                              <h3 className="text-sm font-medium text-white mb-1">{item.title}</h3>
                              <p className="text-xs text-gray-400">{item.description}</p>
                            </div>
                            <ToggleSwitch
                              enabled={privacy[item.key]}
                              onToggle={() => handleTogglePrivacy(item.key)}
                              color="bg-secondary"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-xs text-gray-400 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-accent" />
                          Changes are saved automatically
                        </p>
                      </div>

                      {/* Danger Zone */}
                      <div className="mt-6 p-5 rounded-lg bg-red-500/5 border border-red-500/20">
                        <h3 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Danger Zone
                        </h3>
                        <p className="text-xs text-gray-400 mb-3">
                          Permanently delete your account and all associated data
                        </p>

                        {!showDeleteConfirm ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-400 border-red-400/30 hover:border-red-400/50 hover:bg-red-400/5"
                            onClick={() => setShowDeleteConfirm(true)}
                          >
                            Delete Account
                          </Button>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-3"
                          >
                            <p className="text-xs text-red-400 font-medium">
                              Type "DELETE" to confirm account deletion:
                            </p>
                            <input
                              type="text"
                              value={deleteConfirmText}
                              onChange={(e) => setDeleteConfirmText(e.target.value)}
                              className="w-full px-4 py-2 rounded-lg bg-white/[0.02] border border-red-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/40 text-sm"
                              placeholder='Type "DELETE"'
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={handleDeleteAccount}
                                className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors"
                              >
                                Confirm Delete
                              </button>
                              <button
                                onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); }}
                                className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm font-medium hover:bg-white/10 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
