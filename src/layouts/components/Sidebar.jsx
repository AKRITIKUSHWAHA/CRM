import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LogOut, Sparkles } from 'lucide-react';
import { crmNavigation, oalNavigation } from '../../data/mockData';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const Sidebar = ({
  isCollapsed = false,
  onToggleCollapse,
  product = 'crm',
  onCloseMobile,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { addToast } = useToast();

  const rawNavItems = product === 'crm' ? crmNavigation : oalNavigation;

  // Group items by section
  const groupedSections = rawNavItems.reduce((acc, item) => {
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width var(--transition-normal)',
        overflowX: 'hidden',
        zIndex: 10,
      }}
    >
      {/* Navigation Scrollable Body */}
      <div className="flex flex-col gap-4 p-3" style={{ overflowY: 'auto', flex: 1 }}>
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
                      color: currentActive ? 'var(--primary)' : 'var(--text-secondary)',
                      backgroundColor: currentActive ? 'var(--primary-light)' : 'transparent',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'all var(--transition-fast)',
                    };
                  }}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Sidebar Footer — Perfectly Formatted Action Buttons */}
      <div
        className="p-3 flex flex-col gap-1.5"
        style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}
      >
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-xs font-semibold cursor-pointer transition-colors"
          style={{
            backgroundColor: 'transparent',
            color: 'var(--error)',
            border: 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--error-light)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          title={`Log out of ${product === 'crm' ? 'CRM nErgy' : 'OAL Network'}`}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!isCollapsed && <span>Sign Out ({product.toUpperCase()})</span>}
        </button>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-sm text-xs text-secondary cursor-pointer hidden-mobile transition-colors"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <div className="flex items-center gap-2">
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            {!isCollapsed && <span>Collapse Menu</span>}
          </div>
          {!isCollapsed && (
            <span
              style={{
                fontSize: '10px',
                backgroundColor: 'var(--surface)',
                padding: '1px 5px',
                borderRadius: '3px',
                border: '1px solid var(--border)',
                color: 'var(--text-tertiary)',
              }}
            >
              [
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
