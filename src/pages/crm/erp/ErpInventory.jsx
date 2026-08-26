import React, { useState } from 'react';
import { Boxes, Plus } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Modal, Input } from '../../../components/ui';
import { useErp } from '../../../context/ErpContext';
import { useToast } from '../../../context/ToastContext';

export const ErpInventory = () => {
  const { inventory, addInventoryItem } = useErp();
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', warehouse: 'Austin Hub', quantity: 100, unitCost: '$50' });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    addInventoryItem(formData);
    addToast({ title: 'SKU Added', message: `Added ${formData.name} to inventory stock.`, type: 'success' });
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'ERP' }, { label: 'Inventory & Stock' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Inventory SKU Stock Directory</h1>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>Add Stock SKU</Button>
      </div>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>SKU Code</TableCell>
                <TableCell isHeader>Item Name</TableCell>
                <TableCell isHeader>Warehouse Hub</TableCell>
                <TableCell isHeader>Quantity in Stock</TableCell>
                <TableCell isHeader>Unit Cost</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell><span className="font-mono text-xs">{inv.id}</span></TableCell>
                  <TableCell><span className="font-semibold">{inv.name}</span></TableCell>
                  <TableCell>{inv.warehouse}</TableCell>
                  <TableCell><span className="font-bold">{inv.quantity} units</span></TableCell>
                  <TableCell>{inv.unitCost}</TableCell>
                  <TableCell><Badge variant={inv.status === 'In Stock' ? 'success' : 'warning'}>{inv.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Inventory Item">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input label="Item Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <Input label="Warehouse Hub" value={formData.warehouse} onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })} />
          <Input label="Initial Quantity" type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })} />
          <Button variant="primary" type="submit">Add Stock SKU</Button>
        </form>
      </Modal>
    </div>
  );
};
