
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Edit, Printer, User, Briefcase, FileText, BadgeCheck, Calculator } from 'lucide-react';
import { MOCK_CUSTOMERS } from '../constants';

const ViewCustomer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = MOCK_CUSTOMERS.find(c => c.id === id);

  if (!customer) return <div className="p-10 text-center font-bold text-red-500">مشتری مورد نظر یافت نشد.</div>;

  const LabelValue = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col gap-1 border-b border-slate-50 pb-3">
      <span className="text-xs font-bold text-slate-400">{label}</span>
      <span className="text-sm font-extrabold text-slate-800">{value || '---'}</span>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h1 className="text-3xl font-black text-slate-800">پروفایل مشتری</h1>
           <p className="text-slate-500 font-medium">مشاهده اطلاعات کامل و وضعیت پرونده {customer.fullName}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => navigate(`/estimation?amount=${customer.matchedAmount.replace(/,/g, '')}`)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-100 transition-all hover:scale-105 active:scale-95"
          >
            <Calculator size={20} />
            <span>برآورد تسهیلات برای این مشتری</span>
          </button>
          
          <Link to={`/edit-customer/${customer.id}`} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 transition-all hover:scale-105 active:scale-95">
            <Edit size={18} />
            <span>ویرایش اطلاعات</span>
          </Link>

          <button onClick={() => navigate(-1)} className="px-5 py-3 bg-white border-2 border-slate-100 rounded-2xl text-slate-600 hover:bg-slate-50 transition-colors">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Identifying Info */}
        <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-blue-600 font-black border-b border-blue-50 pb-4">
             <User size={22} />
             <span>اطلاعات هویتی</span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <LabelValue label="نام و نام خانوادگی" value={customer.fullName} />
            <LabelValue label="نام پدر" value={customer.fatherName} />
            <LabelValue label="کد ملی" value={customer.nationalId} />
            <LabelValue label="شماره شناسنامه" value={customer.certificateId} />
            <LabelValue label="تاریخ تولد" value={customer.birthDate} />
            <LabelValue label="موبایل" value={customer.mobile} />
            <LabelValue label="تلفن ثابت" value={customer.fixedPhone} />
            <LabelValue label="موبایل دوم" value={customer.secondMobile} />
          </div>
          <div className="pt-2">
            <LabelValue label="آدرس سکونت" value={customer.address} />
          </div>
        </section>

        {/* Job Info */}
        <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-emerald-600 font-black border-b border-emerald-50 pb-4">
             <Briefcase size={22} />
             <span>اطلاعات شغلی</span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <LabelValue label="شغل" value={customer.jobTitle} />
            <LabelValue label="سمت" value={customer.position} />
            <LabelValue label="سابقه کار" value={customer.experienceYears + ' سال'} />
            <LabelValue label="حقوق ماهانه" value={customer.salary} />
            <LabelValue label="تلفن محل کار" value={customer.workPhone} />
          </div>
          <div className="pt-2">
            <LabelValue label="آدرس محل کار" value={customer.workAddress} />
          </div>
        </section>

        {/* Case Info */}
        <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-amber-600 font-black border-b border-amber-50 pb-4">
             <FileText size={22} />
             <span>جزئیات پرونده و تسهیلات</span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <LabelValue label="نوع خدمات" value={customer.serviceType} />
            <LabelValue label="مبلغ وام" value={customer.loanAmount} />
            <LabelValue label="نوع ضمانت" value={customer.guaranteeType} />
            <LabelValue label="نام ضامن" value={customer.guarantorName} />
            <LabelValue label="موبایل ضامن" value={customer.guarantorMobile} />
            <LabelValue label="مبلغ متناسب تایید شده" value={customer.matchedAmount ? Number(customer.matchedAmount.replace(/,/g, '')).toLocaleString() + ' تومان' : '---'} />
            <LabelValue label="هزینه دفتر" value={customer.officeFee} />
            <LabelValue label="کسورات" value={customer.deductions} />
          </div>
        </section>

        {/* Summary Info */}
        <section className="bg-slate-900 p-8 rounded-[2rem] text-white space-y-6 shadow-xl shadow-slate-200">
          <div className="flex items-center gap-3 text-blue-400 font-black border-b border-white/10 pb-4">
             <BadgeCheck size={22} />
             <span>خلاصه و اقدامات</span>
          </div>
          <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <span className="text-xs text-white/50 block mb-1">یادداشت‌های پرونده</span>
              <p className="text-sm leading-relaxed">{customer.notes || 'یادداشتی ثبت نشده است.'}</p>
            </div>
            <div className="flex flex-col gap-4">
               <Link to={`/print/${customer.id}`} className="flex items-center justify-center gap-2 w-full py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-slate-100 transition-colors">
                 <Printer size={20} />
                 چاپ مشخصات (A4)
               </Link>
               <div className="flex justify-between items-center px-2">
                 <span className="text-xs text-white/60">شناسه سیستم:</span>
                 <span className="text-xs font-mono">ID-{customer.id}</span>
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewCustomer;
