
export interface BankInfo {
  name: string;
  label: string;
  color: string;
  gradient: string;
  logo: string;
}

const banks: Record<string, BankInfo> = {
  '603799': { name: 'melli', label: 'بانک ملی ایران', color: '#c02a2a', gradient: 'from-red-700 to-red-900', logo: 'Melli.svg' },
  '627317': { name: 'resalat', label: 'بانک قرض‌الحسنه رسالت', color: '#005aab', gradient: 'from-blue-700 to-blue-900', logo: 'Resalat.svg' },
  '504172': { name: 'resalat', label: 'بانک قرض‌الحسنه رسالت', color: '#005aab', gradient: 'from-[#004a8e] to-[#002a54]', logo: 'Resalat.svg' },
  '505801': { name: 'kosar', label: 'موسسه کوثر', color: '#1e3a8a', gradient: 'from-blue-900 to-slate-900', logo: 'Kosar.svg' },
};

export const detectBank = (cardNumber: string): BankInfo => {
  const bin = cardNumber.replace(/\D/g, '').substring(0, 6);
  return banks[bin] || { 
    name: 'default', 
    label: 'کارت بانکی هوشمند', 
    color: '#4F46E5', 
    gradient: 'from-slate-800 to-slate-950', 
    logo: 'Default.svg' 
  };
};

export const formatCardNumber = (number: string) => {
  const cleanNumber = number.replace(/\D/g, '').substring(0, 16);
  return cleanNumber.replace(/(\d{4})(?=\d)/g, '$1  ');
};
