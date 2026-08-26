import React from 'react';
import { Award, Sparkles, TrendingUp, ShieldCheck, DollarSign } from 'lucide-react';
import { Breadcrumb, Card, CardHeader, CardBody, Badge, ProgressBar } from '../../../components/ui';

export const OalBorrowerScore = () => {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Borrower' }, { label: 'AI Score Engine' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>AI Credit Risk Rating</h1>

      {/* Main Score Banner */}
      <Card className="p-8 text-center flex flex-col items-center gap-3" style={{ background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-secondary) 100%)' }}>
        <Badge variant="success" icon={Sparkles}>Underwriting Grade A+</Badge>
        <div style={{ fontSize: '3.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--success)', lineHeight: 1 }}>
          792 <span style={{ fontSize: '1.25rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>/ 850</span>
        </div>
        <p className="text-xs text-secondary max-w-md margin-0">
          Your company profile ranks in the top 5% of commercial marketplace borrowers, qualifying for minimum APR interest rates.
        </p>
      </Card>

      {/* Score Factors Breakdown Grid */}
      <div className="grid-responsive-2col">
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">1. Cashflow Stability Rating</h3>
          <ProgressBar value={95} variant="success" />
          <p className="text-xs text-secondary margin-0">Average monthly revenue of $350,000 shows 95% consistency over 24 months.</p>
        </Card>

        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">2. Debt Service Coverage Ratio (DSCR)</h3>
          <ProgressBar value={88} variant="success" />
          <p className="text-xs text-secondary margin-0">Operating income exceeds proposed monthly loan service obligations by 3.8x.</p>
        </Card>

        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">3. Collateral & Equipment Coverage</h3>
          <ProgressBar value={90} variant="success" />
          <p className="text-xs text-secondary margin-0">Unencumbered corporate equipment & accounts receivable exceed requested loan principal.</p>
        </Card>

        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">4. Trade Credit History</h3>
          <ProgressBar value={92} variant="success" />
          <p className="text-xs text-secondary margin-0">Zero historical defaults or supplier delinquencies across all trade accounts.</p>
        </Card>
      </div>
    </div>
  );
};
