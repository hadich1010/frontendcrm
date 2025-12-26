
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CUSTOMERS } from '../constants';

const PrintProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = MOCK_CUSTOMERS.find(c => c.id === id);

  if (!customer) return <div>مشتری یافت نشد</div>;

  const Row = ({ label, value }: { label: string, value: string }) => (
    <div className="flex border-b border-slate-200 py-2">
      <span className="w-1/3 font-bold text-slate-700">{label}:</span>
      <span className="w-2/3 text-slate-900">{value || '-'}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 py-10 no-print-bg">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6 no-print">
        <h2 className="text-xl font-bold">پیش‌نمایش چاپ</h2>
        <div className="flex gap-4">
          <button onClick={() => navigate(-1)} className="px-6 py-2 bg-white border border-slate-300 rounded-lg">بازگشت</button>
          <button onClick={() => window.print()} className="px-6 py-2 bg-blue-600 text-white rounded-lg">چاپ A4</button>
        </div>
      </div>

      <div className="a4-page shadow-2xl mx-auto">
        <div className="text-center border-b-2 border-blue-600 pb-6 mb-8 flex justify-between items-center">
          <div className="text-right">
            <h1 className="text-2xl font-bold text-blue-900">مشخصات مشتری و پرونده تسهیلات</h1>
            <p className="text-slate-500 mt-1">سامانه مدیریت وام بانک رسالت</p>
          </div>
          <div className="w-24 h-24 bg-slate-100 rounded border flex items-center justify-center text-slate-400">محل عکس</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <section>
            <h3 className="bg-slate-100 p-2 font-bold mb-4 rounded border-r-4 border-blue-600">اطلاعات شناسایی</h3>
            <Row label="نام و نام خانوادگی" value={customer.fullName} />
            <Row label="نام پدر" value={customer.fatherName} />
            <Row label="کد ملی" value={customer.nationalId} />
            <Row label="شماره شناسنامه" value={customer.certificateId} />
            <Row label="تاریخ تولد" value={customer.birthDate} />
            <Row label="تلفن همراه" value={customer.mobile} />
            <Row label="تلفن ثابت" value={customer.fixedPhone} />
          </section>

          <section>
            <h3 className="bg-slate-100 p-2 font-bold mb-4 rounded border-r-4 border-blue-600">اطلاعات شغلی</h3>
            <Row label="شغل" value={customer.jobTitle} />
            <Row label="سمت" value={customer.position} />
            <Row label="سابقه کار" value={customer.experienceYears + ' سال'} />
            <Row label="حقوق ماهانه" value={customer.salary} />
            <Row label="تلفن محل کار" value={customer.workPhone} />
          </section>

          <section className="md:col-span-2">
            <h3 className="bg-slate-100 p-2 font-bold mb-4 rounded border-r-4 border-blue-600">اطلاعات تسهیلات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <Row label="نوع خدمات" value={customer.serviceType} />
              <Row label="مبلغ کل وام" value={customer.loanAmount} />
              <Row label="نوع ضمانت" value={customer.guaranteeType} />
              <Row label="نام ضامن" value={customer.guarantorName} />
              <Row label="مبلغ کسورات" value={customer.deductions} />
              <Row label="هزینه دفتر" value={customer.officeFee} />
            </div>
          </section>

          <section className="md:col-span-2">
            <h3 className="bg-slate-100 p-2 font-bold mb-4 rounded border-r-4 border-blue-600">آدرس و یادداشت</h3>
            <Row label="آدرس سکونت" value={customer.address} />
            <Row label="آدرس محل کار" value={customer.workAddress} />
            <div className="mt-4 p-4 border border-dashed border-slate-300 min-h-[100px] text-sm text-slate-600">
              <span className="font-bold block mb-2">یادداشت‌ها:</span>
              {customer.notes}
            </div>
          </section>
        </div>

        <div className="mt-12 flex justify-between items-center text-xs text-slate-400 border-t pt-4">
          <span>تاریخ گزارش: {new Date().toLocaleDateString('fa-IR')}</span>
          <span>امضاء و تایید مسئول پرونده</span>
        </div>
      </div>
    </div>
  );
};

export default PrintProfile;
