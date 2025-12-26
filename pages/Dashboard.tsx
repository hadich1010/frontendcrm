
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Users, Clock, CheckCircle, ArrowUp, ArrowDown, LayoutGrid, X
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { toPersianDigits } from '../utils/format';
import { MOCK_CUSTOMERS } from '../constants';
import { useWindowDimensions } from '../hooks/useWindowDimensions';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { isMobile } = useWindowDimensions();
  const [showWidgetSettings, setShowWidgetSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  
  const [widgetOrder, setWidgetOrder] = useState<string[]>(() => {
    const saved = localStorage.getItem('ata_widget_order');
    return saved ? JSON.parse(saved) : ['kpis', 'analytics', 'statusBreakdown', 'events'];
  });

  const [visibleWidgets, setVisibleWidgets] = useState(() => {
    const saved = localStorage.getItem('ata_visible_widgets');
    return saved ? JSON.parse(saved) : {
      kpis: true, analytics: true, statusBreakdown: true, events: true
    };
  });

  useEffect(() => {
    localStorage.setItem('ata_widget_order', JSON.stringify(widgetOrder));
    localStorage.setItem('ata_visible_widgets', JSON.stringify(visibleWidgets));
  }, [widgetOrder, visibleWidgets]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowWidgetSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const moveWidget = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...widgetOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newOrder.length) {
      const temp = newOrder[index];
      newOrder[index] = newOrder[targetIndex];
      newOrder[targetIndex] = temp;
      setWidgetOrder(newOrder);
    }
  };

  const lineData = [
    {name:'فروردین',v:4000},{name:'اردیبهشت',v:7500},{name:'خرداد',v:6500},
    {name:'تیر',v:9000},{name:'مرداد',v:8500},{name:'شهریور',v:11000}
  ];

  const statusSummary = useMemo(() => {
    const counts = {
      pending: MOCK_CUSTOMERS.filter(c => c.status === 'pending_payment').length,
      waiting: MOCK_CUSTOMERS.filter(c => c.status === 'waiting_merat').length,
      completed: MOCK_CUSTOMERS.filter(c => c.status === 'completed').length,
      rejected: MOCK_CUSTOMERS.filter(c => c.status === 'rejected').length,
    };
    return counts;
  }, []);

  const renderWidget = (id: string) => {
    if (!visibleWidgets[id]) return null;

    switch (id) {
      case 'kpis':
        return (
          <div key="kpis" className={`flex ${isMobile ? 'flex-col overflow-y-auto max-h-[400px] no-scrollbar pr-1' : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4'} gap-6`}>
            {[
              { label: 'کل پرونده‌ها', val: '۱۲۴', icon: <Users size={22} />, color: 'bg-indigo-600' },
              { label: 'تسهیلات تایید شده', val: '۸۵', icon: <CheckCircle size={22} />, color: 'bg-emerald-500' },
              { label: 'در انتظار بررسی', val: '۱۲', icon: <Clock size={22} />, color: 'bg-amber-500' },
              { label: 'سرمایه جاری', val: '۴.۲', icon: <Plus size={22} />, color: 'bg-violet-600' },
            ].map((kpi, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-right shrink-0">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 ${kpi.color}`}>
                  {kpi.icon}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{kpi.label}</p>
                <h4 className="text-2xl font-black text-slate-900 digits-fa">{toPersianDigits(kpi.val)}</h4>
              </div>
            ))}
          </div>
        );
      case 'analytics':
        return (
          <div key="analytics" className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[350px] flex flex-col">
            <h3 className="text-lg font-black text-slate-900 text-right mb-8">رشد جذب منابع</h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineData}>
                  <defs>
                    <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <Tooltip />
                  <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={4} fill="url(#colorV)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case 'statusBreakdown':
        return (
          <div key="statusBreakdown" className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 text-right mb-6">وضعیت پرونده‌ها</h3>
            <div className="space-y-4">
              {[
                { label: 'تکمیل شده', val: statusSummary.completed, color: 'bg-emerald-500' },
                { label: 'در انتظار تایید', val: statusSummary.waiting, color: 'bg-blue-500' },
                { label: 'رد شده', val: statusSummary.rejected, color: 'bg-rose-500' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <span className="text-sm font-black text-slate-900 digits-fa">{toPersianDigits(item.val)}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-bold text-slate-600">{item.label}</span>
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'events':
        return (
          <div key="events" className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-right">
            <h3 className="text-sm font-black text-slate-900 mb-6">وقایع اخیر</h3>
            <div className="space-y-4">
              {[
                { text: 'ثبت پرونده جدید: علی محمدی', time: '۱۰ دقیقه پیش' },
                { text: 'واریز تسهیلات: مریم نبوی', time: '۱ ساعت پیش' }
              ].map((e, i) => (
                <div key={i} className="flex flex-col gap-1 border-b border-slate-50 pb-2 last:border-0">
                  <span className="text-xs font-bold text-slate-700">{e.text}</span>
                  <span className="text-[10px] text-slate-400 font-bold">{toPersianDigits(e.time)}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-8 pb-20">
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative">
        <h1 className="text-3xl font-black text-slate-900 leading-tight">پیشخوان</h1>
        
        <div className="flex flex-row w-full lg:w-auto gap-3">
           <Link to="/add-customer" className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm active:scale-95 transition-all shadow-lg">
              <Plus size={18} />
              پرونده جدید
           </Link>
           
           <div className="relative" ref={settingsRef}>
             <button onClick={() => setShowWidgetSettings(!showWidgetSettings)} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black text-sm active:scale-95 transition-all shadow-sm">
                <LayoutGrid size={18} />
                مدیریت
             </button>

             <AnimatePresence>
                {showWidgetSettings && (
                  <motion.div 
                    initial={{ opacity: 0, y: isMobile ? -10 : 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: isMobile ? -10 : 10, scale: 0.95 }} 
                    className={`absolute ${isMobile ? 'top-0 right-0' : 'left-0 lg:right-0 top-full mt-2'} w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-[100]`}
                  >
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                       <span className="text-sm font-black text-slate-700">ویجت‌ها</span>
                       <button onClick={() => setShowWidgetSettings(false)} className="text-slate-300"><X size={16} /></button>
                    </div>
                    <div className="space-y-2">
                      {widgetOrder.map((id, index) => (
                        <div key={id} className="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
                          <div className="flex gap-1">
                            <button onClick={() => moveWidget(index, 'up')} className="p-1 text-slate-400 hover:text-indigo-600"><ArrowUp size={12} /></button>
                            <button onClick={() => moveWidget(index, 'down')} className="p-1 text-slate-400 hover:text-indigo-600"><ArrowDown size={12} /></button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-slate-600">
                              {id === 'kpis' ? 'آمار کل' : id === 'analytics' ? 'رشد منابع' : id === 'statusBreakdown' ? 'وضعیت‌ها' : 'وقایع'}
                            </span>
                            <input type="checkbox" checked={visibleWidgets[id]} onChange={() => setVisibleWidgets({...visibleWidgets, [id]: !visibleWidgets[id]})} className="w-4 h-4 rounded text-indigo-600 border-slate-200" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
           </div>
        </div>
      </section>

      <div className="flex flex-col gap-8">
        {widgetOrder.map(renderWidget)}
      </div>
    </div>
  );
};

export default Dashboard;
