import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Boxes,
  FolderGit2,
  ShoppingCart,
  DollarSign,
  Layers,
  ArrowRight,
  Plus,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  Building2
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
  Select
} from '../../../components/ui';
import { useErp } from '../../../context/ErpContext';
import { useToast } from '../../../context/ToastContext';

export const ErpDashboard = () => {
  const navigate = useNavigate();
  const { projects, addProject, purchaseOrders, inventory } = useErp();
  const { addToast } = useToast();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    budget: '$300,000',
    spent: '$50,000',
    manager: 'Alexander Wright',
    status: 'In Progress',
    progress: 25,
    deadline: '2026-06-30',
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.client) {
      addToast({ title: 'Validation Error', message: 'Project name and client required.', type: 'error' });
      return;
    }
    addProject(formData);
    addToast({ title: 'ERP Project Initialized', message: `Added "${formData.name}" to operations.`, type: 'success' });
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      client: '',
      budget: '$300,000',
      spent: '$50,000',
      manager: 'Alexander Wright',
      status: 'In Progress',
      progress: 25,
      deadline: '2026-06-30',
    });
  };

  const subModules = [
    { id: 'projects', label: 'Projects List', path: '/crm/erp/projects', icon: FolderGit2, badge: `${projects.length} Active`, subtitle: 'Milestones & Delivery' },
    { id: 'procurement', label: 'Procurement', path: '/crm/erp/procurement', icon: ShoppingCart, badge: `${purchaseOrders.length} Orders`, subtitle: 'Vendor POs & Invoices' },
    { id: 'inventory', label: 'Inventory SKU', path: '/crm/erp/inventory', icon: Boxes, badge: `${inventory.length} SKUs`, subtitle: 'Stock & Warehouses' },
    { id: 'finance', label: 'Finance Ledgers', path: '/crm/erp/finance', icon: DollarSign, badge: '$385k', subtitle: 'AP/AR & Expenses' },
    { id: 'supply-chain', label: 'Supply Chain', path: '/crm/erp/supply-chain', icon: Layers, badge: 'Fleet Live', subtitle: 'Logistics & Freight' },
    { id: 'manufacturing', label: 'Manufacturing', path: '/crm/erp/manufacturing', icon: Boxes, badge: '4 Workstations', subtitle: 'Assembly & Production' },
    { id: 'sales-orders', label: 'Sales Orders', path: '/crm/erp/sales-orders', icon: FolderGit2, badge: '12 Orders', subtitle: 'Commercial Fulfillment' },
    { id: 'reports', label: 'ERP Reports', path: '/crm/erp/reports', icon: ArrowRight, badge: 'Audit Hub', subtitle: 'Operational Analytics' },
  ];

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'ERP & Operations' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>ERP Operations Suite</h1>
          <p className="text-xs text-secondary margin-0">
            Enterprise resource planning, procurement, project milestones, and supply chain control
          </p>
        </div>

        <div className="dashboard-actions-grid w-full md:w-auto">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            className="w-full md:w-auto justify-center"
            onClick={() => setIsAddModalOpen(true)}
          >
            New ERP Project
          </Button>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid-responsive-kpi">
        <div onClick={() => navigate('/crm/erp/projects')} className="cursor-pointer">
          <KPICard title="Active Projects" value={projects.length} change="3 Milestones Pending" changeType="positive" icon={FolderGit2} />
        </div>
        <div onClick={() => navigate('/crm/erp/procurement')} className="cursor-pointer">
          <KPICard title="Purchase Orders" value={purchaseOrders.length} change="$127,500 Total" changeType="positive" icon={ShoppingCart} />
        </div>
        <div onClick={() => navigate('/crm/erp/inventory')} className="cursor-pointer">
          <KPICard title="Stock SKU Items" value={inventory.length} change="1 Low Stock Alert" changeType="warning" icon={Boxes} />
        </div>
        <div onClick={() => navigate('/crm/erp/finance')} className="cursor-pointer">
          <KPICard title="Operational Expenses" value="$385,000" change="On Budget" changeType="positive" icon={DollarSign} />
        </div>
      </div>

      {/* 3. ERP Enterprise Sub-Modules (Systematic 4-Column Card Grid) */}
      <Card className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3.5">
          <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
            ERP Enterprise Sub-Modules
          </h3>
          <span className="text-xs text-tertiary font-medium">8 Integrated Suites</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.75rem' }}>
          {subModules.map((mod) => {
            const ModIcon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => navigate(mod.path)}
                className="surface-secondary border-subtle rounded-md p-3.5 flex items-center justify-between cursor-pointer transition-all hover:border-primary"
                style={{
                  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface)';
                  e.currentTarget.style.borderColor = 'var(--primary-border)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ModIcon size={18} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-xs text-primary truncate">{mod.label}</span>
                    <span className="text-tertiary" style={{ fontSize: '11px' }}>{mod.subtitle}</span>
                  </div>
                </div>

                <Badge variant="default" style={{ fontSize: '10px', flexShrink: 0 }}>
                  {mod.badge}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 4. Active ERP Project Milestones */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-subtle">
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Active ERP Project Milestones
            </h2>
            <p className="text-xs text-secondary margin-0 mt-0.5">
              Live delivery progress, budget burn rates, and executive targets
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            icon={ArrowRight}
            onClick={() => navigate('/crm/erp/projects')}
          >
            View All Projects
          </Button>
        </div>

        <div className="p-4 sm:p-5 flex flex-col gap-3.5">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-4 surface-secondary rounded-md border-subtle flex flex-col gap-3 transition-all hover:border-primary"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}
            >
              {/* Top Row: Title, Client, Manager, Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-primary">{p.name}</span>
                  <Badge variant="default" style={{ fontSize: '11px' }}>
                    <Building2 size={11} className="mr-1 inline" />
                    {p.client}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-tertiary flex items-center gap-1">
                    <User size={13} /> {p.manager}
                  </span>
                  <Badge
                    variant={
                      p.status === 'Completed'
                        ? 'success'
                        : p.status === 'Review'
                        ? 'warning'
                        : 'primary'
                    }
                  >
                    {p.status}
                  </Badge>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full">
                <ProgressBar value={p.progress} variant={p.progress >= 80 ? 'success' : 'primary'} />
              </div>

              {/* Bottom Row: Financial Metrics, Deadline & Quick Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-subtle text-xs text-secondary gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span>Budget: <strong className="text-primary">{p.budget}</strong></span>
                  <span>Spent: <strong className="text-secondary">{p.spent}</strong></span>
                  <span className="flex items-center gap-1 text-tertiary">
                    <Calendar size={13} /> Deadline: <strong className="text-primary">{p.deadline}</strong>
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/crm/erp/projects/${p.id}`)}
                  style={{ fontSize: '11px', padding: '0.2rem 0.6rem' }}
                >
                  Manage Milestones
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 5. Add Project Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Initialize New ERP Project"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateProject}>
              Create Project
            </Button>
          </>
        }
      >
        <form className="flex flex-col gap-4">
          <Input
            label="Project Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Regional Automated Fulfillment Center"
            required
          />
          <Input
            label="Client / Operating Entity"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            placeholder="e.g. Apex Global Technologies"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Total Budget ($)"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="e.g. $450,000"
            />
            <Input
              label="Project Manager"
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              placeholder="e.g. Alexander Wright"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Target Delivery Deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              required
            />
            <Select
              label="Initial Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={['In Progress', 'Review', 'Planning', 'Completed']}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
