import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Mail, Phone, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { Input, Button, Card, Stepper } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CrmSignup = () => {
  const navigate = useNavigate();
  const { updateCompanyData } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    companyName: 'Apex Enterprise Global',
    legalName: 'Apex Enterprise Global Inc.',
    businessEmail: 'admin@apexglobal.io',
    phone: '+1 (555) 234-5678',
    password: 'Password123!',
    confirmPassword: 'Password123!',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
    if (!formData.legalName.trim()) errs.legalName = 'Legal company name is required';
    if (!formData.businessEmail.trim() || !formData.businessEmail.includes('@')) {
      errs.businessEmail = 'Valid business email is required';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.password || formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast({ title: 'Validation Error', message: 'Please correct the highlighted form errors.', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      updateCompanyData({
        companyName: formData.companyName,
        legalName: formData.legalName,
        businessEmail: formData.businessEmail,
        phone: formData.phone,
      });

      addToast({
        title: 'Company Workspace Initiated',
        message: '6-digit verification code sent to ' + formData.businessEmail,
        type: 'success',
      });
      setIsLoading(false);
      navigate('/crm/verify');
    }, 600);
  };

  return (
    <div className="flex flex-col gap-4">
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
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Create Company Account</h2>
          <p className="text-xs text-secondary margin-0">Step 1 of 6: Provision isolated company workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Company Name"
            value={formData.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            startIcon={Building2}
            errorMessage={errors.companyName}
            required
          />

          <Input
            label="Legal Company Name"
            value={formData.legalName}
            onChange={(e) => handleChange('legalName', e.target.value)}
            startIcon={Building2}
            errorMessage={errors.legalName}
            required
          />

          <Input
            label="Business Email"
            type="email"
            value={formData.businessEmail}
            onChange={(e) => handleChange('businessEmail', e.target.value)}
            startIcon={Mail}
            errorMessage={errors.businessEmail}
            required
          />

          <Input
            label="Business Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            startIcon={Phone}
            errorMessage={errors.phone}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              startIcon={Lock}
              errorMessage={errors.password}
              helperText="Min 8 characters"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              startIcon={Lock}
              errorMessage={errors.confirmPassword}
              required
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            isLoading={isLoading}
            icon={ArrowRight}
            iconPosition="right"
            className="w-full mt-2"
          >
            Create Account & Verify
          </Button>
        </form>

        <div className="mt-4 pt-4 border-t border-subtle text-center text-xs text-secondary">
          Already registered?{' '}
          <Link to="/crm/login" className="font-semibold text-primary">
            Sign in to workspace
          </Link>
        </div>
      </Card>
    </div>
  );
};
