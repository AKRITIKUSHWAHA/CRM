import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Briefcase,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Target,
  CheckCircle2,
  Kanban,
  Filter
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  Badge,
  Modal,
  Input,
  Select,
  KPICard
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
  const { deals, addDeal, moveDealStage } = useCrm();
  const { addToast } = useToast();

  const [selectedMobileStage, setSelectedMobileStage] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    customer: '',
    value: '$300,000',
    stage: 'Opportunity',
    owner: 'Alexander Wright',
  });

  // Calculate Pipeline Metrics
  const totalPipelineValue = deals.reduce((sum, d) => {
    const valNum = parseInt(d.value.replace(/[^0-9]/g, '')) || 0;
    return sum + valNum;
  }, 0);

  const weightedPipelineValue = Math.round(totalPipelineValue * 0.52);
  const totalDealsCount = deals.length;
  const wonDealsCount = deals.filter((d) => d.stage === 'Won').length;
  const winRate = totalDealsCount > 0 ? Math.round((wonDealsCount / totalDealsCount) * 100) || 68 : 68;

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

  const visibleColumns = selectedMobileStage === 'All'
    ? pipelineColumns
    : pipelineColumns.filter((col) => col === selectedMobileStage);

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Sales Pipeline Kanban' }]} />
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
            Sales Pipeline Kanban
          </h1>
          <p className="text-xs text-secondary margin-0" style={{ marginTop: '2px' }}>
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

      {/* 2. Pipeline Summary Metrics Strip — ALL 4 CARDS IN A SINGLE LINE */}
      <div className="grid grid-cols-4 gap-2.5">
        <KPICard
          title="TOTAL PIPELINE VALUE"
          value={`$${(totalPipelineValue / 1000000).toFixed(2)}M`}
          change="18.4%"
          changeType="positive"
          changePeriod="across 8 stages"
          icon={TrendingUp}
          iconBg="rgba(22, 163, 74, 0.1)"
          iconColor="#16a34a"
        />
        <KPICard
          title="WEIGHTED VALUE"
          value={`$${(weightedPipelineValue / 1000000).toFixed(2)}M`}
          change="52% Avg"
          changeType="neutral"
          changePeriod="prob. adj."
          icon={DollarSign}
          iconBg="rgba(29, 78, 216, 0.1)"
          iconColor="#1d4ed8"
        />
        <KPICard
          title="TOTAL ACTIVE DEALS"
          value={`${totalDealsCount > 0 ? totalDealsCount : 18}`}
          change="3 Deals"
          changeType="positive"
          changePeriod="this month"
          icon={Kanban}
          iconBg="rgba(147, 51, 234, 0.1)"
          iconColor="#9333ea"
        />
        <KPICard
          title="WIN CONVERSION"
          value={`${winRate}%`}
          change="4.2%"
          changeType="positive"
          changePeriod="closed deals"
          icon={CheckCircle2}
          iconBg="rgba(234, 88, 12, 0.1)"
          iconColor="#ea580c"
        />
      </div>

      {/* 3. Mobile/Tablet Stage Quick Filter Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 visible-mobile">
        <span className="text-xs font-bold text-secondary flex items-center gap-1 flex-shrink-0">
          <Filter size={14} /> Stage:
        </span>
        {['All', ...pipelineColumns].map((stage) => (
          <button
            key={stage}
            type="button"
            onClick={() => setSelectedMobileStage(stage)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 600,
              border: '1px solid var(--border)',
              backgroundColor: selectedMobileStage === stage ? 'var(--primary)' : 'var(--surface)',
              color: selectedMobileStage === stage ? '#ffffff' : 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            {stage}
          </button>
        ))}
      </div>

      {/* 4. 8-Column Responsive Kanban Board Grid */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          paddingBottom: '1rem',
          minHeight: '620px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {visibleColumns.map((col) => {
          const colDeals = deals.filter((d) => d.stage === col);
          const totalColValue = colDeals.reduce((sum, d) => {
            const valNum = parseInt(d.value.replace(/[^0-9]/g, '')) || 0;
            return sum + valNum;
          }, 0);

          return (
            <div
              key={col}
              style={{
                width: '290px',
                minWidth: '290px',
                backgroundColor: 'var(--surface-secondary)',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  padding: '0.875rem 1rem',
                  borderBottom: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-primary">{col}</span>
                  <Badge variant={col === 'Won' ? 'success' : col === 'Lost' ? 'error' : 'primary'}>
                    {colDeals.length}
                  </Badge>
                </div>
                <div className="text-xs font-bold text-success">
                  ${totalColValue.toLocaleString()}
                </div>
              </div>

              {/* Column Cards Container */}
              <div className="p-2.5 flex flex-col gap-2.5 overflow-y-auto flex-1">
                {colDeals.length === 0 ? (
                  <div
                    className="text-center p-4 text-xs text-tertiary rounded-md"
                    style={{ border: '1px dashed var(--border)', backgroundColor: 'var(--surface)' }}
                  >
                    No deals in {col}
                  </div>
                ) : (
                  colDeals.map((deal) => (
                    <div
                      key={deal.id}
                      style={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        padding: '0.875rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-border)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >
                      {/* Top ID & Probability */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-tertiary" style={{ fontSize: '11px' }}>{deal.id}</span>
                        <Badge variant="default" style={{ fontSize: '10px' }}>{deal.probability || '50%'} Prob</Badge>
                      </div>

                      {/* Deal Title */}
                      <div className="font-bold text-xs text-primary" style={{ fontSize: '13px', lineHeight: 1.3 }}>
                        {deal.title}
                      </div>

                      {/* Customer & Value */}
                      <div className="flex items-center justify-between text-xs pt-0.5">
                        <span className="text-secondary truncate max-w-[150px]" style={{ fontSize: '11px' }}>{deal.customer}</span>
                        <span className="font-bold text-success">{deal.value}</span>
                      </div>

                      {/* Owner Info */}
                      <div className="text-tertiary" style={{ fontSize: '11px' }}>
                        Owner: <strong className="text-secondary">{deal.owner}</strong>
                      </div>

                      {/* Stage Transfer Buttons */}
                      <div
                        className="flex items-center justify-between pt-2"
                        style={{ borderTop: '1px solid var(--border)', marginTop: '2px' }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          icon={ArrowLeft}
                          isDisabled={pipelineColumns.indexOf(col) === 0}
                          onClick={() => handleMoveStage(deal.id, col, 'prev')}
                          title="Move Previous Stage"
                        />
                        <span className="text-tertiary" style={{ fontSize: '10px', fontWeight: 600 }}>
                          Stage Transfer
                        </span>
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
                    </div>
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
