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

  // Add Lead Modal State
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    company: '',
    email: '',
    value: '$250,000',
    score: 85,
    status: 'New',
  });

  // Referral Modal State
  const [selectedLead, setSelectedLead] = useState(null);
  const [isReferralOpen, setIsReferralOpen] = useState(false);

  const filteredLeads = leads.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!leadFormData.name || !leadFormData.company) {
      addToast({ title: 'Validation Error', message: 'Name and company name are required.', type: 'error' });
      return;
    }

    addLead(leadFormData);
    addToast({ title: 'Lead Created', message: `Added Commercial Lead: ${leadFormData.company}`, type: 'success' });
    setIsAddLeadOpen(false);
    setLeadFormData({ name: '', company: '', email: '', value: '$250,000', score: 85, status: 'New' });
  };

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
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Leads Directory' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 0 0' }}>
            Commercial Sales Leads
          </h1>
        </div>
        <div className="header-actions-right">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsAddLeadOpen(true)}
          >
            Add New Lead
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      {/* Filter Bar */}
      <div className="table-toolbar">
        <div className="table-toolbar-search">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by contact or company name..."
            startIcon={Search}
            style={{ height: '36px' }}
          />
        </div>

        <div className="table-toolbar-actions">
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
        </div>
      </div>

      {/* Desktop Leads Table */}
      <Card className="hidden-mobile">
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
                  <TableCell><span className="font-mono text-xs text-tertiary">{lead.id}</span></TableCell>
                  <TableCell><span className="font-bold text-xs text-primary">{lead.name}</span></TableCell>
                  <TableCell><span className="text-xs text-secondary">{lead.company}</span></TableCell>
                  <TableCell><span className="font-bold text-xs text-success">{lead.value}</span></TableCell>
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

      {/* Mobile Card List View */}
      <div className="visible-mobile flex flex-col gap-3">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-subtle pb-2">
              <span className="font-mono text-xs text-tertiary">{lead.id}</span>
              <Badge variant="primary">{lead.status}</Badge>
            </div>
            
            <div>
              <div className="font-bold text-base text-primary mb-1">{lead.name}</div>
              <div className="text-xs text-secondary mb-2">{lead.company}</div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-success text-sm">{lead.value}</span>
                <Badge variant="success" style={{ fontSize: '10px' }}>Score: {lead.score}</Badge>
              </div>
            </div>

            <div className="pt-3 border-t border-subtle mt-1">
              <Button
                variant="outline"
                size="sm"
                icon={Sparkles}
                className="w-full justify-center"
                onClick={() => handleOpenReferral(lead)}
              >
                Refer to OAL
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Lead Modal */}
      <Modal
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
        title="Add Commercial Lead"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddLeadOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateLead}>
              Create Lead
            </Button>
          </>
        }
      >
        <form className="flex flex-col gap-4">
          <Input
            label="Contact Full Name"
            value={leadFormData.name}
            onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
            placeholder="e.g. Marcus Vance"
            required
          />
          <Input
            label="Company Entity Name"
            value={leadFormData.company}
            onChange={(e) => setLeadFormData({ ...leadFormData, company: e.target.value })}
            placeholder="e.g. TechNova Global Logistics"
            required
          />
          <Input
            label="Corporate Email Address"
            type="email"
            value={leadFormData.email}
            onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
            placeholder="e.g. m.vance@technova.com"
          />
          <Input
            label="Estimated Deal Value ($)"
            value={leadFormData.value}
            onChange={(e) => setLeadFormData({ ...leadFormData, value: e.target.value })}
            placeholder="e.g. $450,000"
          />
          <Select
            label="Initial Lead Status"
            value={leadFormData.status}
            onChange={(e) => setLeadFormData({ ...leadFormData, status: e.target.value })}
            options={['New', 'Contacted', 'Qualified', 'Proposal']}
          />
        </form>
      </Modal>

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
