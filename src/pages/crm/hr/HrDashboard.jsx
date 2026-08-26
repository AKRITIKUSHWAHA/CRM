import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Users, Briefcase, Calendar, Plus, ArrowRight } from 'lucide-react';
import { Breadcrumb, Button, KPICard, Card, CardHeader, CardBody, Badge } from '../../../components/ui';
import { useHr } from '../../../context/HrContext';

export const HrDashboard = () => {
  const navigate = useNavigate();
  const { employees, candidates } = useHr();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'HR & Recruiting' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Human Resources & Recruiting</h1>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={() => navigate('/crm/hr/employees')}>
          Add Employee
        </Button>
      </div>

      <div className="grid-responsive-kpi">
        <div onClick={() => navigate('/crm/hr/employees')} className="cursor-pointer">
          <KPICard title="Total Workforce" value={employees.length} change="100% Active" changeType="positive" icon={Users} />
        </div>
        <div onClick={() => navigate('/crm/hr/candidates')} className="cursor-pointer">
          <KPICard title="Active Candidates" value={candidates.length} change="2 Interviews Scheduled" changeType="positive" icon={UserCheck} />
        </div>
        <div onClick={() => navigate('/crm/hr/jobs')} className="cursor-pointer">
          <KPICard title="Open Roles" value="4 Postings" change="Engineering & Sales" changeType="neutral" icon={Briefcase} />
        </div>
        <div onClick={() => navigate('/crm/hr/interviews')} className="cursor-pointer">
          <KPICard title="Scheduled Interviews" value="3 Today" change="100% Attendance" changeType="positive" icon={Calendar} />
        </div>
      </div>

      <Card className="p-4">
        <h4 className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-3">HR Enterprise Modules</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" size="sm" icon={Users} onClick={() => navigate('/crm/hr/employees')}>Employees Directory</Button>
          <Button variant="outline" size="sm" icon={UserCheck} onClick={() => navigate('/crm/hr/candidates')}>Candidates Pool</Button>
          <Button variant="outline" size="sm" icon={Briefcase} onClick={() => navigate('/crm/hr/jobs')}>Job Openings</Button>
          <Button variant="outline" size="sm" icon={Calendar} onClick={() => navigate('/crm/hr/interviews')}>Interview Schedule</Button>
        </div>
      </Card>
    </div>
  );
};
