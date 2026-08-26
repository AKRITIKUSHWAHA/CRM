import React, { createContext, useContext, useState, useEffect } from 'react';
import { isRouteAllowed, getRoleConfig, getDefaultRouteForRole, normalizeRoleId } from '../utils/rbac';

const AuthContext = createContext();

const defaultPermissionsMatrix = {
  Owner: { View: true, Create: true, Edit: true, Delete: true, Export: true, Admin: true },
  Admin: { View: true, Create: true, Edit: true, Delete: true, Export: true, Admin: true },
  Sales: { View: true, Create: true, Edit: true, Delete: false, Export: true, Admin: false },
  HR: { View: true, Create: true, Edit: true, Delete: false, Export: true, Admin: false },
  Finance: { View: true, Create: true, Edit: true, Delete: false, Export: true, Admin: false },
  Employee: { View: true, Create: false, Edit: false, Delete: false, Export: false, Admin: false },
};

export const crmRoles = [
  {
    id: 'owner',
    title: 'Company Owner / CEO',
    name: 'Alexander Wright',
    email: 'a.wright@nergy.io',
    role: 'Company Owner',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'sales',
    title: 'VP of Sales',
    name: 'Sarah Jenkins',
    email: 's.jenkins@nergy.io',
    role: 'Sales Manager',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'finance',
    title: 'Finance Director',
    name: 'David Chen',
    email: 'd.chen@nergy.io',
    role: 'Finance Lead',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'hr',
    title: 'HR Manager',
    name: 'Elena Rostova',
    email: 'e.rostova@nergy.io',
    role: 'HR Director',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'employee',
    title: 'Standard Employee',
    name: 'Marcus Vance',
    email: 'm.vance@nergy.io',
    role: 'Staff Member',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
];

export const oalRoles = [
  {
    id: 'borrower',
    title: 'Corporate Borrower',
    name: 'Dr. Aris Thorne',
    email: 'a.thorne@biogenix.org',
    role: 'Borrower Account',
    company: 'BioGenix Labs Inc.',
    tenantId: 'OAL-BORROWER-9910',
    avatar: null,
  },
  {
    id: 'lender',
    title: 'Institutional Lender',
    name: 'Marcus Sterling',
    email: 'm.sterling@vanguard.com',
    role: 'Lender Account',
    company: 'Vanguard Capital Debt Fund',
    tenantId: 'OAL-LENDER-9910',
    avatar: null,
  },
  {
    id: 'rep',
    title: 'Licensed OAL Representative',
    name: 'Sarah Jenkins',
    email: 'agent.sarah@oalnetwork.com',
    role: 'OAL Agent',
    company: 'OAL Network Services',
    tenantId: 'OAL-REP-9910',
    avatar: null,
  },
  {
    id: 'admin',
    title: 'Platform Master Admin',
    name: 'Alexander Wright',
    email: 'admin.alexander@oalnetwork.com',
    role: 'Master Admin',
    company: 'OAL Network Marketplace',
    tenantId: 'OAL-ADMIN-9910',
    avatar: null,
  },
];

const defaultCrmUser = crmRoles[0];
const defaultOalUser = oalRoles[0];

export const AuthProvider = ({ children }) => {
  const [crmUser, setCrmUser] = useState(() => {
    const saved = localStorage.getItem('crm_user');
    return saved ? JSON.parse(saved) : defaultCrmUser;
  });

  const [oalUser, setOalUser] = useState(() => {
    const saved = localStorage.getItem('oal_user');
    return saved ? JSON.parse(saved) : defaultOalUser;
  });

  const [isCrmAuthenticated, setIsCrmAuthenticated] = useState(() => {
    const saved = localStorage.getItem('crm_is_authenticated');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [isOalAuthenticated, setIsOalAuthenticated] = useState(() => {
    const saved = localStorage.getItem('oal_is_authenticated');
    return saved !== null ? JSON.parse(saved) : true;
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

  useEffect(() => {
    localStorage.setItem('crm_user', JSON.stringify(crmUser));
  }, [crmUser]);

  useEffect(() => {
    localStorage.setItem('oal_user', JSON.stringify(oalUser));
  }, [oalUser]);

  useEffect(() => {
    localStorage.setItem('crm_is_authenticated', JSON.stringify(isCrmAuthenticated));
  }, [isCrmAuthenticated]);

  useEffect(() => {
    localStorage.setItem('oal_is_authenticated', JSON.stringify(isOalAuthenticated));
  }, [isOalAuthenticated]);

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
    let finalUser = userData;
    if (userData && !userData.id) {
      const list = mode === 'crm' ? crmRoles : oalRoles;
      const matched = list.find((r) => r.email === userData.email || r.name === userData.name);
      if (matched) {
        finalUser = { ...matched, ...userData, id: matched.id };
      }
    }

    if (mode === 'crm') {
      setCrmUser(finalUser || defaultCrmUser);
      setIsCrmAuthenticated(true);
    } else {
      setOalUser(finalUser || defaultOalUser);
      setIsOalAuthenticated(true);
    }
  };

  const switchRole = (roleObj, mode = 'crm') => {
    const newUser = {
      id: roleObj.id || (mode === 'crm' ? 'owner' : 'borrower'),
      name: roleObj.name,
      email: roleObj.email,
      role: roleObj.role || roleObj.title,
      company: roleObj.company || (mode === 'crm' ? 'nErgy Enterprise Logistics' : 'OAL Network Marketplace'),
      tenantId: roleObj.tenantId || (mode === 'crm' ? 'TENANT-08492' : `OAL-${(roleObj.id || 'ROLE').toUpperCase()}-9910`),
      avatar: roleObj.avatar || null,
    };
    if (mode === 'crm') {
      setCrmUser(newUser);
      setIsCrmAuthenticated(true);
    } else {
      setOalUser(newUser);
      setIsOalAuthenticated(true);
    }
    return newUser;
  };

  const logout = (mode = 'crm') => {
    if (mode === 'crm') {
      setIsCrmAuthenticated(false);
    } else {
      setIsOalAuthenticated(false);
    }
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

  const canAccess = (path, mode = 'crm') => {
    const targetUser = mode === 'crm' ? crmUser : oalUser;
    return isRouteAllowed(path, mode, targetUser);
  };

  const getActiveRoleConfig = (mode = 'crm') => {
    const targetUser = mode === 'crm' ? crmUser : oalUser;
    return getRoleConfig(targetUser, mode);
  };

  const getDefaultRoute = (mode = 'crm') => {
    const targetUser = mode === 'crm' ? crmUser : oalUser;
    return getDefaultRouteForRole(mode, targetUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user: crmUser,
        crmUser,
        oalUser,
        setUser: setCrmUser,
        setCrmUser,
        setOalUser,
        isCrmAuthenticated,
        isOalAuthenticated,
        companyData,
        updateCompanyData,
        invitedEmployees,
        updateInvitedEmployees,
        rolesPermissions,
        updateRolesPermissions,
        login,
        switchRole,
        logout,
        canAccess,
        getActiveRoleConfig,
        getDefaultRoute,
        normalizeRoleId,
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
