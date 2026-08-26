import React from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, KPICard } from '../../../components/ui';
import { DollarSign } from 'lucide-react';

export const ErpFinance = () => {
  const ledgers = [
    { id: 'FIN-101', account: 'Accounts Receivable', type: 'Asset', balance: '$480,000', status: 'Reconciled' },
    { id: 'FIN-102', account: 'Accounts Payable', type: 'Liability', balance: '$127,500', status: 'Pending Review' },
    { id: 'FIN-103', account: 'Operational Reserves', type: 'Equity', balance: '$1,250,000', status: 'Reconciled' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'ERP' }, { label: 'Finance & Accounting' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Finance & General Ledgers</h1>

      <div className="grid-responsive-kpi">
        <KPICard title="Total Assets" value="$1.73M" change="+12.4%" changeType="positive" icon={DollarSign} />
        <KPICard title="Total Liabilities" value="$127,500" change="-4.2%" changeType="positive" icon={DollarSign} />
        <KPICard title="Net Working Capital" value="$1.60M" change="+14.8%" changeType="positive" icon={DollarSign} />
      </div>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Ledger Code</TableCell>
                <TableCell isHeader>Account Title</TableCell>
                <TableCell isHeader>Type</TableCell>
                <TableCell isHeader>Balance</TableCell>
                <TableCell isHeader>Audit Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ledgers.map((l) => (
                <TableRow key={l.id}>
                  <TableCell><span className="font-mono text-xs">{l.id}</span></TableCell>
                  <TableCell><span className="font-semibold">{l.account}</span></TableCell>
                  <TableCell><Badge variant="default">{l.type}</Badge></TableCell>
                  <TableCell><span className="font-bold text-success">{l.balance}</span></TableCell>
                  <TableCell><Badge variant="success">{l.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
