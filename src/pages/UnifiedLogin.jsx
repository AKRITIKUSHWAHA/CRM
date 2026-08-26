import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  Landmark,
  Shield,
  CheckCircle2,
  ChevronRight,
  Sparkles
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

export const UnifiedLogin = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addToast } = useToast();

  // Determine current active platform based on prop or current URL path
  const currentPlatform = mode || (location.pathname.includes('/oal') ? 'oal' : 'crm');

  const roleList = currentPlatform === 'crm' ? crmRoles : oalRoles;

  const [selectedRole, setSelectedRole] = useState(roleList[0]);
  const [email, setEmail] = useState(roleList[0].email);
  const [password, setPassword] = useState(roleList[0].password);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const list = currentPlatform === 'crm' ? crmRoles : oalRoles;
    setSelectedRole(list[0]);
    setEmail(list[0].email);
    setPassword(list[0].password);
  }, [currentPlatform]);

  const handleSelectRole = (r) => {
    setSelectedRole(r);
    setEmail(r.email);
    setPassword(r.password);
  };

  const handleSwitchPlatform = () => {
    const targetPath = currentPlatform === 'crm' ? '/oal/login' : '/crm/login';
    navigate(targetPath);
  };

  const executeLogin = (roleObj) => {
    setIsLoading(true);

    setTimeout(() => {
      login(
        {
          name: roleObj.name,
          email: roleObj.email,
          role: roleObj.role,
          company: roleObj.company,
          tenantId: currentPlatform === 'crm' ? 'TENANT-08492' : `OAL-${roleObj.id.toUpperCase()}-9910`,
        },
        currentPlatform
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
    executeLogin(selectedRole);
  };

  const primaryThemeColor = currentPlatform === 'crm' ? '#1d4ed8' : '#0f766e';
  const primaryLightBg = currentPlatform === 'crm' ? 'var(--primary-light)' : 'var(--accent-light)';

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        backgroundImage: currentPlatform === 'crm'
          ? 'radial-gradient(circle at 50% 0%, rgba(29, 78, 216, 0.03) 0%, transparent 65%)'
          : 'radial-gradient(circle at 50% 0%, rgba(15, 118, 110, 0.03) 0%, transparent 65%)',
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
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: primaryThemeColor,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '14px',
                fontFamily: 'var(--font-display)',
              }}
            >
              {currentPlatform === 'crm' ? 'nE' : 'OA'}
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
                  {currentPlatform === 'crm' ? 'CRM nErgy Enterprise Gateway' : 'OAL Network Marketplace Gateway'}
                </h1>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                {currentPlatform === 'crm'
                  ? 'All 5 CRM Role Presets — Select any role on the left to auto-fill & login instantly'
                  : 'All 4 OAL Marketplace Role Presets — Select any persona role to auto-fill & login instantly'}
              </span>
            </div>
          </div>

          {/* Switch Platform Gateway Button */}
          <button
            type="button"
            onClick={handleSwitchPlatform}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = primaryThemeColor; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <span>Switch to {currentPlatform === 'crm' ? 'OAL Network Marketplace Login (4 Roles)' : 'CRM nErgy Enterprise Login (5 Roles)'}</span>
            <ChevronRight size={14} style={{ color: primaryThemeColor }} />
          </button>
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
          {/* Left Panel: All Roles for Current Platform (7 Cols) */}
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
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {currentPlatform === 'crm' ? 'CRM nErgy Roles (5 Presets)' : 'OAL Network Roles (4 Presets)'}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: primaryThemeColor,
                    backgroundColor: primaryLightBg,
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    fontWeight: 600,
                  }}
                >
                  Click any role card to auto-fill credentials
                </span>
              </div>

              {/* Role Cards List for Current Platform */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {roleList.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole.id === r.id;

                  return (
                    <div
                      key={r.id}
                      onClick={() => handleSelectRole(r)}
                      style={{
                        padding: '0.875rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid',
                        borderColor: isSelected ? primaryThemeColor : 'var(--border)',
                        backgroundColor: isSelected ? primaryLightBg : 'var(--surface)',
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
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            backgroundColor: isSelected ? primaryThemeColor : 'var(--surface-secondary)',
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
                              <CheckCircle2 size={14} style={{ color: primaryThemeColor }} />
                            )}
                          </div>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
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
                            padding: '4px 8px',
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
                            handleSelectRole(r);
                            executeLogin(r);
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            padding: '0.4rem 0.875rem',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 600,
                            border: '1px solid',
                            borderColor: isSelected ? primaryThemeColor : 'var(--border)',
                            backgroundColor: isSelected ? primaryThemeColor : 'var(--surface)',
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
              <span>{currentPlatform === 'crm' ? 'Isolated CRM Tenant Database' : 'OAL Marketplace Underwriting Vault'}</span>
              <span style={{ fontWeight: 600, color: primaryThemeColor }}>
                {currentPlatform === 'crm' ? '5 CRM Roles Available' : '4 OAL Roles Available'}
              </span>
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
                    backgroundColor: primaryThemeColor,
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
                  {currentPlatform === 'crm' ? 'nE' : 'OA'}
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
                  Sign in to continue to your {currentPlatform === 'crm' ? 'CRM workspace' : 'OAL lending portal'}.
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
                    }}
                  />
                </div>
              </div>

              {/* Form Input: Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                  backgroundColor: primaryThemeColor,
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
