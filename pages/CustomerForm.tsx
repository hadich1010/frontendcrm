
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, ArrowRight, User, Briefcase, 
  MapPin, Phone, Calendar, ShieldCheck, 
  Hash, Info, Smartphone, CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_CUSTOMERS } from '../constants';
import { CustomerStatus } from '../types';
import { toPersianDigits } from '../utils/format';

const BANK_LOGOS = [
  { id: 'resalat', name: 'بانک رسالت', color: 'bg-blue-600' },
  { id: 'mehr', name: 'مهر ایران', color: 'bg-emerald-600' },
  { id: 'sepah', name: 'بانک سپه', color: 'bg-amber-600' },
  { id: 'melli', name: 'بانک ملی', color: 'bg-rose-700' },
];

const PersianDatePicker = ({ value, onChange, label, required }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const years = Array.from({ length: 60 }, (_, i) => 1340 + i);

  return (
    <div className="relative">
      <label className="text-[11px] font-black text-slate-500 mr-1 mb-2 block uppercase tracking-wider">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 cursor-pointer hover:border-indigo-300 transition-all font-bold text-sm flex justify-between items-center"
      >
        <span className="digits-fa">{value ? toPersianDigits(value) : 'انتخاب تاریخ'}</span>
        <Calendar size={18} className="text-slate-300" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[110]" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute z-[120] top-full mt-2 w-72 bg-white border border-slate-100 shadow-2xl rounded-[2rem] p-4"
            >
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto no-scrollbar p-2">
                {years.reverse().map(year => (
                  <button 
                    key={year}
                    type="button"
                    onClick={() => {
                      onChange(`${year}/۰۱/۰۱`);
                      setIsOpen(false);
                    }}
                    className="p-2 text-[10px] font-black hover:bg-indigo-50 rounded-xl transition-colors digits-fa"
                  >
                    {toPersianDigits(year)}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const CustomerForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    tracking_code: '',
    full_name: '',
    fother_name: '',
    phone_number: '',
    national_id: '',
    seriBirth_certificate_number: '',
    national_id_card_series: '',
    Date_of_birth: '',
    phone_number_two: '',
    landline: '',
    home_address: '',
    // Job & Financial
    jobTitle: '',
    position: '',
    experienceYears: '',
    workPhone: '',
    salary: '',
    workAddress: '',
    // Settings
    bankName: 'resalat',
    status: 'pending_payment' as CustomerStatus,
    acquiredVia: 'گوگل',
    guaranteeType: '',
    notes: ''
  });

  useEffect(() => {
    if (isEdit) {
      const customer = MOCK_CUSTOMERS.find(c => c.id === id);
      if (customer) {
        // Map old structure to new if necessary
        setFormData(prev => ({ 
          ...prev, 
          ...customer,
          full_name: customer.full_name || (customer as any).fullName || '',
          fother_name: customer.fother_name || (customer as any).fatherName || '',
          phone_number: customer.phone_number || (customer as any).mobile || '',
          phone_number_two: customer.phone_number_two || (customer as any).secondary_mobile || '',
        } as any));
      }
    } else {
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setFormData(prev => ({ ...prev, tracking_code: randomCode }));
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;

    // Currency Formatting (3 digit separation)
    if (name === 'salary') {
      const rawValue = value.replace(/,/g, '').replace(/[^0-9]/g, '');
      value = rawValue ? parseInt(rawValue).toLocaleString() : '';
    }

    // Number only validations
    const numericFields = ['national_id', 'phone_number', 'phone_number_two', 'landline', 'workPhone', 'experienceYears', 'seriBirth_certificate_number'];
    if (numericFields.includes(name)) {
      value = value.replace(/[^0-9]/g, '');
      if (name === 'national_id') value = value.substring(0, 10);
      if (name === 'phone_number' || name === 'phone_number_two') value = value.substring(0, 11);
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validations
    if (formData.national_id.length !== 10) {
      alert('کد ملی باید دقیقاً ۱۰ رقم باشد.');
      return;
    }
    if (!formData.phone_number.startsWith('09') || formData.phone_number.length !== 11) {
      alert('شماره همراه اول باید ۱۱ رقم و با ۰۹ شروع شود.');
      return;
    }
    
    alert('اطلاعات با موفقیت در دیتابیس ATA ذخیره شد.');
    navigate('/customers');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-24 text-right font-['Vazirmatn']">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {isEdit ? 'ویرایش پرونده مشتری' : 'افزودن مشتری جدید'}
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Customer Enrollment Module</p>
        </div>
        <button onClick={() => navigate(-1)} className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
          <ArrowRight size={24} />
        </button>
      </header>

      {/* انتخاب بانک */}
      <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <label className="text-xs font-black text-slate-500 mb-6 block mr-2">انتخاب بانک مبدا</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BANK_LOGOS.map((bank) => (
            <button
              key={bank.id}
              type="button"
              onClick={() => setFormData({...formData, bankName: bank.id})}
              className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 ${
                formData.bankName === bank.id ? `border-indigo-600 bg-indigo-50/50` : 'border-slate-50 bg-slate-50'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ${bank.color}`}>
                {bank.name.charAt(0)}
              </div>
              <span className={`text-sm font-black ${formData.bankName === bank.id ? 'text-indigo-600' : 'text-slate-600'}`}>{bank.name}</span>
            </button>
          ))}
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ۱. اطلاعات هویتی و شناسایی */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3 text-indigo-600 font-black border-b border-indigo-50 pb-4 justify-end">
             <span>اطلاعات هویتی و شناسایی</span>
             <User size={22} />
          </div>

          {/* کد رهگیری به صورت فیلد نمایشی (Label Style) */}
          <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200">
             <div className="flex-1">
                <span className="text-[10px] font-black text-slate-400 block mb-1">کد رهگیری سیستمی</span>
                <input 
                  type="text" 
                  value={toPersianDigits(formData.tracking_code)} 
                  readOnly 
                  className="bg-transparent border-none p-0 text-2xl font-black text-indigo-600 digits-fa tracking-widest outline-none cursor-default"
                />
             </div>
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm">
                <Hash size={24} />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">نام و نام خانوادگی *</label>
              <input name="full_name" value={formData.full_name} onChange={handleChange} required className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">نام پدر *</label>
              <input name="fother_name" value={formData.fother_name} onChange={handleChange} required className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">کد ملی (۱۰ رقم) *</label>
              <input name="national_id" value={formData.national_id} onChange={handleChange} required inputMode="numeric" maxLength={10} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm digits-fa" placeholder="۱۲۳۴۵۶۷۸۹۰" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">شماره سریال شناسنامه</label>
              <input name="seriBirth_certificate_number" value={formData.seriBirth_certificate_number} onChange={handleChange} inputMode="numeric" className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm digits-fa" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">سریال پشت کارت ملی</label>
              <input name="national_id_card_series" value={formData.national_id_card_series} onChange={handleChange} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm" placeholder="مثلا: A1234567" />
            </div>
            <PersianDatePicker label="تاریخ تولد" value={formData.Date_of_birth} onChange={(val: string) => setFormData({...formData, Date_of_birth: val})} required />
          </div>
        </section>

        {/* ۲. اطلاعات تماس و محل سکونت */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3 text-indigo-600 font-black border-b border-indigo-50 pb-4 justify-end">
             <span>تماس و محل سکونت</span>
             <MapPin size={22} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-indigo-600 mr-1">شماره همراه اول *</label>
              <input name="phone_number" value={formData.phone_number} onChange={handleChange} required inputMode="numeric" maxLength={11} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm digits-fa" placeholder="۰۹۱۲۳۵۲۳۲۰۷" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">شماره همراه دوم</label>
              <input name="phone_number_two" value={formData.phone_number_two} onChange={handleChange} inputMode="numeric" maxLength={11} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm digits-fa" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">تلفن ثابت (با کد شهر)</label>
              <input name="landline" value={formData.landline} onChange={handleChange} inputMode="numeric" className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm digits-fa" placeholder="۰۲۱۸۸۸۸۸۸۸۸" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-slate-500 mr-1">آدرس دقیق محل سکونت *</label>
            <textarea name="home_address" value={formData.home_address} onChange={handleChange as any} required rows={3} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm resize-none" />
          </div>
        </section>

        {/* ۳. وضعیت شغلی و مالی */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3 text-indigo-600 font-black border-b border-indigo-50 pb-4 justify-end">
             <span>وضعیت شغلی و توان مالی</span>
             <Briefcase size={22} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">عنوان شغل</label>
              <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">سمت سازمانی</label>
              <input name="position" value={formData.position} onChange={handleChange} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">سابقه کار (سال)</label>
              <input name="experienceYears" value={formData.experienceYears} onChange={handleChange} inputMode="numeric" className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm digits-fa" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">تلفن محل کار</label>
              <input name="workPhone" value={formData.workPhone} onChange={handleChange} inputMode="numeric" className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm digits-fa" />
            </div>
            <div className="flex flex-col gap-2 lg:col-span-2">
              <label className="text-[11px] font-black text-emerald-600 mr-1">حقوق و مزایای ماهانه (تومان) *</label>
              <div className="relative">
                <input name="salary" value={formData.salary} onChange={handleChange} required inputMode="numeric" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-emerald-500 transition-all text-left digits-fa" placeholder="۲۵,۰۰۰,۰۰۰" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 font-black text-xs">تومان</div>
              </div>
            </div>
          </div>
        </section>

        {/* ۴. وضعیت نهایی پرونده */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3 text-indigo-600 font-black border-b border-indigo-50 pb-4 justify-end">
             <span>وضعیت نهایی و منبع جذب</span>
             <ShieldCheck size={22} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">وضعیت جاری پرونده *</label>
              <select name="status" value={formData.status} onChange={handleChange} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 text-sm appearance-none">
                <option value="pending_payment">منتظر پرداخت</option>
                <option value="waiting_merat">در انتظار تایید (مرات)</option>
                <option value="waiting_account">در انتظار افتتاح حساب</option>
                <option value="waiting_completion">در انتظار تکمیل پرونده</option>
                <option value="completed">تکمیل شده</option>
                <option value="rejected">رد شده</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">منبع جذب مشتری</label>
              <select name="acquiredVia" value={formData.acquiredVia} onChange={handleChange} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 text-sm appearance-none">
                <option value="سایت">وب‌سایت اصلی</option>
                <option value="گوگل">گوگل (Google)</option>
                <option value="اینستاگرام">اینستاگرام</option>
                <option value="معرف">معرف (دوستان)</option>
                <option value="دیوار">دیوار / شیپور</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 mr-1">نوع ضمانت ارائه‌شده</label>
              <input name="guaranteeType" value={formData.guaranteeType} onChange={handleChange} placeholder="مثلا: چک صیادی" className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 text-sm" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-slate-500 mr-1">یادداشت‌های کارشناس</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange as any} rows={3} className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm resize-none" />
          </div>
        </section>

        <div className="flex justify-center md:justify-end pt-6">
          <button 
            type="submit" 
            className="w-full md:w-auto px-20 py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-lg shadow-xl shadow-slate-200 transition-all hover:bg-black active:scale-95 flex items-center justify-center gap-4 group"
          >
            <Save size={24} className="group-hover:scale-110 transition-transform" />
            <span>ذخیره نهایی پرونده در دیتابیس</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
