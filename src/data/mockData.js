import {
  LayoutDashboard,
  Users,
  Target,
  Kanban,
  CheckSquare,
  MessageSquare,
  Boxes,
  UserCheck,
  LifeBuoy,
  Sparkles,
  ShieldCheck,
  Settings,
  DollarSign,
  Landmark,
  FileText,
  CreditCard,
  Building2,
  TrendingUp,
  History,
  BookOpen
} from 'lucide-react';

export const crmNavigation = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/crm/dashboard', section: 'Core Modules' },
  { id: 'contacts', label: 'Contacts', icon: Users, path: '/crm/contacts', section: 'Core Modules' },
  { id: 'leads', label: 'Leads Directory', icon: Target, path: '/crm/leads', section: 'Core Modules' },
  { id: 'pipeline', label: 'Sales Pipeline', icon: Kanban, path: '/crm/pipeline', section: 'Core Modules' },
  { id: 'tasks', label: 'Tasks & Reminders', icon: CheckSquare, path: '/crm/tasks', section: 'Core Modules' },
  { id: 'communication', label: 'Communication Hub', icon: MessageSquare, path: '/crm/communication', section: 'Core Modules' },

  { id: 'erp', label: 'ERP & Operations', icon: Boxes, path: '/crm/erp', section: 'Enterprise Suites' },
  { id: 'hr', label: 'HR & Recruiting', icon: UserCheck, path: '/crm/hr', section: 'Enterprise Suites' },
  { id: 'support', label: 'Customer Support', icon: LifeBuoy, path: '/crm/support', section: 'Enterprise Suites' },

  { id: 'ai', label: 'AI Content Studio', icon: Sparkles, path: '/crm/ai-studio', section: 'Intelligence & Data' },
  { id: 'reports', label: 'Reports Hub', icon: FileText, path: '/crm/reports', section: 'Intelligence & Data' },

  { id: 'admin', label: 'Administration', icon: ShieldCheck, path: '/crm/admin', section: 'System Governance' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/crm/settings', section: 'System Governance' },
];

export const oalNavigation = [
  // Borrower Persona Links
  { id: 'borrower-dashboard', label: 'Borrower Overview', icon: LayoutDashboard, path: '/oal/borrower/dashboard', section: 'Borrower Portal' },
  { id: 'borrower-kyc', label: 'KYC Vault', icon: ShieldCheck, path: '/oal/borrower/kyc', section: 'Borrower Portal' },
  { id: 'borrower-app', label: 'Loan Application', icon: FileText, path: '/oal/borrower/application', section: 'Borrower Portal' },
  { id: 'borrower-offers', label: 'Lender Offers', icon: CreditCard, path: '/oal/borrower/offers', section: 'Borrower Portal' },
  { id: 'borrower-score', label: 'AI Risk Rating', icon: Sparkles, path: '/oal/borrower/score', section: 'Borrower Portal' },
  { id: 'borrower-messages', label: 'Licensed Agent Chat', icon: MessageSquare, path: '/oal/borrower/messages', section: 'Borrower Portal' },

  // Lender Persona Links
  { id: 'lender-dashboard', label: 'Lender Portal', icon: Landmark, path: '/oal/lender/dashboard', section: 'Institutional Lender' },
  { id: 'lender-leads', label: 'Qualified Leads Pool', icon: Target, path: '/oal/lender/leads', section: 'Institutional Lender' },
  { id: 'lender-applications', label: 'Active Underwriting', icon: FileText, path: '/oal/lender/applications', section: 'Institutional Lender' },
  { id: 'lender-offers', label: 'Term Sheets Manager', icon: CreditCard, path: '/oal/lender/offers', section: 'Institutional Lender' },

  // OAL Rep Persona Links
  { id: 'rep-dashboard', label: 'OAL Agent Desk', icon: UserCheck, path: '/oal/rep/dashboard', section: 'OAL Licensed Agent' },
  { id: 'rep-borrowers', label: 'Borrower Queue', icon: Users, path: '/oal/rep/borrowers', section: 'OAL Licensed Agent' },

  // Master Admin Links
  { id: 'admin-dashboard', label: 'Platform Admin', icon: ShieldCheck, path: '/oal/admin/dashboard', section: 'Master Governance' },
  { id: 'admin-lenders', label: 'Lender Governance', icon: Building2, path: '/oal/admin/lenders', section: 'Master Governance' },
  { id: 'admin-scoring', label: 'AI Scoring Config', icon: TrendingUp, path: '/oal/admin/scoring', section: 'Master Governance' },
  { id: 'admin-support', label: 'AI Support Desk', icon: LifeBuoy, path: '/oal/admin/support', section: 'Master Governance' },
  { id: 'admin-audit', label: 'Audit Log Feed', icon: History, path: '/oal/admin/audit', section: 'Master Governance' },
];

