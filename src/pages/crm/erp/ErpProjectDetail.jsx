import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FolderGit2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge, ProgressBar, Timeline } from '../../../components/ui';
import { useErp } from '../../../context/ErpContext';

export const ErpProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useErp();

  const project = projects.find((p) => p.id === id) || projects[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'ERP' }, { label: 'Projects', href: '/crm/erp/projects' }, { label: project.name }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>{project.name}</h1>
        </div>
        <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => navigate('/crm/erp/projects')}>Back</Button>
      </div>

      <div className="grid-responsive-2col">
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">Project Overview</h3>
          <div className="flex justify-between text-xs border-b border-subtle pb-2">
            <span className="text-tertiary">Client:</span>
            <span className="font-semibold">{project.client}</span>
          </div>
          <div className="flex justify-between text-xs border-b border-subtle pb-2">
            <span className="text-tertiary">Budget:</span>
            <span className="font-bold text-success">{project.budget}</span>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Overall Completion</span>
              <span>{project.progress}%</span>
            </div>
            <ProgressBar value={project.progress} variant="success" />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-semibold mb-4">Milestone Timeline</h3>
          <Timeline
            items={[
              { title: 'Project Kickoff & Requirements', description: 'SLA parameters baseline approved.', time: 'Milestone 1 - Complete', color: 'var(--success)' },
              { title: 'Infrastructure Deployment', description: 'Server hardware delivered & installed.', time: 'Milestone 2 - Complete', color: 'var(--success)' },
              { title: 'User Acceptance Testing (UAT)', description: 'Final staging regression testing.', time: 'Milestone 3 - In Progress', color: 'var(--primary)' },
            ]}
          />
        </Card>
      </div>
    </div>
  );
};
