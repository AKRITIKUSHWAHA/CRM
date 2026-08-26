import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileCheck, MessageSquare, CheckSquare, Plus, Save, Sparkles, ShieldCheck } from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge, Select, Input, Modal } from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalRepBorrowers = () => {
  const navigate = useNavigate();
  const { applicationStage, setApplicationStage, stageNames, addRepTask, messages, sendAgentMessage } = useOal();
  const { addToast } = useToast();

  const [selectedStatus, setSelectedStatus] = useState(applicationStage);
  const [internalNote, setInternalNote] = useState('');
  const [notesList, setNotesList] = useState([
    { id: '1', author: 'Sarah Jenkins (OAL Rep)', note: 'Bank statements verified against Plaid telemetry. Outstanding cashflow.', date: 'Today at 09:15 AM' }
  ]);

  // Create Task Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    setApplicationStage(Number(selectedStatus));
    addToast({ title: 'Application Status Updated', message: `Stage changed to ${stageNames[selectedStatus]}`, type: 'success' });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!internalNote.trim()) return;
    setNotesList([{ id: Date.now().toString(), author: 'Sarah Jenkins (OAL Rep)', note: internalNote, date: 'Just now' }, ...notesList]);
    setInternalNote('');
    addToast({ title: 'Internal Note Added', message: 'Saved to borrower audit ledger.', type: 'info' });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addRepTask({ title: taskTitle, borrower: 'BioGenix Labs', priority: 'High' });
    setTaskTitle('');
    setIsTaskModalOpen(false);
    addToast({ title: 'Task Created', message: `Added rep task: ${taskTitle}`, type: 'success' });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'OAL Rep' }, { label: 'Borrower Profile Management' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>BioGenix Labs Inc. — Borrower Profile</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Plus} onClick={() => setIsTaskModalOpen(true)}>
            Create Rep Task
          </Button>
          <Button variant="primary" size="sm" icon={MessageSquare} onClick={() => navigate('/oal/rep/messages')} style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}>
            Message Borrower
          </Button>
        </div>
      </div>

      <div className="grid-responsive-2col">
        {/* Left Column: Profile & Status Update */}
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">Borrower Information & Stage Control</h3>
          <div className="flex justify-between text-xs border-b border-subtle pb-2">
            <span className="text-tertiary">Primary Contact:</span>
            <span className="font-semibold text-primary">Dr. Aris Thorne (CEO)</span>
          </div>
          <div className="flex justify-between text-xs border-b border-subtle pb-2">
            <span className="text-tertiary">Requested Loan:</span>
            <span className="font-bold text-success">$750,000 (36 Months)</span>
          </div>
          <div className="flex justify-between text-xs border-b border-subtle pb-2">
            <span className="text-tertiary">AI Credit Rating:</span>
            <Badge variant="success" icon={Sparkles}>792 / 850 (Grade A+)</Badge>
          </div>

          <form onSubmit={handleUpdateStatus} className="flex flex-col gap-3 border-t border-subtle pt-4">
            <Select
              label="Update Application Marketplace Stage"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={stageNames.map((name, idx) => ({ label: `Stage ${idx + 1}: ${name}`, value: idx }))}
            />
            <Button variant="primary" size="sm" type="submit" icon={Save}>
              Update Mock Status
            </Button>
          </form>
        </Card>

        {/* Right Column: Internal Notes */}
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">Rep Internal Underwriting Notes</h3>
          <form onSubmit={handleAddNote} className="flex flex-col gap-2">
            <Input
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              placeholder="Add confidential agent note regarding DSCR or lender negotiation..."
              required
            />
            <Button variant="outline" size="sm" type="submit" icon={Plus}>
              Add Internal Note
            </Button>
          </form>

          <div className="flex flex-col gap-2 mt-2">
            {notesList.map((n) => (
              <div key={n.id} className="p-3 surface-secondary rounded-sm border-subtle flex flex-col gap-1 text-xs">
                <div className="flex justify-between font-bold text-primary">
                  <span>{n.author}</span>
                  <span className="text-tertiary font-normal">{n.date}</span>
                </div>
                <p className="margin-0 text-secondary">{n.note}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Create Task Modal */}
      <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} title="Create New Agent Action Task">
        <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
          <Input label="Task Action Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="e.g. Schedule Underwriting Call with Lender" required />
          <Button variant="primary" type="submit">Create Task</Button>
        </form>
      </Modal>
    </div>
  );
};
