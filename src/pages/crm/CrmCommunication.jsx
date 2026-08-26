import React, { useState, useRef } from 'react';
import {
  Mail,
  MessageSquare,
  Send,
  User,
  Sparkles,
  Paperclip,
  CheckCheck,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  PhoneCall,
  ShieldCheck,
  X,
  File
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Badge,
  Input,
  Modal,
  Select,
  KPICard
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

// Rich Mock Messages for All 3 Channels
const initialMockMessages = [
  // Email Threads
  {
    id: 'MSG-501',
    type: 'email',
    sender: 'Eleanor Vance',
    senderEmail: 'e.vance@technova.io',
    senderInitials: 'EV',
    senderBg: '#1d4ed8',
    subject: 'Re: Enterprise Logistics Master Service Agreement',
    timestamp: '10:42 AM',
    unread: true,
    history: [
      { id: 'h1', sender: 'Eleanor Vance', text: 'Hi Alexander, our legal team reviewed the contract terms and approved the SLAs. Please send over the final execution copy for signature.', time: '10:42 AM', isMe: false },
    ],
  },
  {
    id: 'MSG-502',
    type: 'email',
    sender: 'Marcus Vance',
    senderEmail: 'm.vance@apexglobal.com',
    senderInitials: 'MV',
    senderBg: '#16a34a',
    subject: 'Q2 Commercial Fleet Expansion Proposal',
    timestamp: 'Yesterday',
    unread: false,
    history: [
      { id: 'h2', sender: 'Marcus Vance', text: 'Thanks for the revised pricing quote. Can we schedule a quick call tomorrow at 2 PM to finalize line terms?', time: 'Yesterday 4:15 PM', isMe: false },
    ],
  },
  {
    id: 'MSG-503',
    type: 'email',
    sender: 'Samantha Ray',
    senderEmail: 's.ray@cloudscale.net',
    senderInitials: 'SR',
    senderBg: '#9333ea',
    subject: 'OAL Borrower Onboarding Verification',
    timestamp: 'May 16',
    unread: false,
    history: [
      { id: 'h3', sender: 'Samantha Ray', text: 'Our debt financing application has been dispatched to OAL Network. Confirming receipt of our KYC documents.', time: 'May 16 11:30 AM', isMe: false },
    ],
  },

  // SMS Threads
  {
    id: 'MSG-601',
    type: 'sms',
    sender: 'Dr. Aris Thorne',
    senderEmail: '+1 (555) 392-1049',
    senderInitials: 'AT',
    senderBg: '#ea580c',
    subject: 'SMS Alert: Urgent Contract Review',
    timestamp: '11:15 AM',
    unread: true,
    history: [
      { id: 'h4', sender: 'Dr. Aris Thorne', text: 'Alex, just sent over the revised NDA text via SMS gateway. Please confirm once received.', time: '11:15 AM', isMe: false },
    ],
  },
  {
    id: 'MSG-602',
    type: 'sms',
    sender: 'Alexander Wright',
    senderEmail: '+1 (555) 892-0192',
    senderInitials: 'AW',
    senderBg: '#0284c7',
    subject: 'SMS Automated Renewal Reminder',
    timestamp: 'May 17',
    unread: false,
    history: [
      { id: 'h5', sender: 'System SMS', text: 'Automated Alert: TechNova Solutions contract renewal is scheduled for June 1st.', time: 'May 17 9:00 AM', isMe: false },
    ],
  },

  // Team Chat Threads
  {
    id: 'MSG-701',
    type: 'chat',
    sender: 'Sarah Jenkins (Sales Mgr)',
    senderEmail: 's.jenkins@nergy.io',
    senderInitials: 'SJ',
    senderBg: '#2563eb',
    subject: 'Q2 Executive Pipeline Sync',
    timestamp: '11:50 AM',
    unread: true,
    history: [
      { id: 'h6', sender: 'Sarah Jenkins', text: 'Team, outstanding progress on qualified opportunities this week! Let us ensure all pending proposals are dispatched by Friday.', time: '11:50 AM', isMe: false },
    ],
  },
  {
    id: 'MSG-702',
    type: 'chat',
    sender: 'Dev Ops Team',
    senderEmail: 'devops@nergy.io',
    senderInitials: 'DO',
    senderBg: '#059669',
    subject: 'Platform SLA Uptime Status 99.98%',
    timestamp: '09:30 AM',
    unread: false,
    history: [
      { id: 'h7', sender: 'Dev Ops Bot', text: '🟢 System Health Status: Isolated tenant databases synced successfully. Zero latency reported.', time: '09:30 AM', isMe: false },
    ],
  },
];

export const CrmCommunication = () => {
  const { addToast } = useToast();
  const fileInputRef = useRef(null);
  const chatScrollRef = useRef(null);

  const [messageList, setMessageList] = useState(initialMockMessages);
  const [activeChannel, setActiveChannel] = useState('email'); // 'email' | 'sms' | 'chat'
  const [activeThreadId, setActiveThreadId] = useState('MSG-501');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);

  // Compose Modal State
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [composeData, setComposeData] = useState({
    channel: 'email',
    recipient: '',
    recipientEmail: '',
    subject: '',
    body: '',
  });

  // Filter by channel and search query
  const channelMessages = messageList.filter((m) => m.type === activeChannel);
  const filteredMessages = channelMessages.filter(
    (m) =>
      m.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeMessage = messageList.find((m) => m.id === activeThreadId) || channelMessages[0] || messageList[0];

  // Action 1: Handle File Attachment Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file);
      addToast({
        title: 'File Attached',
        message: `Attached ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
        type: 'info',
      });
    }
  };

  // Action 2: Send Message / Reply Handler
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() && !attachedFile) {
      addToast({ title: 'Input Required', message: 'Type a message or attach a file to send.', type: 'error' });
      return;
    }
    if (!activeMessage) return;

    const messageText = attachedFile
      ? `${replyText} \n\n📎 Attached Document: ${attachedFile.name} (${(attachedFile.size / 1024).toFixed(1)} KB)`
      : replyText;

    const newReply = {
      id: `h-${Date.now()}`,
      sender: 'Alexander Wright (Me)',
      text: messageText,
      time: 'Just now',
      isMe: true,
    };

    setMessageList((prev) =>
      prev.map((msg) =>
        msg.id === activeMessage.id
          ? { ...msg, unread: false, history: [...msg.history, newReply] }
          : msg
      )
    );

    addToast({
      title: 'Message Sent Successfully',
      message: `Dispatched message to ${activeMessage.sender} via ${activeChannel.toUpperCase()} gateway.`,
      type: 'success',
    });

    setReplyText('');
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    // Scroll chat to bottom
    setTimeout(() => {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }
    }, 100);
  };

  // Action 3: Compose New Message Modal Submit Handler
  const handleCreateNewThread = (e) => {
    e.preventDefault();
    if (!composeData.recipient || !composeData.subject || !composeData.body) {
      addToast({ title: 'Validation Error', message: 'Recipient, subject, and message text are required.', type: 'error' });
      return;
    }

    const newId = `MSG-${Date.now()}`;
    const initials = composeData.recipient
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'NC';

    const newThread = {
      id: newId,
      type: composeData.channel,
      sender: composeData.recipient,
      senderEmail: composeData.recipientEmail || 'contact@enterprise.com',
      senderInitials: initials,
      senderBg: '#1d4ed8',
      subject: composeData.subject,
      timestamp: 'Just now',
      unread: false,
      history: [
        {
          id: `h-init`,
          sender: 'Alexander Wright (Me)',
          text: composeData.body,
          time: 'Just now',
          isMe: true,
        },
      ],
    };

    setMessageList((prev) => [newThread, ...prev]);
    setActiveChannel(composeData.channel);
    setActiveThreadId(newId);
    setIsComposeModalOpen(false);

    addToast({
      title: 'New Conversation Started',
      message: `Message dispatched to ${composeData.recipient} via ${composeData.channel.toUpperCase()}.`,
      type: 'success',
    });

    setComposeData({
      channel: 'email',
      recipient: '',
      recipientEmail: '',
      subject: '',
      body: '',
    });
  };

  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* Hidden File Input for Attach File Button */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* 1. Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Communication Hub' }]} />
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: '2px 0 0 0',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}
          >
            Omnichannel Communication Hub
          </h1>
          <p className="text-xs text-secondary margin-0" style={{ marginTop: '2px' }}>
            Unified inbox for Corporate Email, SMS Gateway Alerts, and Internal Team Chat.
          </p>
        </div>
        <div className="header-actions-right">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsComposeModalOpen(true)}
          >
            Compose Message
          </Button>
        </div>
      </div>

      {/* 2. Top Summary KPI Strip */}
      <div className="grid-responsive-kpi">
        <KPICard
          title="INBOUND MESSAGES"
          value="142"
          change="14.2%"
          changeType="positive"
          changePeriod="this week"
          icon={Mail}
          iconBg="rgba(29, 78, 216, 0.1)"
          iconColor="#1d4ed8"
        />
        <KPICard
          title="UNREAD THREADS"
          value={`${messageList.filter((m) => m.unread).length}`}
          change="3 Urgent"
          changeType="negative"
          changePeriod="requires response"
          icon={MessageSquare}
          iconBg="rgba(239, 68, 68, 0.1)"
          iconColor="#ef4444"
        />
        <KPICard
          title="AVG RESPONSE SLA"
          value="12.4 Mins"
          change="Optimal"
          changeType="positive"
          changePeriod="response time"
          icon={Clock}
          iconBg="rgba(22, 163, 74, 0.1)"
          iconColor="#16a34a"
        />
        <KPICard
          title="GATEWAYS STATUS"
          value="3 Active"
          change="Synced"
          changeType="positive"
          changePeriod="Email • SMS • Chat"
          icon={ShieldCheck}
          iconBg="rgba(147, 51, 234, 0.1)"
          iconColor="#9333ea"
        />
      </div>

      {/* 3. Channel Switcher Tabs */}
      <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)', overflowX: 'auto' }}>
        <CardBody className="p-2">
          <Tabs
            tabs={[
              {
                id: 'email',
                label: 'Corporate Email Inbox',
                icon: Mail,
                badge: messageList.filter((m) => m.type === 'email').length,
              },
              {
                id: 'sms',
                label: 'SMS Messaging Gateway',
                icon: MessageSquare,
                badge: messageList.filter((m) => m.type === 'sms').length,
              },
              {
                id: 'chat',
                label: 'Internal Team Chat',
                icon: Sparkles,
                badge: messageList.filter((m) => m.type === 'chat').length,
              },
            ]}
            activeTab={activeChannel}
            onChange={(ch) => {
              setActiveChannel(ch);
              const firstMsg = messageList.find((m) => m.type === ch);
              if (firstMsg) setActiveThreadId(firstMsg.id);
            }}
          />
        </CardBody>
      </Card>

      {/* 4. Communication Workspace (Responsive Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" style={{ minHeight: '560px' }}>
        {/* Left Column: Message Threads List (1 Column) */}
        <Card
          style={{
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
          className="lg:col-span-1"
        >
          <div className="p-3 border-b border-subtle flex flex-col gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              startIcon={Search}
              style={{ height: '34px', fontSize: '12px' }}
            />
          </div>

          <div className="p-2 flex flex-col gap-1.5 overflow-y-auto flex-1" style={{ maxHeight: '520px' }}>
            <div className="text-xs font-bold text-tertiary uppercase tracking-wider px-2 py-1 flex items-center justify-between">
              <span>{activeChannel.toUpperCase()} THREADS</span>
              <span>{filteredMessages.length} Conversations</span>
            </div>

            {filteredMessages.length === 0 ? (
              <div className="text-center p-8 text-xs text-tertiary">
                No threads found in {activeChannel.toUpperCase()} channel.
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = msg.id === activeMessage?.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => setActiveThreadId(msg.id)}
                    style={{
                      backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--surface)',
                      border: isSelected ? '1px solid var(--primary-border)' : '1px solid var(--border)',
                      borderRadius: '10px',
                      padding: '0.75rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      position: 'relative',
                    }}
                  >
                    {/* Avatar Badge */}
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        backgroundColor: msg.senderBg || '#1d4ed8',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {msg.senderInitials}
                    </div>

                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-primary truncate" style={{ fontSize: '13px' }}>
                          {msg.sender}
                        </span>
                        <span className="text-tertiary" style={{ fontSize: '10px' }}>
                          {msg.timestamp}
                        </span>
                      </div>
                      <span className="font-semibold text-xs text-secondary truncate" style={{ fontSize: '11px' }}>
                        {msg.subject}
                      </span>
                      <p className="text-tertiary margin-0 truncate" style={{ fontSize: '11px' }}>
                        {msg.history[msg.history.length - 1]?.text}
                      </p>
                    </div>

                    {msg.unread && (
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#1d4ed8',
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                        }}
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* Right Column: Message Thread Details & Chat Bubbles (2 Columns) */}
        <Card
          style={{
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
          className="lg:col-span-2 p-6"
        >
          {activeMessage ? (
            <div className="flex flex-col justify-between flex-1 gap-5">
              {/* Thread Header Info — Perfect Spacing & Responsive Alignment */}
              <div
                className="border-b border-subtle pb-4 flex flex-col gap-3"
                style={{ width: '100%', boxSizing: 'border-box' }}
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <h2
                    style={{
                      fontSize: '17px',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      margin: 0,
                      lineHeight: 1.3,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {activeMessage.subject}
                  </h2>
                  <Badge variant="primary" icon={CheckCheck} style={{ flexShrink: 0 }}>
                    {activeMessage.type.toUpperCase()} Gateway Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between gap-3 text-xs flex-wrap">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: activeMessage.senderBg || '#1d4ed8',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {activeMessage.senderInitials}
                    </div>
                    <span className="truncate text-secondary">
                      From: <strong className="text-primary">{activeMessage.sender}</strong>{' '}
                      <span className="text-tertiary">({activeMessage.senderEmail})</span>
                    </span>
                  </div>
                  <span
                    className="text-tertiary font-medium flex-shrink-0"
                    style={{ fontSize: '11px', backgroundColor: 'var(--surface-secondary)', padding: '2px 8px', borderRadius: '6px' }}
                  >
                    {activeMessage.timestamp}
                  </span>
                </div>
              </div>

              {/* Chat Message History Flow */}
              <div
                ref={chatScrollRef}
                className="flex flex-col gap-3 p-4 surface-secondary rounded-lg border-subtle overflow-y-auto flex-1"
                style={{ minHeight: '260px', maxHeight: '380px' }}
              >
                {activeMessage.history.map((h, i) => (
                  <div
                    key={h.id || i}
                    className={`flex flex-col ${h.isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      style={{
                        maxWidth: '85%',
                        backgroundColor: h.isMe ? '#1d4ed8' : 'var(--surface)',
                        color: h.isMe ? '#ffffff' : 'var(--text-primary)',
                        border: h.isMe ? 'none' : '1px solid var(--border)',
                        borderRadius: h.isMe ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                        padding: '0.875rem 1.125rem',
                        fontSize: '13px',
                        lineHeight: 1.6,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      <div className="font-bold text-xs mb-1" style={{ opacity: 0.85, fontSize: '11px' }}>
                        {h.sender} &bull; {h.time}
                      </div>
                      <div>{h.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Attachment Preview Chip if File Attached */}
              {attachedFile && (
                <div
                  className="flex items-center justify-between p-2 px-3 rounded-md border-subtle"
                  style={{ backgroundColor: 'rgba(29, 78, 216, 0.08)', border: '1px solid var(--primary-border)' }}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary truncate">
                    <File size={14} className="text-primary" />
                    <span className="truncate">{attachedFile.name}</span>
                    <span className="text-tertiary">({(attachedFile.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAttachedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="p-1 rounded-full text-tertiary hover:text-error cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Reply Form Composer & Interactive Buttons */}
              <form onSubmit={handleSendReply} className="flex flex-col gap-3 pt-3 border-t border-subtle">
                <Input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Type ${activeChannel.toUpperCase()} reply to ${activeMessage.sender}...`}
                  style={{ height: '42px', fontSize: '13px' }}
                />

                <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                  {/* Attach File Action Button */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    icon={Paperclip}
                    onClick={() => fileInputRef.current?.click()}
                    style={{ width: 'auto' }}
                  >
                    {attachedFile ? 'Change File' : 'Attach File'}
                  </Button>

                  {/* Send Message Action Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    icon={Send}
                    style={{ width: 'auto' }}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center text-tertiary">
              <MessageSquare size={36} className="mb-2 text-tertiary" />
              <span>Select a conversation thread on the left to view messages.</span>
            </div>
          )}
        </Card>
      </div>

      {/* Interactive Compose New Message Modal */}
      <Modal
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
        title="Compose New Message"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsComposeModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateNewThread}>
              Send Message
            </Button>
          </>
        }
      >
        <form className="flex flex-col gap-4">
          <Select
            label="Communication Channel Gateway"
            value={composeData.channel}
            onChange={(e) => setComposeData({ ...composeData, channel: e.target.value })}
            options={[
              { label: 'Corporate Email Inbox', value: 'email' },
              { label: 'SMS Messaging Gateway', value: 'sms' },
              { label: 'Internal Team Chat', value: 'chat' },
            ]}
          />
          <Input
            label="Recipient Name"
            value={composeData.recipient}
            onChange={(e) => setComposeData({ ...composeData, recipient: e.target.value })}
            placeholder="e.g. Marcus Vance"
            required
          />
          <Input
            label="Recipient Email / Phone Number"
            value={composeData.recipientEmail}
            onChange={(e) => setComposeData({ ...composeData, recipientEmail: e.target.value })}
            placeholder="e.g. m.vance@apexglobal.com"
          />
          <Input
            label="Subject Title"
            value={composeData.subject}
            onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
            placeholder="e.g. Q3 Partnership Scope Review"
            required
          />
          <Input
            label="Message Content"
            value={composeData.body}
            onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
            placeholder="Type your message text..."
            required
          />
        </form>
      </Modal>
    </div>
  );
};
