
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowRight, User, Landmark, CheckCircle2, ShieldCheck, Briefcase, CreditCard, MapPin, Phone, MessageSquare } from 'lucide-react';
import { MOCK_CUSTOMERS } from '../constants';
import { CustomerStatus } from '../types';

const LOGO_BASE_URL = "https://cdn.jsdelivr.net/gh/zegond/logos-per-banks@master/SVG%20Assets/Bank/Color/";

const BANK_LOGO_MAP: Record<string, string> = {
  'ir-resalat': 'Resalat.svg',
  'ir-mehr': 'Mehr_Iran.svg',
  'ir-sepah': 'Sepah.svg',
  'ir-melli': 'Melli.svg'
};

const BankLogo = ({ name, active }: { name: string, active: boolean }) => {
  const fileName = BANK_LOGO_MAP[name];
  const logoUrl = fileName ? `${LOGO_BASE_URL}${fileName}` : null;

  return (
    <img 
      src={logoUrl || ''} 
      alt={name}
      className={`w-12 h-12 object-contain transition-all duration-500 ${active ? 'grayscale-0 scale-110' : 'grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100'}`}
      onError={(e) => {
        (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png';
      }}
    />
  );
};

const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center gap-3 text-slate-900 font-extrabold text-xl pb-4 border-b border-slate-50 mb-6">
    <div className="bg-blue-50 p-2.5 rounded-2xl text-blue-600 shadow-sm">
      {icon}
    </div>
    <span>{title}</span>
  </div>
);

const InputField = ({ label, name, value, onChange, placeholder = '', type = 'text', icon: Icon }: any) => (
  <div className="group flex flex-col gap-2">
    <label className="text-[11px] font-black text-slate-500 mr-1 flex items-center gap-1.5 uppercase tracking-wider">
      {Icon && <Icon size={12} className="text-slate-400" />}
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-5 py-4 bg-slate-50/50 border border-slate-100 rounded-[1.25rem] text-black placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-sm font-bold shadow-sm"
    />
  </div>
);

const CustomerForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    status: 'pending_payment' as CustomerStatus,
    fullName: '', fatherName: '', nationalId: '', birthDate: '', mobile: '', secondMobile: '', fixedPhone: '', address: '',
    jobTitle: '', position: '', experienceYears: '', salary: '', workPhone: '', workAddress: '',
    serviceType: '', loanAmount: '', matchedAmount: '', guaranteeType: '', guarantorName: '', guarantorMobile: '', officeFee: '', deductions: '', acquiredVia: '', notes: ''
  });

  const banks = [
    { id: 'رسالت', name: 'بانک رسالت', bankCode: 'ir-resalat' },
    { id: 'مهر', name: 'قرض‌الحسنه مهر ایران', bankCode: 'ir-mehr' },
    { id: 'سپه', name: 'بانک سپه', bankCode: 'ir-sepah' },
    { id: 'ملی', name: 'بانک ملی ایران', bankCode: 'ir-melli' },
  ];

  useEffect(() => {
    if (isEdit) {
      const customer = MOCK_CUSTOMERS.find(c => c.id === id);
      if (customer) {
        setFormData({ ...customer } as any);
      }
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBankSelect = (bankId: string) => {
    setFormData(prev => ({ ...prev, serviceType: bankId }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <header>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">{isEdit ? 'ویرایش پرونده مشتری' : 'تشکیل پرونده جدید'}</h1>
          <p className="text-slate-400 font-medium text-sm mt-1 uppercase tracking-widest">Customer Profile Management System</p>
        </header>
        <button onClick={() => navigate(-1)} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 shadow-sm transition-all hover:scale-105 active:scale-95">
          <ArrowRight size={24} />
        </button>
      </div>

      {/* بخش انتخاب بانک - مدل دایره‌ای بدون فلش */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-blue-50/20 overflow-hidden">
        <SectionTitle icon={<Landmark size={22} />} title="انتخاب بانک عامل" />
        
        <div className="flex items-center justify-center gap-12 py-6">
          {banks.map((bank) => (
            <div 
              key={bank.id}
              onClick={() => handleBankSelect(bank.id)}
              className="flex flex-col items-center gap-4 cursor-pointer group"
            >
              <div className={`bank-circle relative w-24 h-24 rounded-full bg-white border-2 flex items-center justify-center transition-all ${
                formData.serviceType === bank.id 
                  ? 'active border-blue-500 bg-blue-50 scale-110' 
                  : 'border-slate-50 hover:border-slate-200 shadow-md shadow-slate-100'
              }`}>
                <BankLogo name={bank.bankCode} active={formData.serviceType === bank.id} />
                {formData.serviceType === bank.id && (
                  <div className="absolute -top-1 -right-1 bg-blue-600 p-1.5 rounded-full border-4 border-white text-white shadow-lg animate-in zoom-in duration-300">
                    <CheckCircle2 size={14} />
                  </div>
                )}
              </div>
              <span className={`text-xs font-black transition-colors ${
                formData.serviceType === bank.id ? 'text-blue-600' : 'text-slate-400'
              }`}>
                {bank.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`space-y-10 transition-all duration-700 ${!formData.serviceType ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'}`}>
        <form onSubmit={(e) => { e.preventDefault(); alert('پرونده با موفقیت ثبت شد'); navigate('/customers'); }} className="space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* اطلاعات هویتی */}
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
              <SectionTitle icon={<User size={22} />} title="اطلاعات هویتی متقاضی" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="نام و نام خانوادگی" name="fullName" value={formData.fullName} onChange={handleChange} />
                <InputField label="نام پدر" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                <InputField label="کد ملی (۱۰ رقم)" name="nationalId" value={formData.nationalId} onChange={handleChange} />
                <InputField label="تاریخ تولد" name="birthDate" value={formData.birthDate} onChange={handleChange} placeholder="۱۴۰۳/۰۱/۰۱" />
                <InputField label="شماره همراه اول" name="mobile" value={formData.mobile} onChange={handleChange} icon={Phone} />
                <InputField label="شماره همراه دوم" name="secondMobile" value={formData.secondMobile} onChange={handleChange} icon={Phone} />
                <InputField label="تلفن ثابت" name="fixedPhone" value={formData.fixedPhone} onChange={handleChange} />
              </div>
              <InputField label="آدرس دقیق سکونت" name="address" value={formData.address} onChange={handleChange} icon={MapPin} />
            </section>

            {/* اطلاعات شغلی */}
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
              <SectionTitle icon={<Briefcase size={22} />} title="وضعیت شغلی و درآمد" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="عنوان شغل" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
                <InputField label="سمت سازمانی" name="position" value={formData.position} onChange={handleChange} />
                <InputField label="سابقه کار (سال)" name="experienceYears" value={formData.experienceYears} onChange={handleChange} type="number" />
                <InputField label="حقوق ماهانه (ریال)" name="salary" value={formData.salary} onChange={handleChange} />
                <InputField label="تلفن محل کار" name="workPhone" value={formData.workPhone} onChange={handleChange} />
              </div>
              <InputField label="آدرس دقیق محل کار" name="workAddress" value={formData.workAddress} onChange={handleChange} icon={MapPin} />
            </section>

            {/* اطلاعات مالی و ضمانت */}
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
              <SectionTitle icon={<CreditCard size={22} />} title="جزئیات مالی و ضمانت" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="مبلغ کل وام (ریال)" name="loanAmount" value={formData.loanAmount} onChange={handleChange} />
                <InputField label="مبلغ متناسب (Matched)" name="matchedAmount" value={formData.matchedAmount} onChange={handleChange} placeholder="مبنای محاسبات" />
                <InputField label="نوع ضمانت" name="guaranteeType" value={formData.guaranteeType} onChange={handleChange} placeholder="چک، سفته، کسر حقوق..." />
                <InputField label="نام و نام خانوادگی ضامن" name="guarantorName" value={formData.guarantorName} onChange={handleChange} />
                <InputField label="شماره همراه ضامن" name="guarantorMobile" value={formData.guarantorMobile} onChange={handleChange} icon={Phone} />
                <InputField label="هزینه دفتر (ریال)" name="officeFee" value={formData.officeFee} onChange={handleChange} />
                <InputField label="کسورات متفرقه" name="deductions" value={formData.deductions} onChange={handleChange} />
              </div>
            </section>

            {/* وضعیت و یادداشت */}
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
              <SectionTitle icon={<ShieldCheck size={22} />} title="وضعیت پرونده و توضیحات" />
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-black text-slate-500 mr-1 uppercase tracking-wider">وضعیت کنونی پرونده</label>
                  <select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.25rem] text-black font-black text-sm focus:ring-4 focus:ring-blue-500/5 outline-none transition-all shadow-sm cursor-pointer"
                  >
                    <option value="pending_payment">منتظر پرداخت</option>
                    <option value="waiting_merat">در انتظار مرات</option>
                    <option value="completed">تکمیل شده / ثبت اسناد</option>
                    <option value="rejected">رد شده</option>
                  </select>
                </div>
                <InputField label="منبع معرف (نحوه آشنایی)" name="acquiredVia" value={formData.acquiredVia} onChange={handleChange} placeholder="اینستاگرام، معرف حضوری، پیامک..." />
                <div className="flex flex-col gap-2">
                   <label className="text-[11px] font-black text-slate-500 mr-1 uppercase tracking-wider flex items-center gap-1.5">
                     <MessageSquare size={12} />
                     یادداشت‌های تکمیلی
                   </label>
                   <textarea 
                     name="notes"
                     value={formData.notes}
                     onChange={handleChange as any}
                     placeholder="توضیحات خاص مربوط به پرونده مشتری..."
                     className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-black font-bold text-sm min-h-[140px] focus:ring-4 focus:ring-blue-500/5 outline-none shadow-sm"
                   />
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col md:flex-row justify-end items-center gap-6 pt-10">
            <button 
              type="button" 
              onClick={() => navigate('/customers')}
              className="px-10 py-5 text-slate-400 font-black text-sm hover:text-slate-600 transition-colors tracking-widest uppercase"
            >
              Cancel / انصراف
            </button>
            <button 
              type="submit" 
              className="w-full md:w-auto px-16 py-6 bg-slate-900 hover:bg-black text-white rounded-[1.75rem] shadow-2xl shadow-slate-300 transition-all font-black flex items-center justify-center gap-4 group"
            >
              <Save size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-lg">ذخیره و ثبت پرونده</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
