import React from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge } from '../../../components/ui';
import { useHr } from '../../../context/HrContext';

export const HrCandidates = () => {
  const { candidates } = useHr();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'HR' }, { label: 'Recruitment Candidates' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Candidate Pool & Pipeline</h1>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Candidate ID</TableCell>
                <TableCell isHeader>Name</TableCell>
                <TableCell isHeader>Applied Position</TableCell>
                <TableCell isHeader>Pipeline Stage</TableCell>
                <TableCell isHeader>Score</TableCell>
                <TableCell isHeader>Date Applied</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((c) => (
                <TableRow key={c.id}>
                  <TableCell><span className="font-mono text-xs">{c.id}</span></TableCell>
                  <TableCell><span className="font-semibold">{c.name}</span></TableCell>
                  <TableCell>{c.position}</TableCell>
                  <TableCell><Badge variant="primary">{c.stage}</Badge></TableCell>
                  <TableCell><Badge variant="success">{c.score}</Badge></TableCell>
                  <TableCell>{c.appliedDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
