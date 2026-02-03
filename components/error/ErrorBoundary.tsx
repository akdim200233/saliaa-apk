
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">عذراً، حدث خطأ ما</h1>
            <p className="text-gray-500 mb-6">واجه النظام مشكلة غير متوقعة. يرجى محاولة تحديث الصفحة.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => window.location.reload()}
                className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} /> تحديث
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <Home size={18} /> الرئيسية
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
