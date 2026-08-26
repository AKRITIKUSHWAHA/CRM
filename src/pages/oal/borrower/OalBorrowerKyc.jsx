import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  UploadCloud,
  CheckCircle2,
  Lock,
  Building2,
  FileText,
  User,
  Users,
  Eye,
  Download,
  Plus,
  Sparkles,
  AlertCircle,
  Clock,
  Check,
  Copy,
  ExternalLink,
  RefreshCw,
  CheckCheck
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  Badge,
  Input,
  Modal,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell
} from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerKyc = () => {
  const navigate = useNavigate();
  const { applicationDraft, setApplicationStage } = useOal();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('entity');
  const [isVerified, setIsVerified] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isAddOwnerOpen, setIsAddOwnerOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Form State
  const [companyName, setCompanyName] = useState(applicationDraft?.companyName || 'BioGenix Labs Inc.');
  const [ein, setEin] = useState('84-9201948');
  const [duns, setDuns] = useState('08-492-1184');
  const [incState, setIncState] = useState('Delaware (DE Corp - C-Corp)');
  const [signatoryName, setSignatoryName] = useState('Dr. Aris Thorne');
  const [signatoryRole, setSignatoryRole] = useState('Chief Executive Officer (CEO)');
  const [showEin, setShowEin] = useState(false);

  // Beneficial Owners List
  const [owners, setOwners] = useState([
    { id: '1', name: 'Dr. Aris Thorne', role: 'CEO & Founder', equity: '62.5%', citizenship: 'United States', ssnLast4: '8492', status: 'Verified' },
    { id: '2', name: 'Horizon BioVentures LP', role: 'Series A Institutional Lead', equity: '25.0%', citizenship: 'Delaware LP', ssnLast4: '3901', status: 'Verified' },
    { id: '3', name: 'Dr. Elena Vance', role: 'Chief Technology Officer', equity: '12.5%', citizenship: 'United States', ssnLast4: '1109', status: 'Verified' },
  ]);

  // New Owner Modal State
  const [newOwnerName, setNewOwnerName] = useState('');
  const [newOwnerRole, setNewOwnerRole] = useState('');
  const [newOwnerEquity, setNewOwnerEquity] = useState('');

  // Vault Documents List
  const [documents, setDocuments] = useState([
    {
      id: 'doc-1',
      title: 'Certificate of Incorporation (Delaware Secretary of State)',
      type: 'Corporate Governance',
      size: '1.8 MB',
      date: 'Feb 12, 2026',
      hash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      status: 'Cryptographically Verified',
    },
    {
      id: 'doc-2',
      title: 'IRS EIN Tax Determination Letter (Form CP 575)',
      type: 'Federal Tax ID',
      size: '420 KB',
      date: 'Feb 12, 2026',
      hash: 'sha256:3f7b2c918a44d827f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284',
      status: 'Cryptographically Verified',
    },
    {
      id: 'doc-3',
      title: 'Certificate of Good Standing (Delaware 2026 Renewal)',
      type: 'State Compliance',
      size: '850 KB',
      date: 'Feb 18, 2026',
      hash: 'sha256:918a44d827f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d6772843f7b2c',
      status: 'Cryptographically Verified',
    },
    {
      id: 'doc-4',
      title: 'Government Passport & RealID (Dr. Aris Thorne)',
      type: 'Executive Identity',
      size: '3.1 MB',
      date: 'Feb 15, 2026',
      hash: 'sha256:b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d90697f83',
      status: 'Cryptographically Verified',
    },
    {
      id: 'doc-5',
      title: 'Corporate Resolution for Commercial Borrowing Authorization',
      type: 'Board Authorization',
      size: '2.4 MB',
      date: 'Feb 20, 2026',
      hash: 'sha256:fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d90697f83b1657ff1',
      status: 'Cryptographically Verified',
    },
    {
      id: 'doc-6',
      title: 'Primary Operating Commercial Bank Account Verification (Plaid Link)',
      type: 'Banking Telemetry',
      size: '1.2 MB',
      date: 'Feb 22, 2026',
      hash: 'sha256:d200126d90697f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284add',
      status: 'Cryptographically Verified',
    }
  ]);

  const handleAddOwner = (e) => {
    e.preventDefault();
    if (!newOwnerName || !newOwnerEquity) return;
    const newEntry = {
      id: String(owners.length + 1),
      name: newOwnerName,
      role: newOwnerRole || 'Co-Owner',
      equity: newOwnerEquity.includes('%') ? newOwnerEquity : `${newOwnerEquity}%`,
      citizenship: 'United States',
      ssnLast4: '7721',
      status: 'Verified',
    };
    setOwners([...owners, newEntry]);
    setNewOwnerName('');
    setNewOwnerRole('');
    setNewOwnerEquity('');
    setIsAddOwnerOpen(false);
    addToast({
      title: 'Beneficial Owner Added',
      message: `${newEntry.name} successfully registered with FinCEN CDD compliance protocol.`,
      type: 'success'
    });
  };

  const handleFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      const newDoc = {
        id: `doc-${documents.length + 1}`,
        title: 'Commercial Lease Agreement & Premises Telemetry',
        type: 'Facility Tenancy',
        size: '2.8 MB',
        date: 'Today',
        hash: 'sha256:a1d65dfc2d4b1fa3d677284addd200126d90697f83b1657ff1fc53b92dc18148',
        status: 'Cryptographically Verified',
      };
      setDocuments([newDoc, ...documents]);
      addToast({
        title: 'Document Vault Updated',
        message: 'File encrypted with 256-bit AES and registered in your compliance ledger.',
        type: 'success',
      });
    }, 1200);
  };

  const handleReVerify = () => {
    addToast({
      title: 'Compliance Refresh Triggered',
      message: 'Automated LexisNexis & FinCEN telemetry refreshed. Status: 100% Verified.',
      type: 'info',
    });
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'KYC & Legal Vault' }]} />
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0.25rem 0 0 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            KYC Identity & Corporate Legal Vault
          </h1>
          <p className="text-xs text-secondary margin-0" style={{ marginTop: '3px' }}>
            Bank-grade 256-bit encrypted verification for institutional borrowing and FinCEN CDD compliance
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={handleReVerify}
          >
            Refresh Telemetry
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={FileText}
            onClick={() => setIsCertModalOpen(true)}
          >
            Export KYC Certificate
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={CheckCircle2}
            style={{ backgroundColor: 'var(--success)', borderColor: 'var(--success)' }}
            onClick={() => navigate('/oal/borrower/offers')}
          >
            View Active Lender Offers
          </Button>
        </div>
      </div>

      {/* 2. Top Trust & Compliance KPI Summary Strip */}
      <div className="kpi-strip-4col">
        <Card style={{ padding: '0.75rem 1rem', borderRadius: '10px' }} className="flex flex-col gap-0.5">
          <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}>
            VERIFICATION STATUS
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--success)' }}>Level 3 Verified</span>
            <span className="text-xs text-secondary">FinCEN Cleared</span>
          </div>
        </Card>

        <Card style={{ padding: '0.75rem 1rem', borderRadius: '10px' }} className="flex flex-col gap-0.5">
          <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}>
            BORROWING CAPACITY
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>Up to $10,000,000</span>
            <span className="text-xs text-secondary">Institutional</span>
          </div>
        </Card>

        <Card style={{ padding: '0.75rem 1rem', borderRadius: '10px' }} className="flex flex-col gap-0.5">
          <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}>
            ENCRYPTED DOCUMENTS
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--accent)' }}>{documents.length} / {documents.length} Validated</span>
            <span className="text-xs text-secondary">AES-256 Bit</span>
          </div>
        </Card>

        <Card style={{ padding: '0.75rem 1rem', borderRadius: '10px' }} className="flex flex-col gap-0.5">
          <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}>
            NEXT AUDIT REVIEW
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>Dec 2027</span>
            <span className="text-xs text-secondary">Auto-Renewed</span>
          </div>
        </Card>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-b border-subtle pb-2">
        <div className="flex items-center gap-1.5 p-1 surface-secondary rounded-lg border-subtle">
          <button
            type="button"
            onClick={() => setActiveTab('entity')}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'entity' ? 'var(--surface)' : 'transparent',
              color: activeTab === 'entity' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'entity' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            1. Corporate Entity & Identity
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('owners')}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'owners' ? 'var(--surface)' : 'transparent',
              color: activeTab === 'owners' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'owners' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            2. Beneficial Ownership ({owners.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vault')}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'vault' ? 'var(--surface)' : 'transparent',
              color: activeTab === 'vault' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'vault' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            3. Legal Document Vault ({documents.length})
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-secondary">
          <Lock size={14} className="text-accent" />
          <span>FinCEN Customer Due Diligence (CDD) Certified</span>
        </div>
      </div>

      {/* 4. TAB 1: Corporate Entity & Signatory Identity */}
      {activeTab === 'entity' && (
        <div className="flex flex-col gap-5">
          {/* Section 1: Commercial Entity Legal Information */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Commercial Entity Legal Information
                </h2>
                <Badge variant="success" icon={CheckCircle2} style={{ display: 'inline-flex', width: 'auto' }}>
                  Good Standing: Active
                </Badge>
              </div>
              <span className="text-xs text-secondary">
                Delaware Division of Corporations &bull; Entity File #7749201
              </span>
            </div>

            <Card style={{ padding: '1.25rem', borderRadius: '12px' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                <div>
                  <label className="form-label mb-1 font-semibold text-secondary">Borrower Legal Name</label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    style={{ height: '38px', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label className="form-label mb-1 font-semibold text-secondary">Jurisdiction & Entity</label>
                  <Input
                    value={incState}
                    onChange={(e) => setIncState(e.target.value)}
                    style={{ height: '38px', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="form-label mb-0 font-semibold text-secondary">Taxpayer ID (EIN)</label>
                    <button
                      type="button"
                      onClick={() => setShowEin(!showEin)}
                      className="text-accent text-xs font-semibold"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      {showEin ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <Input
                    value={showEin ? '84-9201948' : 'XX-XXX1948'}
                    readOnly
                    style={{ height: '38px', fontSize: '13px', fontFamily: 'monospace' }}
                  />
                </div>

                <div>
                  <label className="form-label mb-1 font-semibold text-secondary">D-U-N-S Number</label>
                  <Input
                    value={duns}
                    onChange={(e) => setDuns(e.target.value)}
                    style={{ height: '38px', fontSize: '13px', fontFamily: 'monospace' }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Section 2: Primary Officer Identity */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Primary Authorized Signatory & Executive Officer
                </h2>
                <Badge variant="success" icon={ShieldCheck} style={{ display: 'inline-flex', width: 'auto' }}>
                  Identity Verified
                </Badge>
              </div>
              <span className="text-xs text-secondary">
                Authorized signatory with full executive borrowing power
              </span>
            </div>

            <Card style={{ padding: '1.25rem', borderRadius: '12px' }} className="flex flex-col gap-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label className="form-label mb-1 font-semibold text-secondary">Authorized Officer Full Legal Name</label>
                  <Input
                    value={signatoryName}
                    onChange={(e) => setSignatoryName(e.target.value)}
                    style={{ height: '38px', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label className="form-label mb-1 font-semibold text-secondary">Corporate Title / Capacity</label>
                  <Input
                    value={signatoryRole}
                    onChange={(e) => setSignatoryRole(e.target.value)}
                    style={{ height: '38px', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Officer Verification Status Box */}
              <div className="p-3 surface-secondary rounded-lg border-subtle flex items-center justify-between gap-3 text-xs flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '12px',
                      flexShrink: 0,
                    }}
                  >
                    AT
                  </div>
                  <div>
                    <span className="font-bold text-sm text-primary">Dr. Aris Thorne &bull; US Passport #P48920194</span>
                    <div className="text-secondary">Cryptographic Facial Match: 99.8% &bull; State DMV Record Valid</div>
                  </div>
                </div>

                <Badge variant="success" style={{ display: 'inline-flex', width: 'auto' }}>● RealID Validated</Badge>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* 5. TAB 2: Beneficial Ownership (FinCEN 25%+ Rule) */}
      {activeTab === 'owners' && (
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                Beneficial Ownership Registry (FinCEN Compliance)
              </h2>
              <span className="text-xs text-secondary">
                Federal regulations require identifying all individuals or entities with 25% or greater equity or executive control.
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={() => setIsAddOwnerOpen(true)}
              style={{ fontWeight: 600, flexShrink: 0 }}
            >
              Add Beneficial Owner
            </Button>
          </div>

          <Card style={{ padding: '0', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell isHeader>Owner / Entity Name</TableCell>
                    <TableCell isHeader>Corporate Capacity</TableCell>
                    <TableCell isHeader>Equity Ownership</TableCell>
                    <TableCell isHeader>Citizenship / Jurisdiction</TableCell>
                    <TableCell isHeader>FinCEN Verification</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {owners.map((owner) => (
                    <TableRow key={owner.id}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--surface-secondary)',
                              border: '1px solid var(--border)',
                              color: 'var(--accent)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: '11px',
                            }}
                          >
                            {owner.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                          </div>
                          <div>
                            <span className="font-bold text-primary">{owner.name}</span>
                            <div className="text-xs text-tertiary">SSN/EIN: ***-**-{owner.ssnLast4}</div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="text-secondary">{owner.role}</span>
                      </TableCell>

                      <TableCell>
                        <span className="font-bold text-primary" style={{ fontSize: '14px' }}>
                          {owner.equity}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="text-secondary">{owner.citizenship}</span>
                      </TableCell>

                      <TableCell>
                        <Badge variant="success" icon={CheckCircle2}>
                          {owner.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      )}

      {/* 6. TAB 3: Legal Document Vault */}
      {activeTab === 'vault' && (
        <div className="flex flex-col gap-6">
          {/* Section 1: Upload Dropzone */}
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Institutional Legal Repository
                </h2>
                <span className="text-xs text-secondary">
                  Uploaded files are encrypted via AES-256 and stamped with immutable SHA-256 verification hashes
                </span>
              </div>
              <Badge variant="neutral" style={{ flexShrink: 0 }}>SHA-256 Protected</Badge>
            </div>

            {/* Interactive Upload Dropzone */}
            <Card
              onClick={handleFileUpload}
              style={{
                border: '2px dashed var(--border)',
                borderRadius: '12px',
                padding: '1.75rem',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: 'var(--surface-secondary)',
                transition: 'all 0.15s ease',
              }}
              className="hover:border-primary flex flex-col items-center justify-center gap-2"
            >
              <UploadCloud size={32} className="text-accent" />
              <div>
                <span className="font-bold text-sm text-primary">
                  {isUploading ? 'Encrypting & Verifying File...' : 'Click to Upload Legal Documents or Drag & Drop'}
                </span>
                <p className="text-xs text-secondary margin-0 mt-0.5">
                  Supports PDF, DOCX, XLSX, PNG (Corporate Bylaws, Audited Financials, Tax Filings up to 25MB)
                </p>
              </div>
            </Card>
          </div>

          {/* Section 2: List of Verified Documents */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                Verified Corporate Documents ({documents.length})
              </h3>
              <span className="text-xs text-secondary">100% Cryptographically Sealed</span>
            </div>

            <div className="flex flex-col gap-3">
            {documents.map((doc) => (
              <Card
                key={doc.id}
                style={{ padding: '1rem 1.25rem', borderRadius: '10px' }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-3 hover:surface-secondary transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(37, 99, 235, 0.08)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <FileText size={20} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-primary truncate">
                        {doc.title}
                      </span>
                      <Badge variant="success" style={{ fontSize: '10px', padding: '1px 6px' }}>
                        Verified
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-secondary mt-0.5 flex-wrap">
                      <span>Category: <strong>{doc.type}</strong></span>
                      <span>&bull;</span>
                      <span>Size: <strong>{doc.size}</strong></span>
                      <span>&bull;</span>
                      <span>Uploaded: <strong>{doc.date}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Eye}
                    onClick={() => setSelectedDoc(doc)}
                    style={{ fontSize: '11px', height: '32px' }}
                  >
                    Inspect Hash
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Download}
                    onClick={() => {
                      addToast({
                        title: 'Document Downloaded',
                        message: `Downloaded ${doc.title} (${doc.size}).`,
                        type: 'info'
                      });
                    }}
                    style={{ fontSize: '11px', height: '32px' }}
                  >
                    Download
                  </Button>
                </div>
              </Card>
            ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: Document Hash Inspector */}
      <Modal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        title={selectedDoc ? selectedDoc.title : 'Document Details'}
        maxWidth="640px"
        footer={
          <Button variant="primary" size="sm" onClick={() => setSelectedDoc(null)}>
            Done
          </Button>
        }
      >
        {selectedDoc && (
          <div className="flex flex-col gap-4 text-xs">
            <div className="p-3.5 surface-secondary rounded-lg border-subtle">
              <span className="font-bold text-sm text-primary">{selectedDoc.title}</span>
              <div className="text-secondary mt-0.5">
                Category: <strong>{selectedDoc.type}</strong> &bull; Size: {selectedDoc.size} &bull; Certified on {selectedDoc.date}
              </div>
            </div>

            <div>
              <label className="form-label mb-1 font-semibold text-secondary">SHA-256 Cryptographic Audit Hash</label>
              <div className="p-2.5 surface-secondary rounded border-subtle font-mono text-tertiary select-all break-all" style={{ fontSize: '11px' }}>
                {selectedDoc.hash}
              </div>
              <span className="text-secondary mt-1 block" style={{ fontSize: '11px' }}>
                This cryptographic checksum guarantees document integrity and tampering prevention.
              </span>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL 2: Add Beneficial Owner Modal */}
      <Modal
        isOpen={isAddOwnerOpen}
        onClose={() => setIsAddOwnerOpen(false)}
        title="Add Beneficial Owner (FinCEN CDD)"
        maxWidth="540px"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddOwnerOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={CheckCircle2}
              style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
              onClick={handleAddOwner}
            >
              Save & Verify Owner
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddOwner} className="flex flex-col gap-3 text-xs">
          <div>
            <label className="form-label mb-1 font-semibold text-secondary">Full Legal Name / Entity Name</label>
            <Input
              value={newOwnerName}
              onChange={(e) => setNewOwnerName(e.target.value)}
              placeholder="e.g. Jane Doe or Apex Capital Partners"
              required
              style={{ height: '38px' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label mb-1 font-semibold text-secondary">Corporate Title</label>
              <Input
                value={newOwnerRole}
                onChange={(e) => setNewOwnerRole(e.target.value)}
                placeholder="e.g. Chief Operating Officer"
                style={{ height: '38px' }}
              />
            </div>

            <div>
              <label className="form-label mb-1 font-semibold text-secondary">Equity Ownership (%)</label>
              <Input
                value={newOwnerEquity}
                onChange={(e) => setNewOwnerEquity(e.target.value)}
                placeholder="e.g. 25%"
                required
                style={{ height: '38px' }}
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* MODAL 3: Export KYC Certificate PDF */}
      <Modal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        title="Official OAL KYC Compliance Certificate"
        maxWidth="600px"
        footer={
          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={() => {
              setIsCertModalOpen(false);
              addToast({
                title: 'Certificate Exported',
                message: 'Official KYC Verification Certificate PDF generated successfully.',
                type: 'success',
              });
            }}
          >
            Download Signed PDF Certificate
          </Button>
        }
      >
        <div className="flex flex-col gap-4 text-xs">
          <div className="p-4 surface-secondary rounded-lg border-subtle flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-primary">BioGenix Labs Inc. &bull; Level 3 Institutional KYC</span>
              <Badge variant="success">Active Certificate #OAL-KYC-9482</Badge>
            </div>
            <p className="text-secondary margin-0">
              This certificate confirms that BioGenix Labs Inc. (EIN: 84-9201948) has completed 100% of corporate identity, FinCEN CDD beneficial ownership, and legal charter verification under the OAL Lending Network Governance protocol.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 surface-secondary rounded-lg border-subtle">
            <div>
              <span className="text-tertiary">Issuing Authority</span>
              <div className="font-bold text-primary">OAL Network Compliance Desk</div>
            </div>
            <div>
              <span className="text-tertiary">Cryptographic Seal</span>
              <div className="font-bold text-success font-mono">TLS 256-Bit Valid</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
