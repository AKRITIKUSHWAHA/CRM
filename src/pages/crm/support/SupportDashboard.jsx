import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LifeBuoy, MessageSquare, BookOpen, CheckCircle2, Plus } from 'lucide-react';
import { Breadcrumb, Button, KPICard, Card, CardHeader, CardBody, Badge } from '../../../components/ui';
import { useSupport } from '../../../context/SupportContext';

export const SupportDashboard = () => {
  const navigate = useNavigate();
  const { tickets, kbArticles } = useSupport();

  const openCount = tickets.filter((t) => t.status === 'Open' || t.status === 'In Progress').length;
  const resolvedCount = tickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Customer Support' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Customer Support Desk</h1>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={() => navigate('/crm/support/tickets')}>
          Create Ticket
        </Button>
      </div>

      <div className="grid-responsive-kpi">
        <div onClick={() => navigate('/crm/support/tickets')} className="cursor-pointer">
          <KPICard title="Active Tickets" value={openCount} change="SLA 99.4%" changeType="positive" icon={LifeBuoy} />
        </div>
        <div onClick={() => navigate('/crm/support/tickets')} className="cursor-pointer">
          <KPICard title="Resolved Tickets" value={resolvedCount} change="Avg 4.2h speed" changeType="positive" icon={CheckCircle2} />
        </div>
        <div onClick={() => navigate('/crm/support/chat')} className="cursor-pointer">
          <KPICard title="Live Support Chat" value="Active Gateway" change="Direct customer chat" changeType="neutral" icon={MessageSquare} />
        </div>
        <div onClick={() => navigate('/crm/support/kb')} className="cursor-pointer">
          <KPICard title="Knowledge Base" value={`${kbArticles.length} Articles`} change="3,050 total views" changeType="positive" icon={BookOpen} />
        </div>
      </div>

      <Card className="p-4">
        <h4 className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-3">Support Suite Sub-Modules</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" size="sm" icon={LifeBuoy} onClick={() => navigate('/crm/support/tickets')}>Support Tickets</Button>
          <Button variant="outline" size="sm" icon={MessageSquare} onClick={() => navigate('/crm/support/chat')}>Live Support Chat</Button>
          <Button variant="outline" size="sm" icon={BookOpen} onClick={() => navigate('/crm/support/kb')}>Knowledge Base</Button>
          <Button variant="outline" size="sm" icon={CheckCircle2} onClick={() => navigate('/crm/support/reports')}>Support Reports</Button>
        </div>
      </Card>
    </div>
  );
};
