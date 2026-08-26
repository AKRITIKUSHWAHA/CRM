import React, { useState } from 'react';
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
  CheckCircle2,
  Send,
  User,
  Copy,
  Check,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  KPICard,
  Card,
  Badge,
  Modal,
  Input
} from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerDashboard = () => {
  const navigate = useNavigate();
  const {
    applicationStage,
    stageNames,
    offers,
    messages,
    acceptedOffer,
    acceptLenderOffer,
    sendAgentMessage
  } = useOal();
  const { addToast } = useToast();

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [quickReplyText, setQuickReplyText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const currentStageName = stageNames[applicationStage] || 'Offers';

  const handleInspectOffer = (offer) => {
    setSelectedOffer(offer);
    setIsOfferModalOpen(true);
  };

  const handleAcceptOffer = () => {
    if (selectedOffer) {
      acceptLenderOffer(selectedOffer);
      setIsOfferModalOpen(false);
      addToast({
        title: 'Offer Accepted!',
        message: `Accepted ${selectedOffer.amount} facility from ${selectedOffer.lender}. Proceeding to underwriting.`,
        type: 'success',
      });
    }
  };

  const handleSendQuickReply = (e) => {
    e.preventDefault();
    if (!quickReplyText.trim()) return;
    sendAgentMessage(quickReplyText);
    setQuickReplyText('');
    addToast({
      title: 'Message Sent to Agent',
      message: 'Sarah Jenkins has received your inquiry.',
      type: 'success',
    });
  };

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText('https://oalnetwork.com/ref?code=BIOGENIX-7749');
    setCopiedLink(true);
    addToast({
      title: 'Link Copied',
      message: 'Referral link copied to clipboard.',
      type: 'info',
    });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'Borrower Dashboard' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>Borrower Overview</h1>
          <p className="text-xs text-secondary margin-0">
            Track loan application progress, AI Risk score, and competing lender offers
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
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

      {/* 2. 11-Stage Application Progress Stepper */}
      <Card style={{ padding: '1.25rem' }}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              11-Stage Marketplace Application Status
            </h3>
            <span className="text-xs text-secondary">Interactive lifecycle from onboarding to loan wire execution</span>
          </div>
          <Badge variant="success" icon={Sparkles}>
            Current Stage: {currentStageName}
          </Badge>
        </div>

        {/* Stepper Horizontal Scroll Container */}
        <div
          style={{
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {stageNames.map((name, idx) => {
            const isCompleted = idx < applicationStage;
            const isActive = idx === applicationStage;

            return (
              <div
                key={name}
                onClick={() => {
                  if (name === 'KYC') navigate('/oal/borrower/kyc');
                  else if (name === 'Application') navigate('/oal/borrower/application');
                  else if (name === 'Documents') navigate('/oal/borrower/documents');
                  else if (name === 'AI Score') navigate('/oal/borrower/score');
                  else if (name === 'Offers' || name === 'Accepted') navigate('/oal/borrower/offers');
                  else navigate('/oal/borrower/dashboard');
                }}
                className="flex flex-col items-center cursor-pointer transition-all"
                style={{
                  minWidth: '72px',
                  flexShrink: 0,
                  opacity: isCompleted || isActive ? 1 : 0.6,
                }}
                title={`Click to navigate to ${name}`}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                    backgroundColor: isCompleted
                      ? 'var(--success)'
                      : isActive
                      ? 'var(--accent)'
                      : 'var(--surface-secondary)',
                    color: isCompleted || isActive ? '#ffffff' : 'var(--text-secondary)',
                    border: isActive ? '2px solid var(--accent)' : '1px solid var(--border)',
                    boxShadow: isActive ? '0 0 0 3px rgba(37, 99, 235, 0.25)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    marginTop: '0.35rem',
                    color: isActive ? 'var(--accent)' : isCompleted ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    fontWeight: isActive ? 700 : 500,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 3. Balanced 6 KPI Cards Grid (Equal 3-Col Desktop / 2-Col Mobile) */}
      <div className="grid-kpi-6balanced">
        <div onClick={() => navigate('/oal/borrower/offers')} className="cursor-pointer">
          <KPICard title="Application Status" value={currentStageName} change="3 Offers Received" changeType="positive" icon={Landmark} />
        </div>
        <div onClick={() => navigate('/oal/borrower/score')} className="cursor-pointer">
          <KPICard title="AI Credit Rating" value="792 / 850" change="Grade A+ Verified" changeType="positive" icon={Award} />
        </div>
        <div onClick={() => navigate('/oal/borrower/offers')} className="cursor-pointer">
          <KPICard title="Best Interest Offer" value="4.8% APR" change="Apex Credit Corp" changeType="positive" icon={CreditCard} />
        </div>
        <div onClick={() => navigate('/oal/borrower/documents')} className="cursor-pointer">
          <KPICard title="Vault Documents" value="5 Files" change="100% Verified" changeType="positive" icon={FileCheck} />
        </div>
        <div onClick={() => navigate('/oal/borrower/messages')} className="cursor-pointer">
          <KPICard title="Agent Messages" value={`${messages.length} Messages`} change="OAL Rep Online" changeType="neutral" icon={MessageSquare} />
        </div>
        <div onClick={() => setIsReferralModalOpen(true)} className="cursor-pointer">
          <KPICard title="Referral Program" value="$2,500 Bonus" change="Share link" changeType="positive" icon={Sparkles} />
        </div>
      </div>

      {/* 4. Active Offers & Assigned Representative */}
      <div className="grid-responsive-2col">
        {/* Left Card: Active Marketplace Offers */}
        {acceptedOffer ? (
          <Card style={{ padding: '1.5rem', border: '2px solid var(--success)', borderRadius: '12px' }}>
            <div className="flex items-center justify-between mb-3">
              <Badge variant="success" icon={CheckCircle2}>Accepted Lender Offer</Badge>
              <span className="font-mono text-xs text-tertiary">{acceptedOffer.id}</span>
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{acceptedOffer.lender}</h3>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--success)', marginTop: '0.25rem' }}>
                {acceptedOffer.amount} at {acceptedOffer.rate}
              </div>
            </div>
            <div className="p-3 surface-secondary rounded-md text-xs flex justify-between mt-4">
              <span>Monthly Payment: <strong>{acceptedOffer.monthlyPayment}</strong></span>
              <span>Loan Term: <strong>{acceptedOffer.term}</strong></span>
            </div>
            <div className="mt-4 pt-3 border-t border-subtle flex justify-end">
              <Button variant="outline" size="sm" onClick={() => navigate('/oal/borrower/offers')}>
                Review Accepted Terms
              </Button>
            </div>
          </Card>
        ) : (
          <Card style={{ padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-subtle pb-3 mb-4">
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    Active Marketplace Offers
                  </h3>
                  <span className="text-xs text-secondary">3 Institutional lenders competing for your debt facility</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={ChevronRight}
                  onClick={() => navigate('/oal/borrower/offers')}
                  style={{ color: 'var(--accent)', fontWeight: 600 }}
                >
                  Compare All
                </Button>
              </div>

              {/* Offers List */}
              <div className="flex flex-col gap-3.5">
                {offers.map((off, idx) => {
                  const tagConfig = [
                    { label: '⚡ Best Match', bg: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', border: 'rgba(37, 99, 235, 0.25)' },
                    { label: '🔥 Lowest APR', bg: 'rgba(22, 163, 74, 0.1)', color: '#16a34a', border: 'rgba(22, 163, 74, 0.25)' },
                    { label: '💎 Max Capital', bg: 'rgba(147, 51, 234, 0.1)', color: '#9333ea', border: 'rgba(147, 51, 234, 0.25)' },
                  ][idx % 3];

                  const initials = off.lender.split(' ').slice(0, 2).map((w) => w[0]).join('');

                  return (
                    <div
                      key={off.id}
                      style={{
                        padding: '1rem 1.125rem',
                        backgroundColor: 'var(--surface)',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        transition: 'all 0.2s ease',
                      }}
                      className="flex flex-col gap-2.5 hover:border-primary"
                    >
                      {/* Top Row: Lender & Badge Tag */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              backgroundColor: 'var(--surface-secondary)',
                              border: '1px solid var(--border)',
                              color: 'var(--accent)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: '11px',
                              flexShrink: 0,
                            }}
                          >
                            {initials}
                          </div>
                          <span className="font-bold text-xs text-primary truncate" style={{ fontSize: '13px' }}>
                            {off.lender}
                          </span>
                        </div>

                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            backgroundColor: tagConfig.bg,
                            color: tagConfig.color,
                            border: `1px solid ${tagConfig.border}`,
                            flexShrink: 0,
                          }}
                        >
                          {tagConfig.label}
                        </span>
                      </div>

                      {/* Bottom Row: Amount, Rate, Term & Inspect Action */}
                      <div className="flex items-center justify-between gap-3 pt-1 border-t border-subtle">
                        <div className="flex items-center gap-2.5 text-xs flex-wrap">
                          <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {off.amount}
                          </span>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: 'var(--success)',
                              backgroundColor: 'rgba(22, 163, 74, 0.08)',
                              padding: '2px 6px',
                              borderRadius: '4px',
                            }}
                          >
                            {off.rate}
                          </span>
                          <span className="text-tertiary" style={{ fontSize: '11px' }}>
                            {off.term}
                          </span>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleInspectOffer(off)}
                          style={{ fontSize: '11px', height: '30px', padding: '0 10px', fontWeight: 600 }}
                        >
                          Inspect Terms
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {/* Right Card: Assigned OAL Representative */}
        <Card style={{ padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-subtle pb-3 mb-4">
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  Assigned OAL Representative
                </h3>
                <span className="text-xs text-secondary">Dedicated underwriting advocate for your application</span>
              </div>
              <Badge variant="success" style={{ padding: '3px 8px', fontSize: '11px' }}>
                ● Online
              </Badge>
            </div>

            {/* Representative Profile Card */}
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--surface-secondary)',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                marginBottom: '1rem',
              }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '15px',
                    flexShrink: 0,
                    boxShadow: '0 2px 5px rgba(37, 99, 235, 0.25)',
                  }}
                >
                  SJ
                </div>
                <div>
                  <div className="font-bold text-xs text-primary" style={{ fontSize: '14px' }}>
                    Sarah Jenkins
                  </div>
                  <div className="text-xs text-secondary" style={{ fontSize: '11px' }}>
                    Licensed Underwriting Officer &bull; NMLS #84920
                  </div>
                  <div className="text-tertiary mt-0.5" style={{ fontSize: '10px' }}>
                    Avg. Response Time: &lt; 5 minutes
                  </div>
                </div>
              </div>

              {/* Speech Bubble */}
              <div
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--surface)',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  borderLeft: '3px solid var(--accent)',
                  fontSize: '12px',
                  lineHeight: '1.5',
                  color: 'var(--text-primary)',
                }}
              >
                <p className="margin-0 italic">
                  "{messages[messages.length - 1]?.text || 'I am negotiating directly with Vanguard’s underwriting team. I will update your offers tab shortly.'}"
                </p>
                <div className="flex justify-end text-tertiary mt-1" style={{ fontSize: '10px' }}>
                  {messages[messages.length - 1]?.time || '10:45 AM'} &bull; Direct Note
                </div>
              </div>
            </div>

            {/* Quick Mini Reply Input */}
            <form onSubmit={handleSendQuickReply} className="flex items-center gap-2 mb-3">
              <Input
                value={quickReplyText}
                onChange={(e) => setQuickReplyText(e.target.value)}
                placeholder="Type a quick message to Sarah..."
                style={{ height: '38px', fontSize: '12px', flex: 1 }}
              />
              <Button
                variant="primary"
                size="sm"
                type="submit"
                icon={Send}
                style={{ height: '38px', minWidth: '80px', justifyContent: 'center' }}
              >
                Send
              </Button>
            </form>
          </div>

          {/* Dedicated Chat Portal CTA Button */}
          <Button
            variant="outline"
            size="sm"
            icon={MessageSquare}
            className="w-full justify-center"
            onClick={() => navigate('/oal/borrower/messages')}
            style={{ height: '38px', fontWeight: 600, marginTop: '0.5rem' }}
          >
            Open Dedicated Chat Portal
          </Button>
        </Card>
      </div>

      {/* 5. Modal: Inspect Offer Details */}
      <Modal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        title={selectedOffer ? `${selectedOffer.lender} — Term Sheet` : 'Offer Details'}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsOfferModalOpen(false)}>
              Close
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={MessageSquare}
              onClick={() => {
                setIsOfferModalOpen(false);
                navigate('/oal/borrower/messages');
              }}
            >
              Negotiate with Rep
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={CheckCircle2}
              style={{ backgroundColor: 'var(--success)', borderColor: 'var(--success)' }}
              onClick={handleAcceptOffer}
            >
              Accept Offer
            </Button>
          </>
        }
      >
        {selectedOffer && (
          <div className="flex flex-col gap-4 text-xs">
            {/* Highlights Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 surface-secondary rounded-md border-subtle">
              <div>
                <span className="text-tertiary" style={{ fontSize: '11px' }}>Facility Size</span>
                <div className="font-bold text-sm text-primary">{selectedOffer.amount}</div>
              </div>
              <div>
                <span className="text-tertiary" style={{ fontSize: '11px' }}>Interest APR</span>
                <div className="font-bold text-sm text-success">{selectedOffer.rate}</div>
              </div>
              <div>
                <span className="text-tertiary" style={{ fontSize: '11px' }}>Term Length</span>
                <div className="font-bold text-sm text-primary">{selectedOffer.term}</div>
              </div>
              <div>
                <span className="text-tertiary" style={{ fontSize: '11px' }}>Monthly Cost</span>
                <div className="font-bold text-sm text-primary">{selectedOffer.monthlyPayment}</div>
              </div>
            </div>

            {/* Key Term Sheet Clauses */}
            <div>
              <h4 className="font-bold text-xs text-primary uppercase mb-2">Key Lender Covenants & Features</h4>
              <div className="flex flex-col gap-2">
                {selectedOffer.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-secondary">
                    <CheckCircle2 size={14} className="text-success flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-secondary">
                  <CheckCircle2 size={14} className="text-success flex-shrink-0" />
                  <span>Origination fee capped at {selectedOffer.originationFee}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* 6. Modal: Referral Program */}
      <Modal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        title="OAL Partner Referral Program"
        footer={
          <Button variant="primary" size="sm" onClick={() => setIsReferralModalOpen(false)}>
            Done
          </Button>
        }
      >
        <div className="flex flex-col gap-4 text-xs">
          <div className="p-3.5 surface-secondary rounded-md border-subtle flex flex-col gap-1">
            <span className="font-bold text-sm text-primary">Earn $2,500 for every business introduction</span>
            <span className="text-secondary">
              When a commercial enterprise you refer completes their first debt placement, you receive a direct wire cash bounty.
            </span>
          </div>

          <div>
            <label className="form-label mb-1">Your Personal Invitation Link</label>
            <div className="flex items-center gap-2">
              <Input
                value="https://oalnetwork.com/ref?code=BIOGENIX-7749"
                readOnly
                className="flex-1"
                style={{ height: '38px' }}
              />
              <Button
                variant={copiedLink ? 'primary' : 'outline'}
                size="sm"
                icon={copiedLink ? Check : Copy}
                onClick={handleCopyReferral}
                style={{ height: '38px' }}
              >
                {copiedLink ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
