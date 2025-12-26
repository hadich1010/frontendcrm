
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Chat from './pages/Chat';
import MessageHistory from './pages/MessageHistory';
import Settings from './pages/Settings';
import { Menu, ShieldCheck } from 'lucide-react';
import { useWindowDimensions } from './hooks/useWindowDimensions';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { isDesktop, isMobile } = useWindowDimensions();
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);
  const isPrintPage = location.pathname.startsWith('/print');

  // Sync sidebar state with screen size initially
  useEffect(() => {
    setIsSidebarOpen(isDesktop);
  }, [isDesktop]);

  return (
    <div className="flex h-screen w-full bg-[#f8f9ff] text-slate-900 overflow-hidden font-['Vazirmatn'] relative">
      
      {/* Background Layer */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-white to-blue-50/40 -z-10" />

      {/* Overlay for mobile ONLY */}
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

      {/* Sidebar - Positioned as a flex item in desktop to push content */}
      {!isPrintPage && (
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      )}

      {/* Main Content Area - This will auto-resize because of flex-1 */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Mobile Header (Visible only on mobile) */}
        {!isPrintPage && isMobile && (
          <header className="shrink-0 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-indigo-600 bg-indigo-50 rounded-xl">
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-indigo-600" />
              <span className="font-black text-lg">آتا</span>
            </div>
            <img src="https://i.pravatar.cc/100?u=jonas" className="w-9 h-9 rounded-xl" alt="کاربر" />
          </header>
        )}

        {/* Dynamic Page Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className={`
            w-full h-full 
            ${isPrintPage ? 'p-0' : 'p-4 sm:p-6 lg:p-8'}
          `}>
            <div className="max-w-[1600px] w-full mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Routes location={location}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/customers" element={<CustomerList />} />
                    <Route path="/add-customer" element={<CustomerForm />} />
                    <Route path="/edit-customer/:id" element={<CustomerForm />} />
                    <Route path="/view-customer/:id" element={<ViewCustomer />} />
                    <Route path="/estimation" element={<FacilityEstimation />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/users" element={<UserManagement />} />
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
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
