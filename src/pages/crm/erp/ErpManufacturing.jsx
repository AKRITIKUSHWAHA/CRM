import React from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, ProgressBar } from '../../../components/ui';

export const ErpManufacturing = () => {
  const workOrders = [
    { id: 'WO-401', line: 'Assembly Line Alpha', item: 'Telematics Hub Enclosure', target: 500, completed: 350, status: 'In Production' },
    { id: 'WO-402', line: 'Assembly Line Beta', item: 'Power Supply PCB Module', target: 1200, completed: 1200, status: 'Completed' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'ERP' }, { label: 'Manufacturing & Assembly' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Manufacturing Work Orders</h1>

      <Card>
        <CardBody className="flex flex-col gap-4">
          {workOrders.map((wo) => (
            <div key={wo.id} className="p-3 surface-secondary rounded-sm border-subtle flex flex-col gap-2 text-xs">
              <div className="flex justify-between font-bold text-primary">
                <span>{wo.id} — {wo.item} ({wo.line})</span>
                <Badge variant={wo.status === 'Completed' ? 'success' : 'primary'}>{wo.status}</Badge>
              </div>
              <ProgressBar value={Math.round((wo.completed / wo.target) * 100)} variant="success" />
              <div className="flex justify-between text-tertiary">
                <span>Completed: {wo.completed} / {wo.target} units</span>
                <span>Efficiency: 98.4%</span>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};
