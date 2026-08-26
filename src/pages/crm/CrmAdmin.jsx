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

  // Branding state
  const [branding, setBranding] = useState({
    workspaceTitle: companyData?.companyName || 'nErgy Enterprise Logistics',
    customDomain: 'crm.nergy-logistics.io',
    accentColor: '#1d4ed8',
    securityPolicy: 'Enterprise AES-256 Strict',
  });

  const handleSaveBranding = (e) => {
    e?.preventDefault();
    addToast({ title: 'Branding Saved', message: 'Workspace identity and custom domain updated.', type: 'success' });
  };

  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Administration' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>
            System Administration & Governance
          </h1>
        </div>

        <div className="header-actions-right">
          <Badge variant="success" icon={ShieldCheck}>
            Tenant Vault Encrypted ({user?.tenantId || 'TNT-99201'})
          </Badge>
        </div>
      </div>

      {/* Admin Sub-Tabs (Horizontally Scrollable Container) */}
      <div className="flex items-center gap-2 overflow-x-auto w-full" style={{ width: '100%', minWidth: 0 }}>
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
      </div>

      {/* TAB 1: INTEGRATIONS */}
      {activeAdminTab === 'integrations' && (
        <div className="flex flex-col gap-4" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
          <div className="flex flex-col gap-0.5">
            <h2 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              API Gateway & Software Integrations
            </h2>
            <span className="text-xs text-tertiary font-medium">
              Connect external services to CRM nErgy tenant vault
            </span>
          </div>

          <div className="flex flex-col gap-3 mt-1" style={{ width: '100%', boxSizing: 'border-box' }}>
            {integrations.map((item) => (
              <div
                key={item.id}
                className="p-4 surface-secondary rounded-xl border-subtle flex items-center justify-between gap-3"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  width: '100%',
                  minWidth: 0,
                  boxSizing: 'border-box',
                }}
              >
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-primary">{item.name}</span>
                    <Badge variant={item.connected ? 'success' : 'default'} style={{ fontSize: '11px', padding: '1px 7px' }}>
                      {item.connected ? 'Connected' : 'Disconnected'}
                    </Badge>
                  </div>
                  <span className="text-xs text-secondary">{item.desc}</span>
                </div>
                <div className="flex-shrink-0">
                  <Switch
                    checked={item.connected}
                    onChange={() => toggleIntegration(item.id)}
                    label={item.connected ? 'Enabled' : 'Disabled'}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BRANDING */}
      {activeAdminTab === 'branding' && (
        <div className="flex flex-col gap-4" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
          <div className="flex flex-col gap-0.5">
            <h2 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Workspace Custom Branding & Domain
            </h2>
            <span className="text-xs text-tertiary font-medium">
              Enterprise workspace identity and custom domain configuration
            </span>
          </div>

          <form onSubmit={handleSaveBranding} className="flex flex-col gap-4 mt-1" style={{ maxWidth: '720px', width: '100%' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Workspace Title"
                value={branding.workspaceTitle}
                onChange={(e) => setBranding({ ...branding, workspaceTitle: e.target.value })}
              />
              <Input
                label="Custom Domain Alias"
                value={branding.customDomain}
                onChange={(e) => setBranding({ ...branding, customDomain: e.target.value })}
              />
              <Input
                label="Primary Accent Color"
                value={branding.accentColor}
                onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
              />
              <Input
                label="Security Policy Level"
                value={branding.securityPolicy}
                onChange={(e) => setBranding({ ...branding, securityPolicy: e.target.value })}
              />
            </div>
            <div className="flex justify-start pt-2">
              <Button variant="primary" size="sm" type="submit" style={{ borderRadius: '8px' }}>
                Save Branding Settings
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: SECURITY & AUDIT LOGS */}
      {activeAdminTab === 'security' && (
        <div className="flex flex-col gap-4" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
          <div className="flex flex-col gap-0.5">
            <h2 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Immutable Security Audit Log Feed
            </h2>
            <span className="text-xs text-tertiary font-medium">
              Tracking administrative & system access events
            </span>
          </div>

          <div className="rounded-xl border-subtle overflow-x-auto mt-1" style={{ backgroundColor: 'var(--surface)', width: '100%' }}>
            <Table style={{ minWidth: '600px' }}>
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
                  <TableCell><span className="font-semibold text-xs text-primary">MFA Policy Enforced</span></TableCell>
                  <TableCell><span className="text-xs text-secondary">Alexander Wright</span></TableCell>
                  <TableCell><span className="font-mono text-xs text-tertiary">192.168.1.104</span></TableCell>
                  <TableCell><Badge variant="success">Success</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><span className="font-mono text-xs">Today at 09:30 AM</span></TableCell>
                  <TableCell><span className="font-semibold text-xs text-primary">Company Profile Updated</span></TableCell>
                  <TableCell><span className="text-xs text-secondary">Alexander Wright</span></TableCell>
                  <TableCell><span className="font-mono text-xs text-tertiary">192.168.1.104</span></TableCell>
                  <TableCell><Badge variant="success">Success</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* TAB 4: SUBSCRIPTION & BILLING */}
      {activeAdminTab === 'subscription' && (
        <div className="flex flex-col gap-4" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
          <div className="flex flex-col gap-0.5">
            <h2 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Active Plan & SaaS Subscription
            </h2>
            <span className="text-xs text-tertiary font-medium">
              Enterprise seat quota and recurring billing details
            </span>
          </div>

          <div className="p-5 surface-secondary rounded-xl border-subtle flex flex-col gap-4 max-w-lg mt-1" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)', borderRadius: '14px' }}>
            <h3 className="text-base font-bold text-primary margin-0">Enterprise v2.6 SaaS Plan</h3>
            <div className="flex items-center justify-between text-xs">
              <span className="text-secondary">Billing Cycle:</span>
              <span className="font-bold text-primary">Annual ($499/mo billed annually)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-secondary">Seat Allocation:</span>
              <span className="font-bold text-success">Unlimited Seats Active</span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => addToast({ title: 'Plan Management', message: 'Current plan is fully active with high-tier quota.', type: 'info' })}
              style={{ borderRadius: '8px' }}
            >
              Manage Subscription Plan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
