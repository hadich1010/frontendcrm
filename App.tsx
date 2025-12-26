
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CustomerList from './pages/CustomerList';
import CustomerForm from './pages/CustomerForm';
import FacilityEstimation from './pages/FacilityEstimation';
import Reports from './pages/Reports';
import PrintProfile from './pages/PrintProfile';
import ViewCustomer from './pages/ViewCustomer';
import UserManagement from './pages/UserManagement';
import UserForm from './pages/UserForm';
import Chat from './pages/Chat';
import MessageHistory from './pages/MessageHistory';
import Settings from './pages/Settings';
import WalletPage from './pages/WalletPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { Menu, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { useWindowDimensions } from './hooks/useWindowDimensions';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { isDesktop, isMobile } = useWindowDimensions();
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const isPrintPage = location.pathname.startsWith('/print');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    setIsSidebarOpen(isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-full bg-[#f8f9ff] text-slate-900 overflow-hidden font-['Vazirmatn'] relative">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-white to-blue-50/40 -z-10" />
      
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setIsSidebarOpen(false)} 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90]" 
          />
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={
          <div className="flex w-full h-full">
            {!isPrintPage && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
              {!isPrintPage && (
                <header className="shrink-0 flex items-center justify-between px-6 bg-white/90 backdrop-blur-md border-b border-slate-100 h-20 shadow-sm z-50">
                  <div className="flex items-center gap-4">
                    {isMobile && (
                      <button onClick={() => setIsSidebarOpen(true)} className="p-2.5 text-indigo-600 bg-indigo-50 rounded-2xl">
                        <Menu size={22} />
                      </button>
                    )}
                    <div className="hidden md:flex flex-col text-right">
                      <span className="text-[14px] font-black text-slate-900 leading-tight">مهدی ناصری</span>
                      <span className="text-[10px] text-slate-400 font-bold">خوش آمدید</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl relative">
                      <Bell size={20} />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>
                    
                    <div className="relative" ref={userMenuRef}>
                      <button 
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-2"
                      >
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-10 h-10 rounded-2xl border-2 border-white shadow-md bg-indigo-50 object-cover" alt="کاربر" />
                      </button>

                      <AnimatePresence>
                        {isUserMenuOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute left-0 top-full mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-[60]"
                          >
                            <Link to="/settings" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                              <User size={16} className="text-indigo-600" />
                              مشاهده پروفایل
                            </Link>
                            <button 
                              onClick={() => { setIsAuthenticated(false); setIsUserMenuOpen(false); }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors border-t border-slate-50"
                            >
                              <LogOut size={16} />
                              خروج از حساب
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </header>
              )}
              
              <div className="flex-1 overflow-y-auto no-scrollbar">
                <div className={`w-full h-full ${isPrintPage ? 'p-0' : 'p-4 sm:p-6 lg:p-8'}`}>
                  <div className="max-w-[1600px] w-full mx-auto">
                    <AnimatePresence mode="wait">
                      <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Routes location={location}>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/customers" element={<CustomerList />} />
                          <Route path="/add-customer" element={<CustomerForm />} />
                          <Route path="/edit-customer/:id" element={<CustomerForm />} />
                          <Route path="/view-customer/:id" element={<ViewCustomer />} />
                          <Route path="/estimation" element={<FacilityEstimation />} />
                          <Route path="/wallet" element={<WalletPage />} />
                          <Route path="/reports" element={<Reports />} />
                          <Route path="/users" element={<UserManagement />} />
                          <Route path="/add-user" element={<UserForm />} />
                          <Route path="/edit-user/:id" element={<UserForm />} />
                          <Route path="/chat" element={<Chat />} />
                          <Route path="/message-history" element={<MessageHistory />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/print/:id" element={<PrintProfile />} />
                        </Routes>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </main>
          </div>
        } />
      </Routes>
    </div>
  );
};

const App: React.FC = () => <Router><AppContent /></Router>;
export default App;
