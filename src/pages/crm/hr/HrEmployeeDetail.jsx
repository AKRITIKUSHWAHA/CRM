import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Mail,
  Building2,
  Briefcase,
  DollarSign,
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  User,
  Hash
} from 'lucide-react';
import { Breadcrumb, Button, Card, Badge, Avatar, Modal, Input, Select } from '../../../components/ui';
import { useHr } from '../../../context/HrContext';
import { useToast } from '../../../context/ToastContext';

export const HrEmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, updateEmployee } = useHr();
  const { addToast } = useToast();

  const emp = employees.find((e) => e.id === id) || employees[0];

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    dept: '',
    salary: '',
  });

  // Sync Form Data when employee changes or modal opens
  useEffect(() => {
    if (emp) {
      setFormData({
        name: emp.name || '',
        email: emp.email || '',
        role: emp.role || '',
        dept: emp.dept || 'Engineering',
        salary: emp.salary || '$130,000',
      });
    }
  }, [emp]);

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      addToast({ title: 'Validation Error', message: 'Employee name and email are required.', type: 'error' });
      return;
    }

    updateEmployee({
      id: emp.id,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      dept: formData.dept,
      salary: formData.salary,
      status: emp.status || 'Active',
    });

    addToast({
      title: 'Profile Updated Successfully',
      message: `Employee details for ${formData.name} have been updated.`,
      type: 'success',
    });

    setIsEditModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Navigation & Action Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <Breadcrumb
            items={[
              { label: 'CRM nErgy' },
              { label: 'HR & Recruiting', href: '/crm/hr' },
              { label: 'Employees', href: '/crm/hr' },
              { label: emp.name },
            ]}
          />
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0, marginTop: '2px' }}>
            Employee Profile
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/crm/hr')}
          >
            Back to Directory
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Edit}
            onClick={() => setIsEditModalOpen(true)}
            style={{ borderRadius: '8px', padding: '0.6rem 1.25rem' }}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Main Single Clean Profile Card (No Box-in-Box Clutter & No Row Border Lines) */}
      <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)', backgroundColor: 'var(--surface)', padding: '2rem' }}>
        <div className="flex flex-col gap-8">
          
          {/* Top Hero Section */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.75rem' }}
          >
            <div className="flex items-center gap-4">
              <Avatar name={emp.name} size="lg" status="online" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {emp.name}
                  </h2>
                  <Badge variant="success">Active</Badge>
                  <Badge variant="info">{emp.dept}</Badge>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {emp.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5" style={{ marginBottom: '4px' }}>
              <span className="text-xs text-tertiary font-bold uppercase tracking-wider">Employee ID:</span>
              <span className="font-mono text-xs font-bold text-primary px-3 py-1.5 surface-secondary rounded-lg border-subtle">
                {emp.id}
              </span>
            </div>
          </div>

          {/* Clean 2-Column Key Value Profile Information (No Inner Box Lines!) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            
            {/* Left Column: Employment & Role Spec */}
            <div className="flex flex-col gap-5">
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                Employment Details
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-tertiary font-medium flex items-center gap-2">
                    <User size={15} className="text-tertiary" /> Full Name:
                  </span>
                  <span className="text-sm font-bold text-primary">{emp.name}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-tertiary font-medium flex items-center gap-2">
                    <Briefcase size={15} className="text-tertiary" /> Job Title / Role:
                  </span>
                  <span className="text-sm font-semibold text-primary">{emp.role}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-tertiary font-medium flex items-center gap-2">
                    <Building2 size={15} className="text-tertiary" /> Department Division:
                  </span>
                  <span className="text-sm font-semibold text-secondary">{emp.dept}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-tertiary font-medium flex items-center gap-2">
                    <ShieldCheck size={15} className="text-tertiary" /> Governance Role:
                  </span>
                  <span className="text-xs font-bold text-primary">Enterprise Super Admin</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Payroll Spec */}
            <div className="flex flex-col gap-5">
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                Contact & Payroll Information
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-tertiary font-medium flex items-center gap-2">
                    <Mail size={15} className="text-tertiary" /> Corporate Email:
                  </span>
                  <span className="text-sm font-mono font-bold text-primary">{emp.email}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-tertiary font-medium flex items-center gap-2">
                    <DollarSign size={15} className="text-success" /> Base Salary:
                  </span>
                  <span className="text-sm font-extrabold text-success">{emp.salary || '$130,000'}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-tertiary font-medium flex items-center gap-2">
                    <MapPin size={15} className="text-tertiary" /> Office Location:
                  </span>
                  <span className="text-sm font-medium text-secondary">San Francisco HQ (Hybrid)</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-tertiary font-medium flex items-center gap-2">
                    <Calendar size={15} className="text-tertiary" /> Date Joined:
                  </span>
                  <span className="text-sm font-medium text-secondary">Jan 15, 2022</span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Verification Footer Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-tertiary" style={{ borderTop: '1px solid var(--border)' }}>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={15} className="text-success" /> Security & background payroll credentials verified.
            </span>
            <span>Last Synced: Today at 02:30 PM</span>
          </div>

        </div>
      </Card>

      {/* Working Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Profile - ${emp.name}`}
      >
        <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
          <Input
            label="Full Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Corporate Email *"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Job Title / Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />

          <Select
            label="Department"
            value={formData.dept}
            onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
            options={[
              { value: 'Executive', label: 'Executive' },
              { value: 'Sales', label: 'Sales' },
              { value: 'Finance', label: 'Finance' },
              { value: 'Human Resources', label: 'Human Resources' },
              { value: 'Engineering', label: 'Engineering' },
              { value: 'Operations', label: 'Operations' },
            ]}
          />

          <Input
            label="Annual Base Salary"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          />

          <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-subtle">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
