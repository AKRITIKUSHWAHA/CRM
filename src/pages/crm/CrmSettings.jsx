import React, { useState } from 'react';
import { User, Building2, Lock, Bell, Moon, Settings as SettingsIcon, Save } from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Tabs, Input, Select, Switch } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

export const CrmSettings = () => {
  const { user, setUser, companyData, updateCompanyData } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('profile');

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: user.name || 'Alexander Wright',
    email: user.email || 'a.wright@nergy.io',
    role: user.role || 'Company Owner',
  });

  // Security Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification Toggles
  const [notifs, setNotifs] = useState({
    emailAlerts: true,
    smsAlerts: true,
    weeklyReport: true,
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser({ ...user, name: profileData.name, email: profileData.email });
    addToast({ title: 'Profile Saved', message: 'Updated account details in tenant vault.', type: 'success' });
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addToast({ title: 'Validation Error', message: 'New passwords do not match.', type: 'error' });
      return;
    }
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    addToast({ title: 'Password Updated', message: 'Security password changed successfully.', type: 'success' });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Settings' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Account & Workspace Settings</h1>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <Card>
        <CardBody className="p-2 overflow-x-auto">
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
        </CardBody>
      </Card>

      {/* TAB 1: PROFILE */}
      {activeTab === 'profile' && (
        <Card className="p-6">
          <CardHeader title="User Profile Information" />
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-4 mt-2">
            <Input
              label="Full Name"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              required
            />
            <Input label="Assigned Role" value={profileData.role} readOnly />
            <div className="flex justify-end">
              <Button variant="primary" size="sm" type="submit" icon={Save}>
                Save Profile Changes
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* TAB 2: COMPANY */}
      {activeTab === 'company' && (
        <Card className="p-6">
          <CardHeader title="Company Entity Profile" />
          <div className="flex flex-col gap-4 mt-2">
            <Input label="Company Name" value={companyData.companyName || 'nErgy Enterprise Logistics'} readOnly />
            <Input label="Legal Entity" value={companyData.legalName || 'nErgy Global Solutions Inc.'} readOnly />
            <Input label="Business Phone" value={companyData.phone || '+1 (555) 019-2834'} readOnly />
          </div>
        </Card>
      )}

      {/* TAB 3: SECURITY */}
      {activeTab === 'security' && (
        <Card className="p-6">
          <CardHeader title="Change Account Password" />
          <form onSubmit={handleSaveSecurity} className="flex flex-col gap-4 mt-2">
            <Input
              label="Current Password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
            />
            <Input
              label="New Security Password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
            />
            <div className="flex justify-end">
              <Button variant="primary" size="sm" type="submit">
                Update Password
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* TAB 4: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <Card className="p-6 flex flex-col gap-4">
          <CardHeader title="Notification Preferences" />
          <Switch
            label="Email Alerts for New Leads & Deals"
            checked={notifs.emailAlerts}
            onChange={(e) => setNotifs({ ...notifs, emailAlerts: e.target.checked })}
          />
          <Switch
            label="SMS Verification & High Priority Reminders"
            checked={notifs.smsAlerts}
            onChange={(e) => setNotifs({ ...notifs, smsAlerts: e.target.checked })}
          />
          <Switch
            label="Weekly Executive Performance Digest"
            checked={notifs.weeklyReport}
            onChange={(e) => setNotifs({ ...notifs, weeklyReport: e.target.checked })}
          />
        </Card>
      )}

      {/* TAB 5: THEME */}
      {activeTab === 'theme' && (
        <Card className="p-6 flex flex-col gap-4">
          <CardHeader title="Color Theme & Appearance" />
          <div className="flex items-center justify-between p-3 surface-secondary rounded-md">
            <div>
              <div className="font-bold text-sm text-primary">Current Theme: {theme.toUpperCase()}</div>
              <span className="text-xs text-secondary">Switch between crisp light mode and deep dark slate</span>
            </div>
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              Toggle Theme
            </Button>
          </div>
        </Card>
      )}

      {/* TAB 6: PREFERENCES */}
      {activeTab === 'preferences' && (
        <Card className="p-6">
          <CardHeader title="System Localization Preferences" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <Select label="System Language" value="English (US)" options={['English (US)', 'Spanish (ES)', 'French (FR)']} />
            <Select label="Date Format" value="YYYY-MM-DD" options={['YYYY-MM-DD', 'MM/DD/YYYY', 'DD/MM/YYYY']} />
          </div>
        </Card>
      )}
    </div>
  );
};
