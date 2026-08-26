import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Plus, Eye } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Modal, Input, Select } from '../../../components/ui';
import { useHr } from '../../../context/HrContext';
import { useToast } from '../../../context/ToastContext';

export const HrEmployees = () => {
  const navigate = useNavigate();
  const { employees, addEmployee } = useHr();
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: 'Software Engineer', dept: 'Engineering', email: '', salary: '$130,000' });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    addEmployee(formData);
    addToast({ title: 'Employee Added', message: `Added ${formData.name} to payroll database.`, type: 'success' });
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'HR' }, { label: 'Employees Directory' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Employee Directory</h1>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>Add Employee</Button>
      </div>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Employee ID</TableCell>
                <TableCell isHeader>Full Name</TableCell>
                <TableCell isHeader>Department</TableCell>
                <TableCell isHeader>Job Title</TableCell>
                <TableCell isHeader>Corporate Email</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell><span className="font-mono text-xs">{emp.id}</span></TableCell>
                  <TableCell><Link to={`/crm/hr/employees/${emp.id}`} className="font-semibold text-primary">{emp.name}</Link></TableCell>
                  <TableCell>{emp.dept}</TableCell>
                  <TableCell>{emp.role}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell><Badge variant="success">{emp.status}</Badge></TableCell>
                  <TableCell align="right">
                    <Button variant="ghost" size="sm" icon={Eye} onClick={() => navigate(`/crm/hr/employees/${emp.id}`)}>View Profile</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Employee">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <Input label="Corporate Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <Input label="Job Title" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
          <Select label="Department" value={formData.dept} onChange={(e) => setFormData({ ...formData, dept: e.target.value })} options={['Executive', 'Sales', 'Finance', 'Human Resources', 'Engineering', 'Operations']} />
          <Button variant="primary" type="submit">Save Employee</Button>
        </form>
      </Modal>
    </div>
  );
};
