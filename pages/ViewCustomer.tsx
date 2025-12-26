

import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Edit, Printer, User, FileText, BadgeCheck, CheckCircle, MoreHorizontal } from 'lucide-react';
import { MOCK_CUSTOMERS } from '../constants';
import { toPersianDigits } from '../utils/format';
import { motion, AnimatePresence } from 'framer-motion';

const ViewCustomer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const customer = MOCK_CUSTOMERS.find(c => c.id === id);

  if (!customer) return <div className="p-10 text-center font-bold text-red-500">یافت نشد.</div>;

  const LabelValue = ({ label, value }: { label: string, value: string | undefined }) => (
    <div className="flex flex-col gap-1 border-b border-slate-50 pb-3 text-right">
      <span className="text-xs font-bold text-slate-400">{label}</span>
      <span className="text-sm font-extrabold text-slate-800 digits-fa">{value || '---'}</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-slate-900">پروفایل</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button onClick={() => setShowActions(!showActions)} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600">
              <MoreHorizontal size={24} />
            </button>
            <AnimatePresence>
              {showActions && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute left-0 top-full mt-2 w-48 bg-white border rounded-2xl shadow-xl p-2 z-50">
                  <Link to={`/edit-customer/${customer.id}`} className="flex items-center gap-2 p-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl">
                    <Edit size={16} /> ویرایش اطلاعات
                  </Link>
                  <button onClick={() => { setShowApproveModal(true); setShowActions(false); }} className="w-full flex items-center gap-2 p-3 text-sm font-bold text-emerald-600 hover:bg-emerald-50 rounded-xl">
                    <CheckCircle size={16} /> تایید صلاحیت
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={() => navigate(-1)} className="p-3 bg-slate-100 rounded-2xl text-slate-400"><ArrowRight size={24} /></button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-indigo-600 font-black border-b pb-4 justify-end">
             <span>هویتی</span>
             <User size={22} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <LabelValue label="نام و نام خانوادگی" value={customer.fullName || customer.full_name} />
            {/* Fix: changed nationalId to national_id */}
            <LabelValue label="کد ملی" value={toPersianDigits(customer.national_id)} />
            <LabelValue label="تلفن همراه" value={toPersianDigits(customer.mobile || customer.phone_number)} />
            {/* Fix: changed fatherName to fother_name */}
            <LabelValue label="نام پدر" value={customer.fother_name} />
          </div>
        </section>

        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-amber-600 font-black border-b pb-4 justify-end">
             <span>پرونده</span>
             <FileText size={22} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            {/* Fix: loanAmount and serviceType are now supported in the Customer type */}
            <LabelValue label="مبلغ وام" value={customer.loanAmount ? toPersianDigits(customer.loanAmount) : undefined} />
            <LabelValue label="نوع خدمات" value={customer.serviceType} />
          </div>
        </section>

        <section className="bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-right">
             <span className="text-white/40 text-[10px] font-black uppercase mb-1 block">تاریخ نهایی‌سازی</span>
             <p className="text-xl font-black digits-fa text-emerald-400">{toPersianDigits('۱۴۰۳/۰۶/۲۵')}</p>
          </div>
          <Link to={`/print/${customer.id}`} className="w-full md:w-auto flex items-center justify-center gap-3 py-4 px-10 bg-white text-slate-950 rounded-2xl font-black text-sm">
            <Printer size={18} /> چاپ
          </Link>
        </section>
      </div>

      <AnimatePresence>
        {showApproveModal && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 text-center shadow-2xl">
              <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-black mb-2">تایید صلاحیت</h3>
              <p className="text-slate-500 text-sm font-bold mb-8">آیا از تایید مدارک این مشتری اطمینان دارید؟</p>
              <div className="flex gap-3">
                <button onClick={() => setShowApproveModal(false)} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black">تایید نهایی</button>
                <button onClick={() => setShowApproveModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black">لغو</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewCustomer;