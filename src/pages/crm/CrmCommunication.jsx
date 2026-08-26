import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Send,
  User,
  Sparkles,
  Paperclip,
  CheckCheck,
  Search
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Badge,
  Input
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

export const CrmCommunication = () => {
  const { messages, sendMessage } = useCrm();
  const { addToast } = useToast();

  const [activeChannel, setActiveChannel] = useState('email'); // 'email' | 'sms' | 'chat'
  const [activeThreadId, setActiveThreadId] = useState('MSG-501');
  const [replyText, setReplyText] = useState('');

  const filteredMessages = messages.filter((m) => m.type === activeChannel);
  const activeMessage = messages.find((m) => m.id === activeThreadId) || messages[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    sendMessage({
      type: activeChannel,
      sender: 'Alexander Wright (Me)',
      recipient: activeMessage?.sender || 'Recipient',
      subject: activeMessage?.subject || 'Re: Communication Thread',
      body: replyText,
    });

    addToast({ title: 'Message Sent', message: `Dispatched message via ${activeChannel.toUpperCase()} gateway.`, type: 'success' });
    setReplyText('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Communication Center' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Omnichannel Communication Center</h1>
          <p className="text-xs text-secondary margin-0">
            Unified inbox for Corporate Email, SMS Alerts, and Internal Team Communication
          </p>
        </div>
      </div>

      {/* Channel Switcher Tabs */}
      <Card>
        <CardBody className="p-2">
          <Tabs
            tabs={[
              { id: 'email', label: 'Corporate Email Inbox', icon: Mail, badge: messages.filter((m) => m.type === 'email').length },
              { id: 'sms', label: 'SMS Messaging Gateway', icon: MessageSquare, badge: messages.filter((m) => m.type === 'sms').length },
              { id: 'chat', label: 'Internal Team Chat', icon: Sparkles, badge: messages.filter((m) => m.type === 'chat').length },
            ]}
            activeTab={activeChannel}
            onChange={(ch) => {
              setActiveChannel(ch);
              const firstChMsg = messages.find((m) => m.type === ch);
              if (firstChMsg) setActiveThreadId(firstChMsg.id);
            }}
          />
        </CardBody>
      </Card>

      {/* Communication 2-Column Interface */}
      <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
        {/* Left Column: Messages List */}
        <Card className="p-3 flex flex-col gap-2 col-span-1" style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <div className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-1 px-1">
            {activeChannel.toUpperCase()} Threads ({filteredMessages.length})
          </div>

          {filteredMessages.length === 0 ? (
            <div className="text-center p-6 text-xs text-tertiary">No messages in this channel.</div>
          ) : (
            filteredMessages.map((msg) => {
              const isSelected = msg.id === activeThreadId;
              return (
                <div
                  key={msg.id}
                  onClick={() => setActiveThreadId(msg.id)}
                  className="p-3 surface-secondary rounded-sm border-subtle cursor-pointer transition-all"
                  style={{
                    backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--surface)',
                    borderColor: isSelected ? 'var(--primary-border)' : 'var(--border)',
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-primary truncate pr-2">{msg.sender}</span>
                    <span className="text-tertiary text-xs whitespace-nowrap">{msg.timestamp}</span>
                  </div>
                  <div className="font-semibold text-xs text-secondary truncate">{msg.subject}</div>
                  <p className="text-xs text-tertiary margin-0 truncate mt-1">{msg.body}</p>
                </div>
              );
            })
          )}
        </Card>

        {/* Right Column: Message Thread Details & Reply Composer */}
        <Card className="p-4 sm:p-6 flex flex-col justify-between col-span-2" style={{ minHeight: '500px' }}>
          {activeMessage ? (
            <div className="flex flex-col gap-4 flex-1">
              <div className="border-b border-subtle pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-semibold truncate">{activeMessage.subject}</h3>
                  <Badge variant="primary" icon={CheckCheck} className="w-fit">
                    {activeMessage.type.toUpperCase()} Gateway
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-secondary gap-1">
                  <span>From: <strong className="text-primary">{activeMessage.sender}</strong></span>
                  <span>{activeMessage.timestamp}</span>
                </div>
              </div>

              {/* Message Body Content */}
              <div className="p-4 surface-secondary rounded-md border-subtle text-sm text-primary flex-1 whitespace-pre-wrap">
                {activeMessage.body}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="flex flex-col gap-3 pt-4 border-t border-subtle">
                <Input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Type ${activeChannel.toUpperCase()} reply to ${activeMessage.sender}...`}
                  required
                />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <Button variant="ghost" size="sm" icon={Paperclip} className="w-full sm:w-auto justify-center" onClick={() => addToast({ title: 'Attachment', message: 'File attachment window opened.', type: 'info' })}>
                    Attach Document
                  </Button>
                  <Button variant="primary" size="sm" type="submit" icon={Send} className="w-full sm:w-auto justify-center">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center text-tertiary">
              Select a conversation thread on the left to view messages.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
