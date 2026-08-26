import React, { useState } from 'react';
import {
  Plus,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Briefcase,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  Badge,
  Modal,
  Input,
  Select
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

const pipelineColumns = [
  'New Lead',
  'Contacted',
  'Qualified',
  'Opportunity',
  'Proposal',
  'Negotiation',
  'Won',
  'Lost',
];

export const CrmPipeline = () => {
  const { deals, addDeal, moveDealStage, deleteDeal } = useCrm();
  const { addToast } = useToast();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    customer: '',
    value: '$300,000',
    stage: 'Opportunity',
    owner: 'Alexander Wright',
  });

  const handleCreateDeal = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.customer) {
      addToast({ title: 'Validation Error', message: 'Deal title and customer name required.', type: 'error' });
      return;
    }
    addDeal(formData);
    addToast({ title: 'Opportunity Created', message: `Added ${formData.title} to ${formData.stage}.`, type: 'success' });
    setIsAddModalOpen(false);
    setFormData({ title: '', customer: '', value: '$300,000', stage: 'Opportunity', owner: 'Alexander Wright' });
  };

  const handleMoveStage = (dealId, currentStage, direction) => {
    const currentIndex = pipelineColumns.indexOf(currentStage);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < pipelineColumns.length) {
      const newStage = pipelineColumns[newIndex];
      moveDealStage(dealId, newStage);
      addToast({ title: 'Deal Moved', message: `Moved to ${newStage}`, type: 'info' });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Sales Pipeline Kanban' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Sales Pipeline Kanban</h1>
          <p className="text-xs text-secondary margin-0">
            Track deal stages, probability ratings, and revenue projections across 8 pipeline stages
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New Opportunity
          </Button>
        </div>
      </div>

      {/* 8-Column Responsive Kanban Grid */}
      <div
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ minHeight: '650px', alignmentBaseline: 'top' }}
      >
        {pipelineColumns.map((col) => {
          const colDeals = deals.filter((d) => d.stage === col);
          const totalColValue = colDeals.reduce((sum, d) => {
            const valNum = parseInt(d.value.replace(/[^0-9]/g, '')) || 0;
            return sum + valNum;
          }, 0);

          return (
            <div
              key={col}
              style={{
                width: '280px',
                minWidth: '280px',
                backgroundColor: 'var(--surface-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* Column Header */}
              <div className="p-3 border-b border-subtle flex flex-col gap-1 surface-card rounded-t-md">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-primary">{col}</span>
                  <Badge variant={col === 'Won' ? 'success' : col === 'Lost' ? 'error' : 'primary'}>
                    {colDeals.length}
                  </Badge>
                </div>
                <div className="text-xs font-semibold text-success">
                  ${totalColValue.toLocaleString()} Total
                </div>
              </div>

              {/* Column Cards */}
              <div className="p-2 flex flex-col gap-2 overflow-y-auto flex-1">
                {colDeals.length === 0 ? (
                  <div className="text-center p-4 text-xs text-tertiary border-subtle rounded-sm" style={{ borderStyle: 'dashed' }}>
                    No opportunities in {col}
                  </div>
                ) : (
                  colDeals.map((deal) => (
                    <Card key={deal.id} className="p-3 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-tertiary">{deal.id}</span>
                        <Badge variant="default">{deal.probability || '50%'}</Badge>
                      </div>

                      <div className="font-semibold text-xs text-primary">{deal.title}</div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-secondary truncate">{deal.customer}</span>
                        <span className="font-bold text-success ml-1">{deal.value}</span>
                      </div>

                      <div className="text-xs text-tertiary">Owner: {deal.owner}</div>

                      {/* Card Stage Controls */}
                      <div className="flex items-center justify-between border-t border-subtle pt-2 mt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          icon={ArrowLeft}
                          isDisabled={pipelineColumns.indexOf(col) === 0}
                          onClick={() => handleMoveStage(deal.id, col, 'prev')}
                          title="Move Previous Stage"
                        />
                        <span className="text-xs font-semibold text-tertiary">Stage Transfer</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          icon={ArrowRight}
                          isDisabled={pipelineColumns.indexOf(col) === pipelineColumns.length - 1}
                          onClick={() => handleMoveStage(deal.id, col, 'next')}
                          title="Move Next Stage"
                        />
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Opportunity Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Opportunity"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateDeal}>
              Create Opportunity
            </Button>
          </>
        }
      >
        <form className="flex flex-col gap-4">
          <Input
            label="Opportunity Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Enterprise Fleet Expansion"
            required
          />
          <Input
            label="Customer / Account"
            value={formData.customer}
            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            placeholder="e.g. Apex Global Technologies"
            required
          />
          <Input
            label="Estimated Deal Value ($)"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          />
          <Select
            label="Target Stage"
            value={formData.stage}
            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
            options={pipelineColumns}
          />
        </form>
      </Modal>
    </div>
  );
};
