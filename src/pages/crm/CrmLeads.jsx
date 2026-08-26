import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Plus, Search, Filter as FilterIcon, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Input, Select, Modal } from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

export const CrmLeads = () => {
  const navigate = useNavigate();
  const { leads, addLead } = useCrm();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Referral Modal State
  const [selectedLead, setSelectedLead] = useState(null);
  const [isReferralOpen, setIsReferralOpen] = useState(false);

  const filteredLeads = leads.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleOpenReferral = (lead) => {
    setSelectedLead(lead);
    setIsReferralOpen(true);
  };

  const handleExecuteReferral = () => {
    addToast({
      title: 'OAL Marketplace Referral Dispatched',
      message: `Navigating ${selectedLead?.company} to OAL Borrower Registration...`,
      type: 'success',
    });
    setIsReferralOpen(false);
    navigate(`/oal/borrower/signup?ref=CRM-${selectedLead?.id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Leads Directory' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Commercial Sales Leads</h1>
        </div>
        <div className="header-actions-right">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => addToast({ title: 'Lead Acquisition', message: 'New lead form initialized.', type: 'info' })}
          >
            Add New Lead
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search leads by contact or company name..."
          startIcon={Search}
          style={{ maxWidth: '340px', height: '36px' }}
        />

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { label: 'All Lead Statuses', value: 'all' },
            { label: 'New', value: 'New' },
            { label: 'Contacted', value: 'Contacted' },
            { label: 'Qualified', value: 'Qualified' },
            { label: 'Proposal', value: 'Proposal' },
          ]}
          style={{ height: '36px', fontSize: '13px' }}
        />
      </Card>

      {/* Leads Table */}
      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Lead ID</TableCell>
                <TableCell isHeader>Contact Name</TableCell>
                <TableCell isHeader>Company Entity</TableCell>
                <TableCell isHeader>Estimated Value</TableCell>
                <TableCell isHeader>Lead Score</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell><span className="font-mono text-xs">{lead.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{lead.name}</span></TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell><span className="font-bold text-success">{lead.value}</span></TableCell>
                  <TableCell><Badge variant="success">{lead.score} / 100</Badge></TableCell>
                  <TableCell><Badge variant="primary">{lead.status}</Badge></TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Sparkles}
                        onClick={() => handleOpenReferral(lead)}
                        title="Refer to OAL Commercial Lending Marketplace"
                      >
                        Refer to OAL
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* OAL Referral Modal */}
      <Modal
        isOpen={isReferralOpen}
        onClose={() => setIsReferralOpen(false)}
        title={`Refer ${selectedLead?.company} to OAL Network Marketplace`}
      >
        <div className="flex flex-col gap-4 text-xs">
          <p className="text-secondary margin-0">
            This action pre-fills <strong>{selectedLead?.company}</strong> into the OAL Network Borrower Onboarding Gateway for commercial debt line bidding.
          </p>

          <div className="p-3 surface-secondary rounded-md border-subtle flex flex-col gap-1">
            <div>Contact: <strong>{selectedLead?.name}</strong> ({selectedLead?.email})</div>
            <div>Estimated Facility Size: <strong className="text-success">{selectedLead?.value}</strong></div>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={() => setIsReferralOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" icon={ExternalLink} onClick={handleExecuteReferral} style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}>
              Launch OAL Borrower Gateway
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
