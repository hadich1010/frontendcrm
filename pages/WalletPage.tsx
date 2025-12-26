
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Zap, TrendingUp, Edit3, Check } from 'lucide-react';
import { toPersianDigits } from '../utils/format';

const WalletPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [allocatedAmount, setAllocatedAmount] = useState('۱۲۰,۰۰۰,۰۰۰');

  return (
    <div className="space-y-10 pb-24 text-right">
      <header>
        <h1 className="text-3xl font-black text-slate-900 leading-tight">کیف پول</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl flex flex-col justify-between h-64 relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <div className="p-4 bg-white/20 rounded-[1.5rem]"><Wallet size={32} /></div>
            <div className="text-right">
              <p className="text-[10px] font-black opacity-60 uppercase mb-1">موجودی در دسترس</p>
            </div>
          </div>
          <div className="z-10">
            <h3 className="text-4xl font-black digits-fa">۱۸,۷۵۰,۰۰۰</h3>
            <span className="text-xs font-bold opacity-60 mt-2 block">تومان</span>
          </div>
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </motion.div>

        <motion.div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between h-64 relative overflow-hidden group">
          <div className="flex justify-between items-start z-10">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-[1.5rem]"><Zap size={32} /></div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">مبلغ تخصیص یافته</p>
              <button onClick={() => setIsEditing(!isEditing)} className="text-indigo-600 p-1 mt-1 hover:bg-indigo-50 rounded-lg">
                {isEditing ? <Check size={16} /> : <Edit3 size={16} />}
              </button>
            </div>
          </div>
          <div className="z-10">
            {isEditing ? (
              <input 
                type="text" 
                autoFocus
                value={allocatedAmount} 
                onChange={(e) => setAllocatedAmount(e.target.value)}
                onBlur={() => setIsEditing(false)}
                className="text-3xl font-black text-slate-900 bg-slate-50 border-none rounded-xl w-full p-2 text-right outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            ) : (
              <h3 className="text-4xl font-black text-slate-900 digits-fa">{toPersianDigits(allocatedAmount)}</h3>
            )}
            <span className="text-xs font-bold text-slate-400 mt-2 block">تومان</span>
          </div>
        </motion.div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <h3 className="font-black text-xl text-slate-900 mb-8">آخرین فعالیت‌ها</h3>
        <div className="space-y-4">
          {[
            { title: 'واریز ورودی سیستم', time: '۱۰:۴۵ - امروز', val: '+۵۰۰,۰۰۰' },
            { title: 'برداشت بابت کارمزد', time: '۰۹:۱۵ - دیروز', val: '-۵۰,۰۰۰' }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
               <span className={`font-black digits-fa text-sm ${item.val.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{toPersianDigits(item.val)} تومان</span>
               <div className="flex items-center gap-4">
                 <div className="text-right">
                   <p className="font-black text-sm text-slate-800">{item.title}</p>
                   <p className="text-[10px] text-slate-400 font-bold">{toPersianDigits(item.time)}</p>
                 </div>
                 <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                   <TrendingUp size={18} />
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
