import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UploadCloud, CheckCircle2, ArrowRight } from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge, Input, FileUpload } from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerKyc = () => {
  const navigate = useNavigate();
  const { applicationDraft, setApplicationStage } = useOal();
  const { addToast } = useToast();

  const [isVerified, setIsVerified] = useState(true);
  const [ssn, setSsn] = useState('XXX-XX-8492');

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    setIsVerified(true);
    setApplicationStage(3); // Advance to Application Stage (Index 3)
    addToast({ title: 'KYC Verification Passed', message: 'Identity check matched global compliance database.', type: 'success' });
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '680px', margin: '0 auto' }}>
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'OAL Borrower' }, { label: 'KYC Verification' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>KYC Identity & Legal Vault</h1>
        </div>
        <Badge variant={isVerified ? 'success' : 'warning'} icon={ShieldCheck}>
          {isVerified ? 'KYC Verified 100%' : 'Pending Verification'}
        </Badge>
      </div>

      <Card className="p-6 flex flex-col gap-4">
        <h3 className="text-base font-semibold">1. Identity Verification Details</h3>
        <form onSubmit={handleVerifySubmit} className="flex flex-col gap-4">
          <Input label="Borrower Entity Legal Name" value={applicationDraft.companyName} readOnly />
          <Input label="Taxpayer ID / SSN / EIN" value={ssn} onChange={(e) => setSsn(e.target.value)} required />
          <FileUpload label="Upload Passport or Government ID (Front & Back)" maxFiles={2} onFilesSelected={() => addToast({ title: 'ID Attached', type: 'info' })} />
          <Button variant="primary" size="lg" type="submit" icon={CheckCircle2} style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}>
            Submit KYC Verification
          </Button>
        </form>
      </Card>
    </div>
  );
};
