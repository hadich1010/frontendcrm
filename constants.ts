
import { Customer, User } from './types';

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    status: 'pending_payment',
    tracking_code: '458210',
    full_name: 'علی محمدی',
    fother_name: 'رضا',
    national_id: '0012345678',
    seriBirth_certificate_number: '124578',
    national_id_card_series: 'A584721',
    Date_of_birth: '1370/۰۵/۱۲',
    phone_number: '09123456789',
    phone_number_two: '09351112233',
    landline: '02188884455',
    home_address: 'تهران، سعادت آباد، خیابان سرو، پلاک ۱۰',
    jobTitle: 'کارمند رسمی',
    position: 'مدیر فروش',
    experienceYears: '۸',
    workPhone: '02144445566',
    salary: '۲۵,۰۰۰,۰۰۰',
    workAddress: 'تهران، میرداماد، شرکت توسعه البرز',
    bankName: 'resalat',
    guaranteeType: 'چک صیادی',
    acquiredVia: 'گوگل',
    notes: 'مشتری با سابقه و خوش حساب'
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    fullName: 'مدیر ارشد سامانه',
    username: 'admin_ata',
    role: 'admin',
    lastLogin: '1402/12/28 10:30',
    status: 'active'
  }
];
