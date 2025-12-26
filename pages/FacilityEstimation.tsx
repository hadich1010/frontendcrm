
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Printer, 
  Wallet, 
  ArrowUpRight, 
  CreditCard, 
  Plus,
  ArrowDownLeft,
  History,
  TrendingUp,
  Zap
} from 'lucide-react';
import { toPersianDigits, numberToWords } from '../utils/format';

const WalletWidget = ({ title, amount, icon, color, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: 'spring' }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="bg-white p-8 rounded-[3rem] border border-slate-50 shadow-soft flex flex-col justify-between h-56 relative overflow-hidden group"
  >
    <div className="flex justify-between items-start">
      <div className={`w-16 h-16 ${color} rounded-[1.8rem] flex items-center justify-center text-white shadow-xl transition-transform group-hover:rotate-12`}>
        {icon}
      </div>
      <div className="text-right">
        <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <div className="flex items-center gap-1 text-emerald-500 font-black text-[0.6rem]">
          <TrendingUp size={10} />
          <span>۱۲٪ افزایش</span>
        </div>
      </div>
    </div>
    <div>
      <h3 className="text-3xl font-black text-slate-900 digits-fa leading-none">{amount}</h3>
      <span className="text-[0.7rem] font-black text-slate-400 mt-2 block">تومان</span>
    </div>
    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-slate-50 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-1000"></div>
  </motion.div>
);

