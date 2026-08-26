import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, ArrowLeft, Mail, Briefcase } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Badge } from '../../../components/ui';
import { useHr } from '../../../context/HrContext';

export const HrEmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees } = useHr();

  const emp = employees.find((e) => e.id === id) || employees[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'HR' }, { label: 'Employees', href: '/crm/hr/employees' }, { label: emp.name }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>{emp.name}</h1>
        </div>
        <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => navigate('/crm/hr/employees')}>Back</Button>
      </div>

      <Card className="p-6">
        <h3 className="text-base font-semibold mb-4">Employee Profile</h3>
        <div className="flex flex-col gap-3 text-xs">
          <div className="flex justify-between border-b border-subtle pb-2">
            <span className="text-tertiary">Department:</span>
            <span className="font-semibold">{emp.dept}</span>
          </div>
          <div className="flex justify-between border-b border-subtle pb-2">
            <span className="text-tertiary">Job Role:</span>
            <span className="font-semibold">{emp.role}</span>
          </div>
          <div className="flex justify-between border-b border-subtle pb-2">
            <span className="text-tertiary">Corporate Email:</span>
            <span className="text-primary">{emp.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-tertiary">Base Salary:</span>
            <span className="font-bold text-success">{emp.salary}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
