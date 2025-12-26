
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, UserPlus, Search, ShieldCheck, Key, Power, Edit3, RefreshCw, CheckCircle2, XCircle, Copy } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { toPersianDigits } from '../utils/format';

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showPassModal, setShowPassModal] = useState<string | null>(null);
  const [newPass, setNewPass] = useState('');

  const filteredUsers = MOCK_USERS.filter(u => 
    u.fullName.includes(search) || u.username.includes(search)
  );

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let pass = "";
    for (let i = 0; i < 10; i++) pass += chars[Math.floor(Math.random() * chars.length)];
    setNewPass(pass);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newPass);
    alert('رمز عبور کپی شد');
  };

  return (
    <div className="space-y-8 pb-20 text-right font-['Vazirmatn']">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">مدیریت کاربران</h1>
          <p className="text-slate-400 font-bold mt-2 text-xs">مدیریت دسترسی‌ها و امنیت پرسنل</p>
        </div>
        <Link 
          to="/add-user"
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all"
        >
          <UserPlus size={20} />
          <span>تعریف کاربر جدید</span>
        </Link>
      </header>

      <div className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <input 
            type="text" 
            placeholder="جستجو در نام یا نام کاربری..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-14 pl-6 py-4 bg-slate-50 border-none rounded-2xl font-bold outline-none text-slate-900 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead className="bg-slate-50 text-slate-400 border-b border-slate-100">
              <tr className="text-[10px] font-black uppercase tracking-widest">
                <th className="px-8 py-6">اطلاعات کاربر</th>
                <th className="px-8 py-6">نقش کاربری</th>
                <th className="px-8 py-6">آخرین فعالیت</th>
                <th className="px-8 py-6">وضعیت</th>
                <th className="px-8 py-6 text-center">عملیات مدیریت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black shadow-sm">
                        {user.fullName.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-sm">{user.fullName}</span>
                        <span className="text-[10px] text-slate-400 font-bold">{user.username}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className={user.role === 'admin' ? 'text-indigo-600' : 'text-slate-400'} />
                      <span className={`px-3 py-1 rounded-xl text-[10px] font-black ${user.role === 'admin' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                        {user.role === 'admin' ? 'مدیر سیستم' : 'کارشناس اعتبارات'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-slate-400 digits-fa">{toPersianDigits(user.lastLogin)}</span>
                  </td>
                  <td className="px-8 py-5">
                    {user.status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-500 font-black text-[10px] bg-emerald-50 px-3 py-1 rounded-full">
                        <CheckCircle2 size={12} /> فعال
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-rose-500 font-black text-[10px] bg-rose-50 px-3 py-1 rounded-full">
                        <XCircle size={12} /> غیرفعال
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <Link 
                        to={`/edit-user/${user.id}`}
                        className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                        title="ویرایش اطلاعات کاربر"
                      >
                        <Edit3 size={16} />
                      </Link>
                      <button 
                        onClick={() => { setShowPassModal(user.id); generatePassword(); }}
                        className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                        title="تغییر سریع رمز عبور"
                      >
                        <Key size={16} />
                      </button>
                      <button 
                        className={`p-2.5 bg-white border border-slate-200 rounded-xl transition-all shadow-sm ${user.status === 'active' ? 'text-rose-500 hover:bg-rose-500 hover:text-white' : 'text-emerald-500 hover:bg-emerald-500 hover:text-white'}`}
                        title={user.status === 'active' ? 'تعلیق حساب' : 'فعال‌سازی حساب'}
                      >
                        <Power size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showPassModal && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 text-center shadow-2xl">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <RefreshCw size={32} />
              </div>
              <h3 className="text-xl font-black mb-2 text-slate-900">رمز عبور جدید</h3>
              <p className="text-slate-500 text-xs font-bold mb-6">رمز عبور امن برای کاربر تولید گردید:</p>
              
              <div className="bg-slate-50 p-5 rounded-2xl border-2 border-dashed border-slate-200 mb-8 flex items-center justify-between">
                <button onClick={copyToClipboard} className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <Copy size={20} />
                </button>
                <span className="font-mono text-xl font-black text-indigo-600 tracking-widest">{newPass}</span>
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => setShowPassModal(null)} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100">تایید و ذخیره</button>
                <button onClick={() => setShowPassModal(null)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black">انصراف</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;
