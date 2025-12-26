
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, CheckCircle, ArrowRight } from 'lucide-react';
import { toPersianDigits } from '../utils/format';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950 font-['Vazirmatn'] text-right">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3.5rem] shadow-2xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-black text-white mb-2">ثبت‌نام در سامانه</h1>
            <p className="text-slate-400 text-xs font-bold">عضویت با شماره موبایل</p>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 mr-2 uppercase tracking-widest">شماره همراه</label>
                <div className="relative">
                  <Smartphone className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                  <input 
                    type="tel" 
                    value={mobile} 
                    onChange={(e) => setMobile(e.target.value)} 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-14 pl-6 text-white text-center font-bold tracking-[0.2em] outline-none focus:border-indigo-500 transition-all" 
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
                  />
                </div>
              </div>
              <button onClick={() => setStep(2)} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg">ارسال کد تایید</button>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <CheckCircle size={64} className="text-emerald-500 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">کد تایید ارسال شد</h3>
                <p className="text-slate-400 text-xs font-bold">کد ارسال شده به {toPersianDigits(mobile)} را وارد کنید</p>
              </div>
              <input type="text" maxLength={4} className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 text-center text-4xl font-black text-white tracking-[0.5em] outline-none" placeholder="----" />
              <button onClick={() => navigate('/login')} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg">تایید و ورود</button>
            </div>
          )}

          <div className="text-center pt-4 border-t border-white/5">
            <Link to="/login" className="text-slate-400 font-bold text-sm flex items-center justify-center gap-2">
              <span>قبلاً ثبت‌نام کرده‌اید؟ ورود</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
