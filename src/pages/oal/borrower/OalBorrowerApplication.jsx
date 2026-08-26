import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  User,
  Building2,
  DollarSign,
  Briefcase,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Save
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  Input,
  Select,
  Badge,
  Stepper,
  FileUpload
} from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerApplication = () => {
  const navigate = useNavigate();
  const { applicationDraft, updateDraft, setApplicationStage } = useOal();
  const { addToast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(applicationDraft);

  const steps = [
    { label: 'Personal' },
    { label: 'Business' },
    { label: 'Loan Details' },
    { label: 'Financials' },
    { label: 'Documents' },
    { label: 'Review' },
    { label: 'Submit' },
  ];

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSaveDraft = () => {
    updateDraft(formData);
    addToast({ title: 'Draft Saved', message: 'Loan application draft stored in local state.', type: 'info' });
  };

  const handleNext = () => {
    updateDraft(formData);
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    updateDraft(formData);
    setApplicationStage(5); // Advance to AI Score Stage (Index 5)
    addToast({
      title: 'Application Submitted!',
      message: 'Dispatched to OAL AI Scoring Engine & Underwriting.',
      type: 'success',
    });
    navigate('/oal/borrower/score');
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '780px', margin: '0 auto' }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'OAL Borrower' }, { label: '7-Step Loan Application' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Commercial Loan Application</h1>
          <p className="text-xs text-secondary margin-0">
            Step {currentStep + 1} of 7: {steps[currentStep].label}
          </p>
        </div>

        <Button variant="outline" size="sm" icon={Save} onClick={handleSaveDraft}>
          Save Draft
        </Button>
      </div>

      {/* Stepper Bar */}
      <Card className="p-4 overflow-x-auto">
        <Stepper steps={steps} currentStep={currentStep} />
      </Card>

      {/* STEP 1: PERSONAL INFORMATION */}
      {currentStep === 0 && (
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">1. Personal Information</h3>
          <Input label="Full Legal Name" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} required />
          <Input label="Business Email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} required />
          <Input label="Phone Number" type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} required />
        </Card>
      )}

      {/* STEP 2: BUSINESS INFORMATION */}
      {currentStep === 1 && (
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">2. Business Entity Information</h3>
          <Input label="Corporate Entity Name" value={formData.companyName} onChange={(e) => handleChange('companyName', e.target.value)} required />
          <Input label="Tax ID / EIN" value={formData.taxId} onChange={(e) => handleChange('taxId', e.target.value)} required />
          <Select label="Years in Business" value={formData.yearsInBusiness} onChange={(e) => handleChange('yearsInBusiness', e.target.value)} options={['1-3 Years', '3-5 Years', '6 Years', '10+ Years']} />
        </Card>
      )}

      {/* STEP 3: LOAN DETAILS */}
      {currentStep === 2 && (
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">3. Requested Loan Details</h3>
          <Input label="Requested Loan Amount ($)" value={formData.loanAmount} onChange={(e) => handleChange('loanAmount', e.target.value)} required />
          <Select label="Requested Term" value={formData.loanTerm} onChange={(e) => handleChange('loanTerm', e.target.value)} options={['12 Months', '24 Months', '36 Months', '48 Months', '60 Months']} />
          <Input label="Use of Loan Proceeds" value={formData.loanPurpose} onChange={(e) => handleChange('loanPurpose', e.target.value)} placeholder="e.g. Equipment Purchase & Facility Expansion" required />
          <Select label="Primary Collateral Type" value={formData.collateralType} onChange={(e) => handleChange('collateralType', e.target.value)} options={['Corporate Receivables & Equipment', 'Real Estate Asset', 'Unsecured Commercial Line']} />
        </Card>
      )}

      {/* STEP 4: FINANCIALS */}
      {currentStep === 3 && (
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">4. Financial Statements</h3>
          <Input label="Annual Gross Revenue" value={formData.annualRevenue} onChange={(e) => handleChange('annualRevenue', e.target.value)} required />
          <Input label="Average Monthly Revenue" value={formData.monthlyRevenue} onChange={(e) => handleChange('monthlyRevenue', e.target.value)} required />
          <Input label="Net Operating Income (NOI)" value={formData.netOperatingIncome} onChange={(e) => handleChange('netOperatingIncome', e.target.value)} required />
        </Card>
      )}

      {/* STEP 5: DOCUMENTS */}
      {currentStep === 4 && (
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">5. Document Upload Attachments</h3>
          <FileUpload label="Upload Bank Statements & Tax Returns (PDF)" maxFiles={3} onFilesSelected={() => addToast({ title: 'Attached Files', type: 'success' })} />
        </Card>
      )}

      {/* STEP 6: REVIEW SUMMARY */}
      {currentStep === 5 && (
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">6. Application Review Summary</h3>
          <div className="p-4 surface-secondary rounded-md border-subtle flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b border-subtle pb-2"><span>Borrower Name:</span><strong className="text-primary">{formData.fullName}</strong></div>
            <div className="flex justify-between border-b border-subtle pb-2"><span>Company:</span><strong className="text-primary">{formData.companyName}</strong></div>
            <div className="flex justify-between border-b border-subtle pb-2"><span>Requested Loan:</span><strong className="text-success">{formData.loanAmount} ({formData.loanTerm})</strong></div>
            <div className="flex justify-between border-b border-subtle pb-2"><span>Annual Revenue:</span><strong>{formData.annualRevenue}</strong></div>
            <div className="flex justify-between"><span>Loan Purpose:</span><span>{formData.loanPurpose}</span></div>
          </div>
        </Card>
      )}

      {/* STEP 7: SUBMIT */}
      {currentStep === 6 && (
        <Card className="p-8 text-center flex flex-col items-center gap-4">
          <CheckCircle2 size={48} className="text-success" />
          <h3 className="text-lg">Ready for Automated Submission</h3>
          <p className="text-xs text-secondary max-w-md margin-0">
            Submitting will initiate the AI Risk Scoring Engine and notify licensed OAL representatives to solicit lender bids.
          </p>
          <Button variant="primary" size="lg" icon={CheckCircle2} onClick={handleSubmitApplication} style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }} className="w-full mt-2">
            Submit Application & AI Score
          </Button>
        </Card>
      )}

      {/* Navigation Buttons (Back & Next) */}
      <div className="flex items-center justify-between border-t border-subtle pt-4">
        <Button variant="outline" size="sm" icon={ArrowLeft} onClick={handleBack} isDisabled={currentStep === 0}>
          Back
        </Button>

        {currentStep < 6 && (
          <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right" onClick={handleNext} style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}>
            Next Step
          </Button>
        )}
      </div>
    </div>
  );
};
