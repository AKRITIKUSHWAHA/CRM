import React, { createContext, useContext, useState, useEffect } from 'react';

const SupportContext = createContext();

const initialTickets = [
  { id: 'TCK-501', subject: 'API Gateway Timeout during high volume batch sync', customer: 'Apex Global', priority: 'High', status: 'In Progress', createdDate: '2026-02-24', category: 'Integration' },
  { id: 'TCK-502', subject: 'Billing Invoice #INV-2094 double charge query', customer: 'Nova Retail', priority: 'Medium', status: 'Open', createdDate: '2026-02-25', category: 'Billing' },
  { id: 'TCK-503', subject: 'MFA Authenticator reset request for employee account', customer: 'BioGenix Labs', priority: 'Low', status: 'Resolved', createdDate: '2026-02-22', category: 'Security' },
];

const initialKbArticles = [
  { id: 'KB-101', title: 'Configuring Isolated Multi-Tenant OAuth Gateway', category: 'Security', views: 1420 },
  { id: 'KB-102', title: 'Connecting OAL Network Marketplace API', category: 'Integration', views: 980 },
  { id: 'KB-103', title: 'Exporting ERP Financial Ledgers & Audits', category: 'Billing', views: 650 },
];

export const SupportProvider = ({ children }) => {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('support_tickets');
    return saved ? JSON.parse(saved) : initialTickets;
  });

  useEffect(() => {
    localStorage.setItem('support_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = (item) => {
    const newTck = { id: `TCK-${Math.floor(500 + Math.random() * 900)}`, status: 'Open', createdDate: new Date().toISOString().split('T')[0], ...item };
    setTickets([newTck, ...tickets]);
  };

  const updateTicketStatus = (id, newStatus) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  return (
    <SupportContext.Provider
      value={{
        tickets,
        addTicket,
        updateTicketStatus,
        kbArticles: initialKbArticles,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = () => useContext(SupportContext);
