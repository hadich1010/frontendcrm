
import React from 'react';
import { UserCog, Shield, User as UserIcon, MoreHorizontal, UserPlus, Search } from 'lucide-react';
import { MOCK_USERS } from '../constants';

const UserManagement: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <header>
          <h1 className="text-3xl font-black text-slate-800">مدیریت کاربران سیستم</h1>
          <p className="text-slate-500 mt-1 font-medium">تعریف و مدیریت سطوح دسترسی کارکنان و مدیران</p>
        </header>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-blue-200 hover:scale-105">
          <UserPlus size={22} />
          <span className="font-bold">افزودن کاربر جدید</span>
        </button>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute right-4 top-3 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="جستجو در نام کاربری یا نام..." 
            className="w-full pr-12 pl-4 py-3 bg-white border border-slate-200 rounded-2xl text-black shadow-[0_4px_20px_-2px_rgba(59,130,246,0.12)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 font-black">نام و نام خانوادگی</th>
                <th className="px-8 py-5 font-black">نام کاربری</th>
                <th className="px-8 py-5 font-black">سطح دسترسی</th>
                <th className="px-8 py-5 font-black">آخرین ورود</th>
                <th className="px-8 py-5 font-black">وضعیت</th>
                <th className="px-8 py-5 font-black">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black">
                        {user.fullName.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800">{user.fullName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-mono text-sm text-slate-600">{user.username}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black ${
                      user.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role === 'admin' ? <Shield size={14} /> : <UserIcon size={14} />}
                      {user.role === 'admin' ? 'مدیر سیستم' : 'کاربر سیستم'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500">{user.lastLogin}</td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center gap-1 text-green-600 text-xs font-bold">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      فعال
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-8 rounded-[2rem] text-white space-y-4">
           <h3 className="text-xl font-black flex items-center gap-2">
             <Shield className="text-amber-400" />
             راهنمای سطوح دسترسی
           </h3>
           <div className="space-y-4 text-sm font-medium text-slate-300 leading-relaxed">
             <div>
               <p className="text-amber-400 font-black mb-1">مدیر سیستم (Administrator):</p>
               <p>دسترسی کامل به تمامی بخش‌ها، گزارشات مالی، حذف و ویرایش قطعی مشتریان و مدیریت سایر کاربران.</p>
             </div>
             <div>
               <p className="text-blue-400 font-black mb-1">کاربر سیستم (System User):</p>
               <p>دسترسی به افزودن مشتری، مشاهده لیست و برآورد تسهیلات. فاقد دسترسی به تنظیمات مدیریتی و حذف پرونده‌ها.</p>
             </div>
           </div>
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-slate-800">امنیت سامانه</h3>
            <p className="text-sm text-slate-500 font-medium">تمامی ورود و خروج‌ها و تغییرات حساس در سامانه ثبت (Log) می‌شوند.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
             <UserCog size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
