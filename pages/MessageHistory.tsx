
import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  ChevronLeft, 
  MessageSquare, 
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Eye
} from 'lucide-react';
// Added AnimatePresence to the imports from framer-motion
import { motion, AnimatePresence } from 'framer-motion';
import { toPersianDigits } from '../utils/format';
import { Link } from 'react-router-dom';

type MessageStatus = 'all' | 'open' | 'pending' | 'closed';

const MOCK_HISTORY = [
  { id: 'h1', customer: 'علی محمدی', topic: 'پیگیری وام امتیازی', date: '۱۴۰۳/۰۶/۲۰', status: 'open', lastMsg: 'مدارک تایید شد.' },
  { id: 'h2', customer: 'سارا کریمی', topic: 'سوال در مورد کارمزد', date: '۱۴۰۳/۰۶/۱۸', status: 'closed', lastMsg: 'ممنون از پاسخگویی.' },
  { id: 'h3', customer: 'احسان احمدی', topic: 'اعتبارسنجی مرات', date: '۱۴۰۳/۰۶/۱۵', status: 'pending', lastMsg: 'در انتظار پاسخ کارشناس...' },
  { id: 'h4', customer: 'مریم نبوی', topic: 'تغییر شماره حساب', date: '۱۴۰۳/۰۶/۱۲', status: 'closed', lastMsg: 'تغییرات اعمال شد.' },
  { id: 'h5', customer: 'رضا اسدی', topic: 'درخواست وام جدید', date: '۱۴۰۳/۰۶/۱۰', status: 'open', lastMsg: 'لطفا مبلغ را بررسی کنید.' },
];

const MessageHistory: React.FC = () => {
  const [filter, setFilter] = useState<MessageStatus>('all');
  const [search, setSearch] = useState('');

  const filteredHistory = MOCK_HISTORY.filter(h => {
    const matchStatus = filter === 'all' || h.status === filter;
    const matchSearch = h.customer.includes(search) || h.topic.includes(search);
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black"><CheckCircle2 size={12}/> باز</span>;
      case 'pending': return <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black"><Clock size={12}/> در انتظار</span>;
      case 'closed': return <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black"><XCircle size={12}/> بسته شده</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <History className="text-indigo-600" size={32} />
            تاریخچه گفتگوها
          </h1>
          <p className="text-slate-400 font-bold mt-2 text-xs uppercase tracking-widest">Archive of customer interactions</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {(['all', 'open', 'pending', 'closed'] as MessageStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-5 py-2.5 rounded-xl text-[11px] font-black transition-all ${
                filter === s ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {s === 'all' ? 'همه' : s === 'open' ? 'باز' : s === 'pending' ? 'در انتظار' : 'بسته شده'}
            </button>
          ))}
        </div>
      </header>

      <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <input 
            type="text"
            placeholder="جستجو در بین مشتریان یا موضوعات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-14 pl-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/5 outline-none text-slate-900"
          />
        </div>
        <button className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
          <Filter size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredHistory.map((item, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              key={item.id}
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl">
                  {item.customer.charAt(0)}
                </div>
                {getStatusBadge(item.status)}
              </div>
              
              <div className="space-y-2 mb-6">
                <h3 className="font-black text-slate-900 text-base group-hover:text-indigo-600 transition-colors">{item.customer}</h3>
                <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
                  <MessageSquare size={12} /> {item.topic}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                <p className="text-[11px] font-bold text-slate-500 leading-relaxed italic">
                  "{item.lastMsg}"
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-50 pt-5">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-300">
                  <Calendar size={12} /> {toPersianDigits(item.date)}
                </div>
                <Link 
                  to="/chat" 
                  className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 hover:scale-110 transition-all"
                >
                  <Eye size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MessageHistory;
