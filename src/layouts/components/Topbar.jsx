import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  Building2,
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  FileText,
  CreditCard,
  MessageSquare,
  Users,
  Target,
  Kanban,
  CheckSquare,
  Boxes,
  UserCheck,
  ArrowRight,
  X,
  Command,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth, crmRoles, oalRoles } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from '../../components/ui/Dropdown';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { mockNotifications } from '../../data/mockData';
import { useNavigate, useLocation } from 'react-router-dom';
import { isRouteAllowed, getDefaultRouteForRole } from '../../utils/rbac';

export const Topbar = ({ onToggleSidebar, product = 'crm' }) => {
  const { theme, toggleTheme } = useTheme();
  const { crmUser, oalUser, switchRole, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  const currentUser = product === 'crm' ? crmUser : oalUser;
  const availableRoles = product === 'crm' ? crmRoles : oalRoles;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K to open Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Focus input on modal open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isSearchOpen]);

  const handleLogout = () => {
    logout(product);
    addToast({
      title: 'Logged Out',
      message: `Signed out of ${product === 'crm' ? 'CRM nErgy' : 'OAL Network'}.`,
      type: 'info',
    });
    navigate(product === 'crm' ? '/crm/login' : '/oal/login');
  };

  const handleSwitchRole = (roleObj) => {
    const updated = switchRole(roleObj, product);

    if (!isRouteAllowed(location.pathname, product, updated)) {
      const defaultRoute = getDefaultRouteForRole(product, updated);
      navigate(defaultRoute);
    }

    addToast({
      title: 'Role Switched Successfully',
      message: `Active profile: ${updated.name} (${updated.role})`,
      type: 'success',
    });
  };

  // Comprehensive Global Search Index Database
  const getSearchDatabase = () => {
    if (product === 'crm') {
      return [
        { id: 'crm-dash', title: 'Executive Dashboard', subtitle: 'Revenue, Pipeline & KPI overview', category: 'Navigation', icon: LayoutDashboard, path: '/crm/dashboard' },
        { id: 'crm-contacts', title: 'Contacts & Accounts', subtitle: 'Directory of enterprise customer accounts', category: 'Navigation', icon: Users, path: '/crm/contacts' },
        { id: 'crm-leads', title: 'Leads Directory', subtitle: 'Inbound sales prospect pipeline', category: 'Navigation', icon: Target, path: '/crm/leads' },
        { id: 'crm-pipeline', title: 'Sales Pipeline', subtitle: 'Visual deal Kanban stage manager', category: 'Navigation', icon: Kanban, path: '/crm/pipeline' },
        { id: 'crm-tasks', title: 'Tasks & Reminders', subtitle: 'Assigned workflow items & deadlines', category: 'Navigation', icon: CheckSquare, path: '/crm/tasks' },
        { id: 'crm-comm', title: 'Communication Hub', subtitle: 'Direct email & message center', category: 'Navigation', icon: MessageSquare, path: '/crm/communication' },
        { id: 'crm-erp', title: 'ERP & Operations', subtitle: 'Procurement, inventory & sales orders', category: 'Navigation', icon: Boxes, path: '/crm/erp' },
        { id: 'crm-hr', title: 'HR & Employees', subtitle: 'Staff directory & onboarding', category: 'Navigation', icon: UserCheck, path: '/crm/hr' },
        { id: 'crm-ai', title: 'AI Studio', subtitle: 'Generative CRM copilot & prompts', category: 'Navigation', icon: Sparkles, path: '/crm/ai-studio' },
        { id: 'crm-reports', title: 'Reports & Analytics', subtitle: 'Executive financial summaries', category: 'Navigation', icon: FileText, path: '/crm/reports' },
        { id: 'crm-profile', title: 'My Profile & Avatar', subtitle: 'Personal account & photo settings', category: 'Navigation', icon: User, path: '/crm/profile' },
        
        { id: 'deal-1', title: 'Apex Global Deal ($450,000)', subtitle: 'Negotiation Stage • Enterprise Software', category: 'Deals & Accounts', icon: Target, path: '/crm/pipeline' },
        { id: 'deal-2', title: 'Vanguard Capital Expansion ($1.2M)', subtitle: 'Contract Signed • Tier 1 Client', category: 'Deals & Accounts', icon: Target, path: '/crm/pipeline' },
        { id: 'contact-sarah', title: 'Sarah Jenkins (VP of Sales)', subtitle: 's.jenkins@nergy.io • Active Lead', category: 'Team & Contacts', icon: Users, path: '/crm/contacts' },
        { id: 'contact-david', title: 'David Chen (Finance Director)', subtitle: 'd.chen@nergy.io • Lead Controller', category: 'Team & Contacts', icon: Users, path: '/crm/contacts' },
      ];
    }

    // OAL Network Marketplace Search Index
    return [
      // Navigation Modules
      { id: 'oal-dash', title: 'Borrower Overview Dashboard', subtitle: '11-Stage lifecycle & credit telemetry', category: 'Navigation', icon: LayoutDashboard, path: '/oal/borrower/dashboard' },
      { id: 'oal-kyc', title: 'KYC Vault & Legal Documents', subtitle: 'Verified corporate certificates & SHA-256 seal', category: 'Navigation', icon: ShieldCheck, path: '/oal/borrower/kyc' },
      { id: 'oal-app', title: 'Commercial Loan Application', subtitle: 'Multi-stage debt borrowing request wizard', category: 'Navigation', icon: FileText, path: '/oal/borrower/application' },
      { id: 'oal-offers', title: 'Lender Offers Marketplace', subtitle: 'Active competitive institutional term sheets', category: 'Navigation', icon: CreditCard, path: '/oal/borrower/offers' },
      { id: 'oal-score', title: 'AI Risk Rating (792 / 850)', subtitle: 'Grade A+ institutional credit profile', category: 'Navigation', icon: Sparkles, path: '/oal/borrower/score' },
      { id: 'oal-messages', title: 'Messages & Underwriter Chat', subtitle: 'Direct channel with Sarah Jenkins & lender desks', category: 'Navigation', icon: MessageSquare, path: '/oal/borrower/messages' },
      { id: 'oal-profile', title: 'My Profile & Corporate Signatory', subtitle: 'Dr. Aris Thorne • Photo & personal details', category: 'Navigation', icon: User, path: '/oal/borrower/profile' },

      // Active Lender Offers
      { id: 'offer-1', title: 'Vanguard Capital ($750,000 at 5.2% APR)', subtitle: 'Term Sheet #VC-DEBT-9021 • 36 Months • Secured Senior Debt', category: 'Lender Proposals', icon: CreditCard, path: '/oal/borrower/offers' },
      { id: 'offer-2', title: 'Apex Global Credit Desk ($1,200,000 at 4.8% APR)', subtitle: 'Term Sheet #AG-DEBT-4410 • 48 Months • Lowest Interest Offer', category: 'Lender Proposals', icon: CreditCard, path: '/oal/borrower/offers' },
      { id: 'offer-3', title: 'Hyperion Senior Debt Partners ($950,000 at 5.6% APR)', subtitle: 'Term Sheet #HY-DEBT-8120 • 24 Months • Equipment Backed', category: 'Lender Proposals', icon: CreditCard, path: '/oal/borrower/offers' },

      // Desks & Underwriters
      { id: 'agent-sarah', title: 'Sarah Jenkins (Assigned Underwriter)', subtitle: 'OAL Licensed Representative • Online Now', category: 'Desks & Agents', icon: UserCheck, path: '/oal/borrower/messages' },
      { id: 'desk-vanguard', title: 'Vanguard Capital Deal Team', subtitle: 'Institutional Syndication Desk • Direct Channel', category: 'Desks & Agents', icon: Building2, path: '/oal/borrower/messages' },
      { id: 'desk-apex', title: 'Apex Global Risk Reviewer', subtitle: 'Senior Underwriting Desk', category: 'Desks & Agents', icon: Building2, path: '/oal/borrower/messages' },

      // Verified Corporate Documents
      { id: 'doc-goodstanding', title: 'Certificate of Good Standing (Delaware)', subtitle: 'State Division of Corporations • Entity #7749201', category: 'Verified Documents', icon: ShieldCheck, path: '/oal/borrower/kyc' },
      { id: 'doc-incorp', title: 'Articles of Incorporation (BioGenix Labs Inc.)', subtitle: 'Certified Corporate Entity Record', category: 'Verified Documents', icon: FileText, path: '/oal/borrower/kyc' },
      { id: 'doc-fincen', title: 'FinCEN Beneficial Ownership Compliance Record', subtitle: 'Federal CDD Cryptographic Attestation', category: 'Verified Documents', icon: ShieldCheck, path: '/oal/borrower/kyc' },
    ];
  };

  const allRecords = getSearchDatabase();

  // Filter records based on real-time search query
  const searchResults = searchQuery.trim()
    ? allRecords.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectResult = (item) => {
    navigate(item.path);
    setIsSearchOpen(false);
    setSearchQuery('');
    addToast({
      title: 'Navigated to ' + item.title,
      type: 'info',
    });
  };

  // Group search results by category
  const groupedResults = searchResults.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <header
      style={{
        height: 'var(--topbar-height)',
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Left: Mobile Menu + Brand Logo (Fits within 240px sidebar section) */}
      <div style={{ minWidth: '220px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          icon={Menu}
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
        />

        <div
          onClick={() => navigate(product === 'crm' ? '/crm/dashboard' : '/oal/dashboard')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: product === 'crm' ? '#1d4ed8' : '#0f766e',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '14px',
              fontFamily: 'var(--font-display)',
              flexShrink: 0,
            }}
          >
            {product === 'crm' ? 'nE' : 'OA'}
          </div>

          <div className="flex flex-col min-w-0">
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '15px',
                lineHeight: 1.1,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              {product === 'crm' ? 'CRM nErgy' : 'OAL Network'}
            </span>
            <span
              className="hidden-mobile"
              style={{
                fontSize: '10px',
                color: 'var(--text-tertiary)',
                fontWeight: 600,
                marginTop: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              {product === 'crm' ? 'Executive Platform' : 'Lending Marketplace'}
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Pill Global Search Input with Command Palette Trigger */}
      <div className="hidden-mobile flex-1" style={{ maxWidth: '440px', margin: '0 2rem' }}>
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
          style={{
            height: '38px',
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Search size={16} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }} className="truncate">
              Search modules, lenders, offers, docs...
            </span>
          </div>
        </button>
      </div>

      {/* Right Actions: Notifications, Theme Toggle, User Profile */}
      <div className="flex items-center gap-2 ml-auto" style={{ marginLeft: 'auto' }}>
        {/* Notifications Dropdown (Badge 8) */}
        <Dropdown
          trigger={
            <button
              type="button"
              className="flex items-center justify-center rounded-full transition-colors cursor-pointer"
              style={{
                width: '36px',
                height: '36px',
                position: 'relative',
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
              title="Notifications"
            >
              <Bell size={18} />
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: 800,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                  border: '2px solid var(--surface)',
                }}
              >
                8
              </span>
            </button>
          }
        >
          <DropdownHeader>Notifications (8 Unread)</DropdownHeader>
          {mockNotifications.map((n) => (
            <DropdownItem
              key={n.id}
              onClick={() => addToast({ title: 'Notification Opened', message: n.title, type: 'info' })}
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-xs text-primary">{n.title}</span>
                <span className="text-tertiary text-xs">{n.time}</span>
              </div>
            </DropdownItem>
          ))}
          <DropdownDivider />
          <DropdownItem onClick={() => addToast({ title: 'Notifications', message: 'All notifications marked as read.', type: 'success' })}>
            Mark all as read
          </DropdownItem>
        </Dropdown>

        {/* Theme Toggle Button - Prominent & Right next to Profile */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center justify-center rounded-full transition-colors cursor-pointer"
          style={{
            width: '36px',
            height: '36px',
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            padding: 0,
          }}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? (
            <Moon size={20} style={{ color: 'var(--text-primary)' }} />
          ) : (
            <Sun size={20} style={{ color: '#f59e0b' }} />
          )}
        </button>

        {/* User Profile Dropdown with Role Switcher */}
        <Dropdown
          trigger={
            <div
              className="flex items-center gap-2 cursor-pointer px-2.5 py-1 rounded-full transition-colors"
              style={{ backgroundColor: 'var(--surface-hover)', border: '1px solid var(--border)' }}
            >
              <Avatar name={currentUser?.name || 'Alexander Wright'} src={currentUser?.avatar} size="sm" status="online" />
              <div className="hidden-mobile flex flex-col text-left">
                <span className="font-bold text-xs text-primary leading-tight">{currentUser?.name || 'Alexander Wright'}</span>
                <span className="text-tertiary text-xs leading-none" style={{ fontSize: '10px', marginTop: '2px' }}>
                  {currentUser?.role || 'Company Owner'}
                </span>
              </div>
              <ChevronDown size={14} className="text-tertiary hidden-mobile ml-0.5" />
            </div>
          }
        >
          <DropdownHeader>
            <div className="flex flex-col gap-1 py-0.5">
              <span className="font-bold text-xs text-primary">{currentUser?.name || 'Alexander Wright'}</span>
              <span className="text-tertiary text-xs">{currentUser?.company || 'nErgy Enterprise'}</span>
            </div>
          </DropdownHeader>

          <DropdownItem icon={User} onClick={() => navigate(product === 'crm' ? '/crm/profile' : '/oal/borrower/profile')}>
            Account Profile
          </DropdownItem>
          <DropdownItem icon={Building2} onClick={() => addToast({ title: 'Tenant Vault', message: `Tenant ID: ${currentUser?.tenantId || 'TENANT-08492'}`, type: 'info' })}>
            Workspace Vault
          </DropdownItem>

          <DropdownDivider />

          <DropdownItem icon={LogOut} danger onClick={handleLogout}>
            Log Out ({product.toUpperCase()})
          </DropdownItem>
        </Dropdown>
      </div>

      {/* Modern Global Spotlight Search Modal / Command Palette */}
      {isSearchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(4px)',
            zIndex: 'var(--z-modal)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '4rem 1rem 1rem 1rem',
          }}
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '620px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '80vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Search Input Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
              }}
            >
              <Search size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={product === 'crm' ? "Type to search CRM modules, deals, contacts..." : "Type to search KYC, loan offers, underwriter desks, docs..."}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  fontWeight: 500,
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-tertiary)',
                    cursor: 'pointer',
                    padding: '2px',
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Results Body */}
            <div style={{ overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* If search query is empty -> Show Quick Suggestions */}
              {!searchQuery.trim() && (
                <div className="flex flex-col gap-2">
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 0.5rem' }}>
                    Quick Suggestions
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.5rem' }}>
                    {(product === 'crm' ? [
                      { title: 'Sales Pipeline', icon: Kanban, path: '/crm/pipeline' },
                      { title: 'Contacts Directory', icon: Users, path: '/crm/contacts' },
                      { title: 'AI Studio', icon: Sparkles, path: '/crm/ai-studio' },
                      { title: 'My Profile', icon: User, path: '/crm/profile' },
                    ] : [
                      { title: 'KYC Vault', icon: ShieldCheck, path: '/oal/borrower/kyc' },
                      { title: 'Lender Offers', icon: CreditCard, path: '/oal/borrower/offers' },
                      { title: 'AI Risk Rating', icon: Sparkles, path: '/oal/borrower/score' },
                      { title: 'My Profile', icon: User, path: '/oal/borrower/profile' },
                    ]).map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          onClick={() => {
                            navigate(item.path);
                            setIsSearchOpen(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '10px',
                            backgroundColor: 'var(--surface-secondary)',
                            border: '1px solid var(--border)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                          className="hover:surface-hover"
                        >
                          <Icon size={16} style={{ color: 'var(--accent)' }} />
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {item.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* If search query has results */}
              {searchQuery.trim() && Object.keys(groupedResults).length > 0 && (
                Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category} className="flex flex-col gap-1.5">
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 0.5rem' }}>
                      {category}
                    </span>
                    <div className="flex flex-col gap-1">
                      {items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleSelectResult(item)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '0.75rem',
                              padding: '0.65rem 0.85rem',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              backgroundColor: 'transparent',
                              transition: 'all 0.15s ease',
                            }}
                            className="hover:surface-secondary"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '8px',
                                  backgroundColor: 'var(--surface-secondary)',
                                  border: '1px solid var(--border)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'var(--accent)',
                                  flexShrink: 0,
                                }}
                              >
                                <Icon size={16} />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }} className="truncate">
                                  {item.title}
                                </span>
                                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }} className="truncate">
                                  {item.subtitle}
                                </span>
                              </div>
                            </div>

                            <ArrowRight size={14} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}

              {/* If no search results found */}
              {searchQuery.trim() && searchResults.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                  <Search size={32} style={{ color: 'var(--text-tertiary)', margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    No results found for "{searchQuery}"
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Try searching for "KYC", "Loan", "Offers", "Score", "Vanguard", or "Profile".
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer with Keyboard Shortcuts Hint */}
            <div
              style={{
                padding: '0.65rem 1.25rem',
                borderTop: '1px solid var(--border)',
                backgroundColor: 'var(--surface-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: 'var(--text-tertiary)',
              }}
            >
              <div className="flex items-center gap-3">
                <span>Navigate <strong>↑↓</strong></span>
                <span>Select <strong>↵</strong></span>
                <span>Close <strong>esc</strong></span>
              </div>
              <Badge variant="neutral" style={{ fontSize: '10px' }}>
                Instant Spotlight Index
              </Badge>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
