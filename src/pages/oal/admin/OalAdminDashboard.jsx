import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Building2,
  FileText,
  CheckCircle2,
  DollarSign,
  Send,
  LifeBuoy,
  TrendingUp,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  KPICard,
  Card,
  CardHeader,
  CardBody,
  Badge,
  ProgressBar
} from '../../../components/ui';

export const OalAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'Platform Master Admin' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>OAL Platform Governance Dashboard</h1>
          <p className="text-xs text-secondary margin-0">
            Master administration, lender approvals, AI scoring rules, and marketplace audit logs
          </p>
        </div>

        <Badge variant="success" icon={ShieldCheck}>
          Master Admin Vault Active
        </Badge>
      </div>

      {/* 8 KPI Cards */}
      <div className="grid-responsive-kpi" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div onClick={() => navigate('/oal/admin/borrowers')} className="cursor-pointer">
          <KPICard title="Total Borrowers" value="1,420" change="+14.2%" changeType="positive" icon={Users} />
        </div>
        <div onClick={() => navigate('/oal/admin/applications')} className="cursor-pointer">
          <KPICard title="Applications" value="280 Queue" change="86% Verified" changeType="positive" icon={FileText} />
        </div>
        <div onClick={() => navigate('/oal/admin/applications')} className="cursor-pointer">
          <KPICard title="Qualified Pre-Scored" value="240 Grade A+" change="92% Match" changeType="positive" icon={CheckCircle2} />
        </div>
        <div onClick={() => navigate('/oal/admin/lenders')} className="cursor-pointer">
          <KPICard title="Active Lenders" value="85 Institutions" change="3 Pending" changeType="warning" icon={Building2} />
        </div>
        <div onClick={() => navigate('/oal/admin/applications')} className="cursor-pointer">
          <KPICard title="Total Offers" value="450 Submitted" change="Avg 4.8% APR" changeType="positive" icon={Send} />
        </div>
        <div onClick={() => navigate('/oal/admin/applications')} className="cursor-pointer">
          <KPICard title="Approved Loans" value="180 Executed" change="100% SLA" changeType="positive" icon={CheckCircle2} />
        </div>
        <div onClick={() => navigate('/oal/admin/payments')} className="cursor-pointer">
          <KPICard title="Funded Loan Volume" value="$18,400,000" change="+24.8%" changeType="positive" icon={DollarSign} />
        </div>
        <div onClick={() => navigate('/oal/admin/support')} className="cursor-pointer">
          <KPICard title="Support Tickets" value="4 Open" change="AI Desk Active" changeType="neutral" icon={LifeBuoy} />
        </div>
      </div>

      {/* 5 Visual Analytics & Progress Breakdown Grid */}
      <div className="grid-responsive-2col">
        {/* Chart 1 & 2: Applications & Qualification */}
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">Application & Qualification Pipeline</h3>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Application Processing Speed (SLA &lt; 24h)</span>
                <span className="font-bold text-success">96%</span>
              </div>
              <ProgressBar value={96} variant="success" showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Grade A+ Qualified Borrowers (AI Score &gt; 780)</span>
                <span className="font-bold text-primary">84%</span>
              </div>
              <ProgressBar value={84} variant="primary" showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Grade B+ Qualified Borrowers (AI Score 720-779)</span>
                <span className="font-bold text-info">16%</span>
              </div>
              <ProgressBar value={16} variant="info" showLabel={false} />
            </div>
          </div>
        </Card>

        {/* Chart 3, 4 & 5: Funding, Loan Volume, Lender Activity */}
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">Funding Volume & Lender Bidding Telemetry</h3>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Fund Disbursement Settlement Rate ($18.4M)</span>
                <span className="font-bold text-success">92%</span>
              </div>
              <ProgressBar value={92} variant="success" showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Institutional Lender Bidding Participation</span>
                <span className="font-bold text-primary">88%</span>
              </div>
              <ProgressBar value={88} variant="primary" showLabel={false} />
            </div>
          </div>
        </Card>
      </div>

      {/* Admin Quick Module Links */}
      <Card className="p-4">
        <h4 className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-3">Master Platform Administration Modules</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" size="sm" icon={Users} onClick={() => navigate('/oal/admin/borrowers')}>Borrower Directory</Button>
          <Button variant="outline" size="sm" icon={Building2} onClick={() => navigate('/oal/admin/lenders')}>Lender Approvals</Button>
          <Button variant="outline" size="sm" icon={FileText} onClick={() => navigate('/oal/admin/applications')}>Master Applications</Button>
          <Button variant="outline" size="sm" icon={ShieldCheck} onClick={() => navigate('/oal/admin/verification')}>KYC Verification</Button>
          <Button variant="outline" size="sm" icon={TrendingUp} onClick={() => navigate('/oal/admin/scoring')}>AI Scoring Rules</Button>
          <Button variant="outline" size="sm" icon={DollarSign} onClick={() => navigate('/oal/admin/payments')}>Payments & Fees</Button>
          <Button variant="outline" size="sm" icon={LifeBuoy} onClick={() => navigate('/oal/admin/support')}>AI Support Desk</Button>
          <Button variant="outline" size="sm" icon={ArrowRight} onClick={() => navigate('/oal/admin/audit')}>Audit Log Feed</Button>
        </div>
      </Card>
    </div>
  );
};
