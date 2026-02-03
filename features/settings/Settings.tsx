
import React from 'react';
import { User, Shield, Bell, Zap, Database, HelpCircle } from 'lucide-react';

const Settings: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const translations = {
    ar: {
      title: 'إعدادات النظام',
      profile: 'الملف الشخصي',
      notifications: 'الإشعارات',
      security: 'الأمان والخصوصية',
      plans: 'الاشتراكات والفوترة',
      integrations: 'التكاملات والربط',
      support: 'الدعم والمساعدة',
      save: 'حفظ التغييرات',
    },
    en: {
      title: 'System Settings',
      profile: 'Profile Info',
      notifications: 'Notifications',
      security: 'Security & Privacy',
      plans: 'Subscription & Billing',
      integrations: 'Integrations',
      support: 'Help & Support',
      save: 'Save Changes',
    }
  }[lang];

  const sections = [
    { name: translations.profile, icon: <User className="w-5 h-5" />, active: true },
    { name: translations.notifications, icon: <Bell className="w-5 h-5" />, active: false },
    { name: translations.security, icon: <Shield className="w-5 h-5" />, active: false },
    { name: translations.plans, icon: <Zap className="w-5 h-5" />, active: false },
    { name: translations.integrations, icon: <Database className="w-5 h-5" />, active: false },
    { name: translations.support, icon: <HelpCircle className="w-5 h-5" />, active: false },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">{translations.title}</h1>
        <p className="text-gray-500 mt-1">{lang === 'ar' ? 'قم بتخصيص بيئة عملك بما يناسب احتياجاتك.' : 'Customize your workspace to fit your needs.'}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 flex flex-col gap-2">
          {sections.map((s, i) => (
            <button 
              key={i} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                s.active ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-gray-500 hover:bg-white hover:text-gray-900'
              }`}
            >
              {s.icon}
              {s.name}
            </button>
          ))}
        </aside>

        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-50">
            <div className="relative">
              <img 
                src="https://picsum.photos/120/120?random=1" 
                alt="Profile" 
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-primary-50"
              />
              <button className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-all">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">رضوان أكديم</h3>
              <p className="text-gray-500 mb-3">redouane.akdim@academy.com</p>
              <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Super Admin</span>
            </div>
          </div>

          <form className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                <input type="text" defaultValue="رضوان أكديم" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{lang === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}</label>
                <input type="text" defaultValue="المدير العام" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</label>
                <input type="email" defaultValue="redouane.akdim@academy.com" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                <input type="text" defaultValue="+212 600 000 000" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none" dir="ltr" />
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label className="text-sm font-bold text-gray-700">{lang === 'ar' ? 'النبذة التعريفية' : 'Bio'}</label>
              <textarea rows={4} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none" defaultValue="متخصص في إدارة وتطوير المحتوى الرقمي وبناء العلامات التجارية الشخصية والمؤسسية." />
            </div>

            <div className="pt-6">
              <button className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
                {translations.save}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Helper internal icons
const Edit = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

export default Settings;
