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
  Zap,
  Clock,
  ShieldCheck,
  CheckCircle2
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
  Timeline
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

export const CrmDashboard = () => {
  const navigate = useNavigate();
  const { contacts, leads, deals, tasks } = useCrm();
  const { addToast } = useToast();
  const [timeRange, setTimeRange] = useState('30d');

  const totalLeadsCount = leads.length;
  const qualifiedLeadsCount = leads.filter((l) => l.status === 'Qualified' || l.status === 'Proposal').length;
  const openDealsCount = deals.filter((d) => d.stage !== 'Won' && d.stage !== 'Lost').length;
  const pendingTasksCount = tasks.filter((t) => t.status === 'Pending').length;
  const customerCount = contacts.length;

  return (
    <div className="flex flex-col gap-5">
      {/* Top Executive Header */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--primary)',
                backgroundColor: 'var(--primary-light)',
                padding: '2px 8px',
                borderRadius: '9999px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Enterprise SaaS Portal
            </span>
            <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Executive Dashboard' }]} />
          </div>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: 0,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}
          >
            CRM Executive Dashboard
          </h1>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Real-time pipeline performance, lead acquisition channels, and team operations.
          </span>
        </div>

        {/* Controls & Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Segmented Time Range Pills */}
          <div
            style={{
              display: 'inline-flex',
              padding: '3px',
              borderRadius: '8px',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            {[
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: 'ytd', label: 'YTD' },
            ].map((range) => (
              <button
                key={range.id}
                type="button"
                onClick={() => setTimeRange(range.id)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: timeRange === range.id ? 'var(--surface)' : 'transparent',
                  color: timeRange === range.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: timeRange === range.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {range.label}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={() => addToast({ title: 'Dashboard Synced', message: 'Pipeline state updated successfully.', type: 'info' })}
          >
            Sync Data
          </Button>

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

      {/* 4 Executive KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="TOTAL LEADS ACQUIRED"
          value={totalLeadsCount > 0 ? `${totalLeadsCount}` : '1,284'}
          change="+14.2%"
          changeType="positive"
          changePeriod="vs last month"
          icon={Target}
          badgeText="Active Funnel"
          onClick={() => navigate('/crm/leads')}
        />

        <KPICard
          title="QUALIFIED OPPORTUNITIES"
          value={qualifiedLeadsCount > 0 ? `${qualifiedLeadsCount}` : '342'}
          change="+8.5%"
          changeType="positive"
          changePeriod="$3.28M Value"
          icon={Sparkles}
          badgeText="High Intent"
          onClick={() => navigate('/crm/leads')}
        />

        <KPICard
          title="MONTHLY REVENUE (ARR)"
          value="$482,900"
          change="+19.8%"
          changeType="positive"
          changePeriod="YoY Growth"
          icon={DollarSign}
          badgeText="Target Met"
          onClick={() => navigate('/crm/pipeline')}
        />

        <KPICard
          title="ACTIVE ENTERPRISE CLIENTS"
          value={customerCount > 0 ? `${customerCount}` : '1,420'}
          change="+5.4%"
          changeType="positive"
          changePeriod="Tenant DB"
          icon={Building2}
          badgeText="Isolated DB"
          onClick={() => navigate('/crm/contacts')}
        />
      </div>

      {/* Quick Performance & Health Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          backgroundColor: 'var(--surface-secondary)',
          borderRadius: '10px',
          border: '1px solid var(--border)',
          padding: '0.875rem 1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Zap size={16} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>CONVERSION RATE</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>26.6% <span style={{ fontSize: '11px', color: 'var(--success)' }}>↑ 3.2%</span></span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
            <Clock size={16} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>AVG DEAL CYCLE</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>14.2 Days <span style={{ fontSize: '11px', color: 'var(--success)' }}>↓ 2.1d faster</span></span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: 'var(--info-light)', color: 'var(--info)' }}>
            <ShieldCheck size={16} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>TENANT SLA UPTIME</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>99.98% <span style={{ fontSize: '11px', color: 'var(--info)' }}>Optimal</span></span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Widgets Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Widget 1: Sales Pipeline Visualizer */}
        <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.03)' }}>
          <CardHeader
            title="Sales Pipeline Distribution"
            subtitle="Deal progression by active pipeline stages"
            action={
              <Button variant="ghost" size="xs" icon={ArrowRight} onClick={() => navigate('/crm/pipeline')}>
                View Kanban
              </Button>
            }
          />
          <CardBody className="flex flex-col gap-4 p-5">
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-primary">Negotiation Stage ($1.68M)</span>
                <span className="font-bold text-primary">45%</span>
              </div>
              <ProgressBar value={45} variant="primary" showLabel={false} />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-primary">Proposal Sent ($840,000)</span>
                <span className="font-bold text-success">25%</span>
              </div>
              <ProgressBar value={25} variant="success" showLabel={false} />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-primary">Qualified Opportunities ($450,000)</span>
                <span className="font-bold text-warning">18%</span>
              </div>
              <ProgressBar value={18} variant="warning" showLabel={false} />
            </div>
          </CardBody>
        </Card>

        {/* Widget 2: Lead Sources Breakdown */}
        <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.03)' }}>
          <CardHeader title="Lead Sources & Attribution" subtitle="Top channels driving qualified leads this month" />
          <CardBody className="flex flex-col gap-2.5 p-5">
            <div className="flex items-center justify-between p-3 surface-secondary rounded-md border-subtle">
              <div className="flex items-center gap-2.5">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                <span className="font-semibold text-xs text-primary">Website Direct Forms</span>
              </div>
              <Badge variant="primary">42% &bull; 1,194 leads</Badge>
            </div>

            <div className="flex items-center justify-between p-3 surface-secondary rounded-md border-subtle">
              <div className="flex items-center gap-2.5">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
                <span className="font-semibold text-xs text-primary">LinkedIn B2B Campaigns</span>
              </div>
              <Badge variant="success">28% &bull; 796 leads</Badge>
            </div>

            <div className="flex items-center justify-between p-3 surface-secondary rounded-md border-subtle">
              <div className="flex items-center gap-2.5">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--info)' }} />
                <span className="font-semibold text-xs text-primary">Referral Partners & Brokers</span>
              </div>
              <Badge variant="info">18% &bull; 512 leads</Badge>
            </div>

            <div className="flex items-center justify-between p-3 surface-secondary rounded-md border-subtle">
              <div className="flex items-center gap-2.5">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--warning)' }} />
                <span className="font-semibold text-xs text-primary">Trade Conferences 2026</span>
              </div>
              <Badge variant="warning">12% &bull; 343 leads</Badge>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Widgets Row 2: Recent Activity & Priority Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Widget 3: Live CRM Activity Feed */}
        <Card style={{ borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.03)' }}>
          <div className="flex items-center justify-between pb-3 border-b border-subtle mb-4">
            <h3 className="text-sm font-bold text-primary margin-0">Live CRM Activity Audit</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Real-time logs</span>
          </div>
          <Timeline
            items={[
              { title: 'New Deal Moved to Negotiation', description: 'Enterprise Logistics Expansion deal moved by Alexander Wright', time: '10 mins ago', color: 'var(--primary)' },
              { title: 'Contact Record Created', description: 'Sofia Rodriguez added to isolated tenant database', time: '1 hour ago', color: 'var(--success)' },
              { title: 'Lead Status Updated', description: 'Samantha Ray moved from New to Qualified', time: '3 hours ago', color: 'var(--info)' },
            ]}
          />
        </Card>

        {/* Widget 4: Priority Tasks */}
        <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.03)' }}>
          <CardHeader
            title="Upcoming Priority Tasks"
            subtitle="Actions scheduled for today"
            action={
              <Button variant="ghost" size="xs" icon={ArrowRight} onClick={() => navigate('/crm/tasks')}>
                All Tasks
              </Button>
            }
          />
          <CardBody className="flex flex-col gap-2.5 p-5">
            {tasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                onClick={() => navigate('/crm/tasks')}
                className="flex items-center justify-between p-3 surface-secondary rounded-md border-subtle cursor-pointer hover:border-strong transition-all"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-xs text-primary">{task.title}</span>
                  <span className="text-tertiary" style={{ fontSize: '11px' }}>Related to: {task.contact}</span>
                </div>
                <Badge variant={task.priority === 'High' ? 'error' : 'warning'}>
                  {task.priority} Priority
                </Badge>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
