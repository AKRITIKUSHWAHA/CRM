import React, { createContext, useContext, useState, useEffect } from 'react';

const OalContext = createContext();

export const stageNames = [
  'Registered',
  'Verified',
  'KYC',
  'Application',
  'Documents',
  'AI Score',
  'Qualified',
  'Offers',
  'Accepted',
  'Processing',
  'Funded',
];

const initialOffers = [
  {
    id: 'OFF-101',
    lender: 'Vanguard Capital Debt Fund',
    amount: '$750,000',
    rate: '5.2% APR',
    term: '36 Months',
    monthlyPayment: '$22,540',
    originationFee: '1.0%',
    status: 'Available',
    features: ['Fixed Interest Rate', 'No Early Repayment Penalty', 'Fast 24h Wire Transfer'],
  },
  {
    id: 'OFF-102',
    lender: 'Apex Global Credit Corp',
    amount: '$600,000',
    rate: '4.8% APR',
    term: '24 Months',
    monthlyPayment: '$26,280',
    originationFee: '0.75%',
    status: 'Available',
    features: ['Lowest Interest Rate', 'Flexible Payment Schedule', 'Direct Automated ACH'],
  },
  {
    id: 'OFF-103',
    lender: 'Hyperion Debt Partners',
    amount: '$1,000,000',
    rate: '6.0% APR',
    term: '48 Months',
    monthlyPayment: '$23,480',
    originationFee: '1.25%',
    status: 'Available',
    features: ['Maximum Funding Amount', 'Interest-Only First 6 Months', 'Dedicated Account Manager'],
  },
];

const initialMessages = [
  { id: '1', sender: 'Sarah Jenkins (OAL Licensed Agent)', text: 'Hello Dr. Thorne, I reviewed your application. Your AI Credit Score came back Grade A+ (792/850). Lenders are actively bidding.', time: '10:15 AM' },
  { id: '2', sender: 'Dr. Aris Thorne (Borrower)', text: 'Thank you Sarah. Is Vanguard Capital willing to match Apex Credit’s 4.8% APR rate?', time: '10:30 AM' },
  { id: '3', sender: 'Sarah Jenkins (OAL Licensed Agent)', text: 'I am negotiating directly with Vanguard’s underwriting team. I will update your offers tab shortly.', time: '10:45 AM' },
];

const initialLenderLeads = [
  { id: 'LD-901', borrower: 'BioGenix Labs Inc.', loanType: 'Equipment & R&D Expansion', amount: '$750,000', score: 792, qual: 'Grade A+', date: '2026-02-24', status: 'Active Bidding', saved: true },
  { id: 'LD-902', borrower: 'Apex Global Logistics', loanType: 'Working Capital Line', amount: '$1,200,000', score: 810, qual: 'Grade A+', date: '2026-02-25', status: 'New Lead', saved: false },
  { id: 'LD-903', borrower: 'Nova Retail Automation', loanType: 'Inventory Line of Credit', amount: '$450,000', score: 740, qual: 'Grade B+', date: '2026-02-22', status: 'Active Bidding', saved: false },
];

const initialRepTasks = [
  { id: 'TSK-1', title: 'Verify BioGenix Tax Returns 2025', borrower: 'BioGenix Labs', priority: 'High', status: 'Completed' },
  { id: 'TSK-2', title: 'Negotiate APR discount with Vanguard Capital', borrower: 'BioGenix Labs', priority: 'High', status: 'In Progress' },
  { id: 'TSK-3', title: 'Schedule Underwriting Call for Apex Logistics', borrower: 'Apex Global', priority: 'Medium', status: 'Pending' },
];

