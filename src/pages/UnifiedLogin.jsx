import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  User,
  Building2,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  Users,
  Briefcase,
  DollarSign,
  Landmark,
  Shield,
  Key
} from 'lucide-react';
import { Input, Button, Card, Badge, Tabs } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const crmRoles = [
  {
    id: 'owner',
    title: 'Company Owner / CEO',
    name: 'Alexander Wright',
    email: 'a.wright@nergy.io',
    password: 'Owner@2026',
    role: 'Company Owner',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/dashboard',
    badge: 'Full Admin Access',
    badgeVariant: 'success',
    icon: ShieldCheck,
  },
  {
    id: 'sales',
    title: 'VP of Sales',
    name: 'Sarah Jenkins',
    email: 's.jenkins@nergy.io',
    password: 'Sales@2026',
    role: 'Sales Manager',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/leads',
    badge: 'Sales & Leads Pipeline',
    badgeVariant: 'primary',
    icon: Briefcase,
  },
  {
    id: 'finance',
    title: 'Finance Director',
    name: 'David Chen',
    email: 'd.chen@nergy.io',
    password: 'Finance@2026',
    role: 'Finance Lead',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/erp/finance',
    badge: 'ERP & Ledgers',
    badgeVariant: 'info',
    icon: DollarSign,
  },
  {
    id: 'hr',
    title: 'HR Manager',
    name: 'Elena Rostova',
    email: 'e.rostova@nergy.io',
    password: 'HR@2026',
    role: 'HR Director',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/hr',
    badge: 'Recruiting & Employees',
    badgeVariant: 'warning',
    icon: Users,
  },
  {
    id: 'employee',
    title: 'Standard Employee',
    name: 'Marcus Vance',
    email: 'm.vance@nergy.io',
    password: 'Emp@2026',
    role: 'Staff Member',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/tasks',
    badge: 'Tasks & Comms Only',
    badgeVariant: 'default',
    icon: User,
  },
];

const oalRoles = [
  {
    id: 'borrower',
    title: 'Corporate Borrower',
    name: 'Dr. Aris Thorne',
    email: 'a.thorne@biogenix.org',
    password: 'Borrower@2026',
    role: 'Borrower Account',
    company: 'BioGenix Labs Inc.',
    target: '/oal/borrower/dashboard',
    badge: 'Apply & Accept Offers',
    badgeVariant: 'success',
    icon: Landmark,
  },
  {
    id: 'lender',
    title: 'Institutional Lender',
    name: 'Marcus Sterling',
    email: 'm.sterling@vanguard.com',
    password: 'Lender@2026',
    role: 'Lender Account',
    company: 'Vanguard Capital Debt Fund',
    target: '/oal/lender/dashboard',
    badge: 'Leads & Bidding Engine',
    badgeVariant: 'primary',
    icon: Building2,
  },
  {
    id: 'rep',
    title: 'Licensed OAL Representative',
    name: 'Sarah Jenkins',
    email: 'agent.sarah@oalnetwork.com',
    password: 'Agent@2026',
    role: 'OAL Agent',
    company: 'OAL Network Services',
    target: '/oal/rep/dashboard',
    badge: 'Underwriting & Chat',
    badgeVariant: 'info',
    icon: Shield,
  },
  {
    id: 'admin',
    title: 'Platform Master Admin',
    name: 'Alexander Wright',
    email: 'admin.alexander@oalnetwork.com',
    password: 'Admin@2026',
    role: 'Master Admin',
    company: 'OAL Network Marketplace',
    target: '/oal/admin/dashboard',
    badge: 'Platform Governance',
    badgeVariant: 'error',
    icon: ShieldCheck,
  },
];

