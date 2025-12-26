
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Phone, Eye, Edit, Printer, ChevronLeft, CreditCard } from 'lucide-react';
import { MOCK_CUSTOMERS } from '../constants';
import { toPersianDigits, formatCurrency } from '../utils/format';

const CustomerList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    return MOCK_CUSTOMERS.filter(c => 
      c.fullName.includes(searchTerm) || c.nationalId.includes(searchTerm)
    );
  }, [searchTerm]);

  const getStatusLabel = (status: string) => {
    const map: any = {
      'pending_payment': { text: 'منتظر پرداخت', color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' },
      'waiting_merat': { text: 'در انتظار مرات', color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' },
      'rejected': { text: 'رد شده', color: 'bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400' },
      'completed': { text: 'تکمیل مدارک', color: 'bg-slate-500/10 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400' },
    };
    return map[status] || { text: 'نامشخص', color: 'bg-gray-100 text-gray-600' };
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 theme-transition">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">لیست مشتریان</h1>
          <p className="text-slate-500 mt-2 font-bold uppercase tracking-widest text-xs opacity-60">Directory of all customers</p>
        </div>
        <Link 
          to="/add-customer" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
        >
          <Plus size={20} />
          <span className="font-black">مشتری جدید</span>
        </Link>
      </header>

      <div className="glass-card p-4 flex items-center gap-4 border-white/40">
        <div className="relative flex-1">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="جستجو در بین پرونده‌ها (نام یا کد ملی)..." 
            className="w-full pr-14 pl-6 py-4 bg-white/40 dark:bg-white/5 border-none rounded-2xl focus:bg-white dark:focus:bg-slate-900 transition-all font-bold outline-none text-slate-900 dark:text-white shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(toPersianDigits(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((customer) => {
          const status = getStatusLabel(customer.status);
          return (
            <div key={customer.id} className="glass-card p-6 flex flex-col lg:flex-row items-center justify-between gap-6 hover:translate-x-[-8px] transition-all cursor-default border-white/60 group">
              <div className="flex items-center gap-6 flex-1 w-full lg:w-auto">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-[1.25rem] flex items-center justify-center font-black text-2xl shadow-xl group-hover:rotate-6 transition-transform">
                  {customer.fullName.charAt(0)}
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-xl text-slate-900 dark:text-white">{customer.fullName}</h4>
                  <div className="flex items-center gap-4 text-sm font-bold text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1.5"><Phone size={14} className="text-blue-500" /> {toPersianDigits(customer.mobile)}</span>
                    <span className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                    <span>کد ملی: {toPersianDigits(customer.nationalId)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-around w-full lg:w-auto gap-12 text-center border-y lg:border-none border-slate-100 dark:border-white/5 py-4 lg:py-0">
                <div className="space-y-1">
                  <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">مبلغ تسهیلات</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white digits-fa">{formatCurrency(customer.loanAmount)} <span className="text-[10px] opacity-40">تومان</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">وضعیت فعلی</p>
                  <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black ${status.color}`}>
                    {status.text}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                <Link title="مشاهده پروفایل" to={`/view-customer/${customer.id}`} className="p-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl hover:bg-blue-600 transition-all shadow-md"><Eye size={20} /></Link>
                <Link title="ویرایش" to={`/edit-customer/${customer.id}`} className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-md"><Edit size={20} /></Link>
                <Link title="چاپ" to={`/print/${customer.id}`} className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-md"><Printer size={20} /></Link>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="glass-card p-24 text-center opacity-40">
            <Search size={64} className="mx-auto text-slate-300 mb-4" />
            <p className="font-black text-xl text-slate-800 dark:text-slate-100">هیچ موردی مطابق جستجوی شما یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
