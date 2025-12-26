
export type CustomerStatus = 'pending_payment' | 'waiting_merat' | 'rejected' | 'completed';

export interface Customer {
  id: string;
  status: CustomerStatus;
  // Personal
  fullName: string;
  fatherName: string;
  nationalId: string;
  cardBackId: string;
  mobile: string;
  fixedPhone: string;
  secondMobile: string;
  address: string;
  certificateId: string;
  birthDate: string;
  // Job
  jobTitle: string;
  workPhone: string;
  experienceYears: string;
  position: string;
  salary: string;
  workAddress: string;
  // Supplementary
  serviceType: string;
  // Loan
  startDate: string;
  endDate: string;
  guarantorMobile: string;
  guarantorName: string;
  notes: string;
  // Status
  guaranteeType: string;
  officeFee: string;
  loanAmount: string;
  deductions: string;
  acquiredVia: string;
  referrer: string;
  matchedAmount: string; // مبلغ متناسب تایید شده
}

export interface EstimationRow {
  month: number;
  repayment: string;
  twelveMonth: string;
  tenMonth: string;
  finalAmount: string;
  profit: string;
}

export type UserRole = 'admin' | 'staff';

export interface User {
  id: string;
  fullName: string;
  username: string;
  role: UserRole;
  lastLogin: string;
  status: 'active' | 'inactive';
}

// Chat Types
export interface Message {
  id: string;
  text: string;
  sender: 'support' | 'customer';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface ChatRoom {
  id: string;
  customerId: string;
  customerName: string;
  lastMessage: string;
  lastUpdate: string;
  unreadCount: number;
  online: boolean;
  avatar?: string;
}