export const UnifiedLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [activePlatform, setActivePlatform] = useState('crm');
  const [selectedRole, setSelectedRole] = useState(crmRoles[0]);
  const [email, setEmail] = useState(crmRoles[0].email);
  const [password, setPassword] = useState(crmRoles[0].password);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectRole = (r, platform) => {
    setSelectedRole(r);
    setEmail(r.email);
    setPassword(r.password);
    setActivePlatform(platform);
  };

  const handlePlatformTabChange = (platform) => {
    setActivePlatform(platform);
    const firstRole = platform === 'crm' ? crmRoles[0] : oalRoles[0];
    setSelectedRole(firstRole);
    setEmail(firstRole.email);
    setPassword(firstRole.password);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(
        {
          name: selectedRole.name,
          email,
          role: selectedRole.role,
          company: selectedRole.company,
          tenantId: activePlatform === 'crm' ? 'TENANT-08492' : `OAL-${selectedRole.id.toUpperCase()}-9910`,
        },
        activePlatform
      );

      addToast({
        title: `Logged in as ${selectedRole.title}`,
        message: `Welcome ${selectedRole.name}! Redirecting to ${selectedRole.title} dashboard...`,
        type: 'success',
      });

      setIsLoading(false);
      navigate(selectedRole.target);
    }, 400);
  };

  const currentRoleList = activePlatform === 'crm' ? crmRoles : oalRoles;

  return (
    <div className="flex flex-col min-h-screen background-surface text-primary p-4 md:p-8 items-center justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        {/* Header Title */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-2">
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '18px',
                fontFamily: 'var(--font-display)',
              }}
            >
              nE
            </div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '18px',
                fontFamily: 'var(--font-display)',
              }}
            >
              OA
            </div>
          </div>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800 }} className="font-display margin-0">
            CRM nErgy & OAL Network Unified Login Gateway
          </h1>
          <p className="text-xs text-secondary margin-0 max-w-xl">
            Select any role preset below to auto-fill dummy credentials and sign in directly to inspect exact dashboard menus and permissions.
          </p>
        </div>

        {/* Main Grid: Left Preset Buttons, Right Login Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Platform Selector & Role Presets */}
          <Card className="md:col-span-7 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-subtle pb-3">
              <h3 className="text-base font-semibold">1-Click Role Presets (9 Roles)</h3>
              <Badge variant="success" icon={Sparkles}>Dummy Credentials Ready</Badge>
            </div>

            {/* Platform Switcher Tabs */}
            <Tabs
              tabs={[
                { id: 'crm', label: 'CRM nErgy Enterprise (5 Roles)' },
                { id: 'oal', label: 'OAL Network Marketplace (4 Roles)' },
              ]}
              activeTab={activePlatform}
              onChange={handlePlatformTabChange}
            />

            {/* Role Preset Cards List */}
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
              {currentRoleList.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole.id === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => handleSelectRole(r, activePlatform)}
                    className="p-3 rounded-sm border-subtle flex items-center justify-between cursor-pointer transition-all"
                    style={{
                      backgroundColor: isSelected ? (activePlatform === 'crm' ? 'var(--primary-light)' : 'var(--accent-light)') : 'var(--surface-secondary)',
                      borderColor: isSelected ? (activePlatform === 'crm' ? 'var(--primary)' : 'var(--accent)') : 'var(--border)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: isSelected ? (activePlatform === 'crm' ? 'var(--primary)' : 'var(--accent)') : 'var(--surface)',
                          color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-xs text-primary">{r.title}</span>
                        <span className="text-xs text-secondary">{r.name} ({r.email})</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={r.badgeVariant}>{r.badge}</Badge>
                      <span className="font-mono text-xs text-tertiary" style={{ fontSize: '10px' }}>
                        Pass: {r.password}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Right Column: Pre-filled Form & Direct Login Button */}
          <Card className="md:col-span-5 p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-col items-center text-center mb-6">
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: activePlatform === 'crm' ? 'var(--primary)' : 'var(--accent)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '20px',
                    fontFamily: 'var(--font-display)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {activePlatform === 'crm' ? 'nE' : 'OA'}
                </div>
                <h3 className="text-base font-bold margin-0">{selectedRole.title}</h3>
                <p className="text-xs text-secondary margin-0 mt-1">Target: {selectedRole.target}</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                <Input
                  label="Role Business Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  startIcon={Mail}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  startIcon={Lock}
                  required
                />

                <div className="p-3 surface-secondary rounded-sm border-subtle text-xs flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="text-tertiary">Selected User:</span>
                    <span className="font-semibold">{selectedRole.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-tertiary">Organization:</span>
                    <span className="font-semibold">{selectedRole.company}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  isLoading={isLoading}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full mt-2"
                  style={{
                    backgroundColor: activePlatform === 'crm' ? 'var(--primary)' : 'var(--accent)',
                    borderColor: activePlatform === 'crm' ? 'var(--primary)' : 'var(--accent)',
                  }}
                >
                  Sign In as {selectedRole.title}
                </Button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-subtle flex items-center justify-center gap-2 text-xs text-tertiary">
              <ShieldCheck size={14} className="text-success" />
              <span>Multi-Tenant Vault Encrypted Session</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
