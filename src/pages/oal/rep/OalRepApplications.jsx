import React, { useState } from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Input, Button } from '../../../components/ui';
import { Send, CheckSquare, Plus } from 'lucide-react';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalRepApplications = () => {
  const { lenderLeads } = useOal();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Rep' }, { label: 'Applications Underwriting Queue' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Underwriting Applications Queue</h1>
      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>App ID</TableCell>
                <TableCell isHeader>Borrower Entity</TableCell>
                <TableCell isHeader>Loan Purpose</TableCell>
                <TableCell isHeader>Amount</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lenderLeads.map((l) => (
                <TableRow key={l.id}>
                  <TableCell><span className="font-mono text-xs">{l.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{l.borrower}</span></TableCell>
                  <TableCell>{l.loanType}</TableCell>
                  <TableCell><span className="font-bold text-success">{l.amount}</span></TableCell>
                  <TableCell><Badge variant="primary">{l.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export const OalRepDocuments = () => {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Rep' }, { label: 'Document Verification' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Document Verification Desk</h1>
      <Card className="p-6">
        <p className="text-xs text-secondary">Verify tax returns, bank statements, and articles of incorporation for BioGenix Labs and Apex Global.</p>
      </Card>
    </div>
  );
};

export const OalRepMessages = () => {
  const { messages, sendAgentMessage } = useOal();
  const { addToast } = useToast();
  const [msgText, setMsgText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    sendAgentMessage(msgText);
    setMsgText('');
    addToast({ title: 'Message Sent to Borrower', type: 'success' });
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Breadcrumb items={[{ label: 'OAL Rep' }, { label: 'Borrower Messages' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Borrower Messaging Desk</h1>
      <Card className="p-6 flex flex-col justify-between" style={{ minHeight: '440px' }}>
        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <div key={m.id} className="p-3 surface-secondary rounded-sm flex flex-col gap-1 text-xs">
              <div className="flex justify-between font-bold text-primary">
                <span>{m.sender}</span>
                <span className="text-tertiary font-normal">{m.time}</span>
              </div>
              <p className="margin-0 text-secondary">{m.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex gap-2 border-t border-subtle pt-4 mt-4">
          <Input value={msgText} onChange={(e) => setMsgText(e.target.value)} placeholder="Type agent response to borrower..." required />
          <Button variant="primary" type="submit" icon={Send}>Send</Button>
        </form>
      </Card>
    </div>
  );
};

export const OalRepOffers = () => {
  const { offers } = useOal();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Rep' }, { label: 'Offers Marketplace Review' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Marketplace Offers Review</h1>
      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Offer ID</TableCell>
                <TableCell isHeader>Lender Entity</TableCell>
                <TableCell isHeader>Amount</TableCell>
                <TableCell isHeader>Rate</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((o) => (
                <TableRow key={o.id}>
                  <TableCell><span className="font-mono text-xs">{o.id}</span></TableCell>
                  <TableCell><span className="font-semibold">{o.lender}</span></TableCell>
                  <TableCell><span className="font-bold text-success">{o.amount}</span></TableCell>
                  <TableCell>{o.rate}</TableCell>
                  <TableCell><Badge variant="primary">{o.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export const OalRepTasks = () => {
  const { repTasks } = useOal();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Rep' }, { label: 'Rep Action Tasks' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Agent Action Tasks</h1>
      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Task ID</TableCell>
                <TableCell isHeader>Task Title</TableCell>
                <TableCell isHeader>Borrower Entity</TableCell>
                <TableCell isHeader>Priority</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repTasks.map((t) => (
                <TableRow key={t.id}>
                  <TableCell><span className="font-mono text-xs">{t.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{t.title}</span></TableCell>
                  <TableCell>{t.borrower}</TableCell>
                  <TableCell><Badge variant={t.priority === 'High' ? 'error' : 'warning'}>{t.priority}</Badge></TableCell>
                  <TableCell><Badge variant={t.status === 'Completed' ? 'success' : 'primary'}>{t.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
