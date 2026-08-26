import React, { useState } from 'react';
import {
  Sparkles,
  Search as SearchIcon,
  Plus,
  Mail,
  Shield,
  Layers,
  CheckCircle2,
  AlertTriangle,
  FileText,
  User,
  Bell,
  Trash2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  Button,
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
  Dropdown,
  DropdownItem,
  DropdownDivider,
  Modal,
  Drawer,
  Tabs,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  KPICard,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Search,
  Filter,
  Breadcrumb,
  Avatar,
  Tooltip,
  LoadingSpinner,
  Skeleton,
  EmptyState,
  ErrorState,
  ConfirmationDialog,
  FileUpload,
  ProgressBar,
  Stepper,
  Timeline
} from '../components/ui';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

export const Showcase = () => {
  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();

  // State for interactive components
  const [activeTab, setActiveTab] = useState('buttons');
  const [inputValue, setInputValue] = useState('Enterprise Search Query');
  const [selectValue, setSelectValue] = useState('crm');
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('monthly');
  const [switchChecked, setSwitchChecked] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [activeFilterCount, setActiveFilterCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [progressVal, setProgressVal] = useState(65);

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Top Banner */}
      <Card className="p-6" style={{ background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-secondary) 100%)' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="primary" icon={Sparkles}>
                Phase 1 Foundation Complete
              </Badge>
              <Badge variant="success">2026 SaaS Theme</Badge>
            </div>
            <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: '0.25rem' }}>
              Design System & Component Showcase
            </h1>
            <p className="text-sm text-secondary margin-0">
              Interactive test gallery for all 30 reusable UI components, light/dark themes, responsive rules, and tokens.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={toggleTheme}>
              Current Theme: <strong className="ml-1 uppercase">{theme}</strong>
            </Button>

            <Button
              variant="primary"
              onClick={() =>
                addToast({
                  title: 'Toast System Active',
                  message: 'Global toast notification fired successfully!',
                  type: 'success',
                })
              }
            >
              Test Global Toast
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabs Navigation */}
      <Tabs
        tabs={[
          { id: 'buttons', label: '1-6. Buttons & Inputs' },
          { id: 'overlays', label: '7-10. Dropdown, Modal, Drawer & Toast' },
          { id: 'cards', label: '11-15. Tabs, Badges, Cards & Table' },
          { id: 'nav', label: '16-20. Pagination, Search, Filter & Avatar' },
          { id: 'feedback', label: '21-25. Tooltip, Spinner, Skeleton & States' },
          { id: 'workflow', label: '26-30. Confirm, File, Progress, Stepper & Timeline' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* SECTION 1: BUTTONS & INPUTS */}
      {activeTab === 'buttons' && (
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader title="1. Button System" subtitle="6 Variants x 3 Sizes x Loading & Disabled States" />
            <CardBody className="flex flex-col gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Button</Button>
                <Button variant="success">Success Button</Button>
              </div>

              <div className="flex items-center gap-3 flex-wrap border-t border-subtle pt-4">
                <Button variant="primary" size="sm" icon={Plus}>Small Icon</Button>
                <Button variant="primary" size="md" icon={Plus}>Medium Icon</Button>
                <Button variant="primary" size="lg" icon={Plus}>Large Icon</Button>
                <Button variant="primary" isLoading>Loading State</Button>
                <Button variant="primary" isDisabled>Disabled State</Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="2 - 6. Input, Select, Checkbox, Radio & Switch Controls" />
            <CardBody className="grid-responsive-2col">
              <div className="flex flex-col gap-4">
                <Input
                  label="Standard Text Input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  startIcon={Mail}
                  isClearable
                  onClear={() => setInputValue('')}
                  helperText="Supports start/end icons and clear button."
                />

                <Input
                  label="Input with Error State"
                  value="invalid-email-address"
                  errorMessage="Please provide a valid corporate email domain."
                  required
                />

                <Select
                  label="Select Component"
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  options={[
                    { label: 'CRM nErgy Enterprise', value: 'crm' },
                    { label: 'OAL Network Marketplace', value: 'oal' },
                  ]}
                  helperText="Custom styled enterprise dropdown select."
                />
              </div>

              <div className="flex flex-col gap-4 p-4 surface-secondary rounded-md">
                <h4 className="text-sm">Checkbox, Radio & Switch Toggles</h4>

                <Checkbox
                  label="Enable Two-Factor Multi-Tenant Security"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                />

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold">Billing Frequency:</span>
                  <div className="flex items-center gap-4">
                    <Radio
                      name="billing"
                      value="monthly"
                      label="Monthly Plan"
                      checked={radioValue === 'monthly'}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                    <Radio
                      name="billing"
                      value="annual"
                      label="Annual (Save 20%)"
                      checked={radioValue === 'annual'}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                  </div>
                </div>

                <Switch
                  label="Live System Event Stream"
                  checked={switchChecked}
                  onChange={(e) => setSwitchChecked(e.target.checked)}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* SECTION 2: OVERLAYS */}
      {activeTab === 'overlays' && (
        <Card>
          <CardHeader title="7 - 10. Dropdown Menu, Modal, Drawer & Toast Notifications" />
          <CardBody className="flex items-center gap-4 flex-wrap">
            <Dropdown trigger={<Button variant="outline">Open Dropdown Menu</Button>}>
              <DropdownHeader>Action Menu</DropdownHeader>
              <DropdownItem icon={User} onClick={() => addToast({ title: 'Profile Clicked', type: 'info' })}>
                View Profile
              </DropdownItem>
              <DropdownItem icon={Bell} onClick={() => addToast({ title: 'Settings Clicked', type: 'info' })}>
                Notification Rules
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem icon={Trash2} danger onClick={() => addToast({ title: 'Deleted', type: 'error' })}>
                Delete Record
              </DropdownItem>
            </Dropdown>

            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Animated Modal
            </Button>

            <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>
              Open Sliding Drawer
            </Button>

            <Button
              variant="success"
              onClick={() =>
                addToast({
                  title: 'Success Notification',
                  message: 'Operation completed cleanly with 0 console warnings.',
                  type: 'success',
                })
              }
            >
              Fire Success Toast
            </Button>

            <Button
              variant="danger"
              onClick={() =>
                addToast({
                  title: 'Error Alert',
                  message: 'Failed to communicate with legacy API server.',
                  type: 'error',
                })
              }
            >
              Fire Error Toast
            </Button>
          </CardBody>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Interactive Demo Modal"
            footer={
              <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
                Got It
              </Button>
            }
          >
            <p className="text-sm text-secondary">
              This modal dialog locks body scroll, handles ESC key closing, backdrop clicking, and renders smoothly with CSS scale animation.
            </p>
          </Modal>

          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            title="Sliding Drawer Panel"
            position="right"
          >
            <p className="text-sm text-secondary">
              Drawers can be positioned left or right, and support any content or navigation lists inside.
            </p>
          </Drawer>
        </Card>
      )}

      {/* SECTION 3: CARDS & TABLES */}
      {activeTab === 'cards' && (
        <div className="flex flex-col gap-6">
          <div className="grid-responsive-kpi">
            <KPICard title="Total Revenue" value="$1.28M" change="+18.4%" changeType="positive" icon={Sparkles} />
            <KPICard title="Active Loans" value="142" change="+4" changeType="positive" icon={FileText} />
            <KPICard title="Default Rate" value="0.42%" change="-0.1%" changeType="positive" icon={Shield} />
            <KPICard title="Pending Audit" value="12 Items" change="Action Needed" changeType="warning" icon={AlertTriangle} />
          </div>

          <Card>
            <CardHeader title="12. Badges System" />
            <CardBody className="flex items-center gap-2 flex-wrap">
              <Badge variant="default">Default Badge</Badge>
              <Badge variant="primary">Primary Tag</Badge>
              <Badge variant="success" icon={CheckCircle2}>Success Pill</Badge>
              <Badge variant="warning" icon={AlertTriangle}>Warning Status</Badge>
              <Badge variant="error">Error Alert</Badge>
              <Badge variant="info">Info Notice</Badge>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="15. Data Table Component" />
            <CardBody className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell isHeader>ID</TableCell>
                    <TableCell isHeader>Tenant Module</TableCell>
                    <TableCell isHeader>Security Status</TableCell>
                    <TableCell isHeader align="right">Latency</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell><span className="font-mono text-xs">MOD-01</span></TableCell>
                    <TableCell><span className="font-semibold">CRM Contacts Database</span></TableCell>
                    <TableCell><Badge variant="success">Encrypted</Badge></TableCell>
                    <TableCell align="right"><span className="text-xs text-secondary">14 ms</span></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><span className="font-mono text-xs">MOD-02</span></TableCell>
                    <TableCell><span className="font-semibold">OAL Lending Engine</span></TableCell>
                    <TableCell><Badge variant="primary">Connected</Badge></TableCell>
                    <TableCell align="right"><span className="text-xs text-secondary">22 ms</span></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </div>
      )}

      {/* SECTION 4: NAV & SEARCH */}
      {activeTab === 'nav' && (
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h4 className="mb-2">19. Breadcrumb Bar</h4>
            <Breadcrumb items={[{ label: 'System Showcase' }, { label: 'Navigation Tools' }]} />
          </Card>

          <Card className="p-6">
            <h4 className="mb-4">17 - 18. Search Input & Filter Bar</h4>
            <div className="flex flex-col gap-4">
              <Search
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClear={() => setSearchValue('')}
                showShortcut
              />

              <Filter
                activeCount={activeFilterCount}
                onReset={() => {
                  setActiveFilterCount(0);
                  addToast({ title: 'Filters Reset', type: 'info' });
                }}
              >
                <Select
                  value="all"
                  onChange={() => {}}
                  options={['All Departments', 'Sales', 'Finance', 'Engineering']}
                  style={{ height: '32px', fontSize: '12px' }}
                />
              </Filter>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="mb-4">20. Avatars</h4>
            <div className="flex items-center gap-4">
              <Avatar name="Alexander Wright" size="sm" status="online" />
              <Avatar name="Sarah Jenkins" size="md" status="busy" />
              <Avatar name="Dr. Aris Thorne" size="lg" status="online" />
              <Avatar name="Enterprise Owner" size="xl" status="away" />
            </div>
          </Card>

          <Pagination
            currentPage={currentPage}
            totalPages={10}
            totalItems={100}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* SECTION 5: FEEDBACK & STATES */}
      {activeTab === 'feedback' && (
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h4 className="mb-4">21. Tooltip Hover Overlay</h4>
            <div className="flex items-center gap-6">
              <Tooltip content="Tooltip Placement Top" position="top">
                <Button variant="outline">Hover Top</Button>
              </Tooltip>
              <Tooltip content="Tooltip Placement Bottom" position="bottom">
                <Button variant="outline">Hover Bottom</Button>
              </Tooltip>
              <Tooltip content="Tooltip Placement Right" position="right">
                <Button variant="outline">Hover Right</Button>
              </Tooltip>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="mb-4">22 - 23. Loading Spinner & Skeleton Shimmers</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <LoadingSpinner size="sm" label="Small spinner" />
                <LoadingSpinner size="md" label="Medium spinner" />
                <LoadingSpinner size="lg" label="Large spinner" />
              </div>

              <div className="flex flex-col gap-2 border-t border-subtle pt-4">
                <Skeleton width="40%" height="20px" />
                <Skeleton width="80%" height="14px" />
                <Skeleton width="60%" height="14px" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="mb-4">24 - 25. Empty State & Error Banners</h4>
            <div className="grid-responsive-2col">
              <EmptyState
                title="Zero Deals Found"
                description="No matching sales pipeline opportunities available."
                actionLabel="Create Opportunity"
                onAction={() => addToast({ title: 'Action Clicked', type: 'info' })}
              />

              <ErrorState
                title="API Gateway Disconnected"
                description="Failed to retrieve live market interest rates."
                onRetry={() => addToast({ title: 'Retrying Connection', type: 'warning' })}
              />
            </div>
          </Card>
        </div>
      )}

      {/* SECTION 6: WORKFLOW */}
      {activeTab === 'workflow' && (
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h4 className="mb-4">26 - 27. Confirmation Dialog & File Upload</h4>
            <div className="flex items-center gap-4 mb-6">
              <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
                Test Confirmation Dialog
              </Button>
            </div>

            <FileUpload
              label="Interactive Drag and Drop Uploader"
              onFilesSelected={(files) => addToast({ title: 'Files Attached', message: `${files.length} file(s) uploaded.`, type: 'success' })}
            />

            <ConfirmationDialog
              isOpen={isConfirmOpen}
              onClose={() => setIsConfirmOpen(false)}
              onConfirm={() => {
                setIsConfirmOpen(false);
                addToast({ title: 'Action Confirmed', message: 'Destructive operation executed cleanly.', type: 'error' });
              }}
              isDanger
              title="Delete Tenant Database?"
              description="Are you sure you want to permanently erase all records for this test company?"
              confirmLabel="Delete Permanently"
            />
          </Card>

          <Card className="p-6 flex flex-col gap-6">
            <div>
              <h4 className="mb-2">28. Progress Bar Component</h4>
              <ProgressBar value={progressVal} variant="primary" showLabel />
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => setProgressVal((p) => Math.max(0, p - 15))}>
                  - 15%
                </Button>
                <Button variant="outline" size="sm" onClick={() => setProgressVal((p) => Math.min(100, p + 15))}>
                  + 15%
                </Button>
              </div>
            </div>

            <div>
              <h4 className="mb-4">29. Stepper Bar</h4>
              <Stepper
                currentStep={1}
                steps={[
                  { label: 'Project Setup', description: 'React + Vite' },
                  { label: 'Design System', description: 'Tokens & Themes' },
                  { label: 'Reusable Components', description: '30 Components' },
                  { label: 'Routing & QA', description: 'Verified Clean' },
                ]}
              />
            </div>

            <div>
              <h4 className="mb-4">30. Vertical Timeline Feed</h4>
              <Timeline
                items={[
                  { title: 'Design System Tokens Loaded', description: 'Defined primary, surface, and dark variables.', time: 'Step 1' },
                  { title: 'Built 30 Reusable Components', description: 'Buttons, Inputs, Table, Modal, Drawer, Toast, Stepper.', time: 'Step 2' },
                  { title: 'Verified Responsive & Theme Rules', description: 'Checked zero overflow across 320px to 1440px+ screens.', time: 'Step 3' },
                ]}
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
