
import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Send, 
  CheckCheck,
  Circle,
  Menu,
  X,
  User,
  Info
} from 'lucide-react';
import { ChatRoom, Message } from '../types';
import { toPersianDigits } from '../utils/format';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_CHATS: ChatRoom[] = [
  { id: 'c1', customerId: '1', customerName: 'علی محمدی', lastMessage: 'مدارک من تایید شد؟', lastUpdate: toPersianDigits('۱۰:۳۰'), unreadCount: 2, online: true },
  { id: 'c2', customerId: '5', customerName: 'احسان احمدی', lastMessage: 'ممنون از راهنمایی شما', lastUpdate: toPersianDigits('۰۹:۱۵'), unreadCount: 0, online: false },
  { id: 'c3', customerId: '2', customerName: 'سارا کریمی', lastMessage: 'پیش‌پرداخت را واریز کردم', lastUpdate: 'دیروز', unreadCount: 0, online: true },
  { id: 'c4', customerId: '4', customerName: 'مریم نبوی', lastMessage: 'شماره شبا را ارسال کنید', lastUpdate: '۲ روز پیش', unreadCount: 0, online: false },
];

const INITIAL_MESSAGES: Message[] = [
  { id: 'm1', text: 'سلام، وقت بخیر. چطور می‌توانم کمکتان کنم؟', sender: 'support', timestamp: toPersianDigits('۱۰:۲۵'), status: 'read' },
  { id: 'm2', text: 'سلام، من مدارک اعتبارسنجی مرات را آپلود کردم. آیا تایید شده؟', sender: 'customer', timestamp: toPersianDigits('۱۰:۲۸'), status: 'read' },
  { id: 'm3', text: 'بله، در حال بررسی توسط کارشناس است. تا پایان امروز نتیجه اعلام می‌شود.', sender: 'support', timestamp: toPersianDigits('۱۰:۲۹'), status: 'read' },
  { id: 'm4', text: 'بسیار عالی، منتظر هستم.', sender: 'customer', timestamp: toPersianDigits('۱۰:۳۰'), status: 'read' },
];

const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatRoom>(MOCK_CHATS[0]);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: toPersianDigits(inputText),
      sender: 'support',
      timestamp: toPersianDigits(new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })),
      status: 'sent'
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 animate-in fade-in duration-500 overflow-hidden">
      
      {/* Sidebar - Contacts List */}
      <div className="hidden lg:flex w-80 xl:w-96 flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h2 className="font-black text-xl text-slate-900 mb-6">گفتگوهای فعال</h2>
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="جستجوی مخاطب..." 
              className="w-full pr-12 pl-4 py-3 bg-slate-50 border-none rounded-2xl text-xs font-black focus:ring-2 focus:ring-indigo-500/10 outline-none text-slate-900" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
          {MOCK_CHATS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full flex items-center gap-4 p-4 rounded-[1.8rem] transition-all ${
                selectedChat.id === chat.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'hover:bg-indigo-50 text-slate-600'
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
                  selectedChat.id === chat.id ? 'bg-white/20' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  {chat.customerName.charAt(0)}
                </div>
                {chat.online && (
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 rounded-full ${
                    selectedChat.id === chat.id ? 'border-indigo-600' : 'border-white'
                  }`} />
                )}
              </div>
              
              <div className="flex-1 text-right overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-black text-sm truncate">{chat.customerName}</h4>
                  <span className={`text-[10px] font-bold ${selectedChat.id === chat.id ? 'text-white/70' : 'text-slate-400'}`}>
                    {chat.lastUpdate}
                  </span>
                </div>
                <p className={`text-[11px] truncate font-bold ${selectedChat.id === chat.id ? 'text-white/80' : 'text-slate-400'}`}>
                  {chat.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">
              {selectedChat.customerName.charAt(0)}
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">{selectedChat.customerName}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`w-2 h-2 rounded-full ${selectedChat.online ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {selectedChat.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all"><Phone size={20} /></button>
            <button className="p-3 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all"><Video size={20} /></button>
            <button className="p-3 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all"><Info size={20} /></button>
          </div>
        </div>

        {/* Messages Area - Light Pattern Background */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/30">
          <div className="flex justify-center mb-8">
            <span className="px-4 py-1.5 bg-white border border-slate-100 text-[10px] font-black text-slate-400 rounded-full shadow-sm">
              امروز - {toPersianDigits('۱۴۰۳/۰۶/۲۰')}
            </span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'support' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black shadow-sm ${
                msg.sender === 'support' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-slate-100'
              }`}>
                {msg.sender === 'support' ? 'A' : msg.sender === 'customer' ? 'C' : 'S'}
              </div>
              <div className="max-w-[75%] md:max-w-[60%]">
                <div className={`p-4 rounded-[1.8rem] shadow-sm relative ${
                  msg.sender === 'support' 
                    ? 'bg-indigo-600 text-white rounded-bl-none' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-br-none'
                }`}>
                  <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                </div>
                <div className={`flex items-center gap-2 mt-2 px-1 ${msg.sender === 'support' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{msg.timestamp}</span>
                  {msg.sender === 'support' && (
                    <CheckCheck size={14} className={msg.status === 'read' ? 'text-indigo-400' : 'text-slate-300'} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-slate-50">
          <div className="bg-slate-50 rounded-[2.2rem] p-2 flex items-center gap-2 border border-slate-100 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
            <button className="p-3.5 text-slate-400 hover:text-indigo-600 transition-colors"><Paperclip size={20} /></button>
            <input 
              type="text" 
              placeholder="پیام خود را در اینجا بنویسید..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-transparent py-4 px-2 outline-none text-slate-900 font-bold placeholder:text-slate-300 text-sm"
            />
            <button 
              onClick={handleSendMessage} 
              className="bg-indigo-600 text-white p-4 rounded-3xl shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all"
            >
              <Send size={20} className="rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
