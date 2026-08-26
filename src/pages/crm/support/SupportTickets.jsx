import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LifeBuoy, Plus, Eye } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Modal, Input, Select } from '../../../components/ui';
import { useSupport } from '../../../context/SupportContext';
import { useToast } from '../../../context/ToastContext';

const ticketStatuses = ['Open', 'In Progress', 'Waiting', 'Resolved', 'Closed'];

export const SupportTickets = () => {
  const navigate = useNavigate();
  const { tickets, addTicket, updateTicketStatus } = useSupport();
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({ subject: '', customer: 'Apex Global', priority: 'Medium', category: 'General' });

  const filteredTickets = tickets.filter(
    (t) => filterStatus === 'all' || t.status === filterStatus
  );

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.subject) return;
    addTicket(formData);
    addToast({ title: 'Ticket Created', message: `Submitted support ticket for ${formData.customer}`, type: 'success' });
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'Support' }, { label: 'Tickets Directory' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Support Ticket Queue</h1>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>Create Ticket</Button>
      </div>

      <Card className="p-4 flex items-center justify-between">
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          options={[{ label: 'All Ticket Statuses', value: 'all' }, ...ticketStatuses.map((s) => ({ label: s, value: s }))]}
          style={{ height: '36px', fontSize: '13px' }}
        />
      </Card>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Ticket ID</TableCell>
                <TableCell isHeader>Subject</TableCell>
                <TableCell isHeader>Customer Account</TableCell>
                <TableCell isHeader>Priority</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((tck) => (
                <TableRow key={tck.id}>
                  <TableCell><span className="font-mono text-xs">{tck.id}</span></TableCell>
                  <TableCell><Link to={`/crm/support/tickets/${tck.id}`} className="font-semibold text-primary">{tck.subject}</Link></TableCell>
                  <TableCell>{tck.customer}</TableCell>
                  <TableCell><Badge variant={tck.priority === 'High' ? 'error' : 'warning'}>{tck.priority}</Badge></TableCell>
                  <TableCell>
                    <Select
                      value={tck.status}
                      onChange={(e) => updateTicketStatus(tck.id, e.target.value)}
                      options={ticketStatuses}
                      style={{ height: '28px', fontSize: '12px', padding: '0 0.5rem' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="ghost" size="sm" icon={Eye} onClick={() => navigate(`/crm/support/tickets/${tck.id}`)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Support Ticket">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input label="Issue Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
          <Input label="Customer Account" value={formData.customer} onChange={(e) => setFormData({ ...formData, customer: e.target.value })} required />
          <Select label="Priority" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} options={['High', 'Medium', 'Low']} />
          <Button variant="primary" type="submit">Submit Ticket</Button>
        </form>
      </Modal>
    </div>
  );
};
