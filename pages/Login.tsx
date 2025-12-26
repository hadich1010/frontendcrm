
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, User, Lock, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950 font-['Vazirmatn'] text-right">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3.5rem] shadow-2xl space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-[2rem] text-white shadow-2xl mb-4">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-4xl font-black text-white mb-2">سامانه آتا</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 mr-2">نام کاربری</label>
              <div className="relative">
                <User className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-14 pl-6 text-white outline-none focus:border-indigo-500 transition-all text-right" placeholder="نام کاربری..." />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 mr-2">رمز عبور</label>
              <div className="relative">
                <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-14 pl-6 text-white outline-none focus:border-indigo-500 transition-all text-right" placeholder="رمز عبور..." />
              </div>
            </div>
            <button type="submit" className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3">
              <span>ورود به سامانه</span>
              <ArrowLeft size={20} />
            </button>
          </form>

          <div className="text-center pt-4 border-t border-white/5">
            <p className="text-slate-400 text-xs font-bold mb-4">حساب کاربری ندارید؟</p>
            <Link to="/register" className="text-indigo-400 font-black text-sm hover:text-indigo-300">ثبت‌نام عضو جدید</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
