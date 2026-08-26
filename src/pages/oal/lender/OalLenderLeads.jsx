import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bookmark, Search, Filter as FilterIcon, ArrowRight, Sparkles } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Input, Select } from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalLenderLeads = () => {
  const navigate = useNavigate();
  const { lenderLeads, toggleSaveLead } = useOal();
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterQual, setFilterQual] = useState('all');

  const filteredLeads = lenderLeads.filter((l) => {
    const matchSearch = l.borrower.toLowerCase().includes(searchTerm.toLowerCase()) || l.loanType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchQual = filterQual === 'all' || l.qual === filterQual;
    return matchSearch && matchQual;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'Lender' }, { label: 'Qualified Leads Directory' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Pre-Scored Qualified Borrower Pool</h1>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search borrower entity or loan type..."
          startIcon={Search}
          style={{ maxWidth: '320px', height: '36px' }}
        />

        <Select
          value={filterQual}
          onChange={(e) => setFilterQual(e.target.value)}
          options={[
            { label: 'All Qualification Grades', value: 'all' },
            { label: 'Grade A+', value: 'Grade A+' },
            { label: 'Grade B+', value: 'Grade B+' },
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
                <TableCell isHeader>Borrower Entity</TableCell>
                <TableCell isHeader>Loan Purpose</TableCell>
                <TableCell isHeader>Loan Amount</TableCell>
                <TableCell isHeader>AI Score</TableCell>
                <TableCell isHeader>Qualification</TableCell>
                <TableCell isHeader>Date Added</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell><span className="font-mono text-xs">{lead.id}</span></TableCell>
                  <TableCell><Link to={`/oal/lender/leads/${lead.id}`} className="font-semibold text-primary">{lead.borrower}</Link></TableCell>
                  <TableCell>{lead.loanType}</TableCell>
                  <TableCell><span className="font-bold text-success">{lead.amount}</span></TableCell>
                  <TableCell><Badge variant="success" icon={Sparkles}>{lead.score} / 850</Badge></TableCell>
                  <TableCell><Badge variant="primary">{lead.qual}</Badge></TableCell>
                  <TableCell>{lead.date}</TableCell>
                  <TableCell><Badge variant="default">{lead.status}</Badge></TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        isIconOnly
                        icon={Bookmark}
                        style={{ color: lead.saved ? 'var(--warning)' : 'var(--text-tertiary)' }}
                        onClick={() => {
                          toggleSaveLead(lead.id);
                          addToast({ title: lead.saved ? 'Removed from Saved' : 'Saved to Watchlist', type: 'info' });
                        }}
                      />
                      <Button variant="outline" size="sm" icon={ArrowRight} onClick={() => navigate(`/oal/lender/leads/${lead.id}`)}>
                        Create Offer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
