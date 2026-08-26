import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Landmark,
  ShieldCheck,
  Award,
  CreditCard,
  MessageSquare,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Send,
  Copy,
  Check,
  Building2,
  Calendar,
  DollarSign,
  ArrowRight,
  ExternalLink,
  Lock
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
      title: 'Message Sent',
      message: 'Sarah Jenkins has received your message.',
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
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'Borrower Dashboard' }]} />
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0 0 0', letterSpacing: '-0.02em' }}>
            Borrower Overview
          </h1>
          <p className="text-xs text-secondary margin-0" style={{ marginTop: '3px' }}>
            Track loan application lifecycle, AI Risk score, and competing lender term sheets
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
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

      {/* 2. 11-Stage Application Lifecycle Stepper */}
      <Card style={{ padding: '1.25rem', borderRadius: '12px' }}>
        <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2">
          <div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              11-Stage Marketplace Application Status
            </span>
            <div className="text-xs text-secondary mt-0.5">
              Interactive lifecycle from onboarding to loan wire execution
            </div>
          </div>
          <Badge variant="success" icon={Sparkles}>
            Current Stage: {currentStageName}
          </Badge>
        </div>

        {/* Stepper Horizontal Scroll Container */}
        <div
          style={{
            overflowX: 'auto',
            paddingBottom: '0.25rem',
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
                  minWidth: '68px',
                  flexShrink: 0,
                  opacity: isCompleted || isActive ? 1 : 0.45,
                }}
                title={`Click to view ${name}`}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
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
                    boxShadow: isActive ? '0 0 0 3px rgba(37, 99, 235, 0.2)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={15} /> : idx + 1}
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

      {/* 3. Core 4 Clean Metric Cards (Spacious, No Truncation) */}
      <div className="grid-responsive-kpi">
        <div onClick={() => navigate('/oal/borrower/offers')} className="cursor-pointer">
          <KPICard
            title="APPLICATION STATUS"
            value={currentStageName}
            change="3 Offers Active"
            changeType="positive"
            icon={Landmark}
          />
        </div>
        <div onClick={() => navigate('/oal/borrower/score')} className="cursor-pointer">
          <KPICard
            title="AI CREDIT RATING"
            value="792 / 850"
            change="Grade A+ Verified"
            changeType="positive"
            icon={Award}
          />
        </div>
        <div onClick={() => navigate('/oal/borrower/offers')} className="cursor-pointer">
          <KPICard
            title="BEST INTEREST OFFER"
            value="4.8% APR"
            change="Apex Credit Corp"
            changeType="positive"
            icon={CreditCard}
          />
        </div>
        <div onClick={() => setIsReferralModalOpen(true)} className="cursor-pointer">
          <KPICard
            title="REFERRAL PROGRAM"
            value="$2,500 Bonus"
            change="1-Click Invite"
            changeType="positive"
            icon={Sparkles}
          />
        </div>
      </div>

      {/* 4. Active Offers & Assigned Representative */}
      <div className="grid-responsive-2col">
        {/* Left Column: Active Marketplace Offers */}
        <div className="flex flex-col gap-3">
          {/* Section Heading Outside the Card */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                Active Marketplace Offers
              </h2>
              <span className="text-xs text-secondary">3 Institutional lenders competing for your debt facility</span>
            </div>
            {!acceptedOffer && (
              <Button
                variant="ghost"
                size="sm"
                icon={ChevronRight}
                onClick={() => navigate('/oal/borrower/offers')}
                style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '13px' }}
              >
                Compare All
              </Button>
            )}
          </div>

          {/* Offers Content Card */}
          <Card style={{ padding: '1.25rem', borderRadius: '12px' }}>
            {acceptedOffer ? (
              <div className="p-4 surface-secondary rounded-lg border-subtle flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge variant="success" icon={CheckCircle2}>Accepted Term Sheet</Badge>
                  <span className="font-mono text-xs text-tertiary">{acceptedOffer.id}</span>
                </div>
                <div className="font-bold text-base text-primary">{acceptedOffer.lender}</div>
                <div className="text-sm font-bold text-success">{acceptedOffer.amount} at {acceptedOffer.rate}</div>
                <div className="flex justify-between text-xs text-secondary mt-1">
                  <span>Monthly: <strong>{acceptedOffer.monthlyPayment}</strong></span>
                  <span>Term: <strong>{acceptedOffer.term}</strong></span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {offers.map((off, idx) => {
                  const tagConfig = [
                    { label: '⚡ Best Match', bg: 'rgba(37, 99, 235, 0.08)', color: 'var(--accent)' },
                    { label: '🔥 Lowest APR', bg: 'rgba(22, 163, 74, 0.08)', color: 'var(--success)' },
                    { label: '💎 Max Capital', bg: 'rgba(147, 51, 234, 0.08)', color: '#9333ea' },
                  ][idx % 3];

                  const initials = off.lender.split(' ').slice(0, 2).map((w) => w[0]).join('');

                  return (
                    <div
                      key={off.id}
                      className="p-3.5 surface-secondary rounded-lg border-subtle flex items-center justify-between gap-3 transition-all hover:border-primary"
                      style={{ transition: 'all 0.15s ease' }}
                    >
                      {/* Left: Lender initials & details */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: 'var(--accent)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '12px',
                            flexShrink: 0,
                          }}
                        >
                          {initials}
                        </div>

                        <div className="flex flex-col gap-0.5 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-xs text-primary truncate" style={{ fontSize: '13px' }}>
                              {off.lender}
                            </span>
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                padding: '1px 6px',
                                borderRadius: '4px',
                                backgroundColor: tagConfig.bg,
                                color: tagConfig.color,
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                              }}
                            >
                              {tagConfig.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-secondary flex-wrap">
                            <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '13px' }}>{off.amount}</span>
                            <span>•</span>
                            <span style={{ fontWeight: 700, color: 'var(--success)', fontSize: '12px' }}>{off.rate}</span>
                            <span>•</span>
                            <span className="text-tertiary">{off.term}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Compact Inspect Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleInspectOffer(off)}
                        style={{ fontSize: '11px', height: '32px', padding: '0 14px', fontWeight: 600, flexShrink: 0 }}
                      >
                        Inspect Terms
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Assigned OAL Representative */}
        <div className="flex flex-col gap-3">
          {/* Section Heading with Profile Outside the Card */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '13px',
                  }}
                >
                  SJ
                </div>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#16a34a',
                    border: '2px solid var(--surface)',
                    borderRadius: '50%',
                  }}
                />
              </div>

              <div className="min-w-0">
                <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Sarah Jenkins
                </h2>
                <span className="text-xs text-secondary truncate block">
                  Assigned Underwriter &bull; NMLS #84920
                </span>
              </div>
            </div>

            <Badge variant="success" style={{ padding: '3px 8px', fontSize: '11px', flexShrink: 0 }}>
              ● Online
            </Badge>
          </div>

          {/* Real Chat Message Box Card */}
          <Card style={{ padding: '1.25rem', borderRadius: '12px' }} className="flex flex-col justify-between">
            <div>
              {/* Chat Stream with Real Message Bubbles */}
              <div
                className="flex flex-col gap-3"
                style={{
                  maxHeight: '190px',
                  overflowY: 'auto',
                  padding: '4px 0',
                  marginBottom: '1rem',
                }}
              >
                {messages.slice(-2).map((msg, i) => {
                  const isAgent = msg.sender.includes('Sarah');
                  return (
                    <div
                      key={msg.id || i}
                      className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        style={{
                          maxWidth: '85%',
                          padding: '0.65rem 0.95rem',
                          borderRadius: isAgent ? '12px 12px 12px 2px' : '12px 12px 2px 12px',
                          backgroundColor: isAgent ? 'var(--surface-secondary)' : 'var(--accent)',
                          color: isAgent ? 'var(--text-primary)' : '#ffffff',
                          fontSize: '12px',
                          lineHeight: '1.4',
                          border: isAgent ? '1px solid var(--border)' : 'none',
                        }}
                      >
                        {msg.text}
                      </div>
                      <span className="text-tertiary mt-1" style={{ fontSize: '10px', padding: '0 4px' }}>
                        {msg.time || 'Just now'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Quick Reply Composer */}
              <form onSubmit={handleSendQuickReply} className="flex items-center gap-2 w-full" style={{ marginBottom: '1rem' }}>
                <Input
                  value={quickReplyText}
                  onChange={(e) => setQuickReplyText(e.target.value)}
                  placeholder="Type a message to Sarah..."
                  style={{ height: '38px', fontSize: '12px' }}
                  className="flex-1 min-w-0"
                />
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  icon={Send}
                  style={{ height: '38px', minWidth: '70px', padding: '0 12px', flexShrink: 0, justifyContent: 'center' }}
                >
                  Send
                </Button>
              </form>
            </div>

            {/* Dedicated Chat Portal CTA Button with clean top border */}
            <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--border)' }}>
              <Button
                variant="outline"
                size="sm"
                icon={MessageSquare}
                className="w-full justify-center"
                onClick={() => navigate('/oal/borrower/messages')}
                style={{ height: '38px', fontWeight: 600 }}
              >
                Open Dedicated Chat Portal
              </Button>
            </div>
          </Card>
        </div>
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
