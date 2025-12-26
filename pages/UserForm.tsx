import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Fix: Added AnimatePresence to the framer-motion imports
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, User, Key, Save, ShieldCheck, UserCheck, Info } from 'lucide-react';
import { MOCK_USERS } from '../constants';

const UserForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'staff' as 'admin' | 'staff'
  });

  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const user = MOCK_USERS.find(u => u.id === id);
      if (user) {
        setFormData(prev => ({
          ...prev,
          fullName: user.fullName,
          username: user.username,
          role: user.role
        }));
      }
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!isEdit || changePassword) && formData.password !== formData.confirmPassword) {
      alert('رمز عبور و تاییدیه آن مطابقت ندارند.');
      return;
    }
    alert(isEdit ? 'اطلاعات کاربری با موفقیت بروزرسانی شد.' : 'کاربر جدید با موفقیت ثبت گردید.');
    navigate('/users');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24 text-right font-['Vazirmatn']">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {isEdit ? 'ویرایش پروفایل کاربر' : 'تعریف دسترسی جدید'}
        </h1>
        <button onClick={() => navigate(-1)} className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all">
          <ArrowRight size={24} />
        </button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* اطلاعات پایه */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3 text-indigo-600 font-black border-b border-indigo-50 pb-4 justify-end">
             <span>مشخصات هویتی</span>
             <UserCheck size={22} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-2 uppercase tracking-wider text-right">نام و نام خانوادگی کاربر *</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all text-right text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-2 uppercase tracking-wider text-right">نام کاربری (Username) *</label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={isEdit}
                className={`px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all text-right text-sm ${isEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              {isEdit && <span className="text-[10px] text-slate-400 font-bold mr-2">نام کاربری قابل تغییر نیست</span>}
            </div>
          </div>
        </section>

        {/* سطح دسترسی */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3 text-indigo-600 font-black border-b border-indigo-50 pb-4 justify-end">
             <span>تعیین نقش و دسترسی</span>
             <Shield size={22} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              type="button"
              onClick={() => setFormData({...formData, role: 'staff'})}
              className={`p-6 rounded-[2.5rem] border-2 transition-all text-right flex items-center gap-4 ${
                formData.role === 'staff' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-50 hover:border-slate-100'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${formData.role === 'staff' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-400'}`}>
                <User size={28} />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-sm text-slate-900">کارشناس سیستم</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1">دسترسی به پرونده‌ها، ثبت مشتری و محاسبات</p>
              </div>
            </button>

            <button 
              type="button"
              onClick={() => setFormData({...formData, role: 'admin'})}
              className={`p-6 rounded-[2.5rem] border-2 transition-all text-right flex items-center gap-4 ${
                formData.role === 'admin' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-50 hover:border-slate-100'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${formData.role === 'admin' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-400'}`}>
                <ShieldCheck size={28} />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-sm text-slate-900">مدیر ارشد</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1">دسترسی کامل مدیریتی، گزارشات و امنیت</p>
              </div>
            </button>
          </div>
        </section>

        {/* بخش رمز عبور */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between border-b border-indigo-50 pb-4">
             {isEdit && (
               <button 
                 type="button"
                 onClick={() => setChangePassword(!changePassword)}
                 className={`text-xs font-black px-4 py-2 rounded-xl transition-all ${changePassword ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'}`}
               >
                 {changePassword ? 'لغو تغییر رمز' : 'تغییر رمز عبور'}
               </button>
             )}
             <div className="flex items-center gap-3 text-indigo-600 font-black">
                <span>امنیت و رمز عبور</span>
                <Key size={22} />
             </div>
          </div>

          <AnimatePresence>
            {(!isEdit || changePassword) && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black text-slate-500 mr-2 uppercase tracking-wider text-right">رمز عبور جدید *</label>
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required={!isEdit || changePassword}
                      placeholder="••••••••"
                      className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all text-right text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black text-slate-500 mr-2 uppercase tracking-wider text-right">تایید رمز عبور جدید *</label>
                    <input 
                      type="password" 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required={!isEdit || changePassword}
                      placeholder="••••••••"
                      className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all text-right text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {isEdit && !changePassword && (
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl text-slate-400 text-xs font-bold justify-center">
              <Info size={16} />
              <span>در صورت عدم نیاز به تغییر رمز عبور، این بخش را نادیده بگیرید</span>
            </div>
          )}
        </section>

        <div className="flex justify-center md:justify-end pt-6">
          <button 
            type="submit" 
            className="w-full md:w-auto px-16 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-slate-200 transition-all hover:bg-black active:scale-95 flex items-center justify-center gap-4 group"
          >
            <Save size={24} />
            <span>{isEdit ? 'ذخیره تغییرات نهایی' : 'ثبت کارشناس جدید'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
