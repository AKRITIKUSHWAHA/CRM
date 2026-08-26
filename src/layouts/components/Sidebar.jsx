import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Shield, User } from 'lucide-react';
import { crmNavigation, oalNavigation } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getFilteredNavigation, getRoleConfig } from '../../utils/rbac';

export const Sidebar = ({
  isCollapsed = false,
  product = 'crm',
  onCloseMobile,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, crmUser, oalUser } = useAuth();
  const { addToast } = useToast();

  const currentUser = product === 'crm' ? crmUser : oalUser;
  const roleConfig = getRoleConfig(currentUser, product);
  const rawNavItems = product === 'crm' ? crmNavigation : oalNavigation;

  const getProfilePath = () => {
    if (product === 'crm') return '/crm/settings';
    return '/oal/borrower/profile';
  };

  // Filter items permitted for the active role
  const permittedNavItems = getFilteredNavigation(rawNavItems, product, currentUser);

  // Group filtered items by section
  const groupedSections = permittedNavItems.reduce((acc, item) => {
    const sec = item.section || 'General';
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(item);
    return acc;
  }, {});

  const handleLogout = () => {
    logout(product);
    addToast({
      title: 'Logged Out',
      message: `Signed out of ${product === 'crm' ? 'CRM nErgy' : 'OAL Network'}.`,
      type: 'info',
    });
    if (onCloseMobile) onCloseMobile();
    navigate(product === 'crm' ? '/crm/login' : '/oal/login');
  };

  return (
    <aside
      style={{
        width: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        height: '100%',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        transition: 'width var(--transition-normal)',
        overflow: 'hidden',
        zIndex: 10,
        boxSizing: 'border-box',
      }}
    >
      {/* Navigation Scrollable Body */}
      <div className="flex flex-col gap-4 p-3" style={{ overflowY: 'auto', flex: 1 }}>
        {!isCollapsed && (
          <div
            className="p-2.5 surface-secondary rounded-sm border-subtle flex items-center justify-between gap-2"
            style={{ marginBottom: '0.125rem' }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Shield size={14} className="text-primary flex-shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-primary truncate leading-tight">
                  {roleConfig.title}
                </span>
                <span className="text-tertiary truncate" style={{ fontSize: '10px' }}>
                  {roleConfig.badge}
                </span>
              </div>
            </div>
          </div>
        )}

        {Object.entries(groupedSections).map(([sectionTitle, items]) => (
          <div key={sectionTitle} className="flex flex-col gap-1">
            {!isCollapsed && (
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--text-tertiary)',
                  padding: '0.5rem 0.5rem 0.25rem 0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {sectionTitle}
              </div>
            )}

            {items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/crm/dashboard' && item.path !== '/oal/borrower/dashboard' && location.pathname.startsWith(item.path));

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={onCloseMobile}
                  title={isCollapsed ? item.label : undefined}
                  style={({ isActive: isLinkActive }) => {
                    const currentActive = isLinkActive || isActive;
                    return {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: currentActive ? 600 : 500,
                      color: currentActive ? '#1d4ed8' : 'var(--text-secondary)',
                      backgroundColor: currentActive ? '#eff6ff' : 'transparent',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'all var(--transition-fast)',
                    };
                  }}
                >
                  <Icon size={18} className="flex-shrink-0" style={{ color: (location.pathname === item.path) ? '#1d4ed8' : undefined }} />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Sidebar Footer — PROFILE & SIGN OUT */}
      <div
        className="p-3 flex flex-col gap-1 flex-shrink-0"
        style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}
      >
        <button
          type="button"
          onClick={() => {
            if (onCloseMobile) onCloseMobile();
            navigate(getProfilePath());
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold cursor-pointer transition-colors"
          style={{
            backgroundColor: (location.pathname.includes('/profile') || location.pathname.includes('/settings')) ? 'rgba(29, 78, 216, 0.1)' : 'transparent',
            color: (location.pathname.includes('/profile') || location.pathname.includes('/settings')) ? '#1d4ed8' : 'var(--text-secondary)',
            border: 'none',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            if (!location.pathname.includes('/profile') && !location.pathname.includes('/settings')) e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
          }}
          onMouseLeave={(e) => {
            if (!location.pathname.includes('/profile') && !location.pathname.includes('/settings')) e.currentTarget.style.backgroundColor = 'transparent';
          }}
          title={isCollapsed ? 'My Profile' : undefined}
        >
          <User size={16} className="flex-shrink-0" />
          {!isCollapsed && <span>My Profile</span>}
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold cursor-pointer transition-colors"
          style={{
            backgroundColor: 'transparent',
            color: 'var(--error)',
            border: 'none',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--error-light)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          title={isCollapsed ? `Sign Out (${product.toUpperCase()})` : undefined}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!isCollapsed && <span>Sign Out ({product.toUpperCase()})</span>}
        </button>
      </div>
    </aside>
  );
};
