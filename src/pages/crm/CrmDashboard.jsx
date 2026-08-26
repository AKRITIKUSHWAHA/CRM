import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Target,
  TrendingUp,
  Building2,
  Plus,
  RefreshCw,
  ArrowRight,
  ChevronDown,
  Activity,
  CheckSquare
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
  Timeline,
  Skeleton
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

export const CrmDashboard = () => {
  const navigate = useNavigate();
  const { contacts, leads, deals, tasks } = useCrm();
  const { addToast } = useToast();

  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedText, setLastSyncedText] = useState('');

  const totalLeadsCount = leads.length > 0 ? leads.length : 1284;
  const qualifiedLeadsCount = leads.filter((l) => l.status === 'Qualified' || l.status === 'Proposal').length || 342;
  const openDealsCount = deals.filter((d) => d.stage !== 'Won' && d.stage !== 'Lost').length || 18;
  const customerCount = contacts.length > 0 ? contacts.length : 1420;

  const handleSyncData = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncedText('Synced just now');
      addToast({
        title: 'Data Synced',
        message: 'Dashboard data synced successfully.',
        type: 'success',
      });
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM' }, { label: 'Executive Dashboard' }]} />
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: '4px 0 2px 0',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.02em',
            }}
          >
            CRM Executive Dashboard
          </h1>
          <p className="text-xs text-secondary margin-0">
            Real-time performance, leads, acquisition channels and team operations.
          </p>
        </div>

        {/* Compact Right Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Compact Date Range Selector */}
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="form-control"
              style={{
                height: '32px',
                fontSize: '12px',
                fontWeight: 600,
                paddingRight: '1.75rem',
                paddingLeft: '0.75rem',
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
              }}
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Year to Date">Year to Date</option>
            </select>
          </div>

          {/* Sync Button */}
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            disabled={isSyncing}
            onClick={handleSyncData}
          >
            {isSyncing ? 'Syncing...' : lastSyncedText || 'Sync Data'}
          </Button>

          {/* Primary Action Button */}
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => navigate('/crm/contacts')}
          >
            Manage Contacts
          </Button>
        </div>
      </div>

      {/* 2. LEVEL 1: Executive KPI Grid (4 Columns Desktop, 2x2 Tablet, 1 Mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="TOTAL LEADS"
          value={totalLeadsCount.toLocaleString()}
          change="14.2%"
          changeType="positive"
          changePeriod="vs last month"
          icon={Users}
          onClick={() => navigate('/crm/leads')}
        />

        <KPICard
          title="QUALIFIED OPPORTUNITIES"
          value={qualifiedLeadsCount.toLocaleString()}
          change="8.5%"
          changeType="positive"
          changePeriod="vs last month"
          icon={Target}
          onClick={() => navigate('/crm/leads')}
        />

        <KPICard
          title="MONTHLY REVENUE"
          value="$482,900"
          change="19.8%"
          changeType="positive"
          changePeriod="vs last month"
          icon={TrendingUp}
          onClick={() => navigate('/crm/pipeline')}
        />

        <KPICard
          title="ACTIVE CLIENTS"
          value={customerCount.toLocaleString()}
          change="5.4%"
          changeType="positive"
          changePeriod="vs last month"
          icon={Building2}
          onClick={() => navigate('/crm/contacts')}
        />
      </div>

      {/* 3. LEVEL 2: Compact Business Health Section */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '0.875rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          BUSINESS HEALTH
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Conversion Rate</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              26.6% <span style={{ color: 'var(--success)', fontSize: '12px', fontWeight: 600 }}>↑</span>
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-4 sm:border-l sm:border-border sm:pl-4">
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Avg Deal Cycle</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              14.2 days
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-4 sm:border-l sm:border-border sm:pl-4">
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Tenant SLA</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              99.98%
            </span>
          </div>
        </div>
      </div>

      {/* 4. LEVEL 3: Sales Pipeline Distribution (60%) + Lead Sources (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Sales Pipeline (7 Columns / ~60%) */}
        <div className="lg:col-span-7 flex flex-col">
          <Card className="h-full">
            <CardHeader
              title="Sales Pipeline Distribution"
              subtitle="Deal progression by pipeline status"
              action={
                <Button variant="ghost" size="sm" icon={ArrowRight} onClick={() => navigate('/crm/pipeline')}>
                  View Kanban
                </Button>
              }
            />
            <CardBody className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-primary">Negotiation Stage ($1.68M)</span>
                  <span className="font-bold text-primary">45%</span>
                </div>
                <ProgressBar value={45} variant="primary" showLabel={false} />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-primary">Proposal Sent ($840,000)</span>
                  <span className="font-bold text-success">25%</span>
                </div>
                <ProgressBar value={25} variant="success" showLabel={false} />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-primary">Qualified Opportunities ($450,000)</span>
                  <span className="font-bold text-warning">18%</span>
                </div>
                <ProgressBar value={18} variant="warning" showLabel={false} />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Lead Sources & Attribution (5 Columns / ~40%) */}
        <div className="lg:col-span-5 flex flex-col">
          <Card className="h-full">
            <CardHeader title="Lead Sources & Attribution" subtitle="Top channels for lead acquisition this month" />
            <CardBody className="flex flex-col gap-3">
              <div
                onClick={() => navigate('/crm/leads')}
                className="flex items-center justify-between p-2.5 surface-secondary rounded-sm text-xs cursor-pointer hover:border-strong border-subtle transition-all"
              >
                <span className="font-semibold text-primary">Website Direct Forms</span>
                <span className="font-bold text-primary">42% <span className="font-normal text-tertiary">(1,194)</span></span>
              </div>

              <div
                onClick={() => navigate('/crm/leads')}
                className="flex items-center justify-between p-2.5 surface-secondary rounded-sm text-xs cursor-pointer hover:border-strong border-subtle transition-all"
              >
                <span className="font-semibold text-primary">LinkedIn B2B Campaigns</span>
                <span className="font-bold text-primary">28% <span className="font-normal text-tertiary">(796)</span></span>
              </div>

              <div
                onClick={() => navigate('/crm/leads')}
                className="flex items-center justify-between p-2.5 surface-secondary rounded-sm text-xs cursor-pointer hover:border-strong border-subtle transition-all"
              >
                <span className="font-semibold text-primary">Referral Partners</span>
                <span className="font-bold text-primary">18% <span className="font-normal text-tertiary">(512)</span></span>
              </div>

              <div
                onClick={() => navigate('/crm/leads')}
                className="flex items-center justify-between p-2.5 surface-secondary rounded-sm text-xs cursor-pointer hover:border-strong border-subtle transition-all"
              >
                <span className="font-semibold text-primary">Trade Conferences</span>
                <span className="font-bold text-primary">12% <span className="font-normal text-tertiary">(343)</span></span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* 5. LEVEL 4: Live Activity Feed (60%) + Priority Tasks (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Live CRM Activity Audit (7 Columns / ~60%) */}
        <div className="lg:col-span-7 flex flex-col">
          <Card className="h-full">
            <CardHeader title="Live CRM Activity Audit" subtitle="Real-time system events and team actions" />
            <CardBody>
              <Timeline
                items={[
                  { title: 'New Deal Moved to Negotiation', description: 'Enterprise Logistics Expansion deal moved by Alexander Wright', time: '10 mins ago', color: 'var(--primary)' },
                  { title: 'Contact Record Created', description: 'Sofia Rodriguez added to isolated tenant database', time: '1 hour ago', color: 'var(--success)' },
                  { title: 'Lead Status Updated', description: 'Samantha Ray moved from New to Qualified', time: '3 hours ago', color: 'var(--info)' },
                ]}
              />
            </CardBody>
          </Card>
        </div>

        {/* Upcoming Priority Tasks (5 Columns / ~40%) */}
        <div className="lg:col-span-5 flex flex-col">
          <Card className="h-full">
            <CardHeader
              title="Upcoming Priority Tasks"
              subtitle="Actions scheduled for today"
              action={
                <Button variant="ghost" size="sm" icon={ArrowRight} onClick={() => navigate('/crm/tasks')}>
                  View All Tasks
                </Button>
              }
            />
            <CardBody className="flex flex-col gap-3">
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  onClick={() => navigate('/crm/tasks')}
                  className="flex items-center justify-between p-3 surface-secondary rounded-sm border-subtle cursor-pointer hover:border-strong transition-all"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-xs text-primary">{task.title}</span>
                    <span className="text-tertiary text-xs">Related to: {task.contact}</span>
                  </div>
                  <Badge variant={task.priority === 'High' ? 'error' : 'warning'}>
                    {task.priority.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
