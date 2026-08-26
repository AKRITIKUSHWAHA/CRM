import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Shield,
  Building2,
  Plug,
  Bell,
  History,
  Lock,
  CreditCard,
  CheckCircle2,
  ToggleRight,
  Sparkles
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  Input
} from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CrmAdmin = () => {
  const { user, companyData } = useAuth();
  const { addToast } = useToast();

  const [activeAdminTab, setActiveAdminTab] = useState('integrations');

  // Integrations state
  const [integrations, setIntegrations] = useState([
    { id: 'oal', name: 'OAL Network Lending Gateway', desc: 'Secure OAuth2 bridge for borrower credit scoring', connected: true },
    { id: 'stripe', name: 'Stripe Merchant Payments', desc: 'Credit card invoice billing & subscriptions', connected: true },
    { id: 'slack', name: 'Slack Enterprise Notifications', desc: 'Real-time sales alerts in team channels', connected: false },
    { id: 'sendgrid', name: 'SendGrid Email Relay', desc: 'High deliverability transactional email server', connected: true },
  ]);

  const toggleIntegration = (id) => {
    setIntegrations(
      integrations.map((i) =>
        i.id === id ? { ...i, connected: !i.connected } : i
      )
    );
    addToast({ title: 'Integration Status Changed', message: 'Updated gateway connections.', type: 'info' });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Administration' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>System Administration & Governance</h1>
          <p className="text-xs text-secondary margin-0">
            Tenant security policies, branding, API integrations, subscription tier, and audit logs
          </p>
        </div>

        <Badge variant="success" icon={ShieldCheck}>
          Tenant Vault Encrypted ({user.tenantId || 'TNT-99201'})
        </Badge>
      </div>

      {/* Admin Sub-Tabs */}
      <Card>
        <CardBody className="p-2 overflow-x-auto">
          <Tabs
            tabs={[
              { id: 'integrations', label: 'Integrations', icon: Plug },
              { id: 'branding', label: 'Company & Branding', icon: Building2 },
              { id: 'security', label: 'Security & Audit Logs', icon: History },
              { id: 'subscription', label: 'Subscription & Billing', icon: CreditCard },
            ]}
            activeTab={activeAdminTab}
            onChange={setActiveAdminTab}
          />
        </CardBody>
      </Card>

      {/* TAB 1: INTEGRATIONS */}
      {activeAdminTab === 'integrations' && (
        <Card className="p-6 flex flex-col gap-4">
          <CardHeader title="API Gateway & Software Integrations" subtitle="Connect external services to CRM nErgy tenant vault" />
          <div className="flex flex-col gap-3">
            {integrations.map((item) => (
              <div key={item.id} className="p-4 surface-secondary rounded-md border-subtle flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-primary">{item.name}</span>
                    <Badge variant={item.connected ? 'success' : 'default'}>
                      {item.connected ? 'Connected' : 'Disconnected'}
                    </Badge>
                  </div>
                  <span className="text-xs text-secondary">{item.desc}</span>
                </div>
                <Switch
                  checked={item.connected}
                  onChange={() => toggleIntegration(item.id)}
                  label={item.connected ? 'Enabled' : 'Disabled'}
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 2: BRANDING */}
      {activeAdminTab === 'branding' && (
        <Card className="p-6 flex flex-col gap-4">
          <CardHeader title="Workspace Custom Branding & Domain" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Workspace Title" value={companyData.companyName || 'nErgy Enterprise Logistics'} readOnly />
            <Input label="Custom Domain Alias" value="crm.nergy-logistics.io" readOnly />
            <Input label="Primary Accent Color" value="#1d4ed8" readOnly />
            <Input label="Security Policy Level" value="Enterprise AES-256 Strict" readOnly />
          </div>
        </Card>
      )}

      {/* TAB 3: SECURITY & AUDIT LOGS */}
      {activeAdminTab === 'security' && (
        <Card>
          <CardHeader title="Immutable Security Audit Log Feed" subtitle="Tracking administrative & system access events" />
          <CardBody className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Timestamp</TableCell>
                  <TableCell isHeader>Event Action</TableCell>
                  <TableCell isHeader>User</TableCell>
                  <TableCell isHeader>IP Address</TableCell>
                  <TableCell isHeader>Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell><span className="font-mono text-xs">Today at 10:55 AM</span></TableCell>
                  <TableCell><span className="font-semibold">MFA Policy Enforced</span></TableCell>
                  <TableCell>Alexander Wright</TableCell>
                  <TableCell><span className="font-mono text-xs">192.168.1.104</span></TableCell>
                  <TableCell><Badge variant="success">Success</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><span className="font-mono text-xs">Today at 09:30 AM</span></TableCell>
                  <TableCell><span className="font-semibold">Company Profile Updated</span></TableCell>
                  <TableCell>Alexander Wright</TableCell>
                  <TableCell><span className="font-mono text-xs">192.168.1.104</span></TableCell>
                  <TableCell><Badge variant="success">Success</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {/* TAB 4: SUBSCRIPTION & BILLING */}
      {activeAdminTab === 'subscription' && (
        <div className="grid-responsive-2col">
          <Card className="p-6 flex flex-col gap-4">
            <h3 className="text-base font-semibold">Active Plan: Enterprise v2.6 SaaS</h3>
            <div className="flex items-center justify-between text-xs">
              <span>Billing Cycle:</span>
              <span className="font-bold text-primary">Annual ($499/mo billed annually)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Seat Allocation:</span>
              <span className="font-bold text-success">Unlimited Seats Active</span>
            </div>
            <Button variant="primary" size="sm" onClick={() => addToast({ title: 'Plan Management', message: 'Current plan is fully active with high-tier quota.', type: 'info' })}>
              Manage Subscription Plan
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};
