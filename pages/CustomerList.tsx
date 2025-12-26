
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Eye, Edit, Printer, ChevronLeft, ChevronRight, PhoneCall } from 'lucide-react';
import { MOCK_CUSTOMERS } from '../constants';
import { toPersianDigits } from '../utils/format';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

const CustomerList: React.FC = () => {
  const { isMobile, isTablet } = useWindowDimensions();
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return MOCK_CUSTOMERS.filter(c => {
      const name = (c.full_name || c.fullName || '').toLowerCase();
      const id = (c.id || '').toLowerCase();
      const term = searchTerm.toLowerCase();
      return name.includes(term) || id.includes(term);
    });
  }, [searchTerm]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  const getStatusBadge = (status: string) => {
    const map: any = {
      'pending_payment': { text: 'منتظر پرداخت', class: 'bg-amber-50 text-amber-600' },
      'waiting_merat': { text: 'در انتظار مرات', class: 'bg-blue-50 text-blue-600' },
      'rejected': { text: 'رد شده', class: 'bg-rose-50 text-rose-600' },
      'completed': { text: 'تکمیل شده', class: 'bg-emerald-50 text-emerald-600' },
      'waiting_account': { text: 'در انتظار افتتاح حساب', class: 'bg-indigo-50 text-indigo-600' },
      'waiting_completion': { text: 'در انتظار تکمیل پرونده', class: 'bg-slate-50 text-slate-600' },
    };
    const s = map[status] || { text: 'نامشخص', class: 'bg-gray-50 text-gray-600' };
    return <span className={`px-3 py-1 rounded-full text-[10px] font-black whitespace-nowrap ${s.class}`}>{s.text}</span>;
  };

  return (
    <div className="space-y-6 pb-20 text-right">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-black text-slate-900 leading-tight">مشتریان</h1>
      </header>

      <div className="flex flex-row flex-wrap lg:flex-nowrap gap-3 items-center bg-white p-3 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="relative flex-1 min-w-[150px]">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="جستجو..." 
            className="w-full pr-12 pl-4 py-3 bg-slate-50 border-none rounded-xl font-bold outline-none text-slate-900 focus:ring-4 focus:ring-indigo-500/5 transition-all text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
              {[10, 20].map(size => (
                <button 
                  key={size}
                  onClick={() => { setPageSize(size); setCurrentPage(1); }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${pageSize === size ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  {toPersianDigits(size)}
                </button>
              ))}
            </div>
            
            <Link to="/add-customer" className="bg-indigo-600 text-white p-3 rounded-xl flex items-center justify-center active:scale-90 transition-transform shadow-lg shadow-indigo-100">
                <Plus size={20} />
            </Link>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        {isMobile || isTablet ? (
          <div className="divide-y divide-slate-50">
            {paginated.map((customer) => (
              <div key={customer.id} className="p-5 flex flex-col gap-4 active:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-black text-slate-900 text-base">{customer.full_name || customer.fullName}</h4>
                    <span className="text-[11px] font-bold text-slate-400 digits-fa">پرونده: {toPersianDigits(customer.id.padStart(4, '0'))}</span>
                  </div>
                  {getStatusBadge(customer.status)}
                </div>
                
                <div className="flex justify-between items-center">
                  <a href={`tel:${customer.phone_number || customer.mobile}`} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-black text-[11px]">
                    <PhoneCall size={14} />
                    <span className="digits-fa">{toPersianDigits(customer.phone_number || customer.mobile || '')}</span>
                  </a>
                  <div className="flex gap-2">
                    <Link to={`/view-customer/${customer.id}`} className="p-2.5 bg-slate-900 text-white rounded-xl shadow-md"><Eye size={16} /></Link>
                    <Link to={`/edit-customer/${customer.id}`} className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100"><Edit size={16} /></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-slate-50 text-slate-400 border-b border-slate-100">
                <tr className="text-[10px] font-black uppercase tracking-widest">
                  <th className="px-8 py-6">شماره پرونده</th>
                  <th className="px-8 py-6">نام و نام خانوادگی</th>
                  <th className="px-8 py-6">تماس</th>
                  <th className="px-8 py-6">وضعیت</th>
                  <th className="px-8 py-6 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.map((customer) => (
                  <tr key={customer.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-8 py-5 font-black text-slate-400 digits-fa text-sm">{toPersianDigits(customer.id.padStart(4, '0'))}</td>
                    <td className="px-8 py-5 font-black text-slate-800">{customer.full_name || customer.fullName}</td>
                    <td className="px-8 py-5">
                      <a href={`tel:${customer.phone_number || customer.mobile}`} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-bold text-sm digits-fa transition-colors">
                        {toPersianDigits(customer.phone_number || customer.mobile || '')}
                      </a>
                    </td>
                    <td className="px-8 py-5">{getStatusBadge(customer.status)}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <Link to={`/view-customer/${customer.id}`} className="p-2.5 bg-slate-900 text-white rounded-xl shadow-md hover:scale-105 transition-transform"><Eye size={16} /></Link>
                        <Link to={`/edit-customer/${customer.id}`} className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:scale-105 transition-transform"><Edit size={16} /></Link>
                        <Link to={`/print/${customer.id}`} className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl hover:scale-105 transition-transform"><Printer size={16} /></Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
