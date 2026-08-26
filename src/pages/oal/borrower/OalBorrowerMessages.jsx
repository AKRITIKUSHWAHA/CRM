import React, { useState } from 'react';
import { Send, ShieldCheck, Lock } from 'lucide-react';
import { Breadcrumb, Card, Input, Button, Badge } from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerMessages = () => {
  const { messages, sendAgentMessage } = useOal();
  const { addToast } = useToast();

  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    sendAgentMessage(inputMsg);
    setInputMsg('');
    addToast({ title: 'Message Sent', message: 'Dispatched to OAL Representative.', type: 'success' });
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '840px', margin: '0 auto' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'OAL Borrower' }, { label: 'Licensed Agent Portal' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Licensed OAL Representative Portal</h1>
        </div>

        <Badge variant="success" icon={ShieldCheck}>
          OAL Agent Assigned: Sarah Jenkins
        </Badge>
      </div>

      {/* COMPLIANCE WARNING BANNER */}
      <Card className="p-3 surface-secondary border-subtle flex items-center gap-3 text-xs text-secondary">
        <Lock size={20} className="text-accent flex-shrink-0" />
        <div>
          <strong>Marketplace Protection Policy:</strong> Borrower communications are strictly routed through your licensed OAL Agent to negotiate terms and protect sensitive business telemetry. Direct unvetted lender contact is prohibited.
        </div>
      </Card>

      {/* Chat Conversation Card */}
      <Card className="p-6 flex flex-col justify-between" style={{ minHeight: '460px' }}>
        <div className="flex flex-col gap-3">
          {messages.map((m) => {
            const isBorrower = m.sender.includes('Borrower');
            return (
              <div
                key={m.id}
                className={`p-3 rounded-sm text-xs flex flex-col gap-1 ${
                  isBorrower ? 'surface-primary align-self-end text-white' : 'surface-secondary border-subtle'
                }`}
                style={{ maxWidth: '80%', alignSelf: isBorrower ? 'flex-end' : 'flex-start' }}
              >
                <div className="flex justify-between font-bold text-xs gap-4">
                  <span className={isBorrower ? 'text-white' : 'text-primary'}>{m.sender}</span>
                  <span className="text-tertiary font-normal" style={{ fontSize: '10px' }}>{m.time}</span>
                </div>
                <p className="margin-0" style={{ color: isBorrower ? '#ffffff' : 'var(--text-secondary)' }}>
                  {m.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Message Form */}
        <form onSubmit={handleSend} className="flex gap-2 border-t border-subtle pt-4 mt-4">
          <Input
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Type message or rate negotiation question to your OAL Agent..."
            required
          />
          <Button variant="primary" type="submit" icon={Send} style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}>
            Send Message
          </Button>
        </form>
      </Card>
    </div>
  );
};
