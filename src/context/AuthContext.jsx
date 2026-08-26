import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const defaultPermissionsMatrix = {
  Owner: { View: true, Create: true, Edit: true, Delete: true, Export: true, Admin: true },
  Admin: { View: true, Create: true, Edit: true, Delete: true, Export: true, Admin: true },
  Sales: { View: true, Create: true, Edit: true, Delete: false, Export: true, Admin: false },
  HR: { View: true, Create: true, Edit: true, Delete: false, Export: true, Admin: false },
  Finance: { View: true, Create: true, Edit: true, Delete: false, Export: true, Admin: false },
  Employee: { View: true, Create: false, Edit: false, Delete: false, Export: false, Admin: false },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('crm_user');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'Alexander Wright',
      email: 'a.wright@nergy.io',
      role: 'Company Owner',
      company: 'nErgy Enterprise Logistics',
      tenantId: 'TENANT-08492',
      avatar: null,
    };
  });

  const [companyData, setCompanyData] = useState(() => {
    const saved = localStorage.getItem('crm_company_setup');
    return saved ? JSON.parse(saved) : {
      companyName: 'nErgy Enterprise Logistics',
      legalName: 'nErgy Global Solutions Inc.',
      businessEmail: 'contact@nergy.io',
      phone: '+1 (555) 019-2834',
      taxId: 'US-99201948',
      industry: 'Logistics & Supply Chain',
      address: '100 Enterprise Way, Suite 400',
      city: 'Austin',
      state: 'TX',
      country: 'United States',
      zipCode: '78701',
      timezone: 'UTC-6 (Central Time)',
      currency: 'USD ($)',
    };
  });

  const [invitedEmployees, setInvitedEmployees] = useState(() => {
    const saved = localStorage.getItem('crm_invited_employees');
    return saved ? JSON.parse(saved) : [
      { name: 'Sarah Jenkins', email: 's.jenkins@nergy.io', role: 'Sales' },
      { name: 'David Chen', email: 'd.chen@nergy.io', role: 'Finance' },
      { name: 'Elena Rostova', email: 'e.rostova@nergy.io', role: 'HR' },
    ];
  });

  const [rolesPermissions, setRolesPermissions] = useState(() => {
    const saved = localStorage.getItem('crm_roles_permissions');
    return saved ? JSON.parse(saved) : defaultPermissionsMatrix;
  });

  const [productMode, setProductMode] = useState('crm');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    localStorage.setItem('crm_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('crm_company_setup', JSON.stringify(companyData));
  }, [companyData]);

  useEffect(() => {
    localStorage.setItem('crm_invited_employees', JSON.stringify(invitedEmployees));
  }, [invitedEmployees]);

  useEffect(() => {
    localStorage.setItem('crm_roles_permissions', JSON.stringify(rolesPermissions));
  }, [rolesPermissions]);

  const login = (userData, mode = 'crm') => {
    setUser(userData || user);
    setProductMode(mode);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchProduct = (mode) => {
    setProductMode(mode);
  };

  const updateCompanyData = (data) => {
    setCompanyData((prev) => ({ ...prev, ...data }));
  };

  const updateInvitedEmployees = (employees) => {
    setInvitedEmployees(employees);
  };

  const updateRolesPermissions = (matrix) => {
    setRolesPermissions(matrix);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        companyData,
        updateCompanyData,
        invitedEmployees,
        updateInvitedEmployees,
        rolesPermissions,
        updateRolesPermissions,
        productMode,
        switchProduct,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
