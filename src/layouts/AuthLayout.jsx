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
        padding: '1rem',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
        <Button
          variant="outline"
          size="sm"
          isIconOnly
          icon={theme === 'light' ? Moon : Sun}
          onClick={toggleTheme}
          title="Toggle Theme"
        />
      </div>

      <main style={{ width: '100%', maxWidth: '1240px', display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </main>

      <ToastContainer />
    </div>
  );
};
