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
  Layers,
  Sliders,
  FileCheck,
  Lock,
  DollarSign,
  Download,
  HelpCircle,
  Zap,
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
  const [activeCategory, setActiveCategory] = useState('All');

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
      setActiveCategory('All');
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

  // Comprehensive Global Search Index Database (30+ searchable records)
  const getSearchDatabase = () => {
    if (product === 'crm') {
      return [
        { id: 'crm-dash', title: 'Executive Dashboard', subtitle: 'Revenue, Pipeline, Team KPI & Performance overview', category: 'Pages & Modules', icon: LayoutDashboard, path: '/crm/dashboard', tags: 'home main analytics kpi' },
        { id: 'crm-contacts', title: 'Contacts & Enterprise Accounts', subtitle: 'Global directory of corporate client accounts', category: 'Pages & Modules', icon: Users, path: '/crm/contacts', tags: 'customers clients phone email people' },
        { id: 'crm-leads', title: 'Inbound Leads Directory', subtitle: 'Prospect qualification, lead scoring & acquisition', category: 'Pages & Modules', icon: Target, path: '/crm/leads', tags: 'inbound prospects conversion deals' },
        { id: 'crm-pipeline', title: 'Sales Pipeline (Kanban)', subtitle: 'Visual deal Kanban stage manager & velocity tracking', category: 'Pages & Modules', icon: Kanban, path: '/crm/pipeline', tags: 'deals stages closing revenue' },
        { id: 'crm-tasks', title: 'Tasks & Workflow Reminders', subtitle: 'Assigned workflow items, deadlines & task alerts', category: 'Pages & Modules', icon: CheckSquare, path: '/crm/tasks', tags: 'todo deadlines calendar followups' },
        { id: 'crm-comm', title: 'Communication Hub', subtitle: 'Direct email, omnichannel inbox & client message center', category: 'Pages & Modules', icon: MessageSquare, path: '/crm/communication', tags: 'email chat inbox call messages' },
        { id: 'crm-erp', title: 'ERP & Operations Center', subtitle: 'Procurement, inventory tracking, bill of materials & sales orders', category: 'Pages & Modules', icon: Boxes, path: '/crm/erp', tags: 'inventory supply chain orders procurement' },
        { id: 'crm-hr', title: 'HR & Recruiting Directory', subtitle: 'Employee lifecycle, candidate interviews & staff roster', category: 'Pages & Modules', icon: UserCheck, path: '/crm/hr', tags: 'hiring employees payroll team staff' },
        { id: 'crm-ai', title: 'AI Content Studio & Copilot', subtitle: 'Generative CRM copilot, email writer & workflow automations', category: 'Pages & Modules', icon: Sparkles, path: '/crm/ai-studio', tags: 'artificial intelligence prompts copy copilot' },
        { id: 'crm-reports', title: 'Reports & Executive Analytics', subtitle: 'Executive financial summaries & audit reports', category: 'Pages & Modules', icon: FileText, path: '/crm/reports', tags: 'charts metrics exports pdf revenue' },
        { id: 'crm-profile', title: 'My Profile & Avatar Settings', subtitle: 'Personal account details, photo upload & credentials', category: 'Pages & Modules', icon: User, path: '/crm/profile', tags: 'profile photo picture name email password' },
        
        { id: 'deal-1', title: 'Apex Global SaaS Deal ($450,000)', subtitle: 'Negotiation Stage • Enterprise 3-Year Software Contract', category: 'Deals & Accounts', icon: Target, path: '/crm/pipeline', tags: 'apex 450k saas negotiation' },
        { id: 'deal-2', title: 'Vanguard Capital Expansion ($1,200,000)', subtitle: 'Contract Signed • Tier 1 Financial Institutional Client', category: 'Deals & Accounts', icon: Target, path: '/crm/pipeline', tags: 'vanguard 1.2m expansion closed' },
        { id: 'deal-3', title: 'Hyperion Logistics Automation ($850,000)', subtitle: 'Proposal Review • Supply Chain Enterprise Fleet', category: 'Deals & Accounts', icon: Target, path: '/crm/pipeline', tags: 'hyperion 850k logistics proposal' },

        { id: 'contact-sarah', title: 'Sarah Jenkins (VP of Sales)', subtitle: 's.jenkins@nergy.io • Lead Manager & Deal Closer', category: 'Team & Contacts', icon: Users, path: '/crm/contacts', tags: 'sarah sales vp email' },
        { id: 'contact-david', title: 'David Chen (Finance Director)', subtitle: 'd.chen@nergy.io • Lead Controller & Treasury Audit', category: 'Team & Contacts', icon: Users, path: '/crm/contacts', tags: 'david finance director controller' },
        { id: 'contact-elena', title: 'Elena Rostova (HR Manager)', subtitle: 'e.rostova@nergy.io • Talent Acquisition Lead', category: 'Team & Contacts', icon: Users, path: '/crm/contacts', tags: 'elena hr recruiting staff' },

        { id: 'act-theme', title: 'Switch Color Theme (Dark / Light)', subtitle: `Currently set to ${theme} mode`, category: 'Quick Actions', icon: Sun, action: toggleTheme, tags: 'theme dark light mode color' },
        { id: 'act-photo', title: 'Upload / Change Profile Picture', subtitle: 'Set custom avatar photo and update profile credentials', category: 'Quick Actions', icon: User, path: '/crm/profile', tags: 'pic photo avatar upload' },
      ];
    }

    // OAL Network Marketplace Search Index
    return [
      // 1. Pages & Core Modules
      { id: 'oal-dash', title: 'Borrower Overview Dashboard', subtitle: '11-Stage loan lifecycle & credit telemetry overview', category: 'Pages & Modules', icon: LayoutDashboard, path: '/oal/borrower/dashboard', tags: 'home main overview telemetry lifecycle' },
      { id: 'oal-kyc', title: 'KYC Vault & Corporate Identity', subtitle: 'Verified Delaware certificates, EIN & SHA-256 seal', category: 'Pages & Modules', icon: ShieldCheck, path: '/oal/borrower/kyc', tags: 'fincen kyc documents certificate identity seal' },
      { id: 'oal-app', title: 'Commercial Loan Application', subtitle: 'Multi-stage debt borrowing request & collateral wizard', category: 'Pages & Modules', icon: FileText, path: '/oal/borrower/application', tags: 'apply borrow facility request application' },
      { id: 'oal-offers', title: 'Lender Offers Marketplace', subtitle: '3 competitive institutional term sheets (Vanguard, Apex, Hyperion)', category: 'Pages & Modules', icon: CreditCard, path: '/oal/borrower/offers', tags: 'proposals offers interest rate term sheet debt capital' },
      { id: 'oal-score', title: 'AI Risk Rating Scorecard (792 / 850)', subtitle: 'Grade A+ institutional creditworthiness rating & metrics', category: 'Pages & Modules', icon: Sparkles, path: '/oal/borrower/score', tags: 'ai score risk grade credit 792 rating telemetry' },
      { id: 'oal-messages', title: 'Messages & Underwriter Chat', subtitle: 'Direct real-time channel with Sarah Jenkins & deal desks', category: 'Pages & Modules', icon: MessageSquare, path: '/oal/borrower/messages', tags: 'chat agent underwriter sarah inbox talk conversation' },
      { id: 'oal-referrals', title: 'Broker Referrals & Partner Desk', subtitle: 'Invite corporate affiliates and track syndication commissions', category: 'Pages & Modules', icon: Users, path: '/oal/borrower/referrals', tags: 'referral partner commission broker' },
      { id: 'oal-support', title: 'Borrower Help & Underwriting Support', subtitle: 'Institutional SLA escalation desk & ticketing', category: 'Pages & Modules', icon: HelpCircle, path: '/oal/borrower/support', tags: 'help ticket support contact desk' },
      { id: 'oal-profile', title: 'My Profile & Corporate Signatory', subtitle: 'Dr. Aris Thorne • Photo upload & signatory credentials', category: 'Pages & Modules', icon: User, path: '/oal/borrower/profile', tags: 'profile photo signatory pic name aris email 2fa' },

      // 2. Active Institutional Loan Offers & Term Sheets
      { id: 'offer-1', title: 'Vanguard Capital Debt Fund ($750,000)', subtitle: '5.20% APR • 36 Months • Secured Senior Facility (Term Sheet #VC-9021)', category: 'Loan Term Sheets', icon: CreditCard, path: '/oal/borrower/offers', tags: 'vanguard 750k 750000 5.2% apr term sheet senior debt' },
      { id: 'offer-2', title: 'Apex Global Credit Desk ($1,200,000)', subtitle: '4.80% APR • 48 Months • Lowest Interest Term Sheet (#AG-4410)', category: 'Loan Term Sheets', icon: CreditCard, path: '/oal/borrower/offers', tags: 'apex 1.2m 1200000 4.8% lowest interest term sheet' },
      { id: 'offer-3', title: 'Hyperion Senior Debt Partners ($950,000)', subtitle: '5.60% APR • 24 Months • Equipment-Backed Liquidity (#HY-8120)', category: 'Loan Term Sheets', icon: CreditCard, path: '/oal/borrower/offers', tags: 'hyperion 950k 950000 5.6% equipment collateral debt' },
      { id: 'offer-4', title: 'BlueRock Commercial Credit Line ($500,000)', subtitle: '6.10% APR • 12 Months • Revolving Working Capital Line', category: 'Loan Term Sheets', icon: CreditCard, path: '/oal/borrower/offers', tags: 'bluerock 500k 500000 6.1% revolving credit' },
      { id: 'offer-5', title: 'Silicon Valley Debt Syndicate ($2,000,000)', subtitle: '5.00% APR • 60 Months • Multi-Facility Growth Debt', category: 'Loan Term Sheets', icon: CreditCard, path: '/oal/borrower/offers', tags: 'silicon valley 2m 2000000 5% growth debt facility' },

      // 3. 11-Stage Application Lifecycle Steps
      { id: 'stage-1', title: 'Stage 1: Entity Onboarding & Registration', subtitle: 'BioGenix Labs Inc. corporate account verification', category: 'Lifecycle Stages', icon: Layers, path: '/oal/borrower/dashboard', tags: 'stage 1 onboarding registration entity' },
      { id: 'stage-2', title: 'Stage 2: KYC & FinCEN Beneficial Ownership', subtitle: 'Verified cryptographic SHA-256 seal & compliance', category: 'Lifecycle Stages', icon: ShieldCheck, path: '/oal/borrower/kyc', tags: 'stage 2 kyc fincen beneficial ownership' },
      { id: 'stage-3', title: 'Stage 3: Corporate Financial Audit & P&L', subtitle: 'FY 2024 Audited Statements by Deloitte', category: 'Lifecycle Stages', icon: FileText, path: '/oal/borrower/kyc', tags: 'stage 3 financials tax returns balance sheet' },
      { id: 'stage-4', title: 'Stage 4: Equipment & Collateral Appraisal', subtitle: '$4.2M Laboratory machinery & asset valuation', category: 'Lifecycle Stages', icon: Boxes, path: '/oal/borrower/application', tags: 'stage 4 appraisal equipment machinery collateral' },
      { id: 'stage-5', title: 'Stage 5: AI Risk Score Generation (792/850)', subtitle: 'Grade A+ credit telemetry computed in real time', category: 'Lifecycle Stages', icon: Sparkles, path: '/oal/borrower/score', tags: 'stage 5 ai risk score 792 rating credit' },
      { id: 'stage-6', title: 'Stage 6: Institutional Marketplace Syndication', subtitle: '3 competitive proposals submitted by Tier-1 lenders', category: 'Lifecycle Stages', icon: CreditCard, path: '/oal/borrower/offers', tags: 'stage 6 syndication lenders competing marketplace' },
      { id: 'stage-7', title: 'Stage 7: Term Sheet Negotiation & Covenants', subtitle: 'Inspecting legal covenants, APR & amortizations', category: 'Lifecycle Stages', icon: Sliders, path: '/oal/borrower/offers', tags: 'stage 7 covenants term sheet negotiation compare' },
      { id: 'stage-8', title: 'Stage 8: Underwriting Due Diligence & Approval', subtitle: 'Lead underwriter review by Sarah Jenkins', category: 'Lifecycle Stages', icon: UserCheck, path: '/oal/borrower/messages', tags: 'stage 8 underwriting approval due diligence desk' },
      { id: 'stage-9', title: 'Stage 9: Facility Digital Execution (DocuSign)', subtitle: 'Authorized digital signature by Dr. Aris Thorne', category: 'Lifecycle Stages', icon: FileCheck, path: '/oal/borrower/offers', tags: 'stage 9 execute docusign contract signature' },
      { id: 'stage-10', title: 'Stage 10: Perfection of Collateral & UCC-1', subtitle: 'State lien filing & institutional closing audit', category: 'Lifecycle Stages', icon: Lock, path: '/oal/borrower/dashboard', tags: 'stage 10 lien ucc-1 closing audit perfection' },
      { id: 'stage-11', title: 'Stage 11: Capital Disbursement & Wire Release', subtitle: 'Direct Fedwire funding to corporate treasury', category: 'Lifecycle Stages', icon: DollarSign, path: '/oal/borrower/dashboard', tags: 'stage 11 wire transfer disbursement funding release' },

      // 4. Contacts, Desks & Underwriters
      { id: 'agent-sarah', title: 'Sarah Jenkins (Assigned Lead Underwriter)', subtitle: 'OAL Licensed Representative • Status: Active & Online', category: 'Desks & Agents', icon: UserCheck, path: '/oal/borrower/messages', tags: 'sarah jenkins underwriter agent rep contact' },
      { id: 'contact-aris', title: 'Dr. Aris Thorne (CEO & Signatory)', subtitle: 'BioGenix Labs Inc. • Authorized Primary Signatory', category: 'Desks & Agents', icon: User, path: '/oal/borrower/profile', tags: 'aris thorne ceo founder borrower user' },
      { id: 'desk-vanguard', title: 'Vanguard Capital Syndication Desk', subtitle: 'Marcus Sterling (Managing Director) • Term Sheet #VC-9021', category: 'Desks & Agents', icon: Building2, path: '/oal/borrower/messages', tags: 'vanguard marcus sterling lender desk direct' },
      { id: 'desk-apex', title: 'Apex Global Credit Committee Desk', subtitle: 'Senior Underwriting Committee • Term Sheet #AG-4410', category: 'Desks & Agents', icon: Building2, path: '/oal/borrower/messages', tags: 'apex committee desk underwriter' },
      { id: 'desk-hyperion', title: 'Hyperion Debt Collateral Desk', subtitle: 'Asset & Equipment Evaluation Division', category: 'Desks & Agents', icon: Building2, path: '/oal/borrower/messages', tags: 'hyperion desk collateral asset' },

      // 5. Verified Corporate Legal Documents
      { id: 'doc-goodstanding', title: 'Certificate of Good Standing (Delaware)', subtitle: 'Delaware Division of Corporations • Entity File #7749201', category: 'Verified Documents', icon: ShieldCheck, path: '/oal/borrower/kyc', tags: 'delaware certificate good standing entity state' },
      { id: 'doc-incorp', title: 'Articles of Incorporation (BioGenix Labs Inc.)', subtitle: 'Official State Certified Corporate Bylaws & Entity Seal', category: 'Verified Documents', icon: FileText, path: '/oal/borrower/kyc', tags: 'articles incorporation bylaws corporate charter' },
      { id: 'doc-fincen', title: 'FinCEN Beneficial Ownership Compliance Attestation', subtitle: 'Federal CDD Cryptographic SHA-256 Hash Verification', category: 'Verified Documents', icon: ShieldCheck, path: '/oal/borrower/kyc', tags: 'fincen cdd beneficial ownership compliance federal' },
      { id: 'doc-audit', title: 'Audited Balance Sheet & Financial Statements', subtitle: 'FY 2024 Comprehensive Audit by Deloitte LLP', category: 'Verified Documents', icon: FileCheck, path: '/oal/borrower/kyc', tags: 'deloitte audit balance sheet financials p&l tax' },
      { id: 'doc-appraisal', title: 'Clinical Equipment & Lab Machinery Appraisal', subtitle: '$4.2M Independent Certified Physical Asset Valuation', category: 'Verified Documents', icon: FileText, path: '/oal/borrower/application', tags: 'machinery lab equipment appraisal 4.2m valuation' },

      // 6. Quick System Actions
      { id: 'act-theme', title: 'Toggle Theme (Switch to ' + (theme === 'light' ? 'Dark' : 'Light') + ' Mode)', subtitle: 'Switch system appearance and contrast', category: 'Quick Actions', icon: Sun, action: toggleTheme, tags: 'theme dark light mode color sun moon' },
      { id: 'act-photo', title: 'Upload / Change My Profile Picture', subtitle: 'Upload new avatar photo and edit signatory credentials', category: 'Quick Actions', icon: User, path: '/oal/borrower/profile', tags: 'pic photo avatar upload picture profile' },
      { id: 'act-chat', title: 'Start Real-time Chat with Sarah Jenkins', subtitle: 'Open direct encrypted underwriting messaging channel', category: 'Quick Actions', icon: MessageSquare, path: '/oal/borrower/messages', tags: 'chat message talk sarah underwriter' },
      { id: 'act-offers', title: 'Compare Competitive Institutional Term Sheets', subtitle: 'Inspect Vanguard, Apex & Hyperion interest rates & APRs', category: 'Quick Actions', icon: CreditCard, path: '/oal/borrower/offers', tags: 'compare offers rate terms debt' },
      { id: 'act-kyc', title: 'Export KYC Verification Compliance Record', subtitle: 'Download certified cryptographic identity report', category: 'Quick Actions', icon: Download, path: '/oal/borrower/kyc', tags: 'export download pdf kyc certificate' },
    ];
  };

  const allRecords = getSearchDatabase();

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(allRecords.map((r) => r.category)))];

  // Filter records based on category & search query
  const filteredRecords = allRecords.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.tags && item.tags.toLowerCase().includes(q))
    );
  });

  const handleSelectResult = (item) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
    setIsSearchOpen(false);
    setSearchQuery('');
    addToast({
      title: 'Opened ' + item.title,
      type: 'info',
    });
  };

  // Group search results by category
  const groupedResults = filteredRecords.reduce((acc, item) => {
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
      {/* Left: Brand Logo + Text + Toggle Menu Button (Fits strictly within sidebar section) */}
      <div style={{ minWidth: '200px', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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

        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          icon={Menu}
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
        />
      </div>

      {/* Middle: Crisp Global Search Input */}
      <div className="hidden-mobile flex-1" style={{ maxWidth: '420px', margin: '0 1.5rem' }}>
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between transition-all"
          style={{
            height: '38px',
            padding: '0 1.15rem',
            cursor: 'pointer',
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
            boxSizing: 'border-box',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--primary-border)';
            e.currentTarget.style.backgroundColor = 'var(--surface)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.backgroundColor = 'var(--surface-secondary)';
          }}
        >
          <div className="flex items-center gap-3">
            <Search size={15} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Search...
            </span>
          </div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--text-tertiary)',
              backgroundColor: 'var(--surface)',
              padding: '2px 6px',
              borderRadius: '5px',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ⌘K
          </span>
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

      {/* Massive Global Spotlight Search Modal / Command Palette */}
      {isSearchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(5px)',
            zIndex: 'var(--z-modal)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '3.5rem 1rem 1rem 1rem',
          }}
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '82vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Top Search Input Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.1rem 1.25rem',
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
                placeholder="Search..."
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '16px',
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

            {/* 2. Interactive Category Filter Tabs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1rem',
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'var(--surface-secondary)',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}
            >
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? 'var(--accent)' : 'var(--surface)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* 3. Comprehensive Results Body */}
            <div style={{ overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {Object.keys(groupedResults).length > 0 ? (
                Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between px-1">
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {category} ({items.length})
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      {items.map((item) => {
                        const Icon = item.icon || FileText;
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleSelectResult(item)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '0.75rem',
                              padding: '0.7rem 0.85rem',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              backgroundColor: 'transparent',
                              border: '1px solid transparent',
                              transition: 'all 0.15s ease',
                            }}
                            className="hover:surface-secondary"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--surface-secondary)';
                              e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.borderColor = 'transparent';
                            }}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                style={{
                                  width: '34px',
                                  height: '34px',
                                  borderRadius: '9px',
                                  backgroundColor: 'var(--surface)',
                                  border: '1px solid var(--border)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'var(--accent)',
                                  flexShrink: 0,
                                }}
                              >
                                <Icon size={17} />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }} className="truncate">
                                  {item.title}
                                </span>
                                <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }} className="truncate">
                                  {item.subtitle}
                                </span>
                              </div>
                            </div>

                            <ArrowRight size={15} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <Search size={36} style={{ color: 'var(--text-tertiary)', margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    No matching records found for "{searchQuery}"
                  </div>
                  <div className="text-secondary" style={{ fontSize: '12px', marginTop: '4px' }}>
                    Try searching for keywords like "KYC", "Loan", "750k", "Vanguard", "Sarah", "Appraisal", "Delaware", or "Score".
                  </div>
                </div>
              )}
            </div>

            {/* 4. Modal Footer with Keyboard Shortcuts Hint */}
            <div
              style={{
                padding: '0.75rem 1.25rem',
                borderTop: '1px solid var(--border)',
                backgroundColor: 'var(--surface-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11.5px',
                color: 'var(--text-tertiary)',
              }}
            >
              <div className="flex items-center gap-3 font-medium">
                <span>Select <strong>↵ Click</strong></span>
                <span>Filter <strong>Category Tabs</strong></span>
                <span>Close <strong>esc</strong></span>
              </div>
              <Badge variant="neutral" style={{ fontSize: '10px', fontWeight: 700 }}>
                {filteredRecords.length} Indexed System Records
              </Badge>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
