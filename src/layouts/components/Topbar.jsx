import React, { useState } from 'react';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  HelpCircle,
  Search,
  User,
  LogOut,
  Sparkles,
  ChevronDown,
  Building2,
  ExternalLink,
  Check,
  UserCheck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth, crmRoles, oalRoles } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from '../../components/ui/Dropdown';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { mockNotifications } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

export const Topbar = ({ onToggleSidebar, product = 'crm' }) => {
  const { theme, toggleTheme } = useTheme();
  const { crmUser, oalUser, switchRole, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const currentUser = product === 'crm' ? crmUser : oalUser;
  const availableRoles = product === 'crm' ? crmRoles : oalRoles;

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout(product);
    addToast({
      title: 'Logged Out',
      message: `Signed out of ${product === 'crm' ? 'CRM nErgy' : 'OAL Network'}.`,
      type: 'info',
    });
    navigate(product === 'crm' ? '/crm/login' : '/oal/login');
  };

  const handleSwitchRole = (roleObj) => {
    const updated = switchRole(roleObj, product);
    addToast({
      title: 'Role Switched Successfully',
      message: `Switched active profile to ${updated.name} (${updated.role})`,
      type: 'success',
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    addToast({ title: 'Global Search', message: `Searching system records for "${searchQuery}"...`, type: 'info' });
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header
      style={{
        height: 'var(--topbar-height)',
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Left: Mobile/Tablet Menu Button + Logo */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          icon={Menu}
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
        />

        <div
          onClick={() => navigate(product === 'crm' ? '/crm/dashboard' : '/oal/dashboard')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: product === 'crm' ? 'var(--primary)' : 'var(--accent)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '14px',
              fontFamily: 'var(--font-display)',
            }}
          >
            {product === 'crm' ? 'nE' : 'OA'}
          </div>

          <div className="flex flex-col">
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '16px',
                lineHeight: 1.1,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              {product === 'crm' ? 'CRM nErgy' : 'OAL Network'}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              {product === 'crm' ? 'Enterprise SaaS Platform' : 'Lending Marketplace'}
            </span>
          </div>

          <Badge variant={product === 'crm' ? 'primary' : 'success'} className="ml-2 hidden-mobile">
            {product === 'crm' ? 'v2.6 SaaS' : 'Marketplace'}
          </Badge>
        </div>
      </div>

      {/* Middle: Global Search Input */}
      <div className="hidden-mobile flex-1" style={{ maxWidth: '400px', margin: '0 1.5rem' }}>
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-sm border-subtle surface-secondary text-xs text-tertiary"
          style={{ height: '36px', cursor: 'pointer' }}
        >
          <div className="flex items-center gap-2">
            <Search size={16} />
            <span>Search contacts, deals, loan apps, AI templates...</span>
          </div>
          <span
            style={{
              fontSize: '10px',
              backgroundColor: 'var(--surface)',
              padding: '2px 6px',
              borderRadius: '4px',
              border: '1px solid var(--border)',
            }}
          >
            Ctrl + K
          </span>
        </button>
      </div>

      {/* Right Actions: Theme Toggle, Notifications, Help, Profile */}
      <div className="flex items-center gap-2 ml-auto" style={{ marginLeft: 'auto' }}>
        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          icon={Search}
          className="visible-mobile"
          onClick={() => setIsSearchOpen(true)}
        />

        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          icon={theme === 'light' ? Moon : Sun}
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        />

        {/* Notifications Dropdown */}
        <Dropdown
          trigger={
            <Button variant="ghost" size="sm" isIconOnly style={{ position: 'relative' }}>
              <Bell size={18} />
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--error)',
                }}
              />
            </Button>
          }
        >
          <DropdownHeader>Notifications (3 Unread)</DropdownHeader>
          {mockNotifications.map((n) => (
            <DropdownItem
              key={n.id}
              onClick={() => addToast({ title: 'Notification Opened', message: n.title, type: 'info' })}
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-xs text-primary">{n.title}</span>
                <span className="text-tertiary text-xs">{n.time}</span>
              </div>
            </DropdownItem>
          ))}
          <DropdownDivider />
          <DropdownItem onClick={() => addToast({ title: 'Notifications', message: 'All notifications marked as read.', type: 'success' })}>
            Mark all as read
          </DropdownItem>
        </Dropdown>

        {/* Help Button */}
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          icon={HelpCircle}
          onClick={() => setIsHelpOpen(true)}
          title="Help & Documentation"
        />

        {/* Profile Menu */}
        <Dropdown
          trigger={
            <div
              className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md transition-colors"
              style={{ backgroundColor: 'var(--surface-hover)', border: '1px solid var(--border)' }}
            >
              <Avatar name={currentUser?.name || 'User'} src={currentUser?.avatar} size="sm" status="online" />
              <div className="hidden-mobile flex flex-col text-left">
                <span className="font-semibold text-xs text-primary leading-tight">{currentUser?.name}</span>
                <span className="text-tertiary text-xs leading-none" style={{ fontSize: '10px', marginTop: '2px' }}>
                  {currentUser?.role}
                </span>
              </div>
              <ChevronDown size={14} className="text-tertiary hidden-mobile ml-1" />
            </div>
          }
        >
          <DropdownHeader>
            <div className="flex flex-col gap-1 py-0.5">
              <span className="font-bold text-xs text-primary">{currentUser?.name}</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                  }}
                >
                  {currentUser?.role || 'Logged In Role'}
                </span>
              </div>
              <span className="text-tertiary text-xs" style={{ fontSize: '11px', marginTop: '2px' }}>
                {currentUser?.company}
              </span>
            </div>
          </DropdownHeader>

          <DropdownItem icon={User} onClick={() => navigate(product === 'crm' ? '/crm/settings' : '/oal/borrower/settings')}>
            Account Profile
          </DropdownItem>
          <DropdownItem icon={Building2} onClick={() => addToast({ title: 'Tenant Vault', message: `Tenant ID: ${currentUser?.tenantId}`, type: 'info' })}>
            Workspace Settings
          </DropdownItem>

          <DropdownDivider />

          {product === 'crm' ? (
            <DropdownItem icon={Sparkles} onClick={() => navigate('/oal/dashboard')}>
              Switch to OAL Network Marketplace
            </DropdownItem>
          ) : (
            <DropdownItem icon={Building2} onClick={() => navigate('/crm/dashboard')}>
              Switch to CRM nErgy Enterprise
            </DropdownItem>
          )}

          <DropdownItem icon={ExternalLink} onClick={() => navigate('/showcase')}>
            Component Gallery Showcase
          </DropdownItem>

          <DropdownDivider />

          <DropdownItem icon={LogOut} danger onClick={handleLogout}>
            Log Out ({product.toUpperCase()})
          </DropdownItem>
        </Dropdown>
      </div>

      {/* Global Search Modal */}
      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Global Search">
        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4">
          <div className="form-control-wrapper">
            <span className="input-icon-start">
              <Search size={18} />
            </span>
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts, leads, loan applications, invoices..."
              className="form-control form-control-has-icon-start"
            />
          </div>

          <div className="text-xs text-tertiary flex items-center justify-between">
            <span>Press Enter to search</span>
            <span className="badge badge-default">CRM + OAL Unified Index</span>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={() => setIsSearchOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Search System
            </Button>
          </div>
        </form>
      </Modal>

      {/* Help Modal */}
      <Modal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} title="Help & Support Desk">
        <div className="flex flex-col gap-3 text-xs">
          <p className="text-secondary">
            Welcome to the CRM nErgy + OAL Network Help Center. You can read documentation, trigger AI diagnostic tools, or submit a support ticket.
          </p>
          <div className="surface-card p-3 rounded-md border-subtle flex flex-col gap-1">
            <span className="font-semibold text-primary">System Version</span>
            <span className="text-tertiary">CRM nErgy Build v2.6.0-enterprise | API Gateway connected</span>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="primary" size="sm" onClick={() => { setIsHelpOpen(false); addToast({ title: 'Support Ticket', message: 'Support ticket dialog initialized.', type: 'info' }); }}>
              Contact Support Desk
            </Button>
          </div>
        </div>
      </Modal>
    </header>
  );
};
