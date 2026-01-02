
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, Calculator, Info } from 'lucide-react';
import { toPersianDigits, numberToWords } from '../utils/format';

const FacilityEstimation: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const words = useMemo(() => numberToWords(amount), [amount]);

  const results = useMemo(() => {
    const rawValue = amount.replace(/,/g, '').replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
    const inputVal = parseFloat(rawValue);
    if (isNaN(inputVal) || inputVal <= 0) return [];
    
    const selectedMonths = [1, 6, 10, 12, 18, 22, 24];
    return selectedMonths.map(months => {
      const totalAmount = inputVal * months;
      let discountRate = months <= 12 ? 0.23 : months <= 18 ? 0.345 : 0.46;
      const discount = totalAmount * discountRate;
      const finalAmount = totalAmount - discount;
      const monthlyAmount = (totalAmount / 12);
      const monthlyAmountAdjusted = (monthlyAmount / 10) * 12;
      return { months, totalAmount, monthlyAmount, monthlyAmountAdjusted, finalAmount, discount };
    });
  }, [amount]);

  return (
    <div className="space-y-8 pb-24 text-right">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-3xl font-black text-slate-900 leading-tight">محاسبه‌گر تسهیلات</h1>
        <button onClick={() => window.print()} className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black no-print shadow-lg shadow-slate-200">
          <Printer size={20} />
          <span>چاپ گزارش محاسبات</span>
        </button>
      </header>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <div className="space-y-6 text-center max-w-2xl mx-auto">
          <label className="block text-lg font-black text-slate-800">مبلغ پایه تسهیلات (تومان)</label>
          <input 
            type="text" 
            value={amount}
            placeholder="مثلا: ۱۰,۰۰۰,۰۰۰"
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9۰-۹]/g, '');
              const englishVal = val.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
              setAmount(englishVal ? toPersianDigits(parseInt(englishVal).toLocaleString()) : '');
            }}
            className="w-full py-8 text-4xl font-black text-center bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-[2.5rem] outline-none transition-all digits-fa"
          />
          <AnimatePresence>
            {words && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-indigo-600 font-bold text-sm bg-indigo-50 p-5 rounded-2xl border border-indigo-100"
              >
                {words}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        {results.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse min-w-[800px]">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="p-6">دوره زمانی</th>
                  <th className="p-6">کل بازپرداخت</th>
                  <th className="p-6">اقساط ۱۲ ماهه</th>
                  <th className="p-6">اقساط ۱۰ ماهه</th>
                  <th className="p-6">خالص دریافتی</th>
                  <th className="p-6">سود و کارمزد</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {results.map((row) => (
                  <tr key={row.months} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="p-6 font-black digits-fa text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span>{toPersianDigits(row.months)} ماهه</span>
                      </div>
                    </td>
                    <td className="p-6 font-bold digits-fa text-slate-700">{toPersianDigits(Math.floor(row.totalAmount).toLocaleString())}</td>
                    <td className="p-6 font-bold text-slate-400 digits-fa">{toPersianDigits(Math.floor(row.monthlyAmount).toLocaleString())}</td>
                    <td className="p-6 font-bold text-slate-400 digits-fa">{toPersianDigits(Math.floor(row.monthlyAmountAdjusted).toLocaleString())}</td>
                    <td className="p-6 font-black text-emerald-600 text-lg digits-fa">{toPersianDigits(Math.floor(row.finalAmount).toLocaleString())}</td>
                    <td className="p-6 font-black text-rose-500 digits-fa">{toPersianDigits(Math.floor(row.discount).toLocaleString())}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-32 text-center flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
              <Calculator size={40} />
            </div>
            <span className="font-black text-slate-300 text-lg">برای شروع، مبلغ تسهیلات را وارد کنید</span>
          </div>
        )}
      </div>

      <footer className="bg-amber-50 border border-amber-100 p-6 rounded-3xl no-print">
        <div className="flex gap-4 text-amber-700">
          <Info size={24} className="shrink-0" />
          <div className="space-y-1">
            <h4 className="font-black text-sm">نکته مهم در محاسبات</h4>
            <p className="text-xs font-bold leading-relaxed">
              ارقام نمایش داده شده بر اساس آخرین نرخ‌های مصوب بانکی برآورد شده‌اند و ممکن است در زمان عقد قرارداد با توجه به رتبه اعتباری مشتری در سامانه مرات، تا ۵٪ تلورانس داشته باشند.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FacilityEstimation;
