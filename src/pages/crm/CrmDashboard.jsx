import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Briefcase,
  DollarSign,
  User,
  Plus,
  RefreshCw,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  CheckSquare,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Check,
  Trash2,
  ArrowRight,
  Filter,
  MoreVertical,
  Layers,
  Clock,
  FileText,
  Target,
  Download,
  Activity,
  CheckCircle2,
  Info
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  KPICard,
  Card,
  Badge,
  ProgressBar,
  Modal,
  Input,
  Select,
  Dropdown,
  DropdownItem,
  DropdownHeader,
  DropdownDivider
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

export const CrmDashboard = () => {
  const navigate = useNavigate();
  const {
    contacts,
    addContact,
    leads,
    deals,
    tasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
  } = useCrm();
  const { addToast } = useToast();

  // Primary Dashboard State
  const [activeRange, setActiveRange] = useState('30 Days');
  const [selectedDateLabel, setSelectedDateLabel] = useState('May 12 – May 18, 2025');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Just now');
  const [pipelineMetric, setPipelineMetric] = useState('value'); // 'value' | 'deals' | 'winRate'
  const [activityFilter, setActivityFilter] = useState('all'); // 'all' | 'deals' | 'contacts' | 'leads'
  const [taskFilter, setTaskFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedKpiDetail, setSelectedKpiDetail] = useState(null);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  // Form states for Quick Task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskContact, setNewTaskContact] = useState(contacts[0]?.name || 'Marcus Vance');
  const [newTaskPriority, setNewTaskPriority] = useState('High');
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-03-01');

  // Form states for Quick Contact
  const [newContactName, setNewContactName] = useState('');
  const [newContactCompany, setNewContactCompany] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactType, setNewContactType] = useState('Enterprise Client');

  // Dynamic calculations based on timeframe
  const timeframeMultiplier =
    activeRange === '7 Days' ? 0.6 : activeRange === '30 Days' ? 1.0 : 2.5;

  const totalLeadsDisplay = Math.round(
    Math.max(leads.length, 1) * (activeRange === '7 Days' ? 14 : activeRange === '30 Days' ? 48 : 124)
  );
  const qualifiedOppDisplay = Math.round(342 * timeframeMultiplier);
  const revenueDisplay =
    activeRange === '7 Days' ? '$124,500' : activeRange === '30 Days' ? '$482,900' : '$1,480,000';
  const enterpriseClientCount = contacts.length || 3;

  // Sync Data Handler
  const handleSyncData = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      addToast({
        title: 'Dashboard Refreshed',
        message: 'Live pipeline analytics and tenant telemetry synced successfully.',
        type: 'success',
      });
    }, 600);
  };

  // Quick Task Submit
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      addToast({ title: 'Validation Error', message: 'Please enter a task title.', type: 'error' });
      return;
    }

    addTask({
      title: newTaskTitle,
      contact: newTaskContact,
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
      assignedTo: 'Alexander Wright',
    });

    addToast({
      title: 'Task Created',
      message: `"${newTaskTitle}" scheduled for ${newTaskContact}.`,
      type: 'success',
    });

    setNewTaskTitle('');
    setIsTaskModalOpen(false);
  };

  // Quick Contact Submit
  const handleCreateContact = (e) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactCompany.trim()) {
      addToast({ title: 'Validation Error', message: 'Name and Company are required.', type: 'error' });
      return;
    }

    addContact({
      name: newContactName,
      company: newContactCompany,
      email:
        newContactEmail ||
        `${newContactName.toLowerCase().replace(/\s+/g, '.')}@${newContactCompany
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '')}.com`,
      phone: newContactPhone || '+1 (555) 019-2834',
      type: newContactType,
      status: 'Active',
      owner: 'Alexander Wright',
    });

    addToast({
      title: 'Contact Created',
      message: `${newContactName} (${newContactCompany}) added to enterprise records.`,
      type: 'success',
    });

    setNewContactName('');
    setNewContactCompany('');
    setNewContactEmail('');
    setNewContactPhone('');
    setIsContactModalOpen(false);
  };

  // Pipeline stages data
  const pipelineStages = [
    {
      id: 'negotiation',
      name: 'Negotiation Stage',
      value: '$1.85M',
      dealsCount: '8 Deals',
      winRate: '72% Win Rate',
      pct: 48,
      variant: 'primary',
      badgeColor: '#1d4ed8',
      description: 'Terms and SLA agreements in active legal review',
    },
    {
      id: 'proposal',
      name: 'Proposal Sent',
      value: '$843,000',
      dealsCount: '5 Deals',
      winRate: '54% Win Rate',
      pct: 26,
      variant: 'success',
      badgeColor: '#16a34a',
      description: 'Formal commercial quote submitted to decision makers',
    },
    {
      id: 'qualified',
      name: 'Qualified Opportunities',
      value: '$426,000',
      dealsCount: '4 Deals',
      winRate: '41% Win Rate',
      pct: 18,
      variant: 'warning',
      badgeColor: '#d97706',
      description: 'Technical scope validated, budget confirmed',
    },
    {
      id: 'leads',
      name: 'New Leads Discovery',
      value: '$210,000',
      dealsCount: '3 Deals',
      winRate: '28% Win Rate',
      pct: 8,
      variant: 'info',
      badgeColor: '#0284c7',
      description: 'Initial architectural consultation and capability fit',
    },
  ];

  // Lead channels data
  const leadChannels = [
    {
      id: 'web',
      name: 'Website Direct Forms',
      pct: 42,
      volume: '1,124 leads',
      conversion: '4.8% Conv.',
      badgeVariant: 'primary',
      color: '#1d4ed8',
      cac: '$142 CAC',
      roi: '420% ROI',
      trend: '+12.4% MoM',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn B2B Campaigns',
      pct: 26,
      volume: '702 leads',
      conversion: '6.2% Conv.',
      badgeVariant: 'success',
      color: '#16a34a',
      cac: '$285 CAC',
      roi: '380% ROI',
      trend: '+18.1% MoM',
    },
    {
      id: 'referrals',
      name: 'Referral Partners & Brokers',
      pct: 18,
      volume: '512 leads',
      conversion: '11.5% Conv.',
      badgeVariant: 'info',
      color: '#0284c7',
      cac: '$95 CAC',
      roi: '780% ROI',
      trend: '+8.3% MoM',
    },
    {
      id: 'events',
      name: 'Trade Conferences 2025',
      pct: 13,
      volume: '343 leads',
      conversion: '8.1% Conv.',
      badgeVariant: 'warning',
      color: '#d97706',
      cac: '$410 CAC',
      roi: '290% ROI',
      trend: '+4.5% MoM',
    },
  ];

  // Activity feed items
  const activityItems = [
    {
      id: 'act-1',
      type: 'deals',
      title: 'New Deal Moved to Negotiation',
      description: 'Enterprise Logistics Expansion deal moved by Alexander Wright',
      time: '10 mins ago',
      color: '#1d4ed8',
      badge: 'Deal Update',
      user: 'Alexander Wright',
      meta: 'Value: $480,000 · Probability: 85%',
      route: '/crm/pipeline',
    },
    {
      id: 'act-2',
      type: 'contacts',
      title: 'Contact Record Created',
      description: 'Sofia Rodriguez added to isolated tenant database',
      time: '1 hour ago',
      color: '#16a34a',
      badge: 'New Contact',
      user: 'Sarah Jenkins',
      meta: 'Company: BioGenix Labs · Owner: Sarah Jenkins',
      route: '/crm/contacts',
    },
    {
      id: 'act-3',
      type: 'leads',
      title: 'Lead Status Updated',
      description: 'Samantha Ray moved from New to Qualified',
      time: '3 hours ago',
      color: '#0284c7',
      badge: 'Lead Qualification',
      user: 'Sarah Jenkins',
      meta: 'Score: 85/100 · Est Value: $250,000',
      route: '/crm/leads',
    },
    {
      id: 'act-4',
      type: 'deals',
      title: 'Proposal Sent to Prospect',
      description: 'Renewal proposal sent to TechNova Solutions',
      time: '5 hours ago',
      color: '#d97706',
      badge: 'Proposal Sent',
      user: 'Alexander Wright',
      meta: 'Deal ID: DEAL-301 · Amount: $1,200,000',
      route: '/crm/pipeline',
    },
  ];

  const filteredActivities = activityItems.filter(
    (a) => activityFilter === 'all' || a.type === activityFilter
  );

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'pending') return t.status !== 'Completed';
    if (taskFilter === 'completed') return t.status === 'Completed';
    return true;
  });

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Top Breadcrumb & Executive Header Controls */}
      <div className="flex flex-col gap-3">
        <Breadcrumb
          homeHref="/crm/dashboard"
          items={[
            { label: 'CRM nErgy', href: '/crm/dashboard' },
            { label: 'Executive Dashboard' },
          ]}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em',
                }}
              >
                CRM Executive Dashboard
              </h1>
              <button
                type="button"
                onClick={() => addToast({ title: 'Telemetry Status', message: 'Tenant Vault Pipeline is 100% active and synchronized.', type: 'success' })}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                <Badge variant="primary" icon={Sparkles}>
                  Live Pipeline Active
                </Badge>
              </button>
            </div>
            <p className="text-xs text-secondary margin-0" style={{ marginTop: '3px' }}>
              Real-time pipeline performance, lead acquisition channels, and team operations.
            </p>
          </div>

          {/* Right Header Action Controls */}
          <div className="dashboard-actions-grid">
            {/* Segmented Control Switcher */}
            <div
              className="dashboard-timeframe-switcher"
              style={{
                display: 'inline-flex',
                padding: '3px',
                borderRadius: '8px',
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              {['7 Days', '30 Days', 'YTD'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setActiveRange(r);
                    addToast({ title: 'Timeframe Changed', message: `Showing metrics for ${r}.`, type: 'info' });
                  }}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    backgroundColor: activeRange === r ? '#ffffff' : 'transparent',
                    color: activeRange === r ? '#1d4ed8' : 'var(--text-secondary)',
                    boxShadow: activeRange === r ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Action Buttons Group */}
            <div className="dashboard-btn-group">
              {/* Sync Data Button */}
              <Button
                variant="outline"
                size="sm"
                icon={RefreshCw}
                disabled={isSyncing}
                onClick={handleSyncData}
              >
                {isSyncing ? 'Syncing...' : 'Sync Data'}
              </Button>

              {/* + Add Contact Primary Button */}
              <Button
                variant="outline"
                size="sm"
                icon={Plus}
                onClick={() => setIsContactModalOpen(true)}
              >
                Add Contact
              </Button>

              {/* + Schedule Task Primary Button */}
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => setIsTaskModalOpen(true)}
              >
                New Task
              </Button>

              {/* Date Range Selector Dropdown */}
              <Dropdown
                trigger={
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs border-subtle surface cursor-pointer font-medium text-primary hover:bg-hover transition-colors"
                    style={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      height: '34px',
                    }}
                  >
                    <Calendar size={14} className="text-secondary" />
                    <span>{selectedDateLabel}</span>
                    <ChevronDown size={14} className="text-tertiary" />
                  </button>
                }
              >
                <DropdownHeader>Reporting Cycle Interval</DropdownHeader>
                <DropdownItem
                  icon={Calendar}
                  onClick={() => {
                    setSelectedDateLabel('May 12 – May 18, 2025');
                    addToast({ title: 'Date Range Updated', message: 'Set to May 12 – May 18, 2025 (Current Cycle)', type: 'info' });
                  }}
                >
                  May 12 &ndash; May 18, 2025 (Current Cycle)
                </DropdownItem>
                <DropdownItem
                  icon={Calendar}
                  onClick={() => {
                    setSelectedDateLabel('May 1 – May 31, 2025');
                    addToast({ title: 'Date Range Updated', message: 'Set to May 1 – May 31, 2025 (Full Month)', type: 'info' });
                  }}
                >
                  May 1 &ndash; May 31, 2025 (Full Month)
                </DropdownItem>
                <DropdownItem
                  icon={Calendar}
                  onClick={() => {
                    setSelectedDateLabel('Apr 1 – Jun 30, 2025');
                    addToast({ title: 'Date Range Updated', message: 'Set to Q2 2025 (Apr 1 – Jun 30, 2025)', type: 'info' });
                  }}
                >
                  Apr 1 &ndash; Jun 30, 2025 (Fiscal Q2)
                </DropdownItem>
                <DropdownItem
                  icon={Calendar}
                  onClick={() => {
                    setSelectedDateLabel('Jan 1 – Dec 31, 2025');
                    addToast({ title: 'Date Range Updated', message: 'Set to Fiscal Year 2025', type: 'info' });
                  }}
                >
                  Jan 1 &ndash; Dec 31, 2025 (Fiscal Year)
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Row 1: 4 Executive KPI Cards Grid */}
      <div className="grid-responsive-kpi">
        <KPICard
          title="TOTAL LEADS ACQUIRED"
          value={String(totalLeadsDisplay)}
          change="14.2%"
          changeType="positive"
          changePeriod="vs last 7 days"
          icon={Users}
          iconBg="rgba(22, 163, 74, 0.1)"
          iconColor="#16a34a"
          onClick={() => navigate('/crm/leads')}
          tooltip="Click to open Leads Directory"
        />

        <KPICard
          title="QUALIFIED OPPORTUNITIES"
          value={String(qualifiedOppDisplay)}
          change="46.1%"
          changeType="positive"
          changePeriod="$2.21M Value"
          icon={Briefcase}
          iconBg="rgba(29, 78, 216, 0.1)"
          iconColor="#1d4ed8"
          onClick={() => navigate('/crm/leads')}
          tooltip="Click to open Qualified Deals"
        />

        <KPICard
          title="MONTHLY REVENUE (ARR)"
          value={revenueDisplay}
          change="19.8%"
          changeType="positive"
          changePeriod="YoY Growth"
          icon={DollarSign}
          iconBg="rgba(147, 51, 234, 0.1)"
          iconColor="#9333ea"
          onClick={() => navigate('/crm/pipeline')}
          tooltip="Click to view Revenue Pipeline"
        />

        <KPICard
          title="ACTIVE ENTERPRISE CLIENTS"
          value={String(enterpriseClientCount)}
          change="15.4%"
          changeType="positive"
          changePeriod="Tiered 03"
          icon={User}
          iconBg="rgba(234, 88, 12, 0.1)"
          iconColor="#ea580c"
          onClick={() => navigate('/crm/contacts')}
          tooltip="Click to view Enterprise Contacts"
        />
      </div>

      {/* 3. Row 2: Business Health Telemetry (4 Cards - Equal Height & Width to Row 1) */}
      <div className="grid-responsive-kpi">
        {/* Card 1 */}
        <div
          onClick={() => addToast({ title: 'Conversion Telemetry', message: 'Current Lead-to-Opportunity conversion rate is 26.6% (+2.3% vs target).', type: 'info' })}
          className="kpi-card cursor-pointer hover:border-strong transition-all"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '1.25rem',
            height: '132px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)',
            boxSizing: 'border-box',
            minWidth: 0,
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              CONVERSION RATE
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                padding: '2px 7px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                color: '#16a34a',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              <ArrowUpRight size={12} />
              2.3%
            </span>
          </div>

          <div
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            26.6%
          </div>

          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
            Lead to Opportunity
          </span>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => addToast({ title: 'Deal Velocity', message: 'Average deal closure speed is 14.2 days (2.5 days faster than Q4).', type: 'info' })}
          className="kpi-card cursor-pointer hover:border-strong transition-all"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '1.25rem',
            height: '132px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)',
            boxSizing: 'border-box',
            minWidth: 0,
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              AVG DEAL CYCLE
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                padding: '2px 7px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                color: '#16a34a',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              <ArrowDownRight size={12} />
              2.5d
            </span>
          </div>

          <div
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            14.2 Days
          </div>

          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
            From Lead to Close
          </span>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => addToast({ title: 'SLA Health', message: 'Tenant SLA uptime is 99.98%. All clusters optimal.', type: 'success' })}
          className="kpi-card cursor-pointer hover:border-strong transition-all"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '1.25rem',
            height: '132px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)',
            boxSizing: 'border-box',
            minWidth: 0,
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              TENANT SLA LIFETIME
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 7px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                color: '#16a34a',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              Optimal
            </span>
          </div>

          <div
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            99.98%
          </div>

          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
            Platform Uptime
          </span>
        </div>

        {/* Card 4 */}
        <div
          onClick={handleSyncData}
          className="kpi-card cursor-pointer hover:border-strong transition-all"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '1.25rem',
            height: '132px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)',
            boxSizing: 'border-box',
            minWidth: 0,
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              DATA SYNC STATUS
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 7px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                color: '#16a34a',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
              Live
            </span>
          </div>

          <div
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            Synced
          </div>

          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
            {lastSyncTime}
          </span>
        </div>
      </div>

      {/* 4. Row 3: Sales Pipeline Distribution (50%) & Lead Sources & Attribution (50%) */}
      <div className="grid-responsive-2col">
        {/* Left Card: Sales Pipeline Distribution */}
        <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div className="p-6 flex flex-col" style={{ gap: '20px' }}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Sales Pipeline Distribution
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Deal progression across active stages.
                </span>
              </div>

              <button
                type="button"
                onClick={() => navigate('/crm/pipeline')}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                style={{ background: 'none', border: 'none', color: '#1d4ed8' }}
              >
                <span>View Kanban</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Stages Progress List (14px Gap Between Items) */}
            <div className="flex flex-col" style={{ gap: '14px' }}>
              {pipelineStages.map((stage) => (
                <div
                  key={stage.id}
                  onClick={() => {
                    addToast({ title: 'Stage Details', message: `${stage.name}: ${stage.value} (${stage.dealsCount})`, type: 'info' });
                    navigate('/crm/pipeline');
                  }}
                  className="cursor-pointer hover:border-strong transition-all"
                  style={{
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center justify-between" style={{ fontSize: '13px' }}>
                    <div className="flex items-center" style={{ gap: '12px' }}>
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: stage.badgeColor,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginRight: '8px' }}>
                        {stage.name}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                        ({stage.value})
                      </span>
                    </div>
                    <div className="flex items-center" style={{ gap: '16px' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{stage.dealsCount}</span>
                      <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{stage.pct}%</strong>
                    </div>
                  </div>
                  <ProgressBar value={stage.pct} variant={stage.variant} showLabel={false} />
                </div>
              ))}
            </div>

            {/* Pipeline Summary Footer */}
            <div
              className="flex items-center justify-between pt-4 text-xs"
              style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)', marginTop: '4px' }}
            >
              <span>Total Pipeline Value: <strong className="text-primary font-bold">$3.33M</strong></span>
              <span>Weighted Value: <strong className="text-primary font-bold">$1.68M</strong></span>
            </div>
          </div>
        </Card>

        {/* Right Card: Lead Sources & Attribution */}
        <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div className="p-6 flex flex-col" style={{ gap: '20px' }}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Lead Sources & Attribution
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Top channels driving qualified leads this cycle.
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/crm/leads')}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                style={{ background: 'none', border: 'none', color: '#1d4ed8' }}
              >
                <span>All Leads</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Channels List (14px Gap Between Items) */}
            <div className="flex flex-col" style={{ gap: '14px' }}>
              {leadChannels.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel)}
                  className="cursor-pointer hover:border-strong transition-all"
                  style={{
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center" style={{ gap: '14px' }}>
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: channel.color,
                        flexShrink: 0,
                      }}
                    />
                    <div className="flex flex-col" style={{ gap: '3px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{channel.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{channel.conversion}</span>
                    </div>
                  </div>
                  <div className="flex items-center" style={{ gap: '16px' }}>
                    <Badge variant={channel.badgeVariant}>{channel.pct}% Share</Badge>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{channel.volume}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Lead Sources Footer */}
            <div
              className="flex items-center justify-between pt-4 text-xs"
              style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)', marginTop: '4px' }}
            >
              <span>Total Leads: <strong className="text-primary font-bold">2,681</strong></span>
              <button
                type="button"
                onClick={() => navigate('/crm/leads')}
                className="px-3 py-1.5 rounded-md border-subtle surface hover:bg-hover transition-colors font-medium text-primary cursor-pointer"
                style={{ fontSize: '11px', backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}
              >
                View All Sources
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* 5. Row 4: Live CRM Activity Audit (50%) & Upcoming Priority Tasks (50%) */}
      <div className="grid-responsive-2col">
        {/* Left Card: Live CRM Activity Audit */}
        <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div className="p-6 flex flex-col" style={{ gap: '20px' }}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Live CRM Activity Audit
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Real-time system & team event feed.
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/crm/admin')}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                style={{ background: 'none', border: 'none', color: '#1d4ed8' }}
              >
                <span>View All</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center flex-wrap" style={{ gap: '10px' }}>
              {['all', 'deals', 'contacts', 'leads'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActivityFilter(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                    activityFilter === cat ? 'bg-primary text-white font-semibold' : 'surface-secondary text-secondary hover:bg-hover'
                  }`}
                  style={{ border: '1px solid var(--border)' }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Activity List (14px Gap Between Items) */}
            <div className="flex flex-col" style={{ gap: '14px' }}>
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  onClick={() => setSelectedActivity(act)}
                  className="cursor-pointer hover:border-strong transition-all"
                  style={{
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-start" style={{ gap: '14px' }}>
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: act.color,
                        marginTop: '5px',
                        flexShrink: 0,
                      }}
                    />
                    <div className="flex flex-col" style={{ gap: '3px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{act.title}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{act.description}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginLeft: '16px', flexShrink: 0, fontWeight: 500 }}>
                    {act.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Right Card: Upcoming Priority Tasks */}
        <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div className="p-6 flex flex-col" style={{ gap: '20px' }}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Upcoming Priority Tasks
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Actions scheduled for today ({tasks.length} total).
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/crm/tasks')}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                style={{ background: 'none', border: 'none', color: '#1d4ed8' }}
              >
                <span>View All Tasks</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Task Filters */}
            <div className="flex items-center justify-between flex-wrap" style={{ gap: '10px' }}>
              <div className="flex items-center" style={{ gap: '8px' }}>
                {[
                  { id: 'all', label: `All (${tasks.length})` },
                  { id: 'pending', label: `Pending (${tasks.filter((t) => t.status !== 'Completed').length})` },
                  { id: 'completed', label: `Completed (${tasks.filter((t) => t.status === 'Completed').length})` },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setTaskFilter(f.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                      taskFilter === f.id ? 'bg-primary text-white font-semibold' : 'surface-secondary text-secondary hover:bg-hover'
                    }`}
                    style={{ border: '1px solid var(--border)' }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsTaskModalOpen(true)}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                style={{ background: 'none', border: 'none', color: '#1d4ed8' }}
              >
                + Quick Add
              </button>
            </div>

            {/* Task Items Checklist (14px Gap Between Items) */}
            <div className="flex flex-col" style={{ gap: '14px' }}>
              {filteredTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center text-tertiary">
                  <CheckSquare size={28} className="mb-2 text-secondary" />
                  <span className="text-xs font-semibold text-primary">All caught up!</span>
                  <span className="text-xs">No tasks found for this filter.</span>
                </div>
              ) : (
                filteredTasks.slice(0, 4).map((task) => {
                  const isCompleted = task.status === 'Completed';

                  return (
                    <div
                      key={task.id}
                      className="cursor-pointer hover:border-strong transition-all"
                      style={{
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'var(--surface-secondary)',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        opacity: isCompleted ? 0.6 : 1,
                      }}
                    >
                      <div className="flex items-center min-w-0" style={{ gap: '14px', flex: 1, marginRight: '16px' }}>
                        {/* Interactive Task Checkbox */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTaskCompletion(task.id);
                            addToast({
                              title: isCompleted ? 'Task Reopened' : 'Task Completed',
                              message: `Task "${task.title}" updated.`,
                              type: isCompleted ? 'info' : 'success',
                            });
                          }}
                          className="flex items-center justify-center rounded-xs transition-colors"
                          style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer',
                            backgroundColor: isCompleted ? 'var(--success)' : 'var(--surface)',
                            border: `1px solid ${isCompleted ? 'var(--success)' : 'var(--border-strong)'}`,
                            color: '#ffffff',
                            flexShrink: 0,
                          }}
                          title={isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
                        >
                          {isCompleted && <Check size={12} />}
                        </button>

                        <div
                          className="flex flex-col min-w-0"
                          style={{ gap: '3px' }}
                          onClick={() => navigate('/crm/tasks')}
                        >
                          <span
                            className="truncate"
                            style={{
                              fontSize: '14px',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              textDecoration: isCompleted ? 'line-through' : 'none',
                            }}
                          >
                            {task.title}
                          </span>
                          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                            Related to: <strong className="text-secondary">{task.contact}</strong>
                            {task.dueDate && ` · Due ${task.dueDate}`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center" style={{ gap: '14px', flexShrink: 0 }}>
                        <Badge
                          variant={
                            isCompleted
                              ? 'success'
                              : task.priority === 'High'
                              ? 'error'
                              : task.priority === 'Medium'
                              ? 'warning'
                              : 'info'
                          }
                        >
                          {isCompleted ? 'Completed' : `${task.priority} Priority`}
                        </Badge>

                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          icon={Trash2}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTask(task.id);
                            addToast({
                              title: 'Task Removed',
                              message: `Task "${task.title}" deleted.`,
                              type: 'info',
                            });
                          }}
                          title="Delete task"
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* 6. Page Security & Compliance Footer */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 pb-2 text-xs"
        style={{ borderTop: '1px solid var(--border)', color: 'var(--text-tertiary)' }}
      >
        <button
          type="button"
          onClick={() => setIsSecurityModalOpen(true)}
          className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
          style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-secondary)' }}
        >
          <ShieldCheck size={16} className="text-success" />
          <span>Your data is protected with 256-bit AES encryption (Click to view vault info)</span>
        </button>
        <div>
          <span>Secure &bull; Reliable &bull; Enterprise-Grade</span>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE MODALS
         ========================================================================= */}

      {/* Modal 1: Quick Add Task Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Schedule Priority Action Task"
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => setIsTaskModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateTask}>
              Save Task
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
          <Input
            label="Task Action Title"
            required
            placeholder="e.g., Send revised commercial proposal"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />

          <Select
            label="Related Contact Record"
            value={newTaskContact}
            onChange={(e) => setNewTaskContact(e.target.value)}
            options={contacts.map((c) => ({ value: c.name, label: `${c.name} (${c.company})` }))}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Priority Level"
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
              options={[
                { value: 'High', label: 'High Priority (Urgent)' },
                { value: 'Medium', label: 'Medium Priority' },
                { value: 'Low', label: 'Low Priority' },
              ]}
            />

            <Input
              label="Due Date"
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
            />
          </div>
        </form>
      </Modal>

      {/* Modal 2: Quick Add Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Create New Contact Record"
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => setIsContactModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateContact}>
              Create Contact
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateContact} className="flex flex-col gap-3">
          <Input
            label="Full Name"
            required
            placeholder="e.g., Jane Montgomery"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
          />

          <Input
            label="Company Name"
            required
            placeholder="e.g., Global Quantum Industries"
            value={newContactCompany}
            onChange={(e) => setNewContactCompany(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Work Email"
              type="email"
              placeholder="jane@quantum.com"
              value={newContactEmail}
              onChange={(e) => setNewContactEmail(e.target.value)}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={newContactPhone}
              onChange={(e) => setNewContactPhone(e.target.value)}
            />
          </div>

          <Select
            label="Client Classification"
            value={newContactType}
            onChange={(e) => setNewContactType(e.target.value)}
            options={[
              { value: 'Enterprise Client', label: 'Enterprise Client' },
              { value: 'Investor', label: 'Investor' },
              { value: 'Borrower Partner', label: 'Borrower Partner' },
              { value: 'Converted Lead', label: 'Converted Lead' },
            ]}
          />
        </form>
      </Modal>

      {/* Modal 3: Activity Audit Detail Modal */}
      {selectedActivity && (
        <Modal
          isOpen={Boolean(selectedActivity)}
          onClose={() => setSelectedActivity(null)}
          title={`Audit Event: ${selectedActivity.badge}`}
          footer={
            <div className="flex justify-between items-center w-full">
              <span className="text-xs text-tertiary">Event recorded via CRM Audit Engine</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedActivity(null)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={ExternalLink}
                  onClick={() => {
                    navigate(selectedActivity.route);
                    setSelectedActivity(null);
                  }}
                >
                  Jump to Module
                </Button>
              </div>
            </div>
          }
        >
          <div className="flex flex-col gap-3 text-xs">
            <div className="p-3 surface-secondary rounded-sm border-subtle flex flex-col gap-1.5">
              <span className="font-semibold text-primary text-sm">{selectedActivity.title}</span>
              <p className="text-secondary margin-0">{selectedActivity.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 border-subtle rounded-sm">
                <span className="text-tertiary block font-medium">Logged By</span>
                <span className="font-semibold text-primary">{selectedActivity.user}</span>
              </div>
              <div className="p-2 border-subtle rounded-sm">
                <span className="text-tertiary block font-medium">Timestamp</span>
                <span className="font-semibold text-primary">{selectedActivity.time}</span>
              </div>
            </div>

            <div className="p-2.5 border-subtle rounded-sm surface-secondary">
              <span className="text-tertiary block font-medium mb-1">Metadata Attributes</span>
              <span className="font-mono text-secondary">{selectedActivity.meta}</span>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal 4: Lead Channel Attribution Telemetry */}
      {selectedChannel && (
        <Modal
          isOpen={Boolean(selectedChannel)}
          onClose={() => setSelectedChannel(null)}
          title={`Channel Attribution: ${selectedChannel.name}`}
          footer={
            <div className="flex justify-between items-center w-full">
              <span className="text-xs text-tertiary">Attribution Model: First-Touch Multi-Variant</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedChannel(null)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={ArrowRight}
                  onClick={() => {
                    setSelectedChannel(null);
                    addToast({ title: 'Leads Filtered', message: `Filtered leads by ${selectedChannel.name}`, type: 'info' });
                    navigate('/crm/leads');
                  }}
                >
                  View Channel Leads
                </Button>
              </div>
            </div>
          }
        >
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between p-3 surface-secondary rounded-sm border-subtle">
              <div>
                <span className="font-bold text-sm text-primary block">{selectedChannel.name}</span>
                <span className="text-tertiary">{selectedChannel.volume} in current cycle</span>
              </div>
              <Badge variant={selectedChannel.badgeVariant}>{selectedChannel.pct}% Share</Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 border-subtle rounded-sm surface-card">
                <span className="text-tertiary block">Conversion Rate</span>
                <strong className="text-primary text-sm">{selectedChannel.conversion}</strong>
              </div>
              <div className="p-2.5 border-subtle rounded-sm surface-card">
                <span className="text-tertiary block">Acquisition Cost</span>
                <strong className="text-success text-sm">{selectedChannel.cac}</strong>
              </div>
              <div className="p-2.5 border-subtle rounded-sm surface-card">
                <span className="text-tertiary block">Marketing ROI</span>
                <strong className="text-primary text-sm">{selectedChannel.roi}</strong>
              </div>
            </div>

            <div className="p-3 border-subtle rounded-sm surface-secondary flex items-center justify-between">
              <span className="text-secondary font-medium">Month-over-Month Velocity</span>
              <span className="font-bold text-success">{selectedChannel.trend}</span>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal 5: Security Encryption Vault Info */}
      <Modal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        title="Enterprise Encryption & Security Protocol"
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button variant="primary" size="sm" onClick={() => setIsSecurityModalOpen(false)}>
              Acknowledge & Close
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-3 text-xs">
          <div className="flex items-center gap-3 p-3 surface-secondary rounded-sm border-subtle">
            <ShieldCheck size={24} className="text-success flex-shrink-0" />
            <div>
              <span className="font-bold text-sm text-primary block">AES-256 Multi-Tenant Isolation</span>
              <span className="text-secondary">Hardware-level encryption keys are isolated per tenant ID.</span>
            </div>
          </div>
          <div className="p-3 border-subtle rounded-sm">
            <span className="font-semibold text-primary block mb-1">Active Certifications:</span>
            <ul className="text-secondary margin-0 pl-4 flex flex-col gap-1">
              <li>SOC2 Type II Enterprise Compliance Certified</li>
              <li>HIPAA / GDPR Isolated Data Storage Matrix</li>
              <li>Continuous Real-time Threat Monitoring & Audit Logging</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};
