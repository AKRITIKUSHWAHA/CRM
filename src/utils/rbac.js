/**
 * Role-Based Access Control (RBAC) Engine
 * CRM nErgy Enterprise + OAL Network Marketplace
 */

// CRM Role Definitions & Module Permissions
export const CRM_ROLE_CONFIG = {
  owner: {
    id: 'owner',
    title: 'Company Owner / CEO',
    roleName: 'Company Owner',
    badge: 'Super Admin Access',
    defaultRoute: '/crm/dashboard',
    allowedNavIds: [
      'dashboard',
      'contacts',
      'leads',
      'pipeline',
      'tasks',
      'communication',
      'erp',
      'hr',
      'support',
      'ai',
      'reports',
      'admin',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/contacts',
      '/crm/leads',
      '/crm/pipeline',
      '/crm/tasks',
      '/crm/communication',
      '/crm/erp',
      '/crm/hr',
      '/crm/support',
      '/crm/ai-studio',
      '/crm/analytics',
      '/crm/reports',
      '/crm/admin',
      '/crm/settings',
      '/showcase',
    ],
  },
  sales: {
    id: 'sales',
    title: 'VP of Sales',
    roleName: 'Sales Manager',
    badge: 'Sales & Pipeline Management',
    defaultRoute: '/crm/dashboard',
    allowedNavIds: [
      'dashboard',
      'contacts',
      'leads',
      'pipeline',
      'tasks',
      'communication',
      'erp',
      'ai',
      'reports',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/contacts',
      '/crm/leads',
      '/crm/pipeline',
      '/crm/tasks',
      '/crm/communication',
      '/crm/erp',
      '/crm/erp/sales-orders',
      '/crm/erp/projects',
      '/crm/erp/reports',
      '/crm/ai-studio',
      '/crm/analytics',
      '/crm/reports',
      '/crm/settings',
      '/showcase',
    ],
  },
  finance: {
    id: 'finance',
    title: 'Finance Director',
    roleName: 'Finance Lead',
    badge: 'Ledgers, ERP & Procurement',
    defaultRoute: '/crm/dashboard',
    allowedNavIds: [
      'dashboard',
      'contacts',
      'pipeline',
      'tasks',
      'erp',
      'reports',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/contacts',
      '/crm/pipeline',
      '/crm/tasks',
      '/crm/erp',
      '/crm/erp/finance',
      '/crm/erp/procurement',
      '/crm/erp/sales-orders',
      '/crm/erp/inventory',
      '/crm/erp/supply-chain',
      '/crm/erp/manufacturing',
      '/crm/erp/reports',
      '/crm/erp/projects',
      '/crm/analytics',
      '/crm/reports',
      '/crm/settings',
      '/showcase',
    ],
  },
  hr: {
    id: 'hr',
    title: 'HR Manager',
    roleName: 'HR Director',
    badge: 'Talent & Employee Lifecycle',
    defaultRoute: '/crm/dashboard',
    allowedNavIds: [
      'dashboard',
      'tasks',
      'communication',
      'hr',
      'reports',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/tasks',
      '/crm/communication',
      '/crm/hr',
      '/crm/hr/employees',
      '/crm/hr/candidates',
      '/crm/hr/jobs',
      '/crm/hr/interviews',
      '/crm/hr/reports',
      '/crm/analytics',
      '/crm/reports',
      '/crm/settings',
      '/showcase',
    ],
  },
  employee: {
    id: 'employee',
    title: 'Standard Employee',
    roleName: 'Staff Member',
    badge: 'Operations & Support Queue',
    defaultRoute: '/crm/dashboard',
    allowedNavIds: [
      'dashboard',
      'tasks',
      'communication',
      'support',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/tasks',
      '/crm/communication',
      '/crm/support',
      '/crm/support/tickets',
      '/crm/support/chat',
      '/crm/support/kb',
      '/crm/support/reports',
      '/crm/settings',
      '/showcase',
    ],
  },
};

