
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Coins, Shield, Palette, Database, Check } from 'lucide-react';
import { toPersianDigits } from '../utils/format';

const Settings: React.FC = () => {
  const [currency, setCurrency] = useState<'toman' | 'rial'>('toman');

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header className="px-2">
        <h1 className="text-3xl font-black text-slate-950 flex items-center gap-3">
          <SettingsIcon size={32} className="text-indigo-600" />
          تنظیمات زیرساخت
        </h1>
        <p className="text-slate-600 font-bold mt-2 text-sm">مدیریت واحد پول، امنیت و ظاهر سامانه</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* واحد پول */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
             <div className="p-3 bg-indigo-50 text-indigo-700 rounded-2xl">
               <Coins size={24} />
             </div>
             <h2 className="text-xl font-black text-slate-950">نمایش مبالغ</h2>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => setCurrency('toman')}
              className={`w-full flex items-center justify-between p-6 rounded-[1.8rem] transition-all border-2 ${
                currency === 'toman' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'
              }`}
            >
              <div className="flex flex-col text-right">
                <span className="font-black text-lg text-slate-950">تومان</span>
                <span className="text-[0.65rem] text-slate-500 font-bold mt-1">پیش‌فرض بازار ایران</span>
              </div>
              {currency === 'toman' && <Check size={20} className="text-indigo-600" />}
            </button>

            <button 
              onClick={() => setCurrency('rial')}
              className={`w-full flex items-center justify-between p-6 rounded-[1.8rem] transition-all border-2 ${
                currency === 'rial' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'
              }`}
            >
              <div className="flex flex-col text-right">
                <span className="font-black text-lg text-slate-950">ریال</span>
                <span className="text-[0.65rem] text-slate-500 font-bold mt-1">واحد رسمی بانکی</span>
              </div>
              {currency === 'rial' && <Check size={20} className="text-indigo-600" />}
            </button>
          </div>
        </section>

        {/* امنیت */}
        <section className="bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-xl space-y-8 relative overflow-hidden">
          <div className="flex items-center gap-4 border-b border-white/10 pb-4 relative z-10">
             <div className="p-3 bg-white/5 text-indigo-400 rounded-2xl">
               <Shield size={24} />
             </div>
             <h2 className="text-xl font-black">امنیت دسترسی</h2>
          </div>
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between p-2">
              <span className="text-sm font-bold">تایید دو مرحله‌ای</span>
              <div className="w-10 h-5 bg-indigo-600 rounded-full flex items-center px-1">
                <div className="w-3.5 h-3.5 bg-white rounded-full translate-x-5" />
              </div>
            </div>
            <div className="flex items-center justify-between p-2">
              <span className="text-sm font-bold">خروج خودکار</span>
              <span className="text-xs font-black text-indigo-400">{toPersianDigits(۳۰)} دقیقه</span>
            </div>
            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[0.7rem] font-black uppercase hover:bg-white/10 transition-all">
              تغییر رمز عبور اصلی
            </button>
          </div>
          <Shield className="absolute -right-12 -bottom-12 w-48 h-48 text-indigo-600 opacity-10" />
        </section>

        {/* ظاهر */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
           <div className="flex items-center gap-4">
             <Palette size={24} className="text-slate-400" />
             <h3 className="text-lg font-black text-slate-950">رنگ سازمانی</h3>
           </div>
           <div className="flex gap-4">
             {['#4F46E5', '#10B981', '#F59E0B', '#F43F5E', '#000'].map(c => (
               <div key={c} style={{ backgroundColor: c }} className="w-10 h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform shadow-sm"></div>
             ))}
           </div>
        </section>

        {/* پشتیبان‌گیری */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
           <div className="flex items-center gap-4">
             <Database size={24} className="text-slate-400" />
             <h3 className="text-lg font-black text-slate-950">پشتیبان‌گیری</h3>
           </div>
           <button className="w-full py-4 bg-slate-50 text-indigo-700 rounded-2xl font-black text-xs border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all">
             دریافت خروجی دیتابیس
           </button>
        </section>
      </div>

      <div className="flex justify-end pt-8">
        <button className="px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-indigo-100 border-b-4 border-indigo-800 transition-all active:translate-y-1 active:border-b-0">
          ذخیره تغییرات نهایی
        </button>
      </div>
    </div>
  );
};

export default Settings;
