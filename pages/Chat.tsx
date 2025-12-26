
import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, X, AlertTriangle } from 'lucide-react';
import { toPersianDigits } from '../utils/format';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_CHATS = [
  { id: 'c1', name: 'علی محمدی', last: 'مدارک تایید شد؟', time: '۱۰:۳۰', unread: 2 },
  { id: 'c2', name: 'سارا کریمی', last: 'ممنون', time: '۰۹:۱۵', unread: 0 }
];

const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(MOCK_CHATS[0]);
  const [inputText, setInputText] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const handleSendReport = () => {
    if (!reportReason) return;
    alert(`گزارش تخلف برای ${selectedChat.name} با موفقیت ثبت شد.`);
    setReportReason('');
    setShowInfo(false);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 overflow-hidden">
      <div className="hidden lg:flex w-80 flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="جستجو..." className="w-full pr-12 pl-4 py-3 bg-slate-50 border-none rounded-2xl text-xs font-black outline-none" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
          {MOCK_CHATS.map((chat) => (
            <button key={chat.id} onClick={() => setSelectedChat(chat)} className={`w-full flex items-center gap-4 p-4 rounded-[1.8rem] transition-all ${selectedChat.id === chat.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'hover:bg-indigo-50 text-slate-600'}`}>
              <div className="flex-1 text-right">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-black text-sm">{chat.name}</h4>
                  <span className="text-[9px] digits-fa opacity-60">{toPersianDigits(chat.time)}</span>
                </div>
                <p className="text-[10px] truncate opacity-80">{chat.last}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative">
        <header className="p-6 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setShowInfo(true)} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right">
               <h3 className="font-black text-slate-900 text-sm">{selectedChat.name}</h3>
               <span className="text-[9px] text-emerald-500 font-bold">آنلاین</span>
             </div>
             <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black shadow-sm">{selectedChat.name.charAt(0)}</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/20 no-scrollbar">
          <div className="flex justify-start">
            <div className="p-5 bg-white rounded-[2rem] rounded-br-none shadow-sm text-sm font-bold text-slate-700 max-w-[80%] border border-slate-50">سلام، چطور می‌توانم کمک کنم؟</div>
          </div>
        </div>

        <footer className="p-6 bg-white border-t border-slate-50">
          <div className="bg-slate-50 rounded-[2.5rem] p-2 flex items-center gap-2 border border-slate-100">
            <button className="p-3 text-slate-400 hover:text-indigo-600"><Paperclip size={20} /></button>
            <input 
              type="text" 
              placeholder="پیام خود را بنویسید..." 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)} 
              className="flex-1 bg-transparent py-3 px-2 outline-none text-slate-900 font-bold text-sm text-right" 
            />
            <button className="bg-indigo-600 text-white p-4 rounded-full shadow-lg rotate-180 hover:bg-indigo-700 transition-all">
              <Send size={20} />
            </button>
          </div>
        </footer>

        <AnimatePresence>
          {showInfo && (
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-y-0 left-0 w-80 bg-white border-r border-slate-100 shadow-2xl z-20 p-8 flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <button onClick={() => setShowInfo(false)} className="p-2 bg-slate-100 rounded-xl text-slate-400"><X size={20} /></button>
                <h4 className="font-black text-slate-900">اطلاعات گفتگو</h4>
              </div>
              
              <div className="flex-1">
                <div className="p-6 bg-rose-50 rounded-[2.5rem] border border-rose-100">
                  <div className="flex items-center justify-end gap-2 text-rose-600 mb-4">
                    <span className="font-black text-sm">گزارش تخلف</span>
                    <AlertTriangle size={20} />
                  </div>
                  <textarea 
                    placeholder="دلیل گزارش..." 
                    value={reportReason} 
                    onChange={(e) => setReportReason(e.target.value)} 
                    className="w-full p-4 bg-white border border-rose-100 rounded-2xl text-xs font-bold outline-none h-32 text-right focus:ring-2 focus:ring-rose-200" 
                  />
                  <button 
                    onClick={handleSendReport} 
                    className="w-full mt-4 py-4 bg-rose-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-rose-100 active:scale-95 transition-all"
                  >
                    ارسال گزارش
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chat;
