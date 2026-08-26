import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialContacts,
  initialLeads,
  initialDeals,
  initialTasks,
  initialMessages,
} from '../data/mockData';

const CrmContext = createContext();

export const CrmProvider = ({ children }) => {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('crm_contacts');
    return saved ? JSON.parse(saved) : initialContacts;
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('crm_leads');
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem('crm_deals');
    return saved ? JSON.parse(saved) : initialDeals;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('crm_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('crm_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  useEffect(() => {
    localStorage.setItem('crm_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('crm_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('crm_deals', JSON.stringify(deals));
  }, [deals]);

  useEffect(() => {
    localStorage.setItem('crm_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('crm_messages', JSON.stringify(messages));
  }, [messages]);

  // Contacts CRUD
  const addContact = (newContact) => {
    const item = {
      id: `CNT-${Math.floor(100 + Math.random() * 900)}`,
      createdDate: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
      status: newContact.status || 'Active',
      type: newContact.type || 'Enterprise Client',
      owner: newContact.owner || 'Alexander Wright',
      notesCount: 0,
      dealsCount: 0,
      totalValue: '$0',
      ...newContact,
    };
    setContacts((prev) => [item, ...prev]);
    return item;
  };

  const editContact = (id, updatedFields) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const bulkDeleteContacts = (ids) => {
    setContacts((prev) => prev.filter((c) => !ids.includes(c.id)));
  };

  // Leads CRUD
  const addLead = (newLead) => {
    const item = {
      id: `LED-${Math.floor(200 + Math.random() * 900)}`,
      createdDate: new Date().toISOString().split('T')[0],
      status: newLead.status || 'New',
      score: 75,
      value: newLead.value || '$100,000',
      ...newLead,
    };
    setLeads((prev) => [item, ...prev]);
    return item;
  };

  const editLead = (id, updatedFields) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updatedFields } : l))
    );
  };

  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const convertLeadToContact = (leadId) => {
    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead) return null;

    // Create new contact record
    const newContact = addContact({
      name: targetLead.name,
      company: targetLead.company,
      email: targetLead.email,
      phone: targetLead.phone,
      type: 'Converted Lead',
      owner: targetLead.owner,
      status: 'Active',
      totalValue: targetLead.value,
    });

    // Update lead status to Converted / Won
    editLead(leadId, { status: 'Won' });

    return newContact;
  };

  // Deals / Pipeline CRUD
  const addDeal = (newDeal) => {
    const item = {
      id: `DEAL-${Math.floor(300 + Math.random() * 900)}`,
      stage: newDeal.stage || 'New Lead',
      probability: '50%',
      expectedClose: new Date().toISOString().split('T')[0],
      ...newDeal,
    };
    setDeals((prev) => [item, ...prev]);
    return item;
  };

  const moveDealStage = (dealId, newStage) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d))
    );
  };

  const deleteDeal = (id) => {
    setDeals((prev) => prev.filter((d) => d.id !== id));
  };

  // Tasks CRUD
  const addTask = (newTask) => {
    const item = {
      id: `TSK-${Math.floor(400 + Math.random() * 900)}`,
      status: 'Pending',
      dueDate: new Date().toISOString().split('T')[0],
      reminder: '9:00 AM',
      ...newTask,
    };
    setTasks((prev) => [item, ...prev]);
    return item;
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' }
          : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Messages CRUD
  const sendMessage = (newMsg) => {
    const item = {
      id: `MSG-${Math.floor(500 + Math.random() * 900)}`,
      timestamp: 'Just now',
      ...newMsg,
    };
    setMessages((prev) => [item, ...prev]);
    return item;
  };

  return (
    <CrmContext.Provider
      value={{
        contacts,
        addContact,
        editContact,
        deleteContact,
        bulkDeleteContacts,
        leads,
        addLead,
        editLead,
        deleteLead,
        convertLeadToContact,
        deals,
        addDeal,
        moveDealStage,
        deleteDeal,
        tasks,
        addTask,
        toggleTaskCompletion,
        deleteTask,
        messages,
        sendMessage,
      }}
    >
      {children}
    </CrmContext.Provider>
  );
};

export const useCrm = () => {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error('useCrm must be used within a CrmProvider');
  }
  return context;
};
