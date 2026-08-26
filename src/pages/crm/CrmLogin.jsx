import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { Input, Button, Checkbox, Card } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CrmLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('a.wright@nergy.io');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid business email address.');
      addToast({ title: 'Invalid Input', message: 'Enter a valid business email.', type: 'error' });
      return;
    }

    if (!password || password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      addToast({ title: 'Invalid Input', message: 'Password is too short.', type: 'error' });
      return;
    }

    // Mock invalid login test
    if (email === 'invalid@error.com') {
      setErrorMessage('Invalid business email or password credentials.');
      addToast({ title: 'Authentication Failed', message: 'Credentials do not match tenant database.', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      login({
        name: 'Alexander Wright',
        email,
        role: 'Company Owner',
        company: 'nErgy Enterprise Logistics',
        tenantId: 'TENANT-08492',
      }, 'crm');
      addToast({ title: 'Login Successful', message: 'Signed in to CRM nErgy workspace.', type: 'success' });
      setIsLoading(false);
      navigate('/crm/dashboard');
    }, 500);
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center mb-6">
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '20px',
            fontFamily: 'var(--font-display)',
            marginBottom: '0.75rem',
          }}
        >
          nE
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>CRM nErgy Workspace</h2>
        <p className="text-xs text-secondary margin-0">Sign in to your isolated multi-tenant company account</p>
      </div>

      {errorMessage && (
        <div
          className="p-3 mb-4 rounded-sm flex items-center gap-2 text-xs"
          style={{ backgroundColor: 'var(--error-light)', color: 'var(--error)', border: '1px solid var(--error-border)' }}
        >
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Business Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. alexander@company.com"
          startIcon={Mail}
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          startIcon={Lock}
          required
        />

        <div className="flex items-center justify-between text-xs">
          <Checkbox
            label="Remember this device"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Link to="/crm/forgot-password" className="font-semibold text-primary">
            Forgot password?
          </Link>
        </div>

        <Button variant="primary" size="lg" type="submit" isLoading={isLoading} className="w-full mt-2">
          Sign In to Workspace
        </Button>
      </form>

      <div className="mt-4 pt-4 border-t border-subtle flex flex-col gap-2 text-center text-xs text-secondary">
        <div>
          Don’t have a company account yet?{' '}
          <Link to="/crm/signup" className="font-semibold text-primary">
            Create Company Workspace
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-tertiary mt-2">
          <ShieldCheck size={14} className="text-success" />
          <span>Multi-Tenant 256-bit AES Encryption</span>
        </div>
      </div>
    </Card>
  );
};
