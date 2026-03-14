import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Building,
  Phone,
  Sparkles,
} from 'lucide-react';

export default function DashboardSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const name = localStorage.getItem('dashboardUserName') || 'Admin Neverland';
    const email = localStorage.getItem('dashboardUserEmail') || 'admin@neverland.studio';
    const savedProfile = localStorage.getItem('dashboardProfile');

    let company = '';
    let phone = '';

    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        company = parsed.company || '';
        phone = parsed.phone || '';
      } catch { }
    }

    setProfileForm({ name, email, company, phone });
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    await new Promise(resolve => setTimeout(resolve, 800));

    localStorage.setItem('dashboardUserName', profileForm.name);
    localStorage.setItem('dashboardProfile', JSON.stringify({
      company: profileForm.company,
      phone: profileForm.phone,
    }));

    window.dispatchEvent(new Event('dashboardLoginChanged'));

    setSuccess('Profile updated successfully!');
    setIsSaving(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    if (passwordForm.password !== passwordForm.password_confirmation) {
      setError('Passwords do not match');
      setIsSaving(false);
      return;
    }

    if (passwordForm.password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsSaving(false);
      return;
    }

    if (passwordForm.current_password !== 'admin123') {
      setError('Current password is incorrect');
      setIsSaving(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    setSuccess('Password updated successfully!');
    setPasswordForm({
      current_password: '',
      password: '',
      password_confirmation: '',
    });
    setIsSaving(false);
  };

  // Shared input class
  const inputClass = "w-full pl-11 pr-4 py-3 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] focus:shadow-lg focus:shadow-red-500/5 transition-all duration-300 text-sm";
  const inputClassPassword = "w-full pl-11 pr-12 py-3 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] focus:shadow-lg focus:shadow-red-500/5 transition-all duration-300 text-sm";

  return (
    <div className="space-y-6">
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/10 rounded-sm sm:rounded-sm p-8 sm:p-10 overflow-hidden bg-[#0f172a] shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">Preferences</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">
                  Account{' '}
                </span>
                <span className="bg-gradient-to-r from-red-500 via-red-500 to-red-600 bg-clip-text text-transparent filter drop-shadow-lg">
                  Settings
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Manage your profile, security preferences, and dashboard configurations.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-sm bg-[#0f172a] border border-emerald-500/20 text-emerald-400 flex items-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm">{success}</span>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-sm bg-[#0f172a] border border-red-500/20 text-red-400 flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 rounded-sm bg-[#0f172a] border border-white/10 w-fit sm:w-auto overflow-x-auto no-scrollbar justify-center sm:justify-start">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 sm:flex-none px-6 py-2.5 rounded-sm text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'profile'
            ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-white shadow-lg shadow-red-500/10 border border-red-500/20'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
        >
          <User className="w-4 h-4" />
          Profile
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`flex-1 sm:flex-none px-6 py-2.5 rounded-sm text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'password'
            ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-white shadow-lg shadow-red-500/10 border border-red-500/20'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
        >
          <Lock className="w-4 h-4" />
          Password
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a] rounded-sm border border-white/10 p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
          <form onSubmit={handleUpdateProfile} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-400 transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={profileForm.email}
                  disabled
                  className="w-full pl-11 pr-4 py-3 rounded-sm bg-white/[0.01] border border-white/5 text-gray-500 cursor-not-allowed text-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                <div className="relative group">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-400 transition-colors" />
                  <input
                    type="text"
                    name="company"
                    value={profileForm.company}
                    onChange={handleProfileChange}
                    placeholder="Enter company name"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-400 transition-colors" />
                  <input
                    type="tel"
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                    placeholder="Enter phone number"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full group relative overflow-hidden py-3 px-6 rounded-sm bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm hover:from-red-500/90 hover:to-red-600/90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 border border-red-500/30"
            >
              <div className="relative z-10 flex items-center gap-2">
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
              </div>
            </button>
          </form>
        </motion.div>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a] rounded-sm border border-white/10 p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
          <form onSubmit={handleUpdatePassword} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-400 transition-colors" />
                <input
                  type={showPassword.current ? 'text' : 'password'}
                  name="current_password"
                  value={passwordForm.current_password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter current password"
                  className={inputClassPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-400 transition-colors" />
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  name="password"
                  value={passwordForm.password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter new password (min 8 characters)"
                  className={inputClassPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-400 transition-colors" />
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  name="password_confirmation"
                  value={passwordForm.password_confirmation}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Confirm new password"
                  className={inputClassPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full group relative overflow-hidden py-3 px-6 rounded-sm bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm hover:from-red-500/90 hover:to-red-600/90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 border border-red-500/30"
            >
              <div className="relative z-10 flex items-center gap-2">
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Update Password
                  </>
                )}
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
              </div>
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
