import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  ShieldCheck,
  Lock,
  Search,
  MessageSquare,
  Sparkles,
  Paperclip,
  CheckCircle2,
  Building2,
  Phone,
  FileText,
  ChevronRight,
  User,
  ArrowLeft,
  Circle
} from 'lucide-react';
import { Breadcrumb, Card, Input, Button, Badge } from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerMessages = () => {
  const navigate = useNavigate();
  const { messages, sendAgentMessage } = useOal();
  const { addToast } = useToast();

  const [inputMsg, setInputMsg] = useState('');
  const [activeContactId, setActiveContactId] = useState('c1');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);

  const messagesEndRef = useRef(null);

  const contacts = [
    {
      id: 'c1',
      name: 'Sarah Jenkins',
      role: 'Assigned Lead Underwriter',
      organization: 'OAL Institutional Desk',
      nmls: 'NMLS #84920',
      status: 'Online',
      avatarText: 'SJ',
      avatarBg: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      lastMessage: messages[messages.length - 1]?.text || 'I am negotiating directly with Vanguard’s underwriting team.',
      lastTime: messages[messages.length - 1]?.time || '10:45 AM',
      unreadCount: 0,
      isPrimary: true
    },
    {
      id: 'c2',
      name: 'Vanguard Capital Deal Team',
      role: 'Institutional Syndication Officer',
      organization: 'Vanguard Debt Partners',
      nmls: 'Institutional Partner',
      status: 'Online',
      avatarText: 'VC',
      avatarBg: 'linear-gradient(135deg, #047857 0%, #10b981 100%)',
      lastMessage: 'Term sheet $750,000 at 5.2% APR is approved for 36 months.',
      lastTime: '09:30 AM',
      unreadCount: 1,
      isPrimary: false
    },
    {
      id: 'c3',
      name: 'Apex Global Credit Desk',
      role: 'Senior Risk Reviewer',
      organization: 'Apex Credit Corp',
      nmls: 'Tier 1 Lender',
      status: 'Offline',
      avatarText: 'AG',
      avatarBg: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
      lastMessage: '4.8% APR rate confirmed upon equipment appraisal receipt.',
      lastTime: 'Yesterday',
      unreadCount: 0,
      isPrimary: false
    },
    {
      id: 'c4',
      name: 'OAL KYC & Compliance Vault',
      role: 'Auditing & Security Desk',
      organization: 'OAL Governance Protocol',
      nmls: 'Automated Agent',
      status: 'Online',
      avatarText: 'KYC',
      avatarBg: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
      lastMessage: 'All 5 compliance files verified with 100% cryptographic score.',
      lastTime: 'Feb 24',
      unreadCount: 0,
      isPrimary: false
    }
  ];

  const activeContact = contacts.find((c) => c.id === activeContactId) || contacts[0];

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeContactId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    sendAgentMessage(inputMsg);
    setInputMsg('');
    addToast({
      title: 'Message Sent',
      message: `Direct note dispatched to ${activeContact.name}.`,
      type: 'success'
    });
  };

  const handleQuickChip = (text) => {
    setInputMsg(text);
  };

  return (
    <div className="flex flex-col gap-5" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'Messages & Underwriter Chat' }]} />
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0.25rem 0 0 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Underwriting & Lender Communications
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success" icon={ShieldCheck}>
            Encrypted 256-Bit Channel
          </Badge>
        </div>
      </div>

      {/* 2. Compliance Notice */}
      <Card style={{ padding: '0.85rem 1.25rem', borderRadius: '10px' }} className="surface-secondary border-subtle flex items-center gap-3 text-xs text-secondary">
        <Lock size={18} className="text-accent flex-shrink-0" />
        <div>
          <strong>Marketplace Security Policy:</strong> All term negotiations and rate matching are verified by your assigned Underwriting Advocate (Sarah Jenkins) to protect sensitive corporate financials.
        </div>
      </Card>

      {/* 3. Two-Panel Systematic Messaging Layout */}
      <div className="chat-master-grid">
        {/* LEFT PANEL: Contacts / Chat Participants */}
        <Card
          style={{
            padding: '1.25rem',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            height: '100%',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
          className={`${showMobileChat ? 'hidden md:flex' : 'flex'}`}
        >
          {/* Panel Header & Search */}
          <div className="flex flex-col gap-2.5" style={{ width: '100%', minWidth: 0 }}>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Conversations ({contacts.length})
              </span>
              <Badge variant="neutral" style={{ fontSize: '11px' }}>
                Active Session
              </Badge>
            </div>

            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--text-tertiary)' }} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search desks, agents..."
                style={{ paddingLeft: '32px', height: '36px', fontSize: '12px', width: '100%' }}
              />
            </div>
          </div>

          {/* Contact List */}
          <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-1" style={{ minWidth: 0, width: '100%' }}>
            {filteredContacts.map((contact) => {
              const isSelected = activeContactId === contact.id;

              return (
                <div
                  key={contact.id}
                  onClick={() => {
                    setActiveContactId(contact.id);
                    setShowMobileChat(true);
                  }}
                  style={{
                    padding: '0.75rem 0.85rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? 'var(--surface-secondary)' : 'transparent',
                    border: isSelected ? '1px solid var(--accent)' : '1px solid transparent',
                    transition: 'all 0.15s ease',
                    width: '100%',
                    minWidth: 0,
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                  className="hover:surface-secondary transition-all"
                >
                  {/* Avatar with Online Status */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: contact.avatarBg,
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '12px',
                      }}
                    >
                      {contact.avatarText}
                    </div>
                    {contact.status === 'Online' && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '0',
                          right: '0',
                          width: '9px',
                          height: '9px',
                          backgroundColor: '#16a34a',
                          border: '2px solid var(--surface)',
                          borderRadius: '50%',
                        }}
                      />
                    )}
                  </div>

                  {/* Name & Preview - strictly constrained inside card */}
                  <div style={{ minWidth: 0, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px', minWidth: 0, width: '100%' }}>
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          minWidth: 0,
                          flex: 1,
                        }}
                      >
                        {contact.name}
                      </span>
                      <span className="text-tertiary" style={{ fontSize: '10px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                        {contact.lastTime}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '11px',
                        color: 'var(--text-secondary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginTop: '1px',
                        display: 'block',
                        minWidth: 0,
                        width: '100%',
                      }}
                    >
                      {contact.role}
                    </span>

                    <p
                      className="margin-0 text-tertiary"
                      style={{
                        fontSize: '11px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginTop: '2px',
                        display: 'block',
                        minWidth: 0,
                        width: '100%',
                      }}
                    >
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* RIGHT PANEL: Live Active Chat Window */}
        <Card
          style={{
            padding: '1.25rem',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
          className={`${!showMobileChat ? 'hidden md:flex' : 'flex'}`}
        >
          <div>
            {/* Active Contact Header Bar */}
            <div className="flex items-center justify-between pb-3.5 border-b border-subtle mb-3">
              <div className="flex items-center gap-3 min-w-0">
                {/* Mobile Back Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  icon={ArrowLeft}
                  onClick={() => setShowMobileChat(false)}
                  className="md:hidden"
                  style={{ padding: '0 6px', height: '32px' }}
                />

                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: activeContact.avatarBg,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '14px',
                    }}
                  >
                    {activeContact.avatarText}
                  </div>
                  {activeContact.status === 'Online' && (
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
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-primary">
                      {activeContact.name}
                    </span>
                    <Badge variant="success" style={{ fontSize: '10px', padding: '1px 6px' }}>
                      {activeContact.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-secondary truncate">
                    {activeContact.role} &bull; {activeContact.organization}
                  </div>
                </div>
              </div>

              {/* Fast Action Links */}
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  icon={FileText}
                  onClick={() => navigate('/oal/borrower/offers')}
                  style={{ fontSize: '11px', height: '32px' }}
                >
                  View Offers
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Sparkles}
                  onClick={() => navigate('/oal/borrower/score')}
                  style={{ fontSize: '11px', height: '32px' }}
                >
                  AI Risk Score
                </Button>
              </div>
            </div>

            {/* Chat Stream with Authentic Speech Bubbles */}
            <div
              className="flex flex-col gap-3.5 pr-2 overflow-y-auto"
              style={{
                height: '360px',
                padding: '0.5rem 0',
              }}
            >
              {/* System Session Banner */}
              <div className="flex items-center justify-center my-2">
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    backgroundColor: 'var(--surface-secondary)',
                    padding: '3px 12px',
                    borderRadius: '9999px',
                    border: '1px solid var(--border)',
                  }}
                >
                  Authenticated Session with {activeContact.name} &bull; 256-bit TLS
                </span>
              </div>

              {messages.map((m) => {
                const isBorrower = m.sender.includes('Borrower') || m.sender.includes('Aris');

                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isBorrower ? 'items-end' : 'items-start'}`}
                  >
                    {/* Sender Name */}
                    <span
                      style={{
                        fontSize: '10px',
                        color: 'var(--text-tertiary)',
                        marginBottom: '3px',
                        padding: '0 4px',
                      }}
                    >
                      {m.sender}
                    </span>

                    {/* Speech Bubble */}
                    <div
                      style={{
                        maxWidth: '75%',
                        padding: '0.75rem 1rem',
                        borderRadius: isBorrower ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                        backgroundColor: isBorrower ? 'var(--accent)' : 'var(--surface-secondary)',
                        color: isBorrower ? '#ffffff' : 'var(--text-primary)',
                        border: isBorrower ? 'none' : '1px solid var(--border)',
                        fontSize: '13px',
                        lineHeight: '1.45',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                      }}
                    >
                      {m.text}
                    </div>

                    {/* Timestamp & Status */}
                    <span
                      style={{
                        fontSize: '10px',
                        color: 'var(--text-tertiary)',
                        marginTop: '3px',
                        padding: '0 4px',
                      }}
                    >
                      {m.time || 'Just now'} &bull; {isBorrower ? 'Delivered' : 'Verified'}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Negotiation Chips + Composer */}
          <div className="flex flex-col gap-2.5 pt-3 border-t border-subtle mt-2">
            {/* Quick Action Suggestion Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
              <span className="text-tertiary text-xs whitespace-nowrap" style={{ fontSize: '11px' }}>Quick Prompts:</span>
              <button
                type="button"
                onClick={() => handleQuickChip('Can we negotiate 4.8% APR with Vanguard Capital?')}
                className="chip-btn"
                style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Rate match 4.8% APR?
              </button>
              <button
                type="button"
                onClick={() => handleQuickChip('When can we initiate wire transfer after acceptance?')}
                className="chip-btn"
                style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Wire transfer timeline?
              </button>
              <button
                type="button"
                onClick={() => handleQuickChip('What covenants apply to the 48-month Hyperion facility?')}
                className="chip-btn"
                style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Covenants review?
              </button>
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <Input
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder={`Type a message to ${activeContact.name}...`}
                style={{ height: '42px', fontSize: '13px' }}
                className="flex-1 min-w-0"
              />
              <Button
                variant="primary"
                type="submit"
                icon={Send}
                style={{ height: '42px', minWidth: '90px', padding: '0 16px', fontWeight: 600, justifyContent: 'center' }}
              >
                Send
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};
