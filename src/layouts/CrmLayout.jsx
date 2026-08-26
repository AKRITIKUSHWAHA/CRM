import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { Drawer } from '../components/ui/Drawer';
import { ToastContainer } from '../components/ui/Toast';
import { useResponsive } from '../hooks/useResponsive';

export const CrmLayout = () => {
  const { isMobile, isTablet } = useResponsive();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isTablet);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setIsMobileDrawerOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background)' }}>
      {/* Fixed Topbar */}
      <Topbar onToggleSidebar={handleToggleSidebar} product="crm" />

      {/* Main Shell Container */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', height: 'calc(100vh - var(--topbar-height))' }}>
        {/* Desktop / Tablet Sidebar */}
        {!isMobile && (
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
            product="crm"
          />
        )}

        {/* Mobile Drawer Sidebar */}
        {isMobile && (
          <Drawer
            isOpen={isMobileDrawerOpen}
            onClose={() => setIsMobileDrawerOpen(false)}
            position="left"
            width="280px"
          >
            <Sidebar
              isCollapsed={false}
              onToggleCollapse={() => setIsMobileDrawerOpen(false)}
              product="crm"
              onCloseMobile={() => setIsMobileDrawerOpen(false)}
            />
          </Drawer>
        )}

        {/* Main Content Area */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isMobile ? '1rem' : '1.5rem',
            backgroundColor: 'var(--background)',
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
};
