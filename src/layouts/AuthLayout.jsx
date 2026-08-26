import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/Button';
import { Sun, Moon } from 'lucide-react';
import { ToastContainer } from '../components/ui/Toast';

export const AuthLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
        <Button
          variant="outline"
          size="sm"
          isIconOnly
          icon={theme === 'light' ? Moon : Sun}
          onClick={toggleTheme}
          title="Toggle Theme"
        />
      </div>

      <main style={{ width: '100%', maxWidth: '440px' }}>
        <Outlet />
      </main>

      <footer style={{ marginTop: '2rem', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textAlign: 'center' }}>
        © 2026 CRM nErgy + OAL Network Enterprise Platform. All rights reserved.
      </footer>

      <ToastContainer />
    </div>
  );
};
