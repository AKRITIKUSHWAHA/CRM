import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Target,
  Kanban,
  DollarSign,
  CheckSquare,
  Building2,
  TrendingUp,
  Plus,
  RefreshCw,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Check,
  Clock,
  Briefcase,
  Layers,
  ChevronRight,
  Filter,
  Trash2,
  Info,
  Calendar,
  UserPlus
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  KPICard,
  Card,
  CardHeader,
  CardBody,
  Badge,
  ProgressBar,
  Modal,
  Input,
  Select,
  Dropdown,
  DropdownItem,
  DropdownDivider,
  DropdownHeader
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

  // Local state for dashboard controls
  const [isSyncing, setIsSyncing] = useState(false);
  const [timeframe, setTimeframe] = useState('month'); // 'month' | '30d' | 'quarter' | 'all'
  const [pipelineMetric, setPipelineMetric] = useState('value'); // 'value' | 'count' | 'winRate'
  const [activityFilter, setActivityFilter] = useState('all'); // 'all' | 'deals' | 'contacts' | 'leads'
  const [isActivityExpanded, setIsActivityExpanded] = useState(false);

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);

  // Form states for Quick Task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskContact, setNewTaskContact] = useState(contacts[0]?.name || 'Eleanor Vance');
  const [newTaskPriority, setNewTaskPriority] = useState('High');
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-03-01');

  // Form states for Quick Contact
  const [newContactName, setNewContactName] = useState('');
  const [newContactCompany, setNewContactCompany] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactType, setNewContactType] = useState('Enterprise Client');

  // Multiplier / calculations based on timeframe
  const timeframeMultiplier =
    timeframe === '30d' ? 1.25 : timeframe === 'quarter' ? 2.8 : timeframe === 'all' ? 5.2 : 1;

  const totalLeadsCount = Math.round(leads.length * timeframeMultiplier);
  const qualifiedLeadsCount = Math.round(
    leads.filter((l) => l.status === 'Qualified' || l.status === 'Proposal').length * timeframeMultiplier
  );
  const openDealsCount = deals.filter((d) => d.stage !== 'Won' && d.stage !== 'Lost').length;
  const pendingTasksCount = tasks.filter((t) => t.status === 'Pending').length;
  const customerCount = contacts.length;

  const revenueDisplay =
    timeframe === 'month'
      ? '$482,900'
      : timeframe === '30d'
      ? '$612,400'
      : timeframe === 'quarter'
      ? '$1,480,000'
      : '$3,280,000';

  const revenueGrowth =
    timeframe === 'month'
      ? '+19.8%'
      : timeframe === '30d'
      ? '+24.1%'
      : timeframe === 'quarter'
      ? '+38.5%'
      : '+52.0%';

  // Sync Data Handler
  const handleSyncData = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
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
      email: newContactEmail || `${newContactName.toLowerCase().replace(/\s+/g, '.')}@${newContactCompany.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
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
      name: 'Negotiation Stage',
      valueStr: '$1.68M',
      countStr: '8 Deals',
      winRateStr: '72% Win Rate',
      pct: 45,
      variant: 'primary',
      badgeColor: 'primary',
      description: 'Terms and SLA agreements in active legal review',
    },
    {
      name: 'Proposal Sent',
      valueStr: '$840,000',
      countStr: '5 Deals',
      winRateStr: '54% Win Rate',
      pct: 25,
      variant: 'success',
      badgeColor: 'success',
      description: 'Formal commercial quote submitted to decision makers',
    },
    {
      name: 'Qualified Opportunities',
      valueStr: '$450,000',
      countStr: '4 Deals',
      winRateStr: '41% Win Rate',
      pct: 18,
      variant: 'warning',
      badgeColor: 'warning',
      description: 'Technical scope validated, budget confirmed',
    },
    {
      name: 'Discovery & Needs Analysis',
      valueStr: '$310,000',
      countStr: '3 Deals',
      winRateStr: '28% Win Rate',
      pct: 12,
      variant: 'info',
      badgeColor: 'info',
      description: 'Initial architectural consultation and capability fit',
    },
  ];

  // Lead channels data
  const leadChannels = [
    {
      id: 'web',
      name: 'Website Direct Forms',
      pct: 42,
      volume: '1,194 leads',
      conversion: '4.8% Conv.',
      badgeVariant: 'primary',
      cac: '$142 CAC',
      roi: '420% ROI',
      trend: '+12.4% MoM',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn B2B Campaigns',
      pct: 28,
      volume: '796 leads',
      conversion: '6.2% Conv.',
      badgeVariant: 'success',
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
      cac: '$95 CAC',
      roi: '780% ROI',
      trend: '+8.3% MoM',
    },
    {
      id: 'events',
      name: 'Trade Conferences 2026',
      pct: 12,
      volume: '343 leads',
      conversion: '8.1% Conv.',
      badgeVariant: 'warning',
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
      color: 'var(--primary)',
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
      color: 'var(--success)',
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
      color: 'var(--info)',
      badge: 'Lead Qualification',
      user: 'Sarah Jenkins',
      meta: 'Score: 85/100 · Est Value: $250,000',
      route: '/crm/leads',
    },
    {
      id: 'act-4',
      type: 'deals',
      title: 'Commercial Proposal Generated',
      description: 'Master service agreement draft created for Apex Global Technologies',
      time: '5 hours ago',
      color: 'var(--warning)',
      badge: 'Proposal Sent',
      user: 'Alexander Wright',
      meta: 'Deal ID: DEAL-301 · Amount: $1,200,000',
      route: '/crm/pipeline',
    },
    {
      id: 'act-5',
      type: 'contacts',
      title: 'KYC Vault Verification Complete',
      description: 'Marcus Sterling documents certified by Compliance Officer',
      time: '1 day ago',
      color: 'var(--success)',
      badge: 'Compliance Passed',
      user: 'System Bot',
      meta: 'Tenant: Vanguard Capital Partners',
      route: '/crm/contacts',
    },
  ];

  const filteredActivity = activityItems.filter(
    (item) => activityFilter === 'all' || item.type === activityFilter
  );

  const displayedActivity = isActivityExpanded
    ? filteredActivity
    : filteredActivity.slice(0, 3);

  return (
    <div className="flex flex-col gap-6 w-full max-w-full">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Breadcrumb
            homeHref="/crm/dashboard"
            items={[{ label: 'CRM nErgy', href: '/crm/dashboard' }, { label: 'Main Dashboard' }]}
          />
          <div className="flex items-center gap-3 flex-wrap">
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, margin: 0 }}>
              CRM Enterprise Dashboard
            </h1>
            <Badge variant="primary" icon={Sparkles}>
              Live Pipeline Active
            </Badge>
          </div>
          <p className="text-xs text-secondary margin-0">
            Real-time pipeline analytics, lead activity feeds, and upcoming tasks
          </p>
        </div>

        {/* Top Controls: Timeframe Selector + Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Timeframe Segmented Control */}
          <div className="segmented-control" role="tablist" aria-label="Dashboard timeframe">
            <button
              type="button"
              className={`segmented-control-item ${timeframe === 'month' ? 'segmented-control-item-active' : ''}`}
              onClick={() => {
                setTimeframe('month');
                addToast({ title: 'Timeframe Changed', message: 'Showing metrics for This Month.', type: 'info' });
              }}
            >
              This Month
            </button>
            <button
              type="button"
              className={`segmented-control-item ${timeframe === '30d' ? 'segmented-control-item-active' : ''}`}
              onClick={() => {
                setTimeframe('30d');
                addToast({ title: 'Timeframe Changed', message: 'Showing metrics for Last 30 Days.', type: 'info' });
              }}
            >
              30 Days
            </button>
            <button
              type="button"
              className={`segmented-control-item ${timeframe === 'quarter' ? 'segmented-control-item-active' : ''}`}
              onClick={() => {
                setTimeframe('quarter');
                addToast({ title: 'Timeframe Changed', message: 'Showing metrics for Q1 2026.', type: 'info' });
              }}
            >
              Q1 2026
            </button>
            <button
              type="button"
              className={`segmented-control-item ${timeframe === 'all' ? 'segmented-control-item-active' : ''}`}
              onClick={() => {
                setTimeframe('all');
                addToast({ title: 'Timeframe Changed', message: 'Showing All Time aggregated records.', type: 'info' });
              }}
            >
              All Time
            </button>
          </div>

          {/* Sync Data Button */}
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            isLoading={isSyncing}
            onClick={handleSyncData}
            title="Refresh dashboard metrics"
          >
            Sync Data
          </Button>

          {/* Quick Actions Dropdown */}
          <Dropdown
            trigger={
              <Button variant="secondary" size="sm" icon={Plus}>
                Quick Actions
              </Button>
            }
          >
            <DropdownHeader>Dashboard Fast Actions</DropdownHeader>
            <DropdownItem
              icon={UserPlus}
              onClick={() => setIsContactModalOpen(true)}
            >
              + Quick Add Contact
            </DropdownItem>
            <DropdownItem
              icon={CheckSquare}
              onClick={() => setIsTaskModalOpen(true)}
            >
              + Quick Add Task
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem
              icon={Users}
              onClick={() => navigate('/crm/contacts')}
            >
              Manage Contacts Directory
            </DropdownItem>
            <DropdownItem
              icon={Target}
              onClick={() => navigate('/crm/leads')}
            >
              View Leads Directory
            </DropdownItem>
            <DropdownItem
              icon={Kanban}
              onClick={() => navigate('/crm/pipeline')}
            >
              Sales Pipeline Board
            </DropdownItem>
          </Dropdown>

          {/* Primary Manage Contacts Action */}
          <Button
            variant="primary"
            size="sm"
            icon={Users}
            onClick={() => navigate('/crm/contacts')}
          >
            Manage Contacts
          </Button>
        </div>
      </div>

      {/* Symmetrical Responsive KPI Cards Grid */}
      <div className="grid-responsive-6kpi">
        <KPICard
          title="Total Leads"
          value={totalLeadsCount}
          change="+14.2%"
          changeType="positive"
          changePeriod="vs last month"
          icon={Target}
          onClick={() => {
            addToast({ title: 'Navigating', message: 'Opening Leads Directory...', type: 'info' });
            navigate('/crm/leads');
          }}
          tooltip="Click to view Leads Directory"
        />

        <KPICard
          title="Qualified Leads"
          value={qualifiedLeadsCount}
          change="+8.5%"
          changeType="positive"
          changePeriod="vs last month"
          icon={Sparkles}
          onClick={() => {
            addToast({ title: 'Navigating', message: 'Opening Qualified Leads in Directory...', type: 'info' });
            navigate('/crm/leads');
          }}
          tooltip="Click to view Qualified Leads"
        />

        <KPICard
          title="Open Opportunities"
          value={openDealsCount}
          change="$3.28M Value"
          changeType="positive"
          changePeriod="vs last month"
          icon={Kanban}
          onClick={() => {
            addToast({ title: 'Navigating', message: 'Opening Sales Pipeline...', type: 'info' });
            navigate('/crm/pipeline');
          }}
          tooltip="Click to view Sales Pipeline"
        />

        <KPICard
          title="Monthly Revenue"
          value={revenueDisplay}
          change={revenueGrowth}
          changeType="positive"
          changePeriod="vs last month"
          icon={DollarSign}
          onClick={() => {
            addToast({ title: 'Navigating', message: 'Opening Financial Analytics & Pipeline...', type: 'info' });
            navigate('/crm/pipeline');
          }}
          tooltip="Click to view Revenue Analytics"
        />

        <KPICard
          title="Pending Tasks"
          value={pendingTasksCount}
          change="Action Required"
          changeType="warning"
          changePeriod="vs last month"
          icon={CheckSquare}
          onClick={() => {
            addToast({ title: 'Navigating', message: 'Opening Tasks & Reminders...', type: 'info' });
            navigate('/crm/tasks');
          }}
          tooltip="Click to view Tasks & Reminders"
        />

        <KPICard
          title="Active Customers"
          value={customerCount}
          change="Isolated Tenant DB"
          changeType="neutral"
          changePeriod="vs last month"
          icon={Building2}
          onClick={() => {
            addToast({ title: 'Navigating', message: 'Opening Contacts & Accounts...', type: 'info' });
            navigate('/crm/contacts');
          }}
          tooltip="Click to view Active Contacts"
        />
      </div>

      {/* Main Dashboard Widgets Row 1: Pipeline & Attribution */}
      <div className="grid-responsive-2col">
        {/* Widget 1: Sales Pipeline Distribution */}
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader
              title="Sales Pipeline Distribution"
              subtitle="Deal progression by pipeline status"
              action={
                <div className="flex items-center gap-2">
                  <div className="segmented-control hidden-mobile" style={{ padding: '2px' }}>
                    <button
                      type="button"
                      className={`segmented-control-item ${pipelineMetric === 'value' ? 'segmented-control-item-active' : ''}`}
                      onClick={() => setPipelineMetric('value')}
                    >
                      Value ($)
                    </button>
                    <button
                      type="button"
                      className={`segmented-control-item ${pipelineMetric === 'count' ? 'segmented-control-item-active' : ''}`}
                      onClick={() => setPipelineMetric('count')}
                    >
                      Deals (#)
                    </button>
                    <button
                      type="button"
                      className={`segmented-control-item ${pipelineMetric === 'winRate' ? 'segmented-control-item-active' : ''}`}
                      onClick={() => setPipelineMetric('winRate')}
                    >
                      Win Rate (%)
                    </button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => {
                      addToast({ title: 'Pipeline Kanban', message: 'Loading Kanban workflow...', type: 'info' });
                      navigate('/crm/pipeline');
                    }}
                  >
                    View Kanban
                  </Button>
                </div>
              }
            />

            <CardBody className="flex flex-col gap-4">
              {pipelineStages.map((stage) => {
                const metricLabel =
                  pipelineMetric === 'value'
                    ? stage.valueStr
                    : pipelineMetric === 'count'
                    ? stage.countStr
                    : stage.winRateStr;

                return (
                  <div
                    key={stage.name}
                    className="p-2.5 rounded-sm surface-secondary border-subtle transition-all cursor-pointer hover:border-strong"
                    onClick={() => {
                      addToast({
                        title: `Pipeline Stage: ${stage.name}`,
                        message: `${stage.valueStr} in active deal volume. Navigating to Pipeline...`,
                        type: 'info',
                      });
                      navigate('/crm/pipeline');
                    }}
                    title={`Click to view ${stage.name} deals`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">{stage.name}</span>
                        <span className="text-tertiary">({stage.valueStr})</span>
                      </div>
                      <span className={`font-bold text-${stage.badgeColor}`}>{stage.pct}%</span>
                    </div>

                    <ProgressBar
                      value={stage.pct}
                      variant={stage.variant}
                      showLabel={false}
                      height="6px"
                    />

                    <div className="flex items-center justify-between text-xs text-tertiary mt-1" style={{ fontSize: '11px' }}>
                      <span>{stage.description}</span>
                      <span className="font-medium text-secondary">{metricLabel}</span>
                    </div>
                  </div>
                );
              })}
            </CardBody>
          </div>

          <div
            className="p-3 border-t border-subtle flex items-center justify-between text-xs text-secondary"
            style={{ backgroundColor: 'var(--surface-secondary)' }}
          >
            <span>Total Active Pipeline: <strong className="text-primary">$3.28M</strong> across 20 deals</span>
            <span className="badge badge-success">68% Close Probability</span>
          </div>
        </Card>

        {/* Widget 2: Lead Sources & Attribution */}
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader
              title="Lead Sources & Attribution"
              subtitle="Top channels for lead acquisition this month"
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => {
                    addToast({ title: 'Leads Directory', message: 'Viewing acquisition channels...', type: 'info' });
                    navigate('/crm/leads');
                  }}
                >
                  View Leads
                </Button>
              }
            />

            <CardBody className="flex flex-col gap-3">
              {leadChannels.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel)}
                  className="flex flex-col gap-1.5 p-2.5 surface-secondary rounded-sm border-subtle cursor-pointer hover:border-strong transition-all"
                  title="Click to view detailed attribution telemetry"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-primary">{channel.name}</span>
                    <Badge variant={channel.badgeVariant}>
                      {channel.pct}% ({channel.volume})
                    </Badge>
                  </div>

                  <ProgressBar
                    value={channel.pct}
                    variant={channel.badgeVariant}
                    showLabel={false}
                    height="5px"
                  />

                  <div className="flex items-center justify-between text-xs text-tertiary" style={{ fontSize: '11px' }}>
                    <span>{channel.conversion}</span>
                    <span className="text-secondary font-medium">{channel.cac} · {channel.roi}</span>
                  </div>
                </div>
              ))}
            </CardBody>
          </div>

          <div
            className="p-3 border-t border-subtle flex items-center justify-between text-xs text-secondary"
            style={{ backgroundColor: 'var(--surface-secondary)' }}
          >
            <span>Top Acquisition Driver: <strong className="text-primary">Website Forms (42%)</strong></span>
            <span className="badge badge-primary">High Conversion Quality</span>
          </div>
        </Card>
      </div>

      {/* Main Dashboard Widgets Row 2: Activity Feed & Upcoming Tasks */}
      <div className="grid-responsive-2col">
        {/* Widget 3: Recent Activity Feed */}
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader
              title="Recent CRM Activity"
              subtitle="Audit trail and real-time event stream"
              action={
                <div className="flex items-center gap-1.5">
                  <div className="segmented-control" style={{ padding: '2px' }}>
                    <button
                      type="button"
                      className={`segmented-control-item ${activityFilter === 'all' ? 'segmented-control-item-active' : ''}`}
                      onClick={() => setActivityFilter('all')}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      className={`segmented-control-item ${activityFilter === 'deals' ? 'segmented-control-item-active' : ''}`}
                      onClick={() => setActivityFilter('deals')}
                    >
                      Deals
                    </button>
                    <button
                      type="button"
                      className={`segmented-control-item ${activityFilter === 'contacts' ? 'segmented-control-item-active' : ''}`}
                      onClick={() => setActivityFilter('contacts')}
                    >
                      Contacts
                    </button>
                    <button
                      type="button"
                      className={`segmented-control-item ${activityFilter === 'leads' ? 'segmented-control-item-active' : ''}`}
                      onClick={() => setActivityFilter('leads')}
                    >
                      Leads
                    </button>
                  </div>
                </div>
              }
            />

            <CardBody className="flex flex-col gap-3">
              <div className="timeline">
                {displayedActivity.map((item) => (
                  <div
                    key={item.id}
                    className="timeline-item cursor-pointer p-2 rounded-sm transition-all hover:bg-surface-secondary"
                    onClick={() => setSelectedActivity(item)}
                    title="Click to view event audit payload"
                  >
                    <div className="timeline-node" style={{ backgroundColor: item.color }} />
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-primary hover:text-primary transition-colors">
                          {item.title}
                        </span>
                        <span className="text-tertiary flex items-center gap-1">
                          <Clock size={11} />
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs text-secondary margin-0">{item.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="badge badge-default" style={{ fontSize: '10px', padding: '1px 5px' }}>
                          {item.badge}
                        </span>
                        <span className="text-tertiary" style={{ fontSize: '11px' }}>
                          by {item.user}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </div>

          <div
            className="p-3 border-t border-subtle flex items-center justify-between text-xs"
            style={{ backgroundColor: 'var(--surface-secondary)' }}
          >
            <span className="text-tertiary">
              Showing {displayedActivity.length} of {filteredActivity.length} event records
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsActivityExpanded((prev) => !prev)}
            >
              {isActivityExpanded ? 'Collapse Feed' : 'View All Activity'}
            </Button>
          </div>
        </Card>

        {/* Widget 4: Upcoming Priority Tasks */}
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader
              title="Upcoming Priority Tasks"
              subtitle="Actions scheduled for today"
              action={
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Plus}
                    onClick={() => setIsTaskModalOpen(true)}
                  >
                    New Task
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => {
                      addToast({ title: 'Tasks Hub', message: 'Opening Tasks & Reminders...', type: 'info' });
                      navigate('/crm/tasks');
                    }}
                  >
                    All Tasks
                  </Button>
                </div>
              }
            />

            <CardBody className="flex flex-col gap-3">
              {tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center text-tertiary">
                  <CheckSquare size={32} className="mb-2 text-secondary" />
                  <span className="text-xs font-semibold text-primary">All caught up!</span>
                  <span className="text-xs">No pending priority tasks for today.</span>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Plus}
                    className="mt-3"
                    onClick={() => setIsTaskModalOpen(true)}
                  >
                    Create Task
                  </Button>
                </div>
              ) : (
                tasks.slice(0, 4).map((task) => {
                  const isCompleted = task.status === 'Completed';

                  return (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-3 rounded-sm border-subtle transition-all ${
                        isCompleted ? 'opacity-60 surface-secondary' : 'surface-secondary hover:border-strong'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0 mr-2">
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
                          className={`flex items-center justify-center rounded-xs transition-colors ${
                            isCompleted ? 'bg-success text-white' : 'border border-strong hover:border-primary'
                          }`}
                          style={{
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            backgroundColor: isCompleted ? 'var(--success)' : 'var(--surface)',
                            borderColor: isCompleted ? 'var(--success)' : 'var(--border-strong)',
                            color: '#ffffff',
                            flexShrink: 0,
                          }}
                          title={isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
                        >
                          {isCompleted && <Check size={14} />}
                        </button>

                        <div
                          className="flex flex-col gap-0.5 min-w-0 cursor-pointer"
                          onClick={() => {
                            addToast({ title: 'Task Details', message: `Viewing task for ${task.contact}`, type: 'info' });
                            navigate('/crm/tasks');
                          }}
                        >
                          <span
                            className={`font-semibold text-xs text-primary truncate ${
                              isCompleted ? 'line-through text-tertiary' : ''
                            }`}
                          >
                            {task.title}
                          </span>
                          <div className="flex items-center gap-2 text-tertiary text-xs">
                            <span>Related to: <strong className="text-secondary">{task.contact}</strong></span>
                            {task.dueDate && <span>· Due {task.dueDate}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
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
                              message: `Task "${task.title}" deleted from queue.`,
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
            </CardBody>
          </div>

          <div
            className="p-3 border-t border-subtle flex items-center justify-between text-xs text-secondary"
            style={{ backgroundColor: 'var(--surface-secondary)' }}
          >
            <span>
              Pending Action Items: <strong className="text-primary">{pendingTasksCount}</strong>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsTaskModalOpen(true)}
            >
              + Quick Schedule
            </Button>
          </div>
        </Card>
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
    </div>
  );
};