// OAL Marketplace Role Definitions & Module Permissions
export const OAL_ROLE_CONFIG = {
  borrower: {
    id: 'borrower',
    title: 'Corporate Borrower',
    roleName: 'Borrower Account',
    badge: 'KYC Vault & Underwriting Offers',
    defaultRoute: '/oal/borrower/dashboard',
    allowedNavIds: [
      'borrower-dashboard',
      'borrower-kyc',
      'borrower-app',
      'borrower-offers',
      'borrower-score',
      'borrower-messages',
    ],
    allowedRoutes: [
      '/oal/dashboard',
      '/oal/borrower/dashboard',
      '/oal/borrower/kyc',
      '/oal/borrower/application',
      '/oal/borrower/documents',
      '/oal/borrower/score',
      '/oal/borrower/offers',
      '/oal/borrower/messages',
      '/oal/borrower/referrals',
      '/oal/borrower/support',
      '/oal/borrower/settings',
      '/showcase',
    ],
  },
  lender: {
    id: 'lender',
    title: 'Institutional Lender',
    roleName: 'Lender Account',
    badge: 'Capital Allocation & Term Sheets',
    defaultRoute: '/oal/lender/dashboard',
    allowedNavIds: [
      'lender-dashboard',
      'lender-leads',
      'lender-applications',
      'lender-offers',
    ],
    allowedRoutes: [
      '/oal/dashboard',
      '/oal/lender/dashboard',
      '/oal/lender/leads',
      '/oal/lender/applications',
      '/oal/lender/offers',
      '/oal/lender/analytics',
      '/oal/lender/reports',
      '/oal/lender/settings',
      '/showcase',
    ],
  },
  rep: {
    id: 'rep',
    title: 'Licensed OAL Representative',
    roleName: 'OAL Agent',
    badge: 'Underwriting Desk & Loan Queue',
    defaultRoute: '/oal/rep/dashboard',
    allowedNavIds: [
      'rep-dashboard',
      'rep-borrowers',
    ],
    allowedRoutes: [
      '/oal/dashboard',
      '/oal/rep/dashboard',
      '/oal/rep/borrowers',
      '/oal/rep/applications',
      '/oal/rep/documents',
      '/oal/rep/messages',
      '/oal/rep/offers',
      '/oal/rep/tasks',
      '/showcase',
    ],
  },
  admin: {
    id: 'admin',
    title: 'Platform Master Admin',
    roleName: 'Master Admin',
    badge: 'Master Governance & Scoring Config',
    defaultRoute: '/oal/admin/dashboard',
    allowedNavIds: [
      'admin-dashboard',
      'admin-lenders',
      'admin-scoring',
      'admin-support',
      'admin-audit',
    ],
    allowedRoutes: [
      '/oal/dashboard',
      '/oal/admin/dashboard',
      '/oal/admin/borrowers',
      '/oal/admin/lenders',
      '/oal/admin/applications',
      '/oal/admin/verification',
      '/oal/admin/scoring',
      '/oal/admin/documents',
      '/oal/admin/payments',
      '/oal/admin/subscriptions',
      '/oal/admin/referrals',
      '/oal/admin/ads',
      '/oal/admin/cms',
      '/oal/admin/support',
      '/oal/admin/reports',
      '/oal/admin/audit',
      '/oal/admin/settings',
      '/showcase',
    ],
  },
};

/**
 * Normalizes any role input (object or string) into a standard role ID.
 */
export const normalizeRoleId = (roleInput, product = 'crm') => {
  if (!roleInput) return product === 'crm' ? 'owner' : 'borrower';

  if (typeof roleInput === 'object') {
    if (roleInput.id) return roleInput.id.toLowerCase();
    if (roleInput.roleId) return roleInput.roleId.toLowerCase();
    roleInput = roleInput.role || roleInput.title || '';
  }

  const normalized = String(roleInput).toLowerCase();

  // CRM checks
  if (product === 'crm') {
    if (normalized.includes('owner') || normalized.includes('ceo') || normalized.includes('admin')) return 'owner';
    if (normalized.includes('sales')) return 'sales';
    if (normalized.includes('finance')) return 'finance';
    if (normalized.includes('hr')) return 'hr';
    if (normalized.includes('employee') || normalized.includes('staff')) return 'employee';
    return 'owner';
  }

  // OAL checks
  if (normalized.includes('borrower')) return 'borrower';
  if (normalized.includes('lender')) return 'lender';
  if (normalized.includes('rep') || normalized.includes('agent')) return 'rep';
  if (normalized.includes('admin')) return 'admin';

  return 'borrower';
};

/**
 * Returns role configuration for the active user.
 */
export const getRoleConfig = (userOrRoleId, product = 'crm') => {
  const roleId = normalizeRoleId(userOrRoleId, product);
  const configMap = product === 'crm' ? CRM_ROLE_CONFIG : OAL_ROLE_CONFIG;
  return configMap[roleId] || (product === 'crm' ? CRM_ROLE_CONFIG.owner : OAL_ROLE_CONFIG.borrower);
};

/**
 * Filters navigation items array to only include items permitted for the role.
 */
export const getFilteredNavigation = (rawItems, product = 'crm', userOrRoleId) => {
  const config = getRoleConfig(userOrRoleId, product);
  const allowedIds = new Set(config.allowedNavIds);
  return rawItems.filter((item) => allowedIds.has(item.id));
};

/**
 * Checks if a user has permission to visit a specific path.
 */
export const isRouteAllowed = (path, product = 'crm', userOrRoleId) => {
  if (!path) return true;
  const config = getRoleConfig(userOrRoleId, product);

  // If super owner of CRM, allow all CRM routes
  if (product === 'crm' && config.id === 'owner') return true;

  // Clean path (strip trailing slashes and query strings)
  const cleanPath = path.split('?')[0].replace(/\/$/, '') || '/';

  // Check direct match or route prefix match
  return config.allowedRoutes.some((allowed) => {
    const cleanAllowed = allowed.replace(/\/$/, '');
    if (cleanPath === cleanAllowed) return true;
    // Allow nested IDs (e.g. /crm/contacts/123 matches /crm/contacts)
    if (cleanPath.startsWith(`${cleanAllowed}/`)) return true;
    return false;
  });
};

/**
 * Returns the default fallback route for a given role.
 */
export const getDefaultRouteForRole = (product = 'crm', userOrRoleId) => {
  const config = getRoleConfig(userOrRoleId, product);
  return config.defaultRoute;
};
