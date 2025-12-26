
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Wallet, Users, ShieldCheck, 
  Settings, MessageCircle, Send, History, Calculator,
  ChevronDown, X, Shield
} from 'lucide-react';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { isMobile } = useWindowDimensions();
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'پیشخوان', icon: <LayoutDashboard size={22} /> },
    { path: '/customers', label: 'مشتریان', icon: <Users size={22} /> },
    { path: '/users', label: 'مدیریت کاربران', icon: <Shield size={22} /> },
    { path: '/estimation', label: 'محاسبات', icon: <Calculator size={22} /> },
    { path: '/wallet', label: 'کیف پول', icon: <Wallet size={22} /> },
    { path: '/settings', label: 'تنظیمات', icon: <Settings size={22} /> },
  ];

  const sidebarVariants = {
    open: { width: isMobile ? '75%' : 280, opacity: 1, x: 0 },
    closed: { width: isMobile ? '0%' : 88, opacity: 1, x: 0 }
  };

  return (
    <motion.aside 
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`
        relative shrink-0 flex flex-col bg-white/95 backdrop-blur-xl border-l border-slate-200 shadow-2xl overflow-hidden
        ${isMobile ? 'fixed inset-y-0 right-0 z-[100]' : 'lg:m-4 lg:rounded-[2.5rem] lg:h-[calc(100vh-2rem)] border border-white/40'}
      `}
    >
      <div className={`flex items-center p-6 h-24 shrink-0 transition-all ${!isOpen ? 'justify-center' : 'justify-between'}`}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-200">
            <ShieldCheck size={28} />
          </div>
          {isOpen && <span className="font-black text-2xl text-slate-900 tracking-tighter">آتا</span>}
        </button>
        {isMobile && isOpen && (
          <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400">
            <X size={24} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-2 overflow-y-auto pt-4 no-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => isMobile && setIsOpen(false)}
              className={`
                flex items-center gap-4 p-4 rounded-2xl transition-all group
                ${isActive ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-500 hover:bg-indigo-50'} 
                ${!isOpen ? 'justify-center' : ''}
              `}
            >
              <span className="shrink-0 flex items-center justify-center">{item.icon}</span>
              {isOpen && <span className="font-bold text-sm whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
        
        <div className="pt-2 px-1">
          <button 
            onClick={() => setIsMessagesOpen(!isMessagesOpen)} 
            className={`w-full flex items-center gap-4 p-4 rounded-2xl text-slate-500 hover:bg-slate-50 ${!isOpen ? 'justify-center' : ''}`}
          >
            <MessageCircle size={22} className="shrink-0 flex items-center justify-center" />
            {isOpen && <span className="font-bold text-sm flex-1 text-right">ارتباطات</span>}
            {isOpen && <ChevronDown size={14} className={isMessagesOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />}
          </button>
          <AnimatePresence>
            {isMessagesOpen && isOpen && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-slate-50 rounded-2xl mt-1">
                <Link to="/chat" className="flex items-center gap-3 p-3 text-xs font-bold text-slate-600 hover:text-indigo-600" onClick={() => isMobile && setIsOpen(false)}><Send size={14} /> ارسال پیام</Link>
                <Link to="/message-history" className="flex items-center gap-3 p-3 text-xs font-bold text-slate-600 hover:text-indigo-600" onClick={() => isMobile && setIsOpen(false)}><History size={14} /> تاریخچه</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
