
import React from 'react';
import { FileText, Copy, Trash2, Edit, Eye, Search, Plus } from 'lucide-react';

const Templates: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const translations = {
    ar: {
      title: 'قوالب العقود والعروض',
      subtitle: 'أدر مستنداتك القانونية والاحترافية في مكان واحد.',
      newTemplate: 'قالب جديد',
    },
    en: {
      title: 'Contract & Proposals',
      subtitle: 'Manage your legal and professional documents in one place.',
      newTemplate: 'New Template',
    }
  }[lang];

  const templates = [
    { name: 'عقد إدارة محتوى شهري', type: 'عقد', date: '2023-09-15', usage: 12 },
    { name: 'عرض سعر باقة بريميوم', type: 'عرض سعر', date: '2023-09-20', usage: 45 },
    { name: 'تقرير أداء شهري - عام', type: 'تقرير', date: '2023-10-01', usage: 128 },
    { name: 'اتفاقية عدم إفصاح NDA', type: 'قانوني', date: '2023-08-10', usage: 8 },
  ];

  return (
    <div className="animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{translations.title}</h1>
          <p className="text-gray-500 mt-1">{translations.subtitle}</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-700 transition-all shadow-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {translations.newTemplate}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
           <div className="relative max-w-md">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder={lang === 'ar' ? 'بحث في القوالب...' : 'Search templates...'}
              className="w-full bg-gray-50 border-none rounded-xl pr-11 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {templates.map((template, i) => (
            <div key={i} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-primary-500 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1 leading-tight h-10 line-clamp-2">{template.name}</h4>
              <p className="text-xs text-gray-400 mb-4">{template.type} • {template.date}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">
                  {template.usage} {lang === 'ar' ? 'استخدام' : 'Uses'}
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <button className="p-2 hover:bg-primary-50 text-primary-600 rounded-lg transition-all" title="View"><Eye className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-gray-50 text-gray-500 rounded-lg transition-all" title="Edit"><Edit className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-gray-50 text-gray-500 rounded-lg transition-all" title="Duplicate"><Copy className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
