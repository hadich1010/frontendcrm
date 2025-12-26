
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer } from 'lucide-react';
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
        <button onClick={() => window.print()} className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black no-print">
          <Printer size={20} />
          <span>چاپ گزارش</span>
        </button>
      </header>

      <div className="bg-white p-10 rounded-[3rem] border shadow-sm">
        <div className="space-y-6 text-center max-w-2xl mx-auto">
          <label className="block text-lg font-black text-slate-800">مبلغ پایه (تومان)</label>
          <input 
            type="text" 
            value={amount}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9۰-۹]/g, '');
              const englishVal = val.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
              setAmount(englishVal ? toPersianDigits(parseInt(englishVal).toLocaleString()) : '');
            }}
            className="w-full py-6 text-3xl font-black text-center bg-slate-50 border-none rounded-2xl outline-none"
          />
          {words && <div className="text-indigo-600 font-bold text-sm bg-indigo-50 p-4 rounded-2xl">{words}</div>}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden flex flex-col max-h-[500px]">
        {results.length > 0 ? (
          <div className="overflow-x-auto overflow-y-auto">
            <table className="w-full text-right border-collapse min-w-[700px]">
              <thead className="sticky top-0 bg-slate-50 border-b">
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="p-5">دوره</th>
                  <th className="p-5">بازپرداخت</th>
                  <th className="p-5">۱۲ ماهه</th>
                  <th className="p-5">۱۰ ماهه</th>
                  <th className="p-5">نهایی</th>
                  <th className="p-5">سود</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {results.map((row) => (
                  <tr key={row.months} className="hover:bg-indigo-50/20 transition-colors">
                    <td className="p-5 font-black digits-fa text-indigo-600">{toPersianDigits(row.months)} ماهه</td>
                    <td className="p-5 font-bold digits-fa">{toPersianDigits(Math.floor(row.totalAmount).toLocaleString())}</td>
                    <td className="p-5 font-bold text-slate-400 digits-fa">{toPersianDigits(Math.floor(row.monthlyAmount).toLocaleString())}</td>
                    <td className="p-5 font-bold text-slate-400 digits-fa">{toPersianDigits(Math.floor(row.monthlyAmountAdjusted).toLocaleString())}</td>
                    <td className="p-5 font-black text-emerald-600 digits-fa">{toPersianDigits(Math.floor(row.finalAmount).toLocaleString())}</td>
                    <td className="p-5 font-black text-rose-500 digits-fa">{toPersianDigits(Math.floor(row.discount).toLocaleString())}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 text-center font-black text-slate-300">در انتظار ورود مبلغ...</div>
        )}
      </div>
    </div>
  );
};

export default FacilityEstimation;
