
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Bell, Plus, User as UserIcon, 
  Wifi, ShieldCheck, ChevronLeft, Menu
} from 'lucide-react';
import { 
  LineChart, Line, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, XAxis
} from 'recharts';
import { formatCurrency, toPersianDigits } from '../utils/format';
import { detectBank } from '../utils/bankUtils';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

const Dashboard: React.FC = () => {
  const { width, isMobile } = useWindowDimensions();
  const [cardNumber, setCardNumber] = useState('5041721012345678');
  const bankInfo = useMemo(() => detectBank(cardNumber), [cardNumber]);

  const lineData = [{name:'فروردین',v:40},{name:'اردیبهشت',v:75},{name:'خرداد',v:65},{name:'تیر',v:90},{name:'مرداد',v:85},{name:'شهریور',v:110}];
  const barData = [{name:'۱۴۰۱',v:4500},{name:'۱۴۰۲',v:8200},{name:'۱۴۰۳',v:9800}];

  return (
    <div className="flex flex-col w-full h-full gap-6 pb-20">
      
      {/* Search Header - Fully Flexible */}
      <header className="flex flex-col sm:flex-row items-center gap-4 w-full bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm">
        <div className="flex items-center flex-1 w-full gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100 group focus-within:bg-white transition-all">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="جستجوی سریع..." 
            className="bg-transparent outline-none flex-1 text-xs font-bold text-slate-900" 
          />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 relative">
            <Bell size={20} />
            <div className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></div>
          </button>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[11px] font-black text-slate-900">جونس کانوالد</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase">Admin Panel</span>
          </div>
          <img src="https://i.pravatar.cc/100?u=jonas" className="w-10 h-10 rounded-xl object-cover border-2 border-slate-50 shadow-md" alt="پروفایل" />
        </div>
      </header>

      {/* Welcome Message */}
      <div className="flex flex-col gap-1 px-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">خوش آمدید، جونس</h1>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">میز کار اختصاصی سامانه آتا</p>
      </div>

      {/* Responsive Grid System */}
      <div className="flex flex-col lg:flex-row gap-6 w-full h-full">
        
        {/* Main Content Area */}
        <div className="flex flex-col flex-1 gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Smart Bank Card - Fixed Aspect Ratio */}
            <motion.div 
              className={`aspect-[1.6/1] w-full bg-gradient-to-br ${bankInfo.gradient} p-6 sm:p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between`}
            >
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">{bankInfo.label}</span>
                  <h2 className="text-xl sm:text-2xl font-black digits-fa">{formatCurrency('۲۵۸,۴۵۰,۰۰۰')}</h2>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center p-2">
                  <ShieldCheck size={28} className="text-white" />
                </div>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-7 bg-amber-400/90 rounded border border-amber-600/20 shadow-inner"></div>
                <Wifi className="rotate-90 text-white/50" size={18} />
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <input 
                  type="text"
                  maxLength={16}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="bg-transparent text-lg sm:text-2xl tracking-[0.2em] font-medium text-white digits-fa outline-none w-full text-center"
                />
                <div className="flex justify-between text-[10px] font-black text-white/40 tracking-widest uppercase">
                  <span>EXP: ۰۲/۲۸</span>
                  <span>CARDHOLDER</span>
                </div>
              </div>
            </motion.div>

            {/* Main Chart Card */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col min-h-[240px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black text-slate-900">منابع جذب شده</h3>
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-[9px] font-black">زنده</span>
              </div>
              <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <Tooltip contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}} />
                    <Line type="monotone" dataKey="v" stroke="#4F46E5" strokeWidth={5} dot={false} strokeLinecap="round" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Secondary Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            {[
              { label: 'پرونده‌های جاری', val: '۱۲۴', color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'تسهیلات تایید شده', val: '۸۵', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'نیاز به بررسی', val: '۱۲', color: 'text-rose-600', bg: 'bg-rose-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col gap-2 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-black digits-fa ${stat.color}`}>{stat.val}</span>
                  <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color}`}>
                    <Plus size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel / Side Info */}
        <div className="flex flex-col w-full lg:w-72 gap-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col gap-6 relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-4">
              <h3 className="text-base font-black">عملیات سریع</h3>
              <button className="w-full py-4 bg-indigo-600 rounded-2xl font-black text-sm shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-all">
                تشکیل پرونده جدید
              </button>
              <button className="w-full py-4 bg-white/10 border border-white/10 rounded-2xl font-black text-sm hover:bg-white/20 transition-all">
                مدیریت اعتبار بانکی
              </button>
            </div>
            <ShieldCheck className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 rotate-12" />
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex-1">
            <h3 className="text-sm font-black text-slate-900 mb-6">فعالیت‌های اخیر</h3>
            <div className="space-y-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-[11px] font-bold text-slate-800 truncate">تراکنش جدید ثبت شد</span>
                    <span className="text-[9px] text-slate-400">۱۰ دقیقه پیش</span>
                  </div>
                  <ChevronLeft size={14} className="text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
