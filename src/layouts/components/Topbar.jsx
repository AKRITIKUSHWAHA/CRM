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
  ChevronDown,
  Settings,
  UserCheck,
  Check,
  Building2,
  Sparkles,
  ExternalLink
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
import { useNavigate, useLocation } from 'react-router-dom';
import { isRouteAllowed, getDefaultRouteForRole } from '../../utils/rbac';

export const Topbar = ({ onToggleSidebar, product = 'crm' }) => {
  const { theme, toggleTheme } = useTheme();
  const { crmUser, oalUser, switchRole, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

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

    // Check if the current page is allowed for the newly switched role
    if (!isRouteAllowed(location.pathname, product, updated)) {
      const defaultRoute = getDefaultRouteForRole(product, updated);
      navigate(defaultRoute);
    }

    addToast({
      title: 'Role Switched Successfully',
      message: `Active profile: ${updated.name} (${updated.role})`,
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
      {/* Left: Mobile Menu + Brand Logo */}
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
              borderRadius: '8px',
              backgroundColor: product === 'crm' ? '#1d4ed8' : '#0f766e',
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

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '15px',
                  lineHeight: 1.1,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {product === 'crm' ? 'CRM nErgy' : 'OAL Network'}
              </span>
              <span
                className="hidden-mobile"
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  backgroundColor: 'rgba(29, 78, 216, 0.1)',
                  color: '#1d4ed8',
                  padding: '1px 6px',
                  borderRadius: '4px',
                }}
              >
                {product === 'crm' ? 'v2.0 SaaS' : 'Marketplace'}
              </span>
            </div>
            <span className="hidden-mobile" style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, marginTop: '1px' }}>
              {product === 'crm' ? 'Executive Platform' : 'Lending Marketplace'}
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Pill Global Search Input */}
      <div className="hidden-mobile flex-1" style={{ maxWidth: '420px', margin: '0 1.5rem' }}>
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-full border-subtle surface-secondary text-xs text-tertiary"
          style={{ height: '36px', cursor: 'pointer', backgroundColor: 'var(--surface-secondary)' }}
        >
          <div className="flex items-center gap-2">
            <Search size={15} style={{ color: 'var(--text-tertiary)' }} />
            <span style={{ fontSize: '12px' }}>Search contacts, deals, tasks, apps...</span>
          </div>
          <span
            style={{
              fontSize: '10px',
              backgroundColor: 'var(--surface)',
              padding: '1px 6px',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            ⌘K
          </span>
        </button>
      </div>

      {/* Right Actions: Notifications (Badge 8), Help, Settings, User Profile */}
      <div className="flex items-center gap-1.5 ml-auto" style={{ marginLeft: 'auto' }}>
        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          icon={theme === 'light' ? Moon : Sun}
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        />

        {/* Notifications Dropdown (Badge 8) */}
        <Dropdown
          trigger={
            <Button variant="ghost" size="sm" isIconOnly style={{ position: 'relative' }}>
              <Bell size={18} />
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: 800,
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                }}
              >
                8
              </span>
            </Button>
          }
        >
          <DropdownHeader>Notifications (8 Unread)</DropdownHeader>
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

        {/* Settings Gear Button */}
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          icon={Settings}
          onClick={() => navigate(product === 'crm' ? '/crm/settings' : '/oal/borrower/settings')}
          title="Settings"
        />

        {/* User Profile Dropdown with Role Switcher */}
        <Dropdown
          trigger={
            <div
              className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-full transition-colors ml-1"
              style={{ backgroundColor: 'var(--surface-hover)', border: '1px solid var(--border)' }}
            >
              <Avatar name={currentUser?.name || 'Alexander Wright'} src={currentUser?.avatar} size="sm" status="online" />
              <div className="hidden-mobile flex flex-col text-left">
                <span className="font-bold text-xs text-primary leading-tight">{currentUser?.name || 'Alexander Wright'}</span>
                <span className="text-tertiary text-xs leading-none" style={{ fontSize: '10px', marginTop: '2px' }}>
                  {currentUser?.role || 'Company Owner'}
                </span>
              </div>
              <ChevronDown size={14} className="text-tertiary hidden-mobile ml-1" />
            </div>
          }
        >
          <DropdownHeader>
            <div className="flex flex-col gap-1 py-0.5">
              <span className="font-bold text-xs text-primary">{currentUser?.name || 'Alexander Wright'}</span>
              <span className="text-tertiary text-xs">{currentUser?.company || 'nErgy Enterprise'}</span>
            </div>
          </DropdownHeader>

          <DropdownItem icon={User} onClick={() => navigate(product === 'crm' ? '/crm/settings' : '/oal/borrower/settings')}>
            Account Profile
          </DropdownItem>
          <DropdownItem icon={Building2} onClick={() => addToast({ title: 'Tenant Vault', message: `Tenant ID: ${currentUser?.tenantId || 'TENANT-08492'}`, type: 'info' })}>
            Workspace Vault
          </DropdownItem>

          <DropdownDivider />

          {/* Role Switcher Menu */}
          <div className="px-3 py-1.5 text-xs font-bold text-tertiary uppercase tracking-wider flex items-center gap-1.5" style={{ fontSize: '10px' }}>
            <UserCheck size={12} />
            <span>Switch Role / Persona</span>
          </div>

          {availableRoles.map((r) => {
            const isSelected = currentUser?.email === r.email;
            return (
              <DropdownItem
                key={r.id}
                onClick={() => handleSwitchRole(r)}
                className={isSelected ? 'bg-primary-light font-semibold' : ''}
              >
                <div className="flex items-center justify-between w-full gap-2">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-primary">{r.name}</span>
                    <span className="text-tertiary" style={{ fontSize: '10px' }}>{r.title}</span>
                  </div>
                  {isSelected && <Check size={14} className="text-primary flex-shrink-0" />}
                </div>
              </DropdownItem>
            );
          })}

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
              placeholder="Search contacts, deals, tasks, apps..."
              className="form-control form-control-has-icon-start"
            />
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
            Welcome to the CRM nErgy Help Center. You can read documentation or submit a support ticket.
          </p>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="primary" size="sm" onClick={() => setIsHelpOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </header>
  );
};
