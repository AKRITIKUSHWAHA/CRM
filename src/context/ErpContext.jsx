import React, { createContext, useContext, useState, useEffect } from 'react';

const ErpContext = createContext();

const initialProjects = [
  { id: 'PRJ-101', name: 'Logistics Node Expansion', client: 'Apex Global', budget: '$450,000', spent: '$180,000', progress: 65, status: 'In Progress', manager: 'Alexander Wright', deadline: '2026-06-30' },
  { id: 'PRJ-102', name: 'POS Infrastructure Upgrade', client: 'Nova Retail', budget: '$180,000', spent: '$90,000', progress: 50, status: 'In Progress', manager: 'David Chen', deadline: '2026-04-15' },
  { id: 'PRJ-103', name: 'Biotech Lab Automation', client: 'BioGenix', budget: '$750,000', spent: '$700,000', progress: 90, status: 'Review', manager: 'Alexander Wright', deadline: '2026-03-20' },
];

const initialPurchaseOrders = [
  { id: 'PO-801', vendor: 'TechSupply Global', item: 'Server Rack Units', amount: '$42,500', status: 'Approved', date: '2026-02-20' },
  { id: 'PO-802', vendor: 'Industrial Motors Co.', item: 'Conveyor Belts', amount: '$85,000', status: 'Pending Approval', date: '2026-02-22' },
];

const initialInventory = [
  { id: 'SKU-001', name: 'IoT Telematics Gateway', warehouse: 'Austin Hub', quantity: 450, unitCost: '$120', status: 'In Stock' },
  { id: 'SKU-002', name: 'Barcode Scanner Handheld', warehouse: 'Dallas Depot', quantity: 85, unitCost: '$85', status: 'Low Stock' },
  { id: 'SKU-003', name: 'RFID Asset Tags (Pack 100)', warehouse: 'Austin Hub', quantity: 1200, unitCost: '$45', status: 'In Stock' },
];

export const ErpProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('erp_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [purchaseOrders, setPurchaseOrders] = useState(() => {
    const saved = localStorage.getItem('erp_po');
    return saved ? JSON.parse(saved) : initialPurchaseOrders;
  });

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('erp_inventory');
    return saved ? JSON.parse(saved) : initialInventory;
  });

  useEffect(() => {
    localStorage.setItem('erp_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('erp_po', JSON.stringify(purchaseOrders));
  }, [purchaseOrders]);

  useEffect(() => {
    localStorage.setItem('erp_inventory', JSON.stringify(inventory));
  }, [inventory]);

  const addProject = (item) => {
    const newProj = { id: `PRJ-${Math.floor(100 + Math.random() * 900)}`, progress: 0, spent: '$0', status: 'In Progress', ...item };
    setProjects([newProj, ...projects]);
  };

  const addPurchaseOrder = (item) => {
    const newPO = { id: `PO-${Math.floor(800 + Math.random() * 100)}`, status: 'Pending Approval', date: new Date().toISOString().split('T')[0], ...item };
    setPurchaseOrders([newPO, ...purchaseOrders]);
  };

  const addInventoryItem = (item) => {
    const newItem = { id: `SKU-${Math.floor(100 + Math.random() * 900)}`, status: 'In Stock', ...item };
    setInventory([newItem, ...inventory]);
  };

  return (
    <ErpContext.Provider
      value={{
        projects,
        addProject,
        purchaseOrders,
        addPurchaseOrder,
        inventory,
        addInventoryItem,
      }}
    >
      {children}
    </ErpContext.Provider>
  );
};

export const useErp = () => useContext(ErpContext);
