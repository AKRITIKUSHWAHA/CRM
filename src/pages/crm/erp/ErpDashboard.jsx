import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Boxes, FolderGit2, ShoppingCart, DollarSign, Layers, ArrowRight, Plus } from 'lucide-react';
import { Breadcrumb, Button, KPICard, Card, CardHeader, CardBody, Badge, ProgressBar } from '../../../components/ui';
import { useErp } from '../../../context/ErpContext';

export const ErpDashboard = () => {
  const navigate = useNavigate();
  const { projects, purchaseOrders, inventory } = useErp();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'ERP & Operations' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>ERP Operations Suite</h1>
          <p className="text-xs text-secondary margin-0">
            Enterprise resource planning, procurement, project milestones, and supply chain control
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" icon={Plus} onClick={() => navigate('/crm/erp/projects')}>
            New ERP Project
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
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

      {/* Navigation Sub-Modules Links */}
      <Card className="p-4">
        <h4 className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-3">ERP Enterprise Sub-Modules</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" size="sm" icon={FolderGit2} onClick={() => navigate('/crm/erp/projects')}>Projects List</Button>
          <Button variant="outline" size="sm" icon={ShoppingCart} onClick={() => navigate('/crm/erp/procurement')}>Procurement</Button>
          <Button variant="outline" size="sm" icon={Boxes} onClick={() => navigate('/crm/erp/inventory')}>Inventory SKU</Button>
          <Button variant="outline" size="sm" icon={DollarSign} onClick={() => navigate('/crm/erp/finance')}>Finance Ledgers</Button>
          <Button variant="outline" size="sm" icon={Layers} onClick={() => navigate('/crm/erp/supply-chain')}>Supply Chain</Button>
          <Button variant="outline" size="sm" icon={Boxes} onClick={() => navigate('/crm/erp/manufacturing')}>Manufacturing</Button>
          <Button variant="outline" size="sm" icon={FolderGit2} onClick={() => navigate('/crm/erp/sales-orders')}>Sales Orders</Button>
          <Button variant="outline" size="sm" icon={ArrowRight} onClick={() => navigate('/crm/erp/reports')}>ERP Reports</Button>
        </div>
      </Card>

      {/* Active Projects Table Preview */}
      <Card>
        <CardHeader title="Active ERP Project Milestones" action={<Button variant="ghost" size="sm" onClick={() => navigate('/crm/erp/projects')}>View All</Button>} />
        <CardBody className="flex flex-col gap-4">
          {projects.map((p) => (
            <div key={p.id} className="p-3 surface-secondary rounded-sm border-subtle flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between font-bold text-primary">
                <span>{p.name} ({p.client})</span>
                <Badge variant="primary">{p.status}</Badge>
              </div>
              <ProgressBar value={p.progress} variant="success" />
              <div className="flex justify-between text-tertiary">
                <span>Budget: {p.budget} (Spent: {p.spent})</span>
                <span>Deadline: {p.deadline}</span>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};
