
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, ArrowRight, User, Landmark, Briefcase, 
  CreditCard, MapPin, Phone, MessageSquare, 
  UserCheck, Calendar, ShieldCheck, FileText, Hash
} from 'lucide-react';
import { MOCK_CUSTOMERS } from '../constants';
import { CustomerStatus } from '../types';

const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center gap-3 text-slate-900 font-extrabold text-lg pb-4 border-b border-slate-100 mb-6">
    <div className="bg-indigo-50 p-2.5 rounded-2xl text-indigo-600 shadow-sm">
      {icon}
    </div>
    <span>{title}</span>
  </div>
);

const InputField = ({ label, name, value, onChange, placeholder = '', type = 'text', icon: Icon, required = false, disabled = false }: any) => (
  <div className="group flex flex-col gap-2">
    <label className="text-[11px] font-black text-slate-500 mr-1 flex items-center gap-1.5 uppercase tracking-wider">
      {Icon && <Icon size={12} className="text-slate-400" />}
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`px-5 py-4 bg-slate-50 border border-slate-100 rounded-[1.25rem] text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm font-bold shadow-sm ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    />
  </div>
);

const CustomerForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    fullName: '', fatherName: '', nationalId: '', tracking_code: '',
    mobile: '', phone: '', secondary_mobile: '', address: '',
    birthDate: '',
    jobTitle: '', workPhone: '', experienceYears: '', position: '', salary: '', workAddress: '',
    serviceType: 'بانک رسالت', startDate: '', endDate: '',
    guarantorMobile: '', guarantorName: '', guaranteeType: '',
    officeFee: '', loanAmount: '', deductions: '',
    acquiredVia: '', referrer: '', status: 'pending_payment' as CustomerStatus,
    notes: ''
  });

  useEffect(() => {
    if (isEdit) {
      const customer = MOCK_CUSTOMERS.find(c => c.id === id);
      if (customer) {
        setFormData(prev => ({ ...prev, ...customer } as any));
      }
    } else {
      // تولید کد رهگیری تصادفی ۶ رقمی
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setFormData(prev => ({ ...prev, tracking_code: randomCode }));
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('پرونده با موفقیت در سامانه ثبت گردید.');
    navigate('/customers');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 text-right font-['Vazirmatn']">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{isEdit ? 'ویرایش پرونده' : 'ثبت پرونده جدید'}</h1>
        <button onClick={() => navigate(-1)} className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors shadow-sm">
          <ArrowRight size={24} />
        </button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* اطلاعات هویتی */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          <SectionTitle icon={<User size={22} />} title="۱. اطلاعات شخصی و هویتی" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InputField label="کد رهگیری" name="tracking_code" value={formData.tracking_code} onChange={handleChange} icon={Hash} disabled />
            <InputField label="نام و نام خانوادگی" name="fullName" value={formData.fullName} onChange={handleChange} required />
            <InputField label="شماره همراه اول" name="mobile" value={formData.mobile} onChange={handleChange} icon={Phone} required />
            <InputField label="کد ملی" name="nationalId" value={formData.nationalId} onChange={handleChange} />
            <InputField label="نام پدر" name="fatherName" value={formData.fatherName} onChange={handleChange} />
            <InputField label="موبایل دوم" name="secondary_mobile" value={formData.secondary_mobile} onChange={handleChange} icon={Phone} />
            <InputField label="تلفن ثابت" name="phone" value={formData.phone} onChange={handleChange} icon={Phone} />
            <InputField label="تاریخ تولد" name="birthDate" value={formData.birthDate} onChange={handleChange} placeholder="۱۴۰۳/۰۱/۰۱" icon={Calendar} />
          </div>
          <div className="mt-4">
             <InputField label="آدرس دقیق محل سکونت" name="address" value={formData.address} onChange={handleChange} icon={MapPin} />
          </div>
        </section>

        {/* اطلاعات شغلی */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          <SectionTitle icon={<Briefcase size={22} />} title="۲. وضعیت شغلی و درآمدی" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField label="عنوان شغلی" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
            <InputField label="سمت سازمانی" name="position" value={formData.position} onChange={handleChange} />
            <InputField label="سابقه کار (سال)" name="experienceYears" value={formData.experienceYears} onChange={handleChange} type="number" />
            <InputField label="تلفن محل کار" name="workPhone" value={formData.workPhone} onChange={handleChange} />
            <InputField label="حقوق ماهانه" name="salary" value={formData.salary} onChange={handleChange} />
          </div>
        </section>

        {/* اطلاعات تسهیلات */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          <SectionTitle icon={<CreditCard size={22} />} title="۳. جزئیات تحصیلات و ضمانت" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1 uppercase tracking-wider">نوع خدمات *</label>
              <select name="serviceType" value={formData.serviceType} onChange={handleChange} required className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-[1.25rem] text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/5">
                <option value="بانک رسالت">بانک رسالت</option>
                <option value="بانک مهر">بانک مهر ایران</option>
                <option value="سایر">سایر موارد</option>
              </select>
            </div>
            <InputField label="هزینه دفتر *" name="officeFee" value={formData.officeFee} onChange={handleChange} required />
            <InputField label="مبلغ درخواستی وام" name="loanAmount" value={formData.loanAmount} onChange={handleChange} />
            <InputField label="نوع ضمانت" name="guaranteeType" value={formData.guaranteeType} onChange={handleChange} />
            <InputField label="نام و نام خانوادگی ضامن" name="guarantorName" value={formData.guarantorName} onChange={handleChange} />
            <InputField label="موبایل ضامن" name="guarantorMobile" value={formData.guarantorMobile} onChange={handleChange} icon={Phone} />
          </div>
        </section>

        {/* وضعیت پرونده */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          <SectionTitle icon={<ShieldCheck size={22} />} title="۴. وضعیت نهایی پرونده" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1 uppercase tracking-wider">وضعیت جاری *</label>
              <select name="status" value={formData.status} onChange={handleChange} required className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-[1.25rem] text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/5">
                <option value="pending_payment">منتظر پرداخت</option>
                <option value="waiting_merat">در انتظار تایید (مرات)</option>
                <option value="completed">تکمیل شده</option>
                <option value="rejected">رد شده</option>
              </select>
            </div>
            <InputField label="منبع جذب مشتری" name="acquiredVia" value={formData.acquiredVia} onChange={handleChange} />
            <InputField label="معرف (در صورت وجود)" name="referrer" value={formData.referrer} onChange={handleChange} />
          </div>
          <div className="mt-4">
             <textarea 
               name="notes"
               value={formData.notes}
               onChange={handleChange as any}
               placeholder="یادداشت‌های اضافی برای این پرونده..."
               className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-slate-800 font-bold text-sm min-h-[120px] outline-none focus:border-indigo-500 transition-all shadow-sm"
             />
          </div>
        </section>

        <div className="flex justify-center md:justify-end pt-10">
          <button 
            type="submit" 
            className="w-full md:w-auto px-20 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-slate-200 transition-all hover:bg-black active:scale-95 flex items-center justify-center gap-4"
          >
            <Save size={24} />
            <span>ثبت و تایید نهایی پرونده</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
