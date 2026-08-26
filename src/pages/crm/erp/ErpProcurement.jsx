import React, { useState } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Modal, Input } from '../../../components/ui';
import { useErp } from '../../../context/ErpContext';
import { useToast } from '../../../context/ToastContext';

export const ErpProcurement = () => {
  const { purchaseOrders, addPurchaseOrder } = useErp();
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ vendor: '', item: '', amount: '$25,000' });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.vendor || !formData.item) return;
    addPurchaseOrder(formData);
    addToast({ title: 'PO Created', message: `Purchase order created for ${formData.vendor}`, type: 'success' });
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'ERP' }, { label: 'Procurement & Purchase Orders' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Procurement & Purchase Orders</h1>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>Create PO</Button>
      </div>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>PO ID</TableCell>
                <TableCell isHeader>Vendor</TableCell>
                <TableCell isHeader>Item Description</TableCell>
                <TableCell isHeader>Amount</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Date</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((po) => (
                <TableRow key={po.id}>
                  <TableCell><span className="font-mono text-xs">{po.id}</span></TableCell>
                  <TableCell><span className="font-semibold">{po.vendor}</span></TableCell>
                  <TableCell>{po.item}</TableCell>
                  <TableCell><span className="font-bold text-success">{po.amount}</span></TableCell>
                  <TableCell><Badge variant="primary">{po.status}</Badge></TableCell>
                  <TableCell>{po.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Purchase Order">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input label="Vendor Name" value={formData.vendor} onChange={(e) => setFormData({ ...formData, vendor: e.target.value })} required />
          <Input label="Item Description" value={formData.item} onChange={(e) => setFormData({ ...formData, item: e.target.value })} required />
          <Input label="Total Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
          <Button variant="primary" type="submit">Submit PO</Button>
        </form>
      </Modal>
    </div>
  );
};
