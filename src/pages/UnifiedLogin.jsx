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
  LogIn
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
    badge: 'Full Admin',
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
    badge: 'Sales & Leads',
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
    badge: 'ERP & Finance',
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
    badge: 'HR & Staff',
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
    badge: 'Tasks & Comms',
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
    badge: 'Borrower Hub',
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
    badge: 'Lender Bidding',
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
    badge: 'OAL Agent Desk',
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
    badge: 'Master Admin',
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

  const executeLogin = (roleObj, platformMode) => {
    setIsLoading(true);

    setTimeout(() => {
      login(
        {
          name: roleObj.name,
          email: roleObj.email,
          role: roleObj.role,
          company: roleObj.company,
          tenantId: platformMode === 'crm' ? 'TENANT-08492' : `OAL-${roleObj.id.toUpperCase()}-9910`,
        },
        platformMode
      );

      addToast({
        title: `Logged in as ${roleObj.title}`,
        message: `Welcome ${roleObj.name}! Navigating to ${roleObj.title} dashboard...`,
        type: 'success',
      });

      setIsLoading(false);
      navigate(roleObj.target);
    }, 300);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    executeLogin(selectedRole, activePlatform);
  };

  const currentRoleList = activePlatform === 'crm' ? crmRoles : oalRoles;

  return (
    <div
      style={{
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--background)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1180px',
          height: '100%',
          maxHeight: '620px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        {/* Compact Header */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '14px',
                  fontFamily: 'var(--font-display)',
                }}
              >
                nE
              </div>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--accent)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '14px',
                  fontFamily: 'var(--font-display)',
                }}
              >
                OA
              </div>
            </div>

            <div className="flex flex-col">
              <h1 style={{ fontSize: '18px', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                CRM nErgy & OAL Network Unified Login Gateway
              </h1>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                Click any role preset below or use the form to log in instantly (Zero Scrolling Layout)
              </span>
            </div>
          </div>

          <Badge variant="success" icon={Sparkles}>9 Dummy Roles Ready</Badge>
        </div>

        {/* Side-by-Side 2-Column Main Shell */}
        <div style={{ flex: 1, display: 'flex', gap: '1rem', overflow: 'hidden' }}>
          {/* Left Column: Role Presets (58% width) */}
          <Card className="p-4 flex flex-col justify-between" style={{ flex: '1.4', overflow: 'hidden' }}>
            <div className="flex flex-col gap-3" style={{ overflow: 'hidden' }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary">Select Platform & Persona Role:</span>
                <Tabs
                  tabs={[
                    { id: 'crm', label: 'CRM Enterprise (5)' },
                    { id: 'oal', label: 'OAL Marketplace (4)' },
                  ]}
                  activeTab={activePlatform}
                  onChange={handlePlatformTabChange}
                />
              </div>

              {/* Role Cards List */}
              <div className="flex flex-col gap-2" style={{ overflowY: 'auto', paddingRight: '4px' }}>
                {currentRoleList.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole.id === r.id;

                  return (
                    <div
                      key={r.id}
                      onClick={() => handleSelectRole(r, activePlatform)}
                      className="p-2.5 rounded-sm border-subtle flex items-center justify-between cursor-pointer transition-all"
                      style={{
                        backgroundColor: isSelected
                          ? activePlatform === 'crm' ? 'var(--primary-light)' : 'var(--accent-light)'
                          : 'var(--surface-secondary)',
                        borderColor: isSelected
                          ? activePlatform === 'crm' ? 'var(--primary)' : 'var(--accent)'
                          : 'var(--border)',
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: isSelected
                              ? activePlatform === 'crm' ? 'var(--primary)' : 'var(--accent)'
                              : 'var(--surface)',
                            color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={16} />
                        </div>

                        <div className="flex flex-col gap-0.5 text-left">
                          <span className="font-bold text-xs text-primary leading-none">{r.title}</span>
                          <span className="text-secondary" style={{ fontSize: '11px' }}>
                            {r.name} &bull; <span className="font-mono text-tertiary">{r.email}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-tertiary" style={{ fontSize: '10px' }}>
                          {r.password}
                        </span>

                        <Button
                          variant={isSelected ? 'primary' : 'outline'}
                          size="xs"
                          icon={LogIn}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectRole(r, activePlatform);
                            executeLogin(r, activePlatform);
                          }}
                          style={{
                            backgroundColor: isSelected
                              ? activePlatform === 'crm' ? 'var(--primary)' : 'var(--accent)'
                              : undefined,
                          }}
                        >
                          Login
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-subtle flex items-center justify-between text-xs text-tertiary">
              <span>Isolated Multi-Tenant Security</span>
              <span className="font-semibold text-primary">Click any card to auto-fill form</span>
            </div>
          </Card>

          {/* Right Column: Pre-filled Form (42% width) */}
          <Card className="p-4 flex flex-col justify-between" style={{ flex: '1' }}>
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col items-center text-center pb-2 border-b border-subtle">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: activePlatform === 'crm' ? 'var(--primary)' : 'var(--accent)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '18px',
                    fontFamily: 'var(--font-display)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {activePlatform === 'crm' ? 'nE' : 'OA'}
                </div>
                <h3 className="text-sm font-bold margin-0">{selectedRole.title}</h3>
                <span className="text-tertiary font-mono" style={{ fontSize: '11px' }}>
                  Target: {selectedRole.target}
                </span>
              </div>

              <Input
                label="Role Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startIcon={Mail}
                required
                style={{ height: '36px', fontSize: '13px' }}
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                startIcon={Lock}
                required
                style={{ height: '36px', fontSize: '13px' }}
              />

              <div className="p-2.5 surface-secondary rounded-sm border-subtle flex flex-col gap-1" style={{ fontSize: '11px' }}>
                <div className="flex justify-between">
                  <span className="text-tertiary">Authenticated Name:</span>
                  <span className="font-semibold text-primary">{selectedRole.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Tenant Organization:</span>
                  <span className="font-semibold text-primary">{selectedRole.company}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                type="submit"
                isLoading={isLoading}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full mt-1"
                style={{
                  backgroundColor: activePlatform === 'crm' ? 'var(--primary)' : 'var(--accent)',
                  borderColor: activePlatform === 'crm' ? 'var(--primary)' : 'var(--accent)',
                  height: '38px',
                }}
              >
                Sign In as {selectedRole.title}
              </Button>
            </form>

            <div className="pt-2 border-t border-subtle flex items-center justify-center gap-1.5 text-tertiary" style={{ fontSize: '11px' }}>
              <ShieldCheck size={14} className="text-success" />
              <span>256-bit AES Tenant Session Protection</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
