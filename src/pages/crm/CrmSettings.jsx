import React, { useState, useRef } from 'react';
import {
  User,
  Building2,
  Lock,
  Bell,
  Moon,
  Sun,
  Monitor,
  Settings as SettingsIcon,
  Save,
  ShieldCheck,
  Smartphone,
  Globe,
  Mail,
  Phone,
  CheckCircle2,
  KeyRound,
  LogOut,
  Camera,
  TrendingUp,
  Clock
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Input,
  Select,
  Switch,
  Badge
} from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

export const CrmSettings = () => {
  const { user, setUser, companyData, updateCompanyData } = useAuth();
  const { theme, setTheme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef(null);
  const [avatarImage, setAvatarImage] = useState(null);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: user?.name || 'David Chen',
    email: user?.email || 'd.chen@nergy.io',
    phone: '+1 (555) 382-9104',
    role: user?.role || 'Finance Lead',
    department: 'Finance & Operations',
    timezone: 'America/New_York (EST)',
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setAvatarImage(uploadEvent.target.result);
        addToast({
          title: 'Profile Photo Updated',
          message: 'Your new avatar image has been loaded successfully.',
          type: 'success',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Company Form State
  const [companyForm, setCompanyForm] = useState({
    name: companyData?.companyName || 'nErgy Enterprise Logistics',
    legalName: companyData?.legalName || 'nErgy Global Solutions Inc.',
    taxId: 'US-849201948',
    industry: 'Commercial Debt & Supply Chain',
    phone: companyData?.phone || '+1 (555) 019-2834',
    email: 'contact@nergy.io',
    address: '100 Enterprise Way, Suite 400, New York, NY 10001',
  });

  // Security Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [mfaEnabled, setMfaEnabled] = useState(true);

  // Notification Toggles State
  const [notifs, setNotifs] = useState({
    emailDeals: true,
    emailLeads: true,
    taskReminders: true,
    weeklyReport: true,
    securityAlerts: true,
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    language: 'English (US)',
    currency: 'USD ($)',
    dateFormat: 'YYYY-MM-DD',
    startOfWeek: 'Sunday',
    density: 'Standard',
  });

  // Handlers
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (setUser) {
      setUser({ ...user, name: profileData.name, email: profileData.email });
    }
    addToast({ title: 'Profile Updated', message: 'User profile changes saved successfully.', type: 'success' });
  };

  const handleSaveCompany = (e) => {
    e.preventDefault();
    if (updateCompanyData) {
      updateCompanyData({ companyName: companyForm.name, legalName: companyForm.legalName, phone: companyForm.phone });
    }
    addToast({ title: 'Company Details Saved', message: 'Enterprise entity profile updated.', type: 'success' });
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword) {
      addToast({ title: 'Validation Error', message: 'Current password is required.', type: 'error' });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addToast({ title: 'Validation Error', message: 'New passwords do not match.', type: 'error' });
      return;
    }
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    addToast({ title: 'Password Changed', message: 'Your account password has been updated securely.', type: 'success' });
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    addToast({ title: 'Preferences Saved', message: 'Notification delivery rules updated.', type: 'success' });
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    addToast({ title: 'System Preferences Saved', message: 'Localization and display settings applied.', type: 'success' });
  };

  // Safe avatar initials
  const initials = (profileData.name || 'User')
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Settings' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>Account & Workspace Settings</h1>
          <p className="text-xs text-secondary margin-0">
            Manage your personal profile, enterprise organization parameters, security, and interface preferences
          </p>
        </div>
      </div>

      {/* 2. Settings Navigation Tabs */}
      <Card className="p-0 overflow-hidden">
        <div className="p-2 overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <Tabs
            tabs={[
              { id: 'profile', label: 'User Profile', icon: User },
              { id: 'company', label: 'Company Profile', icon: Building2 },
              { id: 'security', label: 'Security & Password', icon: Lock },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'theme', label: 'Theme & Display', icon: Moon },
              { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </Card>

      {/* TAB 1: USER PROFILE */}
      {activeTab === 'profile' && (
        <Card style={{ padding: '1.5rem' }}>
          <div className="profile-header-strip">
            <div className="profile-avatar-group">
              {/* Hidden File Input for Avatar Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoUpload}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  flexShrink: 0,
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'visible',
                  border: '2px solid var(--surface-card)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                title="Click to Upload Profile Photo"
              >
                {avatarImage ? (
                  <img
                    src={avatarImage}
                    alt={profileData.name}
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  initials
                )}

                {/* Small Camera Badge Button */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    backgroundColor: 'var(--surface)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '50%',
                    padding: '4px',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <Camera size={13} />
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {profileData.name}
                </h2>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge variant="primary">{profileData.role}</Badge>
                  <span className="text-xs text-tertiary">{profileData.department}</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="flex flex-col gap-4 mt-5">
            <div className="grid-responsive-2col">
              <Input
                label="Full Name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                placeholder="e.g. David Chen"
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                placeholder="e.g. d.chen@nergy.io"
                required
              />
            </div>

            <div className="grid-responsive-2col">
              <Input
                label="Phone Number"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                placeholder="e.g. +1 (555) 382-9104"
              />
              <Input
                label="Department / Unit"
                value={profileData.department}
                onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                placeholder="e.g. Finance & Operations"
              />
            </div>

            <div className="grid-responsive-2col">
              <Input
                label="Assigned System Role"
                value={profileData.role}
                readOnly
                disabled
                title="System role managed by Organization Administrator"
              />
              <Select
                label="Primary Timezone"
                value={profileData.timezone}
                onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                options={[
                  'America/New_York (EST)',
                  'America/Chicago (CST)',
                  'America/Denver (MST)',
                  'America/Los_Angeles (PST)',
                  'Europe/London (GMT)',
                  'Asia/Kolkata (IST)',
                ]}
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-subtle">
              <Button variant="primary" size="sm" type="submit" icon={Save}>
                Save Profile Changes
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* TAB 2: COMPANY PROFILE */}
      {activeTab === 'company' && (
        <Card style={{ padding: '1.5rem' }}>
          <div className="border-b border-subtle pb-4 mb-4">
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Enterprise Organization Details
            </h2>
            <p className="text-xs text-secondary margin-0 mt-1">
              Legal entity information, primary billing contacts, and corporate registry
            </p>
          </div>

          <form onSubmit={handleSaveCompany} className="flex flex-col gap-4">
            <div className="grid-responsive-2col">
              <Input
                label="Company Trade Name"
                value={companyForm.name}
                onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                required
              />
              <Input
                label="Registered Legal Entity"
                value={companyForm.legalName}
                onChange={(e) => setCompanyForm({ ...companyForm, legalName: e.target.value })}
                required
              />
            </div>

            <div className="grid-responsive-2col">
              <Input
                label="Tax Identification / EIN"
                value={companyForm.taxId}
                onChange={(e) => setCompanyForm({ ...companyForm, taxId: e.target.value })}
              />
              <Select
                label="Primary Industry Sector"
                value={companyForm.industry}
                onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
                options={[
                  'Commercial Debt & Supply Chain',
                  'Enterprise Software & SaaS',
                  'Logistics & Fleet Management',
                  'Biotech & Life Sciences',
                  'Financial Technology & Banking',
                ]}
              />
            </div>

            <div className="grid-responsive-2col">
              <Input
                label="Corporate Contact Phone"
                value={companyForm.phone}
                onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
              />
              <Input
                label="Official Billing Email"
                type="email"
                value={companyForm.email}
                onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
              />
            </div>

            <Input
              label="Headquarters Street Address"
              value={companyForm.address}
              onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
            />

            <div className="flex justify-end pt-4 border-t border-subtle">
              <Button variant="primary" size="sm" type="submit" icon={Save}>
                Save Company Changes
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* TAB 3: SECURITY & PASSWORD */}
      {activeTab === 'security' && (
        <div className="flex flex-col gap-6">
          {/* Password Change Card */}
          <Card style={{ padding: '1.5rem' }}>
            <div className="border-b border-subtle pb-4 mb-4">
              <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Change Account Password
              </h2>
              <p className="text-xs text-secondary margin-0 mt-1">
                Ensure your password is at least 8 characters with numbers and symbols
              </p>
            </div>

            <form onSubmit={handleSaveSecurity} className="flex flex-col gap-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="••••••••••••"
                required
              />

              <div className="grid-responsive-2col">
                <Input
                  label="New Security Password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="At least 8 characters"
                  required
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder="Repeat new password"
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="primary" size="sm" type="submit" icon={KeyRound}>
                  Update Password
                </Button>
              </div>
            </form>
          </Card>

          {/* Two-Factor Authentication Card */}
          <Card style={{ padding: '1.5rem' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: mfaEnabled ? 'var(--success-light)' : 'var(--surface-secondary)',
                    color: mfaEnabled ? 'var(--success)' : 'var(--text-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      Two-Factor Authentication (2FA)
                    </h3>
                    <Badge variant={mfaEnabled ? 'success' : 'default'}>
                      {mfaEnabled ? 'Protected' : 'Disabled'}
                    </Badge>
                  </div>
                  <p className="text-xs text-secondary margin-0 mt-1">
                    Adds an extra layer of security using an authenticator app (Google Authenticator / Authy)
                  </p>
                </div>
              </div>

              <Button
                variant={mfaEnabled ? 'outline' : 'primary'}
                size="sm"
                className="w-auto"
                style={{ alignSelf: 'flex-start' }}
                onClick={() => {
                  setMfaEnabled(!mfaEnabled);
                  addToast({
                    title: mfaEnabled ? '2FA Disabled' : '2FA Configured',
                    message: mfaEnabled ? 'Two-factor protection turned off.' : 'Authenticator app registered successfully.',
                    type: mfaEnabled ? 'warning' : 'success',
                  });
                }}
              >
                {mfaEnabled ? 'Reconfigure 2FA' : 'Enable 2FA'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 4: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <Card style={{ padding: '1.5rem' }}>
          <div className="border-b border-subtle pb-4 mb-4">
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Notification & Alert Deliverability
            </h2>
            <p className="text-xs text-secondary margin-0 mt-1">
              Choose which critical business events trigger email and SMS communications
            </p>
          </div>

          <form onSubmit={handleSaveNotifications} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {/* Item 1: Deals */}
              <div
                className="surface-secondary rounded-md border-subtle flex items-center justify-between gap-4 p-4 transition-all hover:border-primary"
                style={{ transition: 'all 0.15s ease' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(22, 163, 74, 0.1)',
                      color: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-primary">Email Alerts for Deals & Conversions</div>
                    <span className="text-xs text-secondary">Receive real-time notifications when high-value opportunities move stage</span>
                  </div>
                </div>
                <Switch
                  checked={notifs.emailDeals}
                  onChange={(e) => setNotifs({ ...notifs, emailDeals: e.target.checked })}
                />
              </div>

              {/* Item 2: Leads */}
              <div
                className="surface-secondary rounded-md border-subtle flex items-center justify-between gap-4 p-4 transition-all hover:border-primary"
                style={{ transition: 'all 0.15s ease' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <User size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-primary">Lead Assignment Notifications</div>
                    <span className="text-xs text-secondary">Notify me immediately when inbound commercial leads are assigned to my desk</span>
                  </div>
                </div>
                <Switch
                  checked={notifs.emailLeads}
                  onChange={(e) => setNotifs({ ...notifs, emailLeads: e.target.checked })}
                />
              </div>

              {/* Item 3: Tasks */}
              <div
                className="surface-secondary rounded-md border-subtle flex items-center justify-between gap-4 p-4 transition-all hover:border-primary"
                style={{ transition: 'all 0.15s ease' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(234, 88, 12, 0.1)',
                      color: '#ea580c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-primary">Task Due Dates & Reminders</div>
                    <span className="text-xs text-secondary">Get calendar alerts 1 hour before scheduled customer follow-up calls</span>
                  </div>
                </div>
                <Switch
                  checked={notifs.taskReminders}
                  onChange={(e) => setNotifs({ ...notifs, taskReminders: e.target.checked })}
                />
              </div>

              {/* Item 4: Digest */}
              <div
                className="surface-secondary rounded-md border-subtle flex items-center justify-between gap-4 p-4 transition-all hover:border-primary"
                style={{ transition: 'all 0.15s ease' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(147, 51, 234, 0.1)',
                      color: '#9333ea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Bell size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-primary">Weekly Executive Performance Digest</div>
                    <span className="text-xs text-secondary">Receive a comprehensive PDF metrics summary every Monday morning</span>
                  </div>
                </div>
                <Switch
                  checked={notifs.weeklyReport}
                  onChange={(e) => setNotifs({ ...notifs, weeklyReport: e.target.checked })}
                />
              </div>

              {/* Item 5: Security */}
              <div
                className="surface-secondary rounded-md border-subtle flex items-center justify-between gap-4 p-4 transition-all hover:border-primary"
                style={{ transition: 'all 0.15s ease' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-primary">Security & Login Alerts</div>
                    <span className="text-xs text-secondary">Instant alerts for new login sessions or credential changes</span>
                  </div>
                </div>
                <Switch
                  checked={notifs.securityAlerts}
                  onChange={(e) => setNotifs({ ...notifs, securityAlerts: e.target.checked })}
                />
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <Button variant="primary" size="sm" type="submit" icon={Save}>
                Save Notification Rules
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* TAB 5: THEME & DISPLAY */}
      {activeTab === 'theme' && (
        <Card style={{ padding: '1.5rem' }}>
          <div className="border-b border-subtle pb-4 mb-4">
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Appearance & Workspace Theme
            </h2>
            <p className="text-xs text-secondary margin-0 mt-1">
              Customize visual styling, dark mode contrast, and interface layout density
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Theme Selectors */}
            <div className="grid-responsive-3col">
              {/* Light Mode */}
              <div
                onClick={() => { if (setTheme) setTheme('light'); else if (theme === 'dark') toggleTheme(); }}
                className="p-4 rounded-md border-subtle cursor-pointer transition-all"
                style={{
                  backgroundColor: '#ffffff',
                  border: theme === 'light' ? '2px solid var(--primary)' : '1px solid var(--border)',
                  boxShadow: theme === 'light' ? '0 0 0 1px var(--primary)' : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Sun size={20} className="text-warning" />
                  {theme === 'light' && <CheckCircle2 size={18} className="text-primary" />}
                </div>
                <div className="font-bold text-xs text-primary" style={{ color: '#0f172a' }}>Light Mode</div>
                <span className="text-xs text-secondary" style={{ color: '#64748b', fontSize: '11px' }}>Clean crisp background</span>
              </div>

              {/* Dark Mode */}
              <div
                onClick={() => { if (setTheme) setTheme('dark'); else if (theme === 'light') toggleTheme(); }}
                className="p-4 rounded-md border-subtle cursor-pointer transition-all"
                style={{
                  backgroundColor: '#0f172a',
                  border: theme === 'dark' ? '2px solid var(--primary)' : '1px solid var(--border)',
                  boxShadow: theme === 'dark' ? '0 0 0 1px var(--primary)' : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Moon size={20} className="text-primary" />
                  {theme === 'dark' && <CheckCircle2 size={18} className="text-primary" />}
                </div>
                <div className="font-bold text-xs" style={{ color: '#f8fafc' }}>Dark Mode</div>
                <span className="text-xs" style={{ color: '#94a3b8', fontSize: '11px' }}>Deep obsidian contrast</span>
              </div>

              {/* System Theme */}
              <div
                onClick={() => toggleTheme()}
                className="p-4 rounded-md border-subtle cursor-pointer transition-all surface-secondary"
                style={{ border: '1px solid var(--border)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Monitor size={20} className="text-tertiary" />
                </div>
                <div className="font-bold text-xs text-primary">System Match</div>
                <span className="text-xs text-secondary" style={{ fontSize: '11px' }}>Synchronize with OS</span>
              </div>
            </div>

            {/* Quick Toggle Bar */}
            <div className="p-4 surface-secondary rounded-md border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-xs text-primary">Current Active Mode: {theme?.toUpperCase() || 'LIGHT'}</div>
                <span className="text-xs text-secondary">Click to switch color mode instantaneously</span>
              </div>
              <Button variant="outline" size="sm" icon={theme === 'dark' ? Sun : Moon} onClick={toggleTheme}>
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 6: PREFERENCES & LOCALIZATION */}
      {activeTab === 'preferences' && (
        <Card style={{ padding: '1.5rem' }}>
          <div className="border-b border-subtle pb-4 mb-4">
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              System Localization & Formatting
            </h2>
            <p className="text-xs text-secondary margin-0 mt-1">
              Configure default currency, language packs, date formatting, and grid density
            </p>
          </div>

          <form onSubmit={handleSavePreferences} className="flex flex-col gap-4">
            <div className="grid-responsive-2col">
              <Select
                label="System Display Language"
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                options={[
                  { label: 'English (US)', value: 'English (US)' },
                  { label: 'Spanish (ES)', value: 'Spanish (ES)' },
                  { label: 'French (FR)', value: 'French (FR)' },
                  { label: 'German (DE)', value: 'German (DE)' },
                  { label: 'Japanese (JA)', value: 'Japanese (JA)' },
                ]}
              />
              <Select
                label="Base Reporting Currency"
                value={preferences.currency}
                onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                options={[
                  { label: 'USD ($)', value: 'USD ($)' },
                  { label: 'EUR (€)', value: 'EUR (€)' },
                  { label: 'GBP (£)', value: 'GBP (£)' },
                  { label: 'CAD ($)', value: 'CAD ($)' },
                  { label: 'INR (₹)', value: 'INR (₹)' },
                  { label: 'AUD ($)', value: 'AUD ($)' },
                ]}
              />
            </div>

            <div className="grid-responsive-2col">
              <Select
                label="Date Format System"
                value={preferences.dateFormat}
                onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                options={[
                  { label: 'YYYY-MM-DD (ISO standard)', value: 'YYYY-MM-DD' },
                  { label: 'MM/DD/YYYY (US standard)', value: 'MM/DD/YYYY' },
                  { label: 'DD/MM/YYYY (UK/EU standard)', value: 'DD/MM/YYYY' },
                ]}
              />
              <Select
                label="First Day of Week"
                value={preferences.startOfWeek}
                onChange={(e) => setPreferences({ ...preferences, startOfWeek: e.target.value })}
                options={[
                  { label: 'Sunday', value: 'Sunday' },
                  { label: 'Monday', value: 'Monday' },
                ]}
              />
            </div>

            <div className="grid-responsive-2col">
              <Select
                label="Workspace Table Density"
                value={preferences.density}
                onChange={(e) => setPreferences({ ...preferences, density: e.target.value })}
                options={[
                  { label: 'Standard (Comfortable)', value: 'Standard' },
                  { label: 'Compact (Dense Data)', value: 'Compact' },
                  { label: 'Spacious (Touch Ready)', value: 'Spacious' },
                ]}
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-subtle">
              <Button variant="primary" size="sm" type="submit" icon={Save}>
                Save System Preferences
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};
