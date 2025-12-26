
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { FileText, Download, Filter, Calendar, LayoutGrid, PieChart as PieIcon, BarChart3 } from 'lucide-react';

const Reports: React.FC = () => {
  const barData = [
    { name: 'فروردین', count: 12 },
    { name: 'اردیبهشت', count: 18 },
    { name: 'خرداد', count: 15 },
    { name: 'تیر', count: 22 },
    { name: 'مرداد', count: 30 },
    { name: 'شهریور', count: 25 },
  ];

  const pieData = [
    { name: 'بانک رسالت', value: 400 },
    { name: 'بانک سپه', value: 300 },
    { name: 'بانک ملی', value: 200 },
    { name: 'مهر ایران', value: 150 },
  ];

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <header>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">گزارش‌گیری و تحلیل داده</h1>
        <p className="text-slate-500 font-medium">تحلیل آماری و استخراج گزارش‌های تخصصی از عملکرد سامانه</p>
      </header>

      {/* Management Charts Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
          <h2 className="text-xl font-black text-slate-800">گزارش مدیریتی و تحلیل آمار</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-500" />
                روند ثبت پرونده‌ها (۶ ماه اخیر)
              </h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="font-bold mb-8 text-slate-800 text-lg flex items-center gap-2">
              <PieIcon size={20} className="text-blue-500" />
              توزیع منابع بانکی
            </h3>
            <div className="h-60 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '16px'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 space-y-3">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-slate-600 font-bold">{d.name}</span>
                  </div>
                  <span className="font-black text-slate-800">{d.value} مورد</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Exports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <h3 className="font-black text-slate-800 flex items-center gap-2 text-xl">
              <Filter className="text-blue-600" size={24} />
              فیلترهای گزارش‌گیری سفارشی
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 mr-2">انتخاب بانک</label>
                <select className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>همه بانک‌ها</option>
                  <option>بانک رسالت</option>
                  <option>بانک سپه</option>
                  <option>بانک ملی</option>
                  <option>مهر ایران</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 mr-2">وضعیت پرونده</label>
                <select className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>همه وضعیت‌ها</option>
                  <option>در انتظار پرداخت</option>
                  <option>در انتظار مرات</option>
                  <option>رد شده</option>
                  <option>تکمیل شده</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 mr-2">از تاریخ ثبت</label>
                <div className="relative">
                  <input type="text" placeholder="۱۴۰۳/۰۱/۰۱" className="w-full bg-slate-50 border-none rounded-2xl p-4 pr-12 text-sm font-bold" />
                  <Calendar className="absolute right-4 top-4 text-slate-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 mr-2">تا تاریخ</label>
                <div className="relative">
                  <input type="text" placeholder="۱۴۰۳/۱۲/۲۹" className="w-full bg-slate-50 border-none rounded-2xl p-4 pr-12 text-sm font-bold" />
                  <Calendar className="absolute right-4 top-4 text-slate-400" size={18} />
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-[1.5rem] transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2">
              <LayoutGrid size={20} />
              ایجاد پیش‌نمایش گزارش
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-slate-200">
            <h4 className="font-black text-lg mb-6 flex items-center gap-2">
              <Download size={20} className="text-blue-400" />
              خروجی‌های سریع
            </h4>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/5 font-bold text-sm">
                <span>لیست مشتریان (Excel)</span>
                <Download size={18} className="text-green-400" />
              </button>
              <button className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/5 font-bold text-sm">
                <span>گزارش تسهیلات (PDF)</span>
                <Download size={18} className="text-red-400" />
              </button>
              <button className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/5 font-bold text-sm">
                <span>آمار ماهانه (Excel)</span>
                <Download size={18} className="text-blue-400" />
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2">
               <FileText size={20} className="text-blue-600" />
               آخرین گزارش‌ها
            </h4>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white transition-all cursor-pointer">
                  <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800">خروجی عملکرد شعبه مرکزی</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">۱۴۰۳/۰۶/۱۵ - ساعت ۱۲:۳۰</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
