import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Send, CheckCircle2, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';
import { Breadcrumb, Button, KPICard, Card, CardHeader, CardBody, Badge, Table, TableHeader, TableBody, TableRow, TableCell } from '../../../components/ui';
import { useOal } from '../../../context/OalContext';

export const OalLenderDashboard = () => {
  const navigate = useNavigate();
  const { lenderLeads, offers } = useOal();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'Institutional Lender Portal' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Lender Portal Dashboard</h1>
          <p className="text-xs text-secondary margin-0">
            Vanguard Capital Debt Fund — Bidding on pre-vetted corporate loan applications
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={ArrowRight}
          onClick={() => navigate('/oal/lender/leads')}
        >
          View Qualified Leads Pool
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid-responsive-kpi">
        <div onClick={() => navigate('/oal/lender/leads')} className="cursor-pointer">
          <KPICard title="New Qualified Leads" value={lenderLeads.length} change="Pre-Scored Grade A+" changeType="positive" icon={Users} />
        </div>
        <div onClick={() => navigate('/oal/lender/applications')} className="cursor-pointer">
          <KPICard title="Applications" value="8 Underwriting" change="KYC Verified" changeType="positive" icon={FileText} />
        </div>
        <div onClick={() => navigate('/oal/lender/offers')} className="cursor-pointer">
          <KPICard title="Offers Submitted" value={offers.length} change="Active Bids" changeType="positive" icon={Send} />
        </div>
        <div onClick={() => navigate('/oal/lender/offers')} className="cursor-pointer">
          <KPICard title="Accepted Offers" value="3 Deals Executed" change="100% Rate Match" changeType="positive" icon={CheckCircle2} />
        </div>
        <div onClick={() => navigate('/oal/lender/analytics')} className="cursor-pointer">
          <KPICard title="Funded Capital" value="$4,200,000" change="Avg 5.4% APR" changeType="positive" icon={DollarSign} />
        </div>
      </div>

      {/* Qualified Leads Table Preview */}
      <Card>
        <CardHeader
          title="New High-Grade Borrower Leads"
          subtitle="Pre-vetted corporate entities seeking commercial debt lines"
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/oal/lender/leads')}>View All Leads</Button>}
        />
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Lead Code</TableCell>
                <TableCell isHeader>Borrower Entity</TableCell>
                <TableCell isHeader>Loan Purpose</TableCell>
                <TableCell isHeader>Requested Principal</TableCell>
                <TableCell isHeader>AI Credit Score</TableCell>
                <TableCell isHeader>Grade</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lenderLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell><span className="font-mono text-xs">{lead.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{lead.borrower}</span></TableCell>
                  <TableCell>{lead.loanType}</TableCell>
                  <TableCell><span className="font-bold text-success">{lead.amount}</span></TableCell>
                  <TableCell><Badge variant="success">{lead.score} / 850</Badge></TableCell>
                  <TableCell><Badge variant="primary">{lead.qual}</Badge></TableCell>
                  <TableCell align="right">
                    <Button variant="ghost" size="sm" icon={ArrowRight} onClick={() => navigate(`/oal/lender/leads/${lead.id}`)}>
                      Submit Offer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
