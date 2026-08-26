import React from 'react';
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
  Sparkles
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

  const totalLeadsCount = leads.length;
  const qualifiedLeadsCount = leads.filter((l) => l.status === 'Qualified' || l.status === 'Proposal').length;
  const openDealsCount = deals.filter((d) => d.stage !== 'Won' && d.stage !== 'Lost').length;
  const pendingTasksCount = tasks.filter((t) => t.status === 'Pending').length;
  const customerCount = contacts.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Main Dashboard' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>CRM Enterprise Dashboard</h1>
          <p className="text-xs text-secondary margin-0">
            Real-time pipeline analytics, lead activity feeds, and upcoming tasks
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={() => addToast({ title: 'Dashboard Refreshed', message: 'Synced active pipeline state.', type: 'info' })}
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

      {/* Clickable KPI Cards Row */}
      <div className="grid-responsive-kpi">
        <div onClick={() => navigate('/crm/leads')} className="cursor-pointer">
          <KPICard title="Total Leads" value={totalLeadsCount} change="+14.2%" changeType="positive" icon={Target} />
        </div>
        <div onClick={() => navigate('/crm/leads')} className="cursor-pointer">
          <KPICard title="Qualified Leads" value={qualifiedLeadsCount} change="+8.5%" changeType="positive" icon={Sparkles} />
        </div>
        <div onClick={() => navigate('/crm/pipeline')} className="cursor-pointer">
          <KPICard title="Open Opportunities" value={openDealsCount} change="$3.28M Value" changeType="positive" icon={Kanban} />
        </div>
        <div onClick={() => navigate('/crm/pipeline')} className="cursor-pointer">
          <KPICard title="Monthly Revenue" value="$482,900" change="+19.8%" changeType="positive" icon={DollarSign} />
        </div>
        <div onClick={() => navigate('/crm/tasks')} className="cursor-pointer">
          <KPICard title="Pending Tasks" value={pendingTasksCount} change="Action Required" changeType="warning" icon={CheckSquare} />
        </div>
        <div onClick={() => navigate('/crm/contacts')} className="cursor-pointer">
          <KPICard title="Active Customers" value={customerCount} change="Isolated Tenant DB" changeType="neutral" icon={Building2} />
        </div>
      </div>

      {/* Main Dashboard Widgets */}
      <div className="grid-responsive-2col">
        {/* Widget 1: Sales Pipeline Visualizer */}
        <Card>
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
              <div className="flex justify-between text-xs mb-1">
                <span>Negotiation Stage ($1.68M)</span>
                <span className="font-bold text-primary">45%</span>
              </div>
              <ProgressBar value={45} variant="primary" showLabel={false} />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Proposal Sent ($840,000)</span>
                <span className="font-bold text-success">25%</span>
              </div>
              <ProgressBar value={25} variant="success" showLabel={false} />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Qualified Opportunities ($450,000)</span>
                <span className="font-bold text-warning">18%</span>
              </div>
              <ProgressBar value={18} variant="warning" showLabel={false} />
            </div>
          </CardBody>
        </Card>

        {/* Widget 2: Lead Sources Breakdown */}
        <Card>
          <CardHeader title="Lead Sources & Attribution" subtitle="Top channels for lead acquisition this month" />
          <CardBody className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-2 surface-secondary rounded-sm text-xs">
              <span className="font-semibold text-primary">Website Direct Forms</span>
              <Badge variant="primary">42% (1,194 leads)</Badge>
            </div>
            <div className="flex items-center justify-between p-2 surface-secondary rounded-sm text-xs">
              <span className="font-semibold text-primary">LinkedIn B2B Campaigns</span>
              <Badge variant="success">28% (796 leads)</Badge>
            </div>
            <div className="flex items-center justify-between p-2 surface-secondary rounded-sm text-xs">
              <span className="font-semibold text-primary">Referral Partners & Brokers</span>
              <Badge variant="info">18% (512 leads)</Badge>
            </div>
            <div className="flex items-center justify-between p-2 surface-secondary rounded-sm text-xs">
              <span className="font-semibold text-primary">Trade Conferences 2026</span>
              <Badge variant="warning">12% (343 leads)</Badge>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Widgets Row 2: Recent Activity & Upcoming Tasks */}
      <div className="grid-responsive-2col">
        {/* Widget 3: Recent Activity Feed */}
        <Card className="p-6">
          <h3 className="text-base font-semibold mb-4">Recent CRM Activity</h3>
          <Timeline
            items={[
              { title: 'New Deal Moved to Negotiation', description: 'Enterprise Logistics Expansion deal moved by Alexander Wright', time: '10 mins ago', color: 'var(--primary)' },
              { title: 'Contact Record Created', description: 'Sofia Rodriguez added to isolated tenant database', time: '1 hour ago', color: 'var(--success)' },
              { title: 'Lead Status Updated', description: 'Samantha Ray moved from New to Qualified', time: '3 hours ago', color: 'var(--info)' },
            ]}
          />
        </Card>

        {/* Widget 4: Upcoming Tasks */}
        <Card>
          <CardHeader
            title="Upcoming Priority Tasks"
            subtitle="Actions scheduled for today"
            action={
              <Button variant="ghost" size="sm" icon={ArrowRight} onClick={() => navigate('/crm/tasks')}>
                All Tasks
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