export const mockNotifications = [
  { id: '1', title: 'New Lead Assigned: BioGenix Labs ($750k)', time: '10 mins ago' },
  { id: '2', title: 'Lender Offer Submitted by Vanguard Capital', time: '1 hour ago' },
  { id: '3', title: 'KYC Document Verification Passed', time: '3 hours ago' },
];

export const initialContacts = [
  {
    id: 'CNT-101',
    name: 'Eleanor Vance',
    company: 'Apex Global Technologies',
    email: 'e.vance@apex.io',
    phone: '+1 (555) 234-8901',
    type: 'Enterprise Client',
    owner: 'Alexander Wright',
    status: 'Active',
    lastActivity: '2 hours ago',
    createdDate: '2026-01-15',
    notesCount: 4,
    dealsCount: 2,
    totalValue: '$480,000',
  },
  {
    id: 'CNT-102',
    name: 'Marcus Sterling',
    company: 'Vanguard Capital Partners',
    email: 'm.sterling@vanguard.com',
    phone: '+1 (555) 456-7890',
    type: 'Investor',
    owner: 'Sarah Jenkins',
    status: 'Qualified',
    lastActivity: '1 day ago',
    createdDate: '2026-02-01',
    notesCount: 2,
    dealsCount: 1,
    totalValue: '$1,200,000',
  },
  {
    id: 'CNT-103',
    name: 'Dr. Aris Thorne',
    company: 'BioGenix Labs',
    email: 'a.thorne@biogenix.org',
    phone: '+1 (555) 678-1234',
    type: 'Borrower Partner',
    owner: 'Alexander Wright',
    status: 'Pending KYC',
    lastActivity: '3 hours ago',
    createdDate: '2026-02-10',
    notesCount: 6,
    dealsCount: 3,
    totalValue: '$750,000',
  },
];

export const initialLeads = [
  {
    id: 'LED-201',
    name: 'Samantha Ray',
    company: 'CloudScale Infra',
    email: 's.ray@cloudscale.net',
    phone: '+1 (555) 345-6789',
    source: 'Website Form',
    territory: 'North America',
    owner: 'Sarah Jenkins',
    status: 'New',
    score: 85,
    value: '$250,000',
    createdDate: '2026-02-20',
  },
];

export const initialDeals = [
  { id: 'DEAL-301', title: 'Enterprise Logistics Expansion', customer: 'Apex Global Technologies', value: '$480,000', owner: 'Alexander Wright', stage: 'Negotiation', probability: '85%', expectedClose: '2026-03-15' },
];

export const initialTasks = [
  { id: 'TSK-401', title: 'Send revised commercial proposal', contact: 'Eleanor Vance', priority: 'High', dueDate: '2026-02-28', status: 'Pending', assignedTo: 'Alexander Wright', reminder: '9:00 AM' },
];

export const initialMessages = [
  { id: 'MSG-501', type: 'email', sender: 'Eleanor Vance', recipient: 'a.wright@nergy.io', subject: 'Re: Enterprise Logistics Master Service Agreement', body: 'Hi Alexander, our legal team reviewed the contract terms and approved the SLAs.', timestamp: '10:42 AM' },
];
