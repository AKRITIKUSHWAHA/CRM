import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Landmark,
  ShieldCheck,
  FileCheck,
  Award,
  CreditCard,
  MessageSquare,
  ChevronRight,
  Sparkles,
  CheckCircle2
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
import { useOal } from '../../../context/OalContext';

export const OalBorrowerDashboard = () => {
  const navigate = useNavigate();
  const { applicationStage, stageNames, offers, messages, acceptedOffer } = useOal();

  const currentStageName = stageNames[applicationStage] || 'Offers';

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'Borrower Dashboard' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Borrower Overview</h1>
          <p className="text-xs text-secondary margin-0">
            Track loan application progress, AI Risk score, and competing lender offers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={ShieldCheck}
            onClick={() => navigate('/oal/borrower/kyc')}
          >
            KYC Vault
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={CreditCard}
            style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
            onClick={() => navigate('/oal/borrower/offers')}
          >
            View Lender Offers ({offers.length})
          </Button>
        </div>
      </div>

      {/* 11-Stage Application Progress Stepper */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">11-Stage Marketplace Application Status</h3>
          <Badge variant="success" icon={Sparkles}>
            Current Stage: {currentStageName}
          </Badge>
        </div>

        {/* Stepper horizontal tracker */}
        <div className="flex items-center justify-between overflow-x-auto pb-2 gap-2">
          {stageNames.map((name, idx) => {
            const isCompleted = idx < applicationStage;
            const isActive = idx === applicationStage;

            return (
              <div
                key={name}
                onClick={() => {
                  if (name === 'KYC') navigate('/oal/borrower/kyc');
                  if (name === 'Application') navigate('/oal/borrower/application');
                  if (name === 'Documents') navigate('/oal/borrower/documents');
                  if (name === 'AI Score') navigate('/oal/borrower/score');
                  if (name === 'Offers') navigate('/oal/borrower/offers');
                }}
                className="flex flex-col items-center cursor-pointer min-w-16"
                title={`Click to navigate to ${name}`}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: isCompleted
                      ? 'var(--success)'
                      : isActive
                      ? 'var(--accent)'
                      : 'var(--surface-secondary)',
                    color: isCompleted || isActive ? '#ffffff' : 'var(--text-secondary)',
                    border: isActive ? '2px solid var(--accent)' : '1px solid var(--border)',
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                </div>
                <span
                  className="text-xs font-medium mt-1 text-center truncate"
                  style={{
                    fontSize: '10px',
                    color: isActive ? 'var(--accent)' : isCompleted ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Clickable KPI Cards Grid */}
      <div className="grid-responsive-kpi">
        <div onClick={() => navigate('/oal/borrower/offers')} className="cursor-pointer">
          <KPICard title="Application Status" value={currentStageName} change="3 Offers Received" changeType="positive" icon={Landmark} />
        </div>
        <div onClick={() => navigate('/oal/borrower/score')} className="cursor-pointer">
          <KPICard title="AI Credit Rating" value="792 / 850" change="Grade A+ Verified" changeType="positive" icon={Award} />
        </div>
        <div onClick={() => navigate('/oal/borrower/documents')} className="cursor-pointer">
          <KPICard title="Vault Documents" value="5 Files" change="100% Verified" changeType="positive" icon={FileCheck} />
        </div>
        <div onClick={() => navigate('/oal/borrower/offers')} className="cursor-pointer">
          <KPICard title="Best Interest Offer" value="4.8% APR" change="Apex Credit Corp" changeType="positive" icon={CreditCard} />
        </div>
        <div onClick={() => navigate('/oal/borrower/messages')} className="cursor-pointer">
          <KPICard title="Agent Messages" value={`${messages.length} Messages`} change="OAL Rep Online" changeType="neutral" icon={MessageSquare} />
        </div>
        <div onClick={() => navigate('/oal/borrower/referrals')} className="cursor-pointer">
          <KPICard title="Referral Program" value="$2,500 Bonus" change="Share link" changeType="positive" icon={Sparkles} />
        </div>
      </div>

      {/* Accepted Offer / Active Offers Preview */}
      <div className="grid-responsive-2col">
        {acceptedOffer ? (
          <Card className="p-6 flex flex-col gap-4 border-success">
            <div className="flex items-center justify-between">
              <Badge variant="success" icon={CheckCircle2}>Accepted Lender Offer</Badge>
              <span className="font-mono text-xs text-tertiary">{acceptedOffer.id}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">{acceptedOffer.lender}</h3>
              <div className="text-sm font-bold text-success mt-1">{acceptedOffer.amount} at {acceptedOffer.rate}</div>
            </div>
            <div className="p-3 surface-secondary rounded-sm text-xs flex justify-between">
              <span>Monthly Payment: <strong>{acceptedOffer.monthlyPayment}</strong></span>
              <span>Loan Term: <strong>{acceptedOffer.term}</strong></span>
            </div>
          </Card>
        ) : (
          <Card>
            <CardHeader
              title="Active Marketplace Offers"
              subtitle="Lenders competing for your loan request"
              action={
                <Button variant="ghost" size="sm" icon={ChevronRight} onClick={() => navigate('/oal/borrower/offers')}>
                  Compare Offers
                </Button>
              }
            />
            <CardBody className="flex flex-col gap-3">
              {offers.map((off) => (
                <div
                  key={off.id}
                  onClick={() => navigate('/oal/borrower/offers')}
                  className="p-3 surface-secondary rounded-sm border-subtle flex items-center justify-between cursor-pointer hover:border-strong transition-all"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-xs text-primary">{off.lender}</span>
                    <span className="text-xs text-secondary">{off.amount} — <strong className="text-success">{off.rate}</strong></span>
                  </div>
                  <Button variant="outline" size="sm">Inspect</Button>
                </div>
              ))}
            </CardBody>
          </Card>
        )}

        {/* Recent Agent Messages */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold mb-3">Assigned OAL Representative</h3>
            <div className="p-3 surface-secondary rounded-sm border-subtle flex flex-col gap-2 text-xs mb-4">
              <div className="flex justify-between font-semibold text-primary">
                <span>Sarah Jenkins (OAL Licensed Agent)</span>
                <Badge variant="success">Online</Badge>
              </div>
              <p className="margin-0 text-secondary">{messages[messages.length - 1]?.text}</p>
            </div>
          </div>
          <Button variant="primary" size="sm" icon={MessageSquare} onClick={() => navigate('/oal/borrower/messages')}>
            Open Agent Chat Portal
          </Button>
        </Card>
      </div>
    </div>
  );
};
