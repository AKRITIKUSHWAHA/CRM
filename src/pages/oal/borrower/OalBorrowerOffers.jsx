import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, CheckCircle2, ArrowRight, Check, X } from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge, Table, TableHeader, TableBody, TableRow, TableCell, Modal, ConfirmationDialog } from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerOffers = () => {
  const navigate = useNavigate();
  const { offers, acceptedOffer, acceptLenderOffer } = useOal();
  const { addToast } = useToast();

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const handleOpenAccept = (offer) => {
    setSelectedOffer(offer);
    setIsConfirmOpen(true);
  };

  const handleConfirmAccept = () => {
    if (selectedOffer) {
      acceptLenderOffer(selectedOffer);
      addToast({
        title: 'Lender Offer Accepted!',
        message: `Accepted ${selectedOffer.lender} funding terms. Application status updated to Processing.`,
        type: 'success',
      });
      setIsConfirmOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'OAL Borrower' }, { label: 'Lending Offers Marketplace' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Lender Offers Marketplace</h1>
          <p className="text-xs text-secondary margin-0">
            Compare competitive commercial loan proposals and select your funding partner
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsCompareOpen(true)}>
            Compare All Offers
          </Button>
        </div>
      </div>

      {/* SUCCESS BANNER IF ACCEPTED */}
      {acceptedOffer && (
        <Card className="p-6 border-success" style={{ backgroundColor: 'var(--success-light)' }}>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={32} className="text-success" />
            <div>
              <h3 className="text-base text-success font-bold">Offer Accepted & Processing</h3>
              <p className="text-xs text-secondary margin-0">
                You accepted <strong className="text-primary">{acceptedOffer.lender}</strong> ({acceptedOffer.amount} at {acceptedOffer.rate}). Wire transfer processing initiated.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* OFFERS LIST */}
      <div className="flex flex-col gap-4">
        {offers.map((offer) => {
          const isThisAccepted = acceptedOffer?.id === offer.id;
          return (
            <Card key={offer.id} className={`p-6 ${isThisAccepted ? 'border-success' : ''}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-primary">{offer.lender}</h3>
                    <Badge variant={isThisAccepted ? 'success' : 'primary'}>
                      {isThisAccepted ? 'Accepted Partner' : offer.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-secondary">
                    Loan Code: <code className="font-mono">{offer.id}</code>
                  </span>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex flex-col">
                    <span className="text-xs text-tertiary">Loan Principal:</span>
                    <span className="font-bold text-base text-primary">{offer.amount}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-tertiary">Interest Rate:</span>
                    <span className="font-bold text-base text-success">{offer.rate}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-tertiary">Term:</span>
                    <span className="font-semibold">{offer.term}</span>
                  </div>
                </div>

                <div>
                  {!acceptedOffer && (
                    <Button
                      variant="primary"
                      size="md"
                      style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
                      onClick={() => handleOpenAccept(offer)}
                    >
                      Accept Offer
                    </Button>
                  )}
                </div>
              </div>

              {/* Offer Features List */}
              <div className="flex items-center gap-4 mt-4 border-t border-subtle pt-3 text-xs text-secondary flex-wrap">
                {offer.features.map((feat, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    <Check size={14} className="text-success" /> {feat}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Compare Offers Modal */}
      <Modal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        title="Side-by-Side Offer Comparison"
        maxWidth="720px"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Lender Entity</TableCell>
              <TableCell isHeader>Principal</TableCell>
              <TableCell isHeader>APR Rate</TableCell>
              <TableCell isHeader>Term</TableCell>
              <TableCell isHeader>Monthly Payment</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((o) => (
              <TableRow key={o.id}>
                <TableCell><span className="font-bold">{o.lender}</span></TableCell>
                <TableCell><span className="font-semibold">{o.amount}</span></TableCell>
                <TableCell><span className="font-bold text-success">{o.rate}</span></TableCell>
                <TableCell>{o.term}</TableCell>
                <TableCell>{o.monthlyPayment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Modal>

      {/* Acceptance Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmAccept}
        title={`Accept Offer from ${selectedOffer?.lender}?`}
        description={`By confirming, you execute funding terms for ${selectedOffer?.amount} at ${selectedOffer?.rate} (${selectedOffer?.term}). All competing lender offers will be declined.`}
        confirmLabel="Execute Loan Acceptance"
      />
    </div>
  );
};
