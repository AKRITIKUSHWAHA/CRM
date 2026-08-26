import React from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge } from '../../../components/ui';

export const ErpSalesOrders = () => {
  const salesOrders = [
    { id: 'SO-901', customer: 'Apex Global Technologies', items: 'Logistics Gateway (x20)', total: '$140,000', status: 'Fulfilled', date: '2026-02-15' },
    { id: 'SO-902', customer: 'Nova Retail Corp', items: 'POS Hardware Bundle', total: '$85,000', status: 'Processing', date: '2026-02-22' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'ERP' }, { label: 'Sales & Orders' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Sales Orders</h1>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>SO ID</TableCell>
                <TableCell isHeader>Customer</TableCell>
                <TableCell isHeader>Items Summary</TableCell>
                <TableCell isHeader>Total Value</TableCell>
                <TableCell isHeader>Fulfillment Status</TableCell>
                <TableCell isHeader>Order Date</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesOrders.map((so) => (
                <TableRow key={so.id}>
                  <TableCell><span className="font-mono text-xs">{so.id}</span></TableCell>
                  <TableCell><span className="font-semibold">{so.customer}</span></TableCell>
                  <TableCell>{so.items}</TableCell>
                  <TableCell><span className="font-bold text-success">{so.total}</span></TableCell>
                  <TableCell><Badge variant={so.status === 'Fulfilled' ? 'success' : 'warning'}>{so.status}</Badge></TableCell>
                  <TableCell>{so.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
