
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Wallet, Users, ShieldCheck, 
  Settings, CreditCard, ChevronDown, 
  MessageCircle, Send, History
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
    { path: '/estimation', label: 'کیف پول', icon: <Wallet size={22} /> },
    { path: '/customers', label: 'مشتریان', icon: <Users size={22} /> },
    { path: '/users', label: 'تیم ما', icon: <ShieldCheck size={22} /> },
    { path: '/reports', label: 'گزارشات', icon: <CreditCard size={22} /> },
    { path: '/settings', label: 'تنظیمات', icon: <Settings size={22} /> },
  ];

  const sidebarVariants = {
    open: { width: isMobile ? '100%' : 280, opacity: 1 },
    closed: { width: isMobile ? '0%' : 90, opacity: 1 }
  };

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isOpen) setIsMessagesOpen(false); 
  };

  const handleMessagesToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMessagesOpen(true);
    } else {
      setIsMessagesOpen(!isMessagesOpen);
    }
  };

  return (
    <motion.aside 
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`
        relative shrink-0 flex flex-col bg-white border-l border-slate-200 shadow-xl overflow-hidden
        ${isMobile ? 'fixed inset-0 z-[100]' : 'lg:m-4 lg:rounded-[2.5rem] lg:h-[calc(100vh-2rem)]'}
      `}
    >
      {/* Interactive Logo Area */}
      <div className={`flex items-center p-6 h-24 shrink-0 ${!isOpen && 'justify-center'}`}>
        <button 
          onClick={handleToggleSidebar}
          className="flex items-center gap-3 overflow-hidden group active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 bg-indigo-600 rounded-[1.2rem] flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform duration-300">
            <ShieldCheck size={26} />
          </div>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col text-right whitespace-nowrap"
            >
              <span className="font-black text-xl text-slate-900 tracking-tighter">
                سامانه <span className="text-indigo-600">آتا</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Management v2.5</span>
            </motion.div>
          )}
        </button>
      </div>

      {/* Menu List */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar pt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => isMobile && setIsOpen(false)}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all group relative ${
              location.pathname === item.path 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'text-slate-500 hover:bg-slate-50'
            } ${!isOpen && 'justify-center'}`}
          >
            <span className={`shrink-0 transition-transform group-hover:scale-110 ${location.pathname === item.path ? 'scale-110' : ''}`}>
              {item.icon}
            </span>
            {isOpen && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-sm truncate whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
            {!isOpen && !isMobile && (
               <div className="absolute right-full mr-4 px-3 py-2 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[110]">
                 {item.label}
               </div>
            )}
          </Link>
        ))}

        {/* Messages Dropdown */}
        <div className="pt-2">
          <button 
            onClick={handleMessagesToggle}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group relative ${
              isMessagesOpen ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-500 hover:bg-slate-50'
            } ${!isOpen && 'justify-center'}`}
          >
            <MessageCircle size={22} className="shrink-0" />
            {isOpen && (
              <div className="flex-1 flex items-center justify-between overflow-hidden">
                <span className="font-bold text-sm whitespace-nowrap">پیام‌رسانی</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isMessagesOpen ? 'rotate-180' : ''}`} />
              </div>
            )}
          </button>
          
          <AnimatePresence>
            {isMessagesOpen && isOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-indigo-50/30 rounded-2xl mt-1 mx-1"
              >
                <div className="p-2 space-y-1">
                  <Link 
                    to="/chat" 
                    onClick={() => isMobile && setIsOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors text-[13px] font-bold ${
                      location.pathname === '/chat' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:bg-white'
                    }`}
                  >
                    <Send size={14} /> مرکز گفتگو
                  </Link>
                  <Link 
                    to="/message-history" 
                    onClick={() => isMobile && setIsOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors text-[13px] font-bold ${
                      location.pathname === '/message-history' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:bg-white'
                    }`}
                  >
                    <History size={14} /> تاریخچه پیام‌ها
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Footer User Profile */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 lg:rounded-b-[2.5rem] shrink-0">
        <div className={`flex items-center gap-3 p-2 ${!isOpen && 'justify-center'}`}>
          <img src="https://i.pravatar.cc/100?u=admin" className="w-10 h-10 rounded-xl border-2 border-white shadow-sm" alt="کاربر" />
          {isOpen && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-black text-slate-900 truncate whitespace-nowrap">مدیر ارشد</span>
              <span className="text-[10px] text-emerald-500 font-black">● آنلاین</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
