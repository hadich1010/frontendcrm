
import React, { useState } from 'react';
import { Coins, Shield, Palette, Check } from 'lucide-react';
import { toPersianDigits } from '../utils/format';

const Settings: React.FC = () => {
  const [currency, setCurrency] = useState<'toman' | 'rial'>('toman');
  const [logoutTimer, setLogoutTimer] = useState(30);
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-20 text-right">
      <header>
        <h1 className="text-3xl font-black text-slate-900">تنظیمات</h1>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center gap-4 border-b pb-4 justify-end">
             <h2 className="text-xl font-black text-slate-900">نمایش مبالغ</h2>
             <Coins size={24} className="text-indigo-600" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setCurrency('toman')} className={`p-6 rounded-[1.8rem] border-2 transition-all flex justify-between items-center ${currency === 'toman' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'}`}>
              {currency === 'toman' && <Check size={20} className="text-indigo-600" />}
              <span className="font-black">تومان</span>
            </button>
            <button onClick={() => setCurrency('rial')} className={`p-6 rounded-[1.8rem] border-2 transition-all flex justify-between items-center ${currency === 'rial' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'}`}>
              {currency === 'rial' && <Check size={20} className="text-indigo-600" />}
              <span className="font-black">ریال</span>
            </button>
          </div>
        </section>

        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center gap-4 border-b pb-4 justify-end">
             <h2 className="text-xl font-black text-slate-900">امنیت</h2>
             <Shield size={24} className="text-rose-600" />
          </div>
          <div className="space-y-8">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-black digits-fa text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{toPersianDigits(logoutTimer)} دقیقه</span>
                <label className="text-sm font-bold text-slate-600">زمان خروج خودکار</label>
              </div>
              <input 
                type="range" 
                min="10" 
                max="60" 
                value={logoutTimer} 
                onChange={(e) => setLogoutTimer(parseInt(e.target.value))} 
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
              />
            </div>
            
            <div className="pt-6 border-t border-slate-50">
              <button 
                onClick={() => setShowQR(!showQR)} 
                className={`w-full p-5 rounded-2xl font-black text-sm transition-all ${showQR ? 'bg-slate-100 text-slate-600' : 'bg-slate-900 text-white shadow-xl shadow-slate-200'}`}
              >
                تایید دو مرحله‌ای
              </button>
              {showQR && (
                <div className="mt-6 p-8 bg-slate-50 rounded-[2rem] flex flex-col items-center gap-4 border border-slate-100">
                  <div className="w-44 h-44 bg-white p-3 rounded-3xl shadow-sm border border-slate-100">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ATA_AUTH_${logoutTimer}`} alt="QR Code" className="w-full h-full" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">اسکن با Google Authenticator</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <div className="flex items-center gap-4 justify-end border-b pb-4">
             <h3 className="text-lg font-black text-slate-900">پالت رنگی</h3>
             <Palette size={24} className="text-indigo-600" />
           </div>
           <div className="flex gap-4 justify-end flex-wrap">
             {['#4F46E5', '#10B981', '#F59E0B', '#F43F5E', '#1B1B1B'].map(c => (
               <div key={c} style={{ backgroundColor: c }} className="w-12 h-12 rounded-2xl cursor-pointer hover:scale-110 transition-transform shadow-sm border-2 border-white"></div>
             ))}
           </div>
        </section>
      </div>

      <div className="flex justify-center pt-8">
        <button className="w-full md:w-auto px-20 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-100 transition-all active:scale-95">
          ثبت تغییرات
        </button>
      </div>
    </div>
  );
};

export default Settings;