export const OalProvider = ({ children }) => {
  const [applicationStage, setApplicationStage] = useState(() => {
    const saved = localStorage.getItem('oal_stage');
    return saved ? Number(saved) : 7;
  });

  const [applicationDraft, setApplicationDraft] = useState(() => {
    const saved = localStorage.getItem('oal_app_draft');
    return saved ? JSON.parse(saved) : {
      fullName: 'Dr. Aris Thorne',
      email: 'a.thorne@biogenix.org',
      phone: '+1 (555) 678-1234',
      companyName: 'BioGenix Labs Inc.',
      taxId: 'US-99201948',
      yearsInBusiness: '6 Years',
      annualRevenue: '$4,200,000',
      loanAmount: '$750,000',
      loanTerm: '36 Months',
      loanPurpose: 'Equipment Expansion & R&D Facility',
      collateralType: 'Corporate Receivables & Equipment',
      monthlyRevenue: '$350,000',
      netOperatingIncome: '$85,000',
    };
  });

  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem('oal_offers');
    return saved ? JSON.parse(saved) : initialOffers;
  });

  const [acceptedOffer, setAcceptedOffer] = useState(() => {
    const saved = localStorage.getItem('oal_accepted_offer');
    return saved ? JSON.parse(saved) : null;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('oal_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [lenderLeads, setLenderLeads] = useState(() => {
    const saved = localStorage.getItem('oal_lender_leads');
    return saved ? JSON.parse(saved) : initialLenderLeads;
  });

  const [repTasks, setRepTasks] = useState(() => {
    const saved = localStorage.getItem('oal_rep_tasks');
    return saved ? JSON.parse(saved) : initialRepTasks;
  });

  useEffect(() => {
    localStorage.setItem('oal_stage', applicationStage.toString());

    // OAL -> CRM Sync when stage reaches Funded (Stage Index 10)
    if (applicationStage === 10) {
      const currentCrmContacts = JSON.parse(localStorage.getItem('crm_contacts') || '[]');
      const exists = currentCrmContacts.some((c) => c.email === applicationDraft.email);
      if (!exists) {
        const syncedContact = {
          id: `CNT-OAL-${Date.now()}`,
          name: applicationDraft.fullName,
          company: applicationDraft.companyName,
          email: applicationDraft.email,
          phone: applicationDraft.phone,
          type: 'OAL Funded Borrower',
          owner: 'OAL Marketplace Sync',
          status: 'Active',
          lastActivity: 'Just now',
          createdDate: new Date().toISOString().split('T')[0],
          notesCount: 1,
          dealsCount: 1,
          totalValue: applicationDraft.loanAmount,
        };
        localStorage.setItem('crm_contacts', JSON.stringify([syncedContact, ...currentCrmContacts]));
      }
    }
  }, [applicationStage, applicationDraft]);

  useEffect(() => {
    localStorage.setItem('oal_app_draft', JSON.stringify(applicationDraft));
  }, [applicationDraft]);

  useEffect(() => {
    localStorage.setItem('oal_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('oal_accepted_offer', JSON.stringify(acceptedOffer));
  }, [acceptedOffer]);

  useEffect(() => {
    localStorage.setItem('oal_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('oal_lender_leads', JSON.stringify(lenderLeads));
  }, [lenderLeads]);

  useEffect(() => {
    localStorage.setItem('oal_rep_tasks', JSON.stringify(repTasks));
  }, [repTasks]);

  const updateDraft = (fields) => {
    setApplicationDraft((prev) => ({ ...prev, ...fields }));
  };

  const acceptLenderOffer = (offer) => {
    setAcceptedOffer(offer);
    setApplicationStage(8);
    setOffers((prev) =>
      prev.map((o) => (o.id === offer.id ? { ...o, status: 'Accepted' } : { ...o, status: 'Declined' }))
    );
  };

  const sendAgentMessage = (text) => {
    const newMsg = {
      id: Date.now().toString(),
      sender: 'Dr. Aris Thorne (Borrower)',
      text,
      time: 'Just now',
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const toggleSaveLead = (id) => {
    setLenderLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, saved: !l.saved } : l))
    );
  };

  const addLenderOffer = (newOffer) => {
    setOffers((prev) => [newOffer, ...prev]);
  };

  const addRepTask = (task) => {
    const newTsk = { id: `TSK-${Date.now()}`, status: 'Pending', ...task };
    setRepTasks((prev) => [newTsk, ...prev]);
  };

  return (
    <OalContext.Provider
      value={{
        applicationStage,
        setApplicationStage,
        applicationDraft,
        updateDraft,
        offers,
        acceptedOffer,
        acceptLenderOffer,
        addLenderOffer,
        messages,
        sendAgentMessage,
        lenderLeads,
        toggleSaveLead,
        repTasks,
        addRepTask,
        stageNames,
      }}
    >
      {children}
    </OalContext.Provider>
  );
};

export const useOal = () => useContext(OalContext);
