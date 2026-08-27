import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  User,
  Building2,
  Mail,
  Phone,
  Calendar,
  FileText,
  DollarSign,
  Briefcase,
  LifeBuoy,
  MessageSquare,
  Activity,
  Folder,
  Edit,
  ArrowLeft,
  Plus
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Badge,
  Timeline,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  ProgressBar,
  Modal,
  Input
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CrmContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts, deals, tasks, messages, editContact } = useCrm();
  const { crmUser } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview');

  const contact = contacts.find((c) => c.id === id) || contacts[0];

  // Notes tab state with localStorage persistence per contact
  const getInitialNotes = (contactId) => {
    if (!contactId) return [];
    const saved = localStorage.getItem(`crm_contact_notes_${contactId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore JSON parse error
      }
    }
    // Default initial mock notes for initial seed contacts
    if (contactId === 'CNT-101' || contactId === 'CNT-102' || contactId === 'CNT-103') {
      return [
        { id: '1', author: 'Alexander Wright', text: 'Client requested updated SLA pricing for Q3 logistics volume expansion.', date: 'Today at 10:15 AM' },
        { id: '2', author: 'Sarah Jenkins', text: 'Follow-up call completed. Legal team sent NDA draft for review.', date: 'Yesterday at 3:30 PM' },
      ];
    }
    return [];
  };

  const [notes, setNotes] = useState(() => getInitialNotes(contact?.id || id));
  const [newNote, setNewNote] = useState('');

  React.useEffect(() => {
    if (contact?.id) {
      setNotes(getInitialNotes(contact.id));
    }
  }, [contact?.id]);

  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    if (contact?.id) {
      localStorage.setItem(`crm_contact_notes_${contact.id}`, JSON.stringify(updatedNotes));
      if (editContact) {
        editContact(contact.id, { notesCount: updatedNotes.length });
      }
    }
  };

  const handleAddNote = (e) => {
    if (e) e.preventDefault();
    const trimmed = newNote.trim();
    if (!trimmed) {
      addToast({ title: 'Validation Warning', message: 'Please enter note content before saving.', type: 'warning' });
      return;
    }
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newNoteObj = {
      id: Date.now().toString(),
      author: crmUser?.name || 'Alexander Wright',
      text: trimmed,
      date: `Today at ${timeStr}`,
    };
    const updated = [newNoteObj, ...notes];
    saveNotes(updated);
    setNewNote('');
    addToast({ title: 'Note Added', message: 'Saved note to contact history.', type: 'success' });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb
            items={[
              { label: 'CRM nErgy' },
              { label: 'Contacts', href: '/crm/contacts' },
              { label: contact.name },
            ]}
          />
          <div className="flex items-center gap-3">
            <h1 style={{ fontSize: 'var(--text-2xl)' }}>{contact.name}</h1>
            <Badge variant={contact.status === 'Active' ? 'success' : 'warning'}>{contact.status}</Badge>
            <Badge variant="default">{contact.type}</Badge>
          </div>
          <p className="text-xs text-secondary margin-0 mt-1 flex items-center gap-4">
            <span><Building2 size={12} className="inline mr-1" />{contact.company}</span>
            <span><Mail size={12} className="inline mr-1" />{contact.email}</span>
            <span><Phone size={12} className="inline mr-1" />{contact.phone}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => navigate('/crm/contacts')}>
            Back to Contacts
          </Button>
          <Button variant="primary" size="sm" icon={Edit} onClick={() => addToast({ title: 'Edit Contact', message: `Edit dialog opened for ${contact.name}`, type: 'info' })}>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* 10 Functional Tabs Switcher */}
      <Card>
        <CardBody className="p-2 overflow-x-auto">
          <Tabs
            tabs={[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'activities', label: 'Activities', icon: Activity },
              { id: 'communications', label: 'Communications', icon: MessageSquare },
              { id: 'deals', label: 'Deals', icon: Briefcase },
              { id: 'tasks', label: 'Tasks', icon: Calendar },
              { id: 'documents', label: 'Documents', icon: Folder },
              { id: 'invoices', label: 'Invoices', icon: DollarSign },
              { id: 'projects', label: 'Projects', icon: Building2 },
              { id: 'support', label: 'Support', icon: LifeBuoy },
              { id: 'notes', label: 'Notes', icon: FileText, badge: notes.length },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </CardBody>
      </Card>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid-responsive-2col">
          <Card>
            <CardHeader title="Contact Metadata & Ownership" />
            <CardBody className="flex flex-col gap-0 text-xs">
              <div className="flex items-center justify-between py-2.5">
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Record ID:</span>
                <span className="font-mono text-primary font-semibold" style={{ fontSize: '13px' }}>{contact.id}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Account Owner:</span>
                <span className="font-semibold text-primary" style={{ fontSize: '13px' }}>{contact.owner}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Deal Value:</span>
                <span className="font-bold text-success" style={{ fontSize: '13px' }}>{contact.totalValue}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Created Date:</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{contact.createdDate}</span>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Account Health & Relationship Score" />
            <CardBody className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Engagement Rating</span>
                  <span className="font-bold text-success">92% High</span>
                </div>
                <ProgressBar value={92} variant="success" showLabel={false} />
              </div>
              <p className="text-xs text-secondary margin-0">
                Tenant isolation enforced. All financial records and communication histories are bound exclusively to this account ID.
              </p>
            </CardBody>
          </Card>
        </div>
      )}

      {/* TAB 2: ACTIVITIES */}
      {activeTab === 'activities' && (
        <Card className="p-6">
          <h3 className="text-base font-semibold mb-4">Activity Stream</h3>
          <Timeline
            items={[
              { title: 'Email Dispatched', description: 'Enterprise Master Service Agreement pricing sent.', time: 'Today at 10:15 AM', color: 'var(--primary)' },
              { title: 'Phone Call Completed', description: 'Confirmed quarterly logistics volume targets.', time: 'Yesterday at 3:30 PM', color: 'var(--success)' },
              { title: 'NDA Document Uploaded', description: 'Signed non-disclosure agreement added to vault.', time: '2 days ago', color: 'var(--info)' },
            ]}
          />
        </Card>
      )}

      {/* TAB 3: COMMUNICATIONS */}
      {activeTab === 'communications' && (
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">Communication Log</h3>
          {messages.map((m) => (
            <div key={m.id} className="p-3 surface-secondary rounded-sm border-subtle flex flex-col gap-1 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-primary">{m.sender}</span>
                <span className="text-tertiary">{m.timestamp}</span>
              </div>
              <div className="font-medium text-secondary">{m.subject}</div>
              <p className="margin-0 text-tertiary">{m.body}</p>
            </div>
          ))}
        </Card>
      )}

      {/* TAB 4: DEALS */}
      {activeTab === 'deals' && (
        <Card className="p-6">
          <h3 className="text-base font-semibold mb-4">Associated Deals ({deals.length})</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Deal Name</TableCell>
                <TableCell isHeader>Value</TableCell>
                <TableCell isHeader>Stage</TableCell>
                <TableCell isHeader>Probability</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((d) => (
                <TableRow key={d.id}>
                  <TableCell><span className="font-semibold">{d.title}</span></TableCell>
                  <TableCell><span className="font-bold text-success">{d.value}</span></TableCell>
                  <TableCell><Badge variant="primary">{d.stage}</Badge></TableCell>
                  <TableCell>{d.probability}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* TAB 5: TASKS */}
      {activeTab === 'tasks' && (
        <Card className="p-6">
          <h3 className="text-base font-semibold mb-4">Account Tasks ({tasks.length})</h3>
          <div className="flex flex-col gap-2">
            {tasks.map((t) => (
              <div key={t.id} className="p-3 surface-secondary rounded-sm flex items-center justify-between text-xs">
                <span className="font-semibold text-primary">{t.title}</span>
                <Badge variant={t.priority === 'High' ? 'error' : 'warning'}>{t.priority}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 6: DOCUMENTS */}
      {activeTab === 'documents' && (
        <Card className="p-6 flex flex-col gap-3">
          <h3 className="text-base font-semibold">Vault Documents</h3>
          <div className="p-3 surface-secondary rounded-sm flex items-center justify-between text-xs">
            <span className="font-semibold">Master_Service_Agreement_v2.pdf</span>
            <Badge variant="success">Signed & Verified</Badge>
          </div>
          <div className="p-3 surface-secondary rounded-sm flex items-center justify-between text-xs">
            <span className="font-semibold">Corporate_Tax_Returns_2025.pdf</span>
            <Badge variant="primary">KYC Vault</Badge>
          </div>
        </Card>
      )}

      {/* TAB 7: INVOICES */}
      {activeTab === 'invoices' && (
        <Card className="p-6 flex flex-col gap-3">
          <h3 className="text-base font-semibold">Billing Invoices</h3>
          <div className="p-3 surface-secondary rounded-sm flex items-center justify-between text-xs">
            <span className="font-mono text-tertiary">INV-2094 ($48,000)</span>
            <Badge variant="success">Paid in Full</Badge>
          </div>
        </Card>
      )}

      {/* TAB 8: PROJECTS */}
      {activeTab === 'projects' && (
        <Card className="p-6">
          <h3 className="text-base font-semibold mb-2">ERP Project Implementations</h3>
          <p className="text-xs text-secondary">Logistics Node Deployment Project #PRJ-882 — Active Phase 1.</p>
        </Card>
      )}

      {/* TAB 9: SUPPORT */}
      {activeTab === 'support' && (
        <Card className="p-6">
          <h3 className="text-base font-semibold mb-2">Customer Support Tickets</h3>
          <p className="text-xs text-secondary">No open critical support tickets for this account.</p>
        </Card>
      )}

      {/* TAB 10: NOTES */}
      {activeTab === 'notes' && (
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">Account Notes</h3>
          <div className="flex flex-col gap-2.5">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new internal note..."
              rows={2}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                resize: 'vertical',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleAddNote(e);
                }
              }}
            />
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="sm"
                type="button"
                icon={Plus}
                onClick={handleAddNote}
              >
                Add Note
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-subtle pt-4">
            {notes.length === 0 ? (
              <p className="text-xs text-tertiary">No notes added yet.</p>
            ) : (
              notes.map((n) => (
                <div key={n.id} className="p-3 surface-secondary rounded-sm flex flex-col gap-1 text-xs">
                  <div className="flex justify-between font-semibold text-primary">
                    <span>{n.author}</span>
                    <span className="text-tertiary font-normal">{n.date}</span>
                  </div>
                  <p className="margin-0 text-secondary">{n.text}</p>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
