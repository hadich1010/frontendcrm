

export type CustomerStatus = 
  | 'pending_payment' 
  | 'waiting_merat' 
  | 'waiting_account' 
  | 'waiting_completion' 
  | 'rejected' 
  | 'completed';

export interface Customer {
  id: string;
  status: CustomerStatus;
  tracking_code: string;
  // Database Mapped Fields
  full_name: string;
  fother_name: string;
  phone_number: string; // Mobile 1
  national_id: string;
  seriBirth_certificate_number: string; // سریال شناسنامه
  national_id_card_series: string; // سریال پشت کارت ملی
  Date_of_birth: string;
  phone_number_two: string; // Mobile 2
  landline: string; // تلفن ثابت
  home_address: string;
  
  // Job & Financial
  jobTitle: string;
  position: string;
  experienceYears: string;
  workPhone: string;
  salary: string;
  workAddress: string;
  
  // Meta
  bankName: string;
  guaranteeType: string;
  acquiredVia: string;
  notes: string;

  // Loan and Facility specific fields (Requested by Print and View modules)
  serviceType?: string;
  loanAmount?: string;
  guarantorName?: string;
  deductions?: string;
  officeFee?: string;
  
  // Legacy support for other parts of app
  fullName?: string; 
  mobile?: string;
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