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

  const navItems = product === 'crm' ? crmNavigation : oalNavigation;

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
      {/* Navigation List */}
      <div className="flex flex-col gap-1 p-3" style={{ overflowY: 'auto' }}>
        <div className="text-xs font-semibold text-tertiary px-2 py-1 uppercase tracking-wider">
          {!isCollapsed && (product === 'crm' ? 'CRM nErgy Modules' : 'OAL Network Hub')}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={onCloseMobile}
              title={isCollapsed ? item.label : undefined}
              style={({ isActive: isLinkActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.625rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-sm)',
                fontWeight: isLinkActive || isActive ? 600 : 500,
                color: isLinkActive || isActive ? 'var(--primary)' : 'var(--text-secondary)',
                backgroundColor: isLinkActive || isActive ? 'var(--primary-light)' : 'transparent',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
              })}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* Sidebar Footer & Logout / Collapse Buttons */}
      <div
        className="p-3 flex flex-col gap-2"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-error"
          title="Sign out of workspace"
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!isCollapsed && <span className="text-xs font-semibold">Log Out ({product.toUpperCase()})</span>}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="w-full justify-center hidden-mobile"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!isCollapsed && <span className="text-xs">Collapse Navigation</span>}
        </Button>
      </div>
    </aside>
  );
};
