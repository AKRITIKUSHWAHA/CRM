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
  Globe,
  Share2,
  Award
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

  const [activeRange, setActiveRange] = useState('30 Days');
  const [isSyncing, setIsSyncing] = useState(false);
  const [tasksState, setTasksState] = useState([
    { id: 1, title: 'Send revised commercial proposal', contact: 'Marcus Vance', priority: 'High Priority', completed: false },
    { id: 2, title: 'Follow up with TechNova Solutions', contact: 'Eleanor Vance', priority: 'Medium Priority', completed: false },
    { id: 3, title: 'Prepare Q2 executive report', contact: 'Alexander Wright', priority: 'Medium Priority', completed: false },
    { id: 4, title: 'Review enterprise contract draft', contact: 'Dr. Aris Thorne', priority: 'Low Priority', completed: false },
  ]);

  const handleSyncData = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      addToast({
        title: 'Data Synced',
        message: 'Dashboard data synced successfully.',
        type: 'success',
      });
    }, 500);
  };

  const toggleTask = (id) => {
    setTasksState((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* 1. Top Breadcrumb & Executive Header Controls */}
      <div className="flex flex-col gap-2">
        <Breadcrumb items={[{ label: 'Enterprise SaaS Portal' }, { label: 'CRM nErgy' }, { label: 'Executive Dashboard' }]} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1
              style={{
                fontSize: '26px',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: 0,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em',
              }}
            >
              CRM Executive Dashboard
            </h1>
            <p className="text-xs text-secondary margin-0" style={{ marginTop: '3px' }}>
              Real-time pipeline performance, lead acquisition channels, and team operations.
            </p>
          </div>

          {/* Right Header Action Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Segmented Control Switcher */}
            <div
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
                  onClick={() => setActiveRange(r)}
                  style={{
                    padding: '0.35rem 0.875rem',
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

            {/* + Manage Widgets Primary Button */}
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => navigate('/crm/contacts')}
            >
              Manage Widgets
            </Button>

            {/* Date Range Selector Pill */}
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs border-subtle surface cursor-pointer font-medium text-primary"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                height: '34px',
              }}
            >
              <Calendar size={14} className="text-secondary" />
              <span>May 12 &ndash; May 18, 2025</span>
              <ChevronDown size={14} className="text-tertiary" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Row 1: 4 Executive KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="TOTAL LEADS ACQUIRED"
          value="1"
          change="14.2%"
          changeType="positive"
          changePeriod="vs last 7 days"
          icon={Users}
          iconBg="rgba(22, 163, 74, 0.1)"
          iconColor="#16a34a"
          onClick={() => navigate('/crm/leads')}
        />

        <KPICard
          title="QUALIFIED OPPORTUNITIES"
          value="342"
          change="46.1%"
          changeType="positive"
          changePeriod="$2.21M Value"
          icon={Briefcase}
          iconBg="rgba(29, 78, 216, 0.1)"
          iconColor="#1d4ed8"
          onClick={() => navigate('/crm/leads')}
        />

        <KPICard
          title="MONTHLY REVENUE (ARR)"
          value="$482,900"
          change="19.8%"
          changeType="positive"
          changePeriod="YoY Growth"
          icon={DollarSign}
          iconBg="rgba(147, 51, 234, 0.1)"
          iconColor="#9333ea"
          onClick={() => navigate('/crm/pipeline')}
        />

        <KPICard
          title="ACTIVE ENTERPRISE CLIENTS"
          value="3"
          change="15.4%"
          changeType="positive"
          changePeriod="Tiered 03"
          icon={User}
          iconBg="rgba(234, 88, 12, 0.1)"
          iconColor="#ea580c"
          onClick={() => navigate('/crm/contacts')}
        />
      </div>

      {/* 3. Row 2: Business Health Horizontal 4-Column Card */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)',
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Col 1 */}
          <div className="flex flex-col gap-1">
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              CONVERSION RATE
            </span>
            <div className="flex items-baseline gap-2">
              <span style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                26.6%
              </span>
              <span className="flex items-center font-bold" style={{ fontSize: '12px', color: '#16a34a' }}>
                <ArrowUpRight size={14} />
                2.3%
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Lead to Opportunity</span>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-1 sm:border-l sm:border-border sm:pl-6">
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              AVG DEAL CYCLE
            </span>
            <div className="flex items-baseline gap-2">
              <span style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                14.2 Days
              </span>
              <span className="flex items-center font-bold" style={{ fontSize: '12px', color: '#16a34a' }}>
                <ArrowDownRight size={14} />
                2.5 days
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>From Lead to Close</span>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-1 lg:border-l lg:border-border lg:pl-6">
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              TENANT SLA LIFETIME
            </span>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                99.98%
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '2px 7px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(22, 163, 74, 0.1)',
                  color: '#16a34a',
                }}
              >
                Optimal
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Platform Uptime</span>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-1 lg:border-l lg:border-border lg:pl-6">
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              DATA SYNC STATUS
            </span>
            <div className="flex items-center gap-2" style={{ marginTop: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block' }} />
              <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Synced
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Just now</span>
          </div>
        </div>
      </div>

      {/* 4. Row 3: Sales Pipeline Distribution (50%) & Lead Sources & Attribution (50%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Card: Sales Pipeline Distribution */}
        <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)' }}>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Sales Pipeline Distribution
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Deal progression by status pipeline stages.
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/crm/pipeline')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                View Kanban
              </button>
            </div>

            {/* Stages Progress Bars */}
            <div className="flex flex-col gap-3.5 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-primary">Negotiation Stage ($1.85M)</span>
                  <span className="font-bold text-primary">48%</span>
                </div>
                <ProgressBar value={48} variant="primary" showLabel={false} />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-primary">Proposal Sent ($843,000)</span>
                  <span className="font-bold text-success">26%</span>
                </div>
                <ProgressBar value={26} variant="success" showLabel={false} />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-primary">Qualified Opportunities ($426,000)</span>
                  <span className="font-bold text-warning">18%</span>
                </div>
                <ProgressBar value={18} variant="warning" showLabel={false} />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-primary">New Leads ($210,000)</span>
                  <span className="font-bold text-info">8%</span>
                </div>
                <ProgressBar value={8} variant="info" showLabel={false} />
              </div>
            </div>

            {/* Pipeline Summary Footer */}
            <div
              className="flex items-center justify-between pt-3 text-xs"
              style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            >
              <span>Total Pipeline Value: <strong className="text-primary">$3.33M</strong></span>
              <span>Weighted Value: <strong className="text-primary">$1.68M</strong></span>
            </div>
          </div>
        </Card>

        {/* Right Card: Lead Sources & Attribution */}
        <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)' }}>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex flex-col">
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Lead Sources & Attribution
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Top channels driving qualified leads this month.
              </span>
            </div>

            {/* Channels List */}
            <div className="flex flex-col gap-2.5 pt-1">
              <div
                onClick={() => navigate('/crm/leads')}
                className="flex items-center justify-between p-3 rounded-md cursor-pointer transition-all"
                style={{ backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary-border)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1d4ed8' }} />
                  <span className="font-semibold text-xs text-primary">Website Direct Forms</span>
                </div>
                <span className="font-bold text-xs" style={{ color: '#1d4ed8' }}>42% &bull; 1,124 leads</span>
              </div>

              <div
                onClick={() => navigate('/crm/leads')}
                className="flex items-center justify-between p-3 rounded-md cursor-pointer transition-all"
                style={{ backgroundColor: 'var(--success-light)', border: '1px solid var(--success-border)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
                  <span className="font-semibold text-xs text-primary">LinkedIn B2B Campaigns</span>
                </div>
                <span className="font-bold text-xs" style={{ color: '#16a34a' }}>26% &bull; 702 leads</span>
              </div>

              <div
                onClick={() => navigate('/crm/leads')}
                className="flex items-center justify-between p-3 rounded-md cursor-pointer transition-all"
                style={{ backgroundColor: 'var(--info-light)', border: '1px solid var(--info-border)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0284c7' }} />
                  <span className="font-semibold text-xs text-primary">Referral Partners & Brokers</span>
                </div>
                <span className="font-bold text-xs" style={{ color: '#0284c7' }}>18% &bull; 512 leads</span>
              </div>

              <div
                onClick={() => navigate('/crm/leads')}
                className="flex items-center justify-between p-3 rounded-md cursor-pointer transition-all"
                style={{ backgroundColor: 'var(--warning-light)', border: '1px solid var(--warning-border)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d97706' }} />
                  <span className="font-semibold text-xs text-primary">Trade Conferences 2025</span>
                </div>
                <span className="font-bold text-xs" style={{ color: '#d97706' }}>13% &bull; 343 leads</span>
              </div>
            </div>

            {/* Lead Sources Footer */}
            <div
              className="flex items-center justify-between pt-3 text-xs"
              style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            >
              <span>Total Leads: <strong className="text-primary">2,681</strong></span>
              <button
                type="button"
                onClick={() => navigate('/crm/leads')}
                className="px-3 py-1 rounded-sm border-subtle surface hover:bg-hover transition-colors font-medium"
                style={{ fontSize: '11px', backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}
              >
                View All Sources
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* 5. Row 4: Live CRM Activity Audit (50%) & Upcoming Priority Tasks (50%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Card: Live CRM Activity Audit */}
        <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)' }}>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Live CRM Activity Audit
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Real-time system & team activities.
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/crm/admin')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
              >
                View All
              </button>
            </div>

            <Timeline
              items={[
                { title: 'New Deal Moved to Negotiation', description: 'Enterprise Logistics Expansion deal moved by Alexander Wright', time: '10 min ago', color: '#1d4ed8' },
                { title: 'Contact Record Created', description: 'Sofia Rodriguez added to isolated tenant database', time: '1 hour ago', color: '#16a34a' },
                { title: 'Lead Status Updated', description: 'Samantha Ray moved from New to Qualified', time: '3 hours ago', color: '#0284c7' },
                { title: 'Proposal Sent to Prospect', description: 'Renewal proposal sent to TechNova Solutions', time: '5 hours ago', color: '#d97706' },
              ]}
            />
          </div>
        </Card>

        {/* Right Card: Upcoming Priority Tasks */}
        <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)' }}>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Upcoming Priority Tasks
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Actions scheduled for today.
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/crm/tasks')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
              >
                View All Tasks
              </button>
            </div>

            {/* Task Items Checklist */}
            <div className="flex flex-col gap-2.5">
              {tasksState.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center justify-between p-3 surface-secondary rounded-md border-subtle cursor-pointer hover:border-strong transition-all"
                  style={{
                    backgroundColor: task.completed ? 'var(--surface-hover)' : 'var(--surface-secondary)',
                    opacity: task.completed ? 0.6 : 1,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}}
                      style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-xs text-primary" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.title}
                      </span>
                      <span className="text-tertiary" style={{ fontSize: '11px' }}>
                        Related to: {task.contact}
                      </span>
                    </div>
                  </div>

                  <Badge
                    variant={
                      task.priority.includes('High')
                        ? 'error'
                        : task.priority.includes('Medium')
                        ? 'warning'
                        : 'success'
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* 6. Page Security & Compliance Footer */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 pb-2 text-xs"
        style={{ borderTop: '1px solid var(--border)', color: 'var(--text-tertiary)' }}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-secondary" />
          <span>Your data is protected with 256-bit AES encryption</span>
        </div>
        <div>
          <span>Secure &bull; Reliable &bull; Enterprise-Grade</span>
        </div>
      </div>
    </div>
  );
};