const FacilityEstimation: React.FC = () => {
  const location = useLocation();
  const [amount, setAmount] = useState<string>('');
  const [rechargeAmount, setRechargeAmount] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const amountParam = params.get('amount');
    if (amountParam) {
      setAmount(toPersianDigits(parseInt(amountParam).toLocaleString()));
    }
  }, [location]);

  const words = useMemo(() => numberToWords(amount), [amount]);

  const rows = useMemo(() => {
    const rawValue = amount.replace(/,/g, '').replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
    const inputVal = parseFloat(rawValue);
    if (isNaN(inputVal) || inputVal <= 0) return [];
    
    const DEFAULT_MONTHS = [1, 10, 12, 18, 22, 24];
    const result = [];
    for (let i = 1; i <= 24; i++) {
      if (!DEFAULT_MONTHS.includes(i)) continue;
      const totalRepayment = inputVal * i;
      let discountRate = i <= 12 ? 0.23 : (i <= 18 ? 0.345 : 0.46);
      const discount = totalRepayment * discountRate;
      const finalAmount = totalRepayment - discount;
      
      result.push({
        month: i,
        repayment: totalRepayment,
        twelveMonth: totalRepayment / 12,
        finalAmount: finalAmount,
        profit: discount,
        profitRate: (discountRate * 100).toFixed(1)
      });
    }
    return result;
  }, [amount]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 lg:space-y-12 pb-24"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">کیف پول ATA</h1>
          <p className="text-slate-500 mt-2 font-bold uppercase tracking-widest text-[0.7rem]">Smart Wallet & Loan Evaluation</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <motion.button whileTap={{ scale: 0.95 }} className="flex-1 md:flex-none bg-white border border-slate-100 p-5 rounded-[1.8rem] text-slate-400 hover:text-indigo-600 shadow-sm transition-all flex items-center justify-center gap-3">
            <History size={22} />
            <span className="text-xs font-black">تراکنش‌ها</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()} 
            className="flex-1 md:flex-none bg-slate-900 text-white px-10 py-5 rounded-[1.8rem] flex items-center justify-center gap-4 font-black shadow-2xl no-print"
          >
            <Printer size={22} />
            <span className="text-sm">چاپ گزارش</span>
          </motion.button>
        </div>
      </header>

      {/* Primary Wallet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <WalletWidget title="موجودی حساب" amount="۱۸,۷۵۰,۰۰۰" icon={<Wallet size={32} />} color="bg-indigo-600" delay={0.1} />
        <WalletWidget title="اعتبار وام اختصاصی" amount="۱۲۰,۰۰۰,۰۰۰" icon={<Zap size={32} />} color="bg-emerald-500" delay={0.2} />
        <WalletWidget title="بدهی اقساط جاری" amount="۵,۴۰۰,۰۰۰" icon={<ArrowDownLeft size={32} />} color="bg-rose-500" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Recharge & Score Panel */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-10 rounded-[3.5rem] border border-slate-50 shadow-soft"
          >
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-4">
              <Plus size={24} className="text-indigo-600" />
              افزایش موجودی سریع
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {['۱,۰۰۰,۰۰۰', '۲,۵۰۰,۰۰۰', '۵,۰۰۰,۰۰۰', '۱۰,۰۰۰,۰۰۰'].map(m => (
                <motion.button 
                  key={m}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRechargeAmount(m)}
                  className="py-4 px-2 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-[0.75rem] font-black text-slate-600 hover:bg-indigo-600 hover:text-white transition-all digits-fa"
                >
                  {m} تومان
                </motion.button>
              ))}
            </div>
            <div className="relative mb-8">
              <input 
                type="text" 
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(e.target.value)}
                placeholder="مبلغ دلخواه را وارد کنید..."
                className="w-full py-5 px-8 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-center"
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-5 rounded-[2rem] font-black text-sm shadow-xl shadow-indigo-200 flex items-center justify-center gap-4"
            >
              <CreditCard size={22} />
              شارژ آنی کیف پول
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-slate-900 to-indigo-950 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <h4 className="text-xs font-black mb-2 opacity-50 uppercase tracking-[0.3em]">Credit Score / امتیاز اعتبار</h4>
              <p className="text-5xl font-black digits-fa mb-6">۸۵۰</p>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                  className="bg-indigo-500 h-full rounded-full shadow-[0_0_15px_rgba(93,95,239,0.5)]"
                ></motion.div>
              </div>
              <p className="text-[0.65rem] mt-5 opacity-40 font-bold leading-relaxed">تبریک! شما واجد شرایط دریافت وام طلایی ATA هستید.</p>
            </div>
            <Zap className="absolute -right-8 -bottom-8 w-40 h-40 text-white opacity-5 rotate-12" />
          </motion.div>
        </div>

        {/* Loan Calculator Area */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-10 lg:p-14 rounded-[4rem] border border-indigo-100/50 shadow-soft relative overflow-hidden"
          >
            <div className="relative z-10 space-y-10">
              <label className="block text-base font-black text-slate-800 flex items-center gap-4">
                <Calculator size={28} className="text-indigo-600" />
                محاسبه‌گر تخصصی وام و سود
              </label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder={toPersianDigits('۱۰,۰۰۰,۰۰۰')}
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9۰-۹]/g, '');
                    if (!val) { setAmount(''); return; }
                    const englishVal = val.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
                    setAmount(toPersianDigits(parseInt(englishVal).toLocaleString()));
                  }}
                  className="w-full py-10 lg:py-12 text-4xl lg:text-6xl font-black text-center bg-slate-50 border-2 border-transparent rounded-[3rem] focus:border-indigo-500 focus:bg-white transition-all outline-none text-slate-900 shadow-inner group-hover:shadow-indigo-100"
                />
                <div className="absolute left-10 top-1/2 -translate-y-1/2 text-2xl font-black text-indigo-600 opacity-40">تومان</div>
              </div>
              
              <AnimatePresence>
                {words && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center"
                  >
                    <div className="bg-indigo-600 text-white px-10 py-4 rounded-[2rem] text-sm font-black shadow-2xl shadow-indigo-100 border border-white/20">
                      {words}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          </motion.div>

          <div className="grid grid-cols-1 gap-5">
            {rows.length > 0 ? rows.map((row, i) => (
              <motion.div 
                key={row.month} 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                whileHover={{ x: 10 }}
                className="bg-white p-4 rounded-[2.8rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group"
              >
                <div className="bg-indigo-600 text-white w-full md:w-40 py-8 rounded-[2.2rem] flex flex-col items-center justify-center shadow-xl shadow-indigo-100">
                  <span className="text-4xl font-black digits-fa">{toPersianDigits(row.month)}</span>
                  <span className="text-[0.7rem] font-black uppercase tracking-widest opacity-60">ماه بازپرداخت</span>
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 px-4 py-2 w-full">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">مبلغ هر قسط</span>
                    <span className="text-base font-black text-slate-800 digits-fa">{toPersianDigits(Math.floor(row.repayment / row.month).toLocaleString())}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">سود کل تسهیلات</span>
                    <span className="text-base font-black text-rose-500 digits-fa">{toPersianDigits(Math.floor(row.profit).toLocaleString())}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">خالص پرداختی</span>
                    <span className="text-base font-black text-emerald-600 digits-fa">{toPersianDigits(Math.floor(row.finalAmount).toLocaleString())}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">درصد کارمزد</span>
                    <span className="text-base font-black text-indigo-600 digits-fa">{toPersianDigits(row.profitRate)}٪</span>
                  </div>
                </div>
              </motion.div>
            )) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-50/50 border-4 border-dashed border-slate-200 p-20 rounded-[4rem] text-center"
              >
                <Calculator size={64} className="mx-auto text-slate-200 mb-6" />
                <p className="font-black text-xl text-slate-400">مبلغ را برای مشاهده پلن‌های وام وارد کنید</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FacilityEstimation;
