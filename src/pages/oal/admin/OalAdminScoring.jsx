import React, { useState } from 'react';
import { TrendingUp, Sliders, Save, Sparkles, ShieldCheck } from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Tabs, Input, Select, Badge, Table, TableHeader, TableBody, TableRow, TableCell } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';

export const OalAdminScoring = () => {
  const { addToast } = useToast();

  const [scoringProfile, setScoringProfile] = useState('applicant'); // applicant vs investor

  // Config State for Regular Applicant Score Engine
  const [applicantFactors, setApplicantFactors] = useState([
    { id: '1', factor: 'Cashflow Stability & Monthly Revenue', rule: 'Linear telemetry score based on 24-month bank data', weight: '35%', threshold: 'Min $50,000 / mo' },
    { id: '2', factor: 'Debt Service Coverage Ratio (DSCR)', rule: 'Net operating income divided by proposed monthly loan service', weight: '30%', threshold: 'Min 1.25x' },
    { id: '3', factor: 'Collateral & Receivables Coverage', rule: 'Appraised unencumbered corporate equipment and trade receivables', weight: '20%', threshold: 'Min 100% principal' },
    { id: '4', factor: 'Trade Credit & Payables History', rule: 'Zero default occurrences across Dun & Bradstreet trade accounts', weight: '15%', threshold: 'Zero defaults' },
  ]);

  // Config State for Qualified Verified Investor Score Engine
  const [investorFactors, setInvestorFactors] = useState([
    { id: '1', factor: 'Fund Assets Under Management (AUM)', rule: 'Verified institutional balance sheet or SEC ADV filing', weight: '40%', threshold: 'Min $10,000,000' },
    { id: '2', factor: 'Capital Deployment Velocity', rule: 'Historical bidding frequency and wire transfer speed', weight: '30%', threshold: 'Sub-48h settlement' },
    { id: '3', factor: 'Lender Regulatory Accreditation', rule: 'FINRA / SEC commercial debt fund license status', weight: '30%', threshold: 'Active License' },
  ]);

  const handleSaveScoringRules = (e) => {
    e.preventDefault();
    addToast({ title: 'AI Scoring Rules Updated', message: `Saved parameters for ${scoringProfile === 'applicant' ? 'Regular Applicant' : 'Verified Investor'} engine.`, type: 'success' });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'OAL Admin' }, { label: 'AI Risk Scoring Config' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>AI Credit Risk Scoring Rules Engine</h1>
        </div>

        <Badge variant="success" icon={Sparkles}>
          Underwriting Model v3.4 Active
        </Badge>
      </div>

      {/* Profile Selector Tabs */}
      <Card>
        <CardBody className="p-2">
          <Tabs
            tabs={[
              { id: 'applicant', label: 'Regular Applicant Score Engine', icon: Sliders },
              { id: 'investor', label: 'Qualified Verified Investor Score Engine', icon: ShieldCheck },
            ]}
            activeTab={scoringProfile}
            onChange={setScoringProfile}
          />
        </CardBody>
      </Card>

      {/* Rules Engine Configuration Table */}
      <form onSubmit={handleSaveScoringRules} className="flex flex-col gap-4">
        <Card>
          <CardHeader
            title={scoringProfile === 'applicant' ? 'Regular Borrower Credit Factors & Weights' : 'Verified Investor Liquidity Factors & Weights'}
            subtitle="Configure algorithmic weighting, evaluation rules, and minimum qualification thresholds"
          />
          <CardBody className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Evaluation Factor</TableCell>
                  <TableCell isHeader>Algorithmic Rule Description</TableCell>
                  <TableCell isHeader>Factor Weight (%)</TableCell>
                  <TableCell isHeader>Qualification Threshold</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(scoringProfile === 'applicant' ? applicantFactors : investorFactors).map((f) => (
                  <TableRow key={f.id}>
                    <TableCell><span className="font-semibold text-primary">{f.factor}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{f.rule}</span></TableCell>
                    <TableCell><Badge variant="primary">{f.weight}</Badge></TableCell>
                    <TableCell><Badge variant="success">{f.threshold}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        <div className="flex justify-end">
          <Button variant="primary" size="md" type="submit" icon={Save} style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}>
            Save Scoring Engine Parameters
          </Button>
        </div>
      </form>
    </div>
  );
};
