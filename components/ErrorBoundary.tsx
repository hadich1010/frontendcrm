
import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Fix: Inherit from React.Component directly to resolve TypeScript's failure to recognize 'props' on the component instance
class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-right font-['Vazirmatn']">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 max-w-lg w-full text-center">
            <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={40} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 mb-4">متاسفیم، مشکلی پیش آمده است</h1>
            <p className="text-slate-500 font-bold mb-8 leading-relaxed">
              در بارگذاری این بخش از سامانه خطایی رخ داده است. لطفاً صفحه را بازنشانی کنید.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg shadow-indigo-100"
            >
              <RefreshCcw size={20} />
              تلاش مجدد و بازنشانی
            </button>
          </div>
        </div>
      );
    }

    // Fix: Access children through this.props which is now correctly recognized via React.Component inheritance
    return this.props.children;
  }
}

export default ErrorBoundary;
