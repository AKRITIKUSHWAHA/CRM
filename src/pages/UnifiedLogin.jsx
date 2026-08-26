import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  User,
  Building2,
  Lock,
  Mail,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  Landmark,
  Shield,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
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
    icon: Building2,
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
    icon: TrendingUp,
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
    badge: 'Recruiting & Staff',
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
    badge: 'Borrower Onboarding',
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
    badge: 'Underwriting Desk',
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
        title: `Signed in as ${roleObj.title}`,
        message: `Welcome ${roleObj.name}! Navigating to ${roleObj.title} workspace...`,
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
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(29, 78, 216, 0.03) 0%, transparent 65%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem 1rem',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          margin: '0 auto',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 0.5rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          {/* Brand Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: '#1d4ed8',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '13px',
                  fontFamily: 'var(--font-display)',
                }}
              >
                nE
              </div>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: '#0f766e',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '13px',
                  fontFamily: 'var(--font-display)',
                }}
              >
                OA
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <h1
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    margin: 0,
                    lineHeight: 1.1,
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  CRM nErgy & OAL Network
                </h1>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                  }}
                >
                  Unified Enterprise Access
                </span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                Secure access to your business and lending workspace
              </span>
            </div>
          </div>

          {/* System Status Indicator */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.375rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--success)',
                display: 'inline-block',
              }}
            />
            <span>Secure Demo Environment</span>
          </div>
        </div>

        {/* Main 2-Column Desktop Grid / 1-Column Mobile Stack */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
          className="login-grid-wrapper"
        >
          {/* Left Panel: Segmented Control & Role Selection List (7 Cols) */}
          <div
            style={{
              gridColumn: 'span 7 / span 7',
              backgroundColor: 'var(--surface)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem',
            }}
            className="login-left-card"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Segmented Control Platform Switcher */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Select Persona Role
                </span>

                {/* Polished Segmented Control */}
                <div
                  style={{
                    display: 'inline-flex',
                    padding: '3px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handlePlatformTabChange('crm')}
                    style={{
                      padding: '0.4rem 0.875rem',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                      backgroundColor: activePlatform === 'crm' ? '#1d4ed8' : 'transparent',
                      color: activePlatform === 'crm' ? '#ffffff' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>CRM Enterprise</span>
                    <span
                      style={{
                        fontSize: '10px',
                        padding: '1px 5px',
                        borderRadius: '4px',
                        backgroundColor: activePlatform === 'crm' ? 'rgba(255,255,255,0.2)' : 'var(--border)',
                      }}
                    >
                      5 roles
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePlatformTabChange('oal')}
                    style={{
                      padding: '0.4rem 0.875rem',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                      backgroundColor: activePlatform === 'oal' ? '#0f766e' : 'transparent',
                      color: activePlatform === 'oal' ? '#ffffff' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>OAL Marketplace</span>
                    <span
                      style={{
                        fontSize: '10px',
                        padding: '1px 5px',
                        borderRadius: '4px',
                        backgroundColor: activePlatform === 'oal' ? 'rgba(255,255,255,0.2)' : 'var(--border)',
                      }}
                    >
                      4 roles
                    </span>
                  </button>
                </div>
              </div>

              {/* Role Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {currentRoleList.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole.id === r.id;

                  return (
                    <div
                      key={r.id}
                      onClick={() => handleSelectRole(r, activePlatform)}
                      style={{
                        padding: '0.875rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid',
                        borderColor: isSelected
                          ? activePlatform === 'crm' ? '#1d4ed8' : '#0f766e'
                          : 'var(--border)',
                        backgroundColor: isSelected
                          ? activePlatform === 'crm' ? 'var(--primary-light)' : 'var(--accent-light)'
                          : 'var(--surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: isSelected
                              ? activePlatform === 'crm' ? '#1d4ed8' : '#0f766e'
                              : 'var(--surface-secondary)',
                            color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={18} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                              {r.title}
                            </span>
                            {isSelected && (
                              <CheckCircle2
                                size={14}
                                style={{ color: activePlatform === 'crm' ? '#1d4ed8' : '#0f766e' }}
                              />
                            )}
                          </div>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '1px' }}>
                            {r.name} &bull; <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{r.email}</span>
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: 'var(--text-tertiary)',
                            backgroundColor: 'var(--surface-secondary)',
                            padding: '3px 7px',
                            borderRadius: '4px',
                            border: '1px solid var(--border)',
                          }}
                        >
                          Pass: {r.password}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectRole(r, activePlatform);
                            executeLogin(r, activePlatform);
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 600,
                            border: '1px solid',
                            borderColor: isSelected
                              ? activePlatform === 'crm' ? '#1d4ed8' : '#0f766e'
                              : 'var(--border)',
                            backgroundColor: isSelected
                              ? activePlatform === 'crm' ? '#1d4ed8' : '#0f766e'
                              : 'var(--surface)',
                            color: isSelected ? '#ffffff' : 'var(--text-primary)',
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)',
                          }}
                        >
                          <span>Sign In</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Left Helper Text */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: 'var(--text-tertiary)',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border)',
              }}
            >
              <span>Tenant-isolated enterprise environment</span>
              <span>Select a role to continue</span>
            </div>
          </div>

          {/* Right Panel: Premium Authentication Card (5 Cols) */}
          <div
            style={{
              gridColumn: 'span 5 / span 5',
              backgroundColor: 'var(--surface)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem',
            }}
            className="login-right-card"
          >
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
              {/* Login Card Header */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingBottom: '0.875rem',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: activePlatform === 'crm' ? '#1d4ed8' : '#0f766e',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '16px',
                    fontFamily: 'var(--font-display)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {activePlatform === 'crm' ? 'nE' : 'OA'}
                </div>
                <h2
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}
                >
                  {selectedRole.title}
                </h2>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Sign in to continue to your {activePlatform === 'crm' ? 'CRM workspace' : 'OAL lending portal'}.
                </span>
              </div>

              {/* Form Input: Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', textAlign: 'left' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Mail
                    size={16}
                    style={{ position: 'absolute', left: '14px', color: 'var(--text-tertiary)', pointerEvents: 'none' }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      height: '48px',
                      paddingLeft: '40px',
                      paddingRight: '14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--surface)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'border-color var(--transition-fast)',
                    }}
                  />
                </div>
              </div>

              {/* Form Input: Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', itemsCenter: 'center', justifyBetween: 'space-between' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Password
                  </label>
                </div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock
                    size={16}
                    style={{ position: 'absolute', left: '14px', color: 'var(--text-tertiary)', pointerEvents: 'none' }}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      height: '48px',
                      paddingLeft: '40px',
                      paddingRight: '14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--surface)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Compact Authenticated Information Box */}
              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.375rem',
                  fontSize: '12px',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>Authenticated as</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedRole.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>Organization</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedRole.company}</span>
                </div>
              </div>

              {/* Primary CTA Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '8px',
                  backgroundColor: activePlatform === 'crm' ? '#1d4ed8' : '#0f766e',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'background-color var(--transition-fast)',
                }}
              >
                <span>{isLoading ? 'Signing In...' : `Sign in as ${selectedRole.title}`}</span>
                {!isLoading && <ArrowRight size={16} />}
              </button>
            </form>

            {/* Security Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem',
                fontSize: '12px',
                color: 'var(--text-tertiary)',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border)',
              }}
            >
              <ShieldCheck size={14} style={{ color: 'var(--success)' }} />
              <span>Secure enterprise session &bull; Tenant-isolated workspace</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
