import React, { createContext, useContext, useState, useEffect } from 'react';

const HrContext = createContext();

const initialEmployees = [
  { id: 'EMP-101', name: 'Alexander Wright', role: 'CEO / Owner', dept: 'Executive', email: 'a.wright@nergy.io', salary: '$240,000', status: 'Active' },
  { id: 'EMP-102', name: 'Sarah Jenkins', role: 'VP of Sales', dept: 'Sales', email: 's.jenkins@nergy.io', salary: '$160,000', status: 'Active' },
  { id: 'EMP-103', name: 'David Chen', role: 'Finance Director', dept: 'Finance', email: 'd.chen@nergy.io', salary: '$150,000', status: 'Active' },
  { id: 'EMP-104', name: 'Elena Rostova', role: 'HR Manager', dept: 'Human Resources', email: 'e.rostova@nergy.io', salary: '$120,000', status: 'Active' },
];

const initialCandidates = [
  { id: 'CND-201', name: 'Marcus Vance', position: 'Senior Full Stack Engineer', stage: 'Technical Interview', score: '94%', appliedDate: '2026-02-14' },
  { id: 'CND-202', name: 'Laura Lin', position: 'Financial Controller', stage: 'Screening', score: '88%', appliedDate: '2026-02-18' },
];

export const HrProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('hr_employees');
    return saved ? JSON.parse(saved) : initialEmployees;
  });

  const [candidates, setCandidates] = useState(() => {
    const saved = localStorage.getItem('hr_candidates');
    return saved ? JSON.parse(saved) : initialCandidates;
  });

  useEffect(() => {
    localStorage.setItem('hr_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('hr_candidates', JSON.stringify(candidates));
  }, [candidates]);

  const addEmployee = (item) => {
    const newEmp = { id: `EMP-${Math.floor(100 + Math.random() * 900)}`, status: 'Active', ...item };
    setEmployees([newEmp, ...employees]);
  };

  const updateEmployee = (updatedItem) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedItem.id ? { ...emp, ...updatedItem } : emp))
    );
  };

  return (
    <HrContext.Provider value={{ employees, addEmployee, updateEmployee, candidates }}>
      {children}
    </HrContext.Provider>
  );
};

export const useHr = () => useContext(HrContext);
