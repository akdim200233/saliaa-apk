
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Filter, 
  Mail, 
  Phone,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
  Clock,
  // Added Activity to the imports to resolve the error on line 130
  Activity
} from 'lucide-react';

interface ClientsProps {
  lang: 'ar' | 'en';
}

const Clients: React.FC<ClientsProps> = ({ lang }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const translations = {
    ar: {
      title: 'إدارة العملاء',
      addClient: 'إضافة عميل جديد',
      active: 'نشط',
      inactive: 'غير نشط',
      prospect: 'محتمل',
      searchPlaceholder: 'ابحث عن اسم العميل، البريد الإلكتروني...',
      noClients: 'لا يوجد عملاء مطابقون للبحث.'
    },
    en: {
      title: 'Client Management',
      addClient: 'Add New Client',
      active: 'Active',
      inactive: 'Inactive',
      prospect: 'Prospect',
      searchPlaceholder: 'Search by client name, email...',
      noClients: 'No clients matching your search.'
    }
  }[lang];

  const clients = [
    { id: 1, name: 'مطعم السفير', industry: 'أغذية ومشروبات', status: 'active', platform: ['instagram', 'facebook'], monthly: '2,500' },
    { id: 2, name: 'عيادة الشفاء', industry: 'رعاية صحية', status: 'active', platform: ['instagram', 'tiktok'], monthly: '4,000' },
    { id: 3, name: 'عقارات الأطلس', industry: 'عقارات', status: 'prospect', platform: ['facebook', 'linkedin'], monthly: '3,200' },
    { id: 4, name: 'مركز التميز', industry: 'تعليم', status: 'inactive', platform: ['youtube'], monthly: '1,800' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{translations.title}</h1>
          <p className="text-gray-500 mt-1">{clients.length} {lang === 'ar' ? 'إجمالي العملاء' : 'Total Clients'}</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-700 transition-all shadow-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {translations.addClient}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder={translations.searchPlaceholder}
              className="w-full bg-gray-50 border-none rounded-xl pr-11 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50">
               <Filter className="w-4 h-4" />
               {lang === 'ar' ? 'تصفية' : 'Filter'}
             </button>
             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50">
               <Globe className="w-4 h-4" />
               {lang === 'ar' ? 'تصدير' : 'Export'}
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {clients.map((client) => (
            <div key={client.id} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-50/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 font-extrabold text-xl">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg leading-tight">{client.name}</h4>
                    <p className="text-sm text-gray-500">{client.industry}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 mb-1">{lang === 'ar' ? 'الحالة' : 'Status'}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    client.status === 'active' ? 'bg-green-100 text-green-700' :
                    client.status === 'prospect' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {translations[client.status as keyof typeof translations]}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 mb-1">{lang === 'ar' ? 'شهرياً' : 'Monthly'}</p>
                  <span className="text-xs font-bold text-gray-900">{client.monthly} MAD</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2 space-x-reverse">
                  {client.platform.map((p, idx) => (
                    <div key={idx} className="w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center shadow-sm">
                      {p === 'instagram' && <Instagram className="w-4 h-4 text-instagram" />}
                      {p === 'facebook' && <Facebook className="w-4 h-4 text-facebook" />}
                      {p === 'linkedin' && <Linkedin className="w-4 h-4 text-linkedin" />}
                      {p === 'tiktok' && <Activity className="w-4 h-4 text-black" />}
                      {p === 'youtube' && <Globe className="w-4 h-4 text-red-600" />}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-all">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-all">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lang === 'ar' ? 'منذ 3 أشهر' : '3 months ago'}
                </span>
                <button className="text-primary-600 font-bold hover:underline">
                  {lang === 'ar' ? 'عرض الملف الكامل' : 'View Profile'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
