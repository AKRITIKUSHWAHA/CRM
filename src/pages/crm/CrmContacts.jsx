import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Edit,
  Eye,
  Mail,
  Phone,
  Building2,
  ArrowUpDown,
  CheckSquare
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Search,
  Filter,
  Select,
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Pagination,
  Modal,
  Input,
  ConfirmationDialog,
  Checkbox
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

export const CrmContacts = () => {
  const navigate = useNavigate();
  const { contacts, addContact, editContact, deleteContact, bulkDeleteContacts } = useCrm();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [selectedIds, setSelectedIds] = useState([]);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    type: 'Enterprise Client',
    owner: 'Alexander Wright',
    status: 'Active',
  });

  // Filter & Sort Logic
  const filteredContacts = contacts
    .filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === 'all' || c.type === filterType;
      const matchStatus = filterStatus === 'all' || c.status === filterStatus;
      return matchSearch && matchType && matchStatus;
    })
    .sort((a, b) => {
      if (sortField === 'name') return a.name.localeCompare(b.name);
      if (sortField === 'company') return a.company.localeCompare(b.company);
      return 0;
    });

  // Bulk Selection
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredContacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredContacts.map((c) => c.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Add Contact Handler
  const handleCreateContact = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      addToast({ title: 'Validation Error', message: 'Name and email are required.', type: 'error' });
      return;
    }
    const created = addContact(formData);
    addToast({ title: 'Contact Created', message: `Added ${created.name} to database.`, type: 'success' });
    setIsAddModalOpen(false);
    setFormData({ name: '', company: '', email: '', phone: '', type: 'Enterprise Client', owner: 'Alexander Wright', status: 'Active' });
  };

  // Edit Contact Handler
  const handleOpenEdit = (contact) => {
    setContactToEdit(contact);
    setFormData({
      name: contact.name,
      company: contact.company,
      email: contact.email,
      phone: contact.phone,
      type: contact.type,
      owner: contact.owner,
      status: contact.status,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!contactToEdit) return;
    editContact(contactToEdit.id, formData);
    addToast({ title: 'Contact Updated', message: `Updated details for ${formData.name}.`, type: 'success' });
    setIsEditModalOpen(false);
  };

  // Delete Handlers
  const handleOpenDelete = (contact) => {
    setContactToDelete(contact);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      deleteContact(contactToDelete.id);
      addToast({ title: 'Contact Deleted', message: `Removed ${contactToDelete.name}.`, type: 'error' });
      setContactToDelete(null);
    }
    setIsDeleteConfirmOpen(false);
  };

  const handleBulkDelete = () => {
    bulkDeleteContacts(selectedIds);
    addToast({ title: 'Bulk Delete', message: `Removed ${selectedIds.length} contact records.`, type: 'error' });
    setSelectedIds([]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Contacts Directory' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Contacts & Accounts</h1>
          <p className="text-xs text-secondary margin-0">
            Isolated multi-tenant contacts, accounts, and client relationships
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => {
              setFormData({ name: '', company: '', email: '', phone: '', type: 'Enterprise Client', owner: 'Alexander Wright', status: 'Active' });
              setIsAddModalOpen(true);
            }}
          >
            Add New Contact
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          placeholder="Search by name, company, email..."
        />

        <div className="flex items-center gap-3 flex-wrap">
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={[
              { label: 'All Contact Types', value: 'all' },
              { label: 'Enterprise Client', value: 'Enterprise Client' },
              { label: 'Commercial Lead', value: 'Commercial Lead' },
              { label: 'Investor', value: 'Investor' },
              { label: 'Borrower Partner', value: 'Borrower Partner' },
              { label: 'Supplier', value: 'Supplier' },
            ]}
            style={{ height: '36px', fontSize: '13px' }}
          />

          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Active', value: 'Active' },
              { label: 'Qualified', value: 'Qualified' },
              { label: 'Pending KYC', value: 'Pending KYC' },
              { label: 'Inactive', value: 'Inactive' },
            ]}
            style={{ height: '36px', fontSize: '13px' }}
          />

          <Button
            variant="outline"
            size="sm"
            icon={ArrowUpDown}
            onClick={() => setSortField((s) => (s === 'name' ? 'company' : 'name'))}
          >
            Sort: <strong className="ml-1 capitalize">{sortField}</strong>
          </Button>
        </div>
      </Card>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3 surface-secondary rounded-md border-subtle flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">
            {selectedIds.length} item(s) selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Mail}
              onClick={() => addToast({ title: 'Bulk Email', message: `Prepared draft email for ${selectedIds.length} contacts.`, type: 'info' })}
            >
              Bulk Email
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={handleBulkDelete}
            >
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Desktop / Tablet Contacts Table */}
      <Card className="hidden-mobile">
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>
                  <Checkbox
                    checked={selectedIds.length > 0 && selectedIds.length === filteredContacts.length}
                    onChange={toggleSelectAll}
                  />
                </TableCell>
                <TableCell isHeader>Contact ID</TableCell>
                <TableCell isHeader>Full Name</TableCell>
                <TableCell isHeader>Company</TableCell>
                <TableCell isHeader>Type</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Owner</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody isEmpty={filteredContacts.length === 0} emptyMessage="No matching contacts found.">
              {filteredContacts.map((contact) => {
                const isSelected = selectedIds.includes(contact.id);
                return (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onChange={() => toggleSelectOne(contact.id)}
                      />
                    </TableCell>
                    <TableCell><span className="font-mono text-xs text-tertiary">{contact.id}</span></TableCell>
                    <TableCell>
                      <Link to={`/crm/contacts/${contact.id}`} className="font-semibold hover:underline text-primary">
                        {contact.name}
                      </Link>
                    </TableCell>
                    <TableCell><span className="text-secondary">{contact.company}</span></TableCell>
                    <TableCell><Badge variant="default">{contact.type}</Badge></TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          contact.status === 'Active'
                            ? 'success'
                            : contact.status === 'Pending KYC'
                            ? 'warning'
                            : 'info'
                        }
                      >
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{contact.owner}</TableCell>
                    <TableCell align="right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          icon={Eye}
                          onClick={() => navigate(`/crm/contacts/${contact.id}`)}
                          title="View Details"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          icon={Edit}
                          onClick={() => handleOpenEdit(contact)}
                          title="Edit Contact"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          icon={Trash2}
                          onClick={() => handleOpenDelete(contact)}
                          title="Delete Contact"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardBody>
        <Pagination
          currentPage={1}
          totalPages={1}
          totalItems={filteredContacts.length}
          onPageChange={() => {}}
        />
      </Card>

      {/* Mobile Card List View (< 768px) */}
      <div className="visible-mobile flex flex-col gap-3">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-tertiary">{contact.id}</span>
              <Badge
                variant={
                  contact.status === 'Active'
                    ? 'success'
                    : contact.status === 'Pending KYC'
                    ? 'warning'
                    : 'info'
                }
              >
                {contact.status}
              </Badge>
            </div>

            <div>
              <Link to={`/crm/contacts/${contact.id}`} className="font-bold text-base text-primary">
                {contact.name}
              </Link>
              <div className="text-xs text-secondary">{contact.company}</div>
            </div>

            <div className="flex flex-col gap-1 text-xs text-tertiary border-t border-subtle pt-2">
              <div className="flex items-center gap-1.5"><Mail size={14} /> {contact.email}</div>
              <div className="flex items-center gap-1.5"><Phone size={14} /> {contact.phone}</div>
            </div>

            <div className="flex items-center justify-between border-t border-subtle pt-3">
              <Badge variant="default">{contact.type}</Badge>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" icon={Eye} onClick={() => navigate(`/crm/contacts/${contact.id}`)}>
                  View Tabs
                </Button>
                <Button variant="ghost" size="sm" isIconOnly icon={Trash2} onClick={() => handleOpenDelete(contact)} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Contact Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Contact"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateContact}>
              Save Contact
            </Button>
          </>
        }
      >
        <form className="flex flex-col gap-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Eleanor Vance"
            required
          />
          <Input
            label="Company Name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="e.g. Apex Global Technologies"
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. e.vance@apex.io"
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +1 (555) 234-8901"
          />
          <Select
            label="Contact Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            options={['Enterprise Client', 'Commercial Lead', 'Investor', 'Borrower Partner', 'Supplier']}
          />
        </form>
      </Modal>

      {/* Edit Contact Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Contact Record"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveEdit}>
              Update Contact
            </Button>
          </>
        }
      >
        <form className="flex flex-col gap-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Company Name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={['Active', 'Qualified', 'Pending KYC', 'Inactive']}
          />
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        isDanger
        title="Delete Contact Record?"
        description={`Are you sure you want to permanently delete ${contactToDelete?.name} (${contactToDelete?.company})? This action cannot be undone.`}
        confirmLabel="Delete Permanently"
      />
    </div>
  );
};
