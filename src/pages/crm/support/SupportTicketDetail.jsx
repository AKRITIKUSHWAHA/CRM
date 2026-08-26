import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LifeBuoy, ArrowLeft, Send } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Badge, Input } from '../../../components/ui';
import { useSupport } from '../../../context/SupportContext';
import { useToast } from '../../../context/ToastContext';

export const SupportTicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, updateTicketStatus } = useSupport();
  const { addToast } = useToast();

  const [response, setResponse] = useState('');

  const tck = tickets.find((t) => t.id === id) || tickets[0];

  const handleSendResponse = (e) => {
    e.preventDefault();
    if (!response.trim()) return;
    addToast({ title: 'Response Dispatched', message: 'Sent support resolution response to customer.', type: 'success' });
    setResponse('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'Support' }, { label: 'Tickets', href: '/crm/support/tickets' }, { label: tck.id }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>{tck.subject}</h1>
        </div>
        <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => navigate('/crm/support/tickets')}>Back</Button>
      </div>

      <Card className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-subtle pb-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-primary">Customer: {tck.customer}</span>
            <Badge variant="primary">{tck.category}</Badge>
          </div>
          <Badge variant={tck.status === 'Resolved' ? 'success' : 'warning'}>{tck.status}</Badge>
        </div>

        <div className="p-4 surface-secondary rounded-md text-xs text-secondary">
          Customer reported issue: <strong>{tck.subject}</strong>. System logs show API response latency spikes during hourly batch data synchronization.
        </div>

        <form onSubmit={handleSendResponse} className="flex flex-col gap-3 border-t border-subtle pt-4">
          <Input
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type technical support response to customer..."
            required
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => updateTicketStatus(tck.id, 'Resolved')}>Mark Resolved</Button>
              <Button type="button" variant="outline" size="sm" onClick={() => updateTicketStatus(tck.id, 'Closed')}>Close Ticket</Button>
            </div>
            <Button variant="primary" size="sm" type="submit" icon={Send}>Send Response</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
