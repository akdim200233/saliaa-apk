
import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin, Tag } from 'lucide-react';

interface CalendarProps {
  lang: 'ar' | 'en';
}

const Calendar: React.FC<CalendarProps> = ({ lang }) => {
  const translations = {
    ar: {
      title: 'جدولة المحتوى',
      today: 'اليوم',
      month: 'أكتوبر 2023',
      newPost: 'جدولة منشور',
    },
    en: {
      title: 'Content Calendar',
      today: 'Today',
      month: 'October 2023',
      newPost: 'Schedule Post',
    }
  }[lang];

  const days = lang === 'ar' 
    ? ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const gridCells = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{translations.title}</h1>
          <p className="text-gray-500 mt-1">{lang === 'ar' ? 'نظم وخطط منشورات عملائك بكل سهولة.' : 'Plan and organize client posts with ease.'}</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-700 transition-all shadow-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {translations.newPost}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-extrabold text-gray-900">{translations.month}</h2>
            <div className="flex bg-gray-50 p-1 rounded-xl">
              <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all"><ChevronRight className="w-5 h-5" /></button>
              <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all"><ChevronLeft className="w-5 h-5" /></button>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200">{translations.today}</button>
          </div>
          <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-xl">
             <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-sm font-bold text-primary-600">{lang === 'ar' ? 'شهر' : 'Month'}</button>
             <button className="px-4 py-1.5 text-sm font-bold text-gray-500 hover:text-gray-900">{lang === 'ar' ? 'أسبوع' : 'Week'}</button>
             <button className="px-4 py-1.5 text-sm font-bold text-gray-500 hover:text-gray-900">{lang === 'ar' ? 'قائمة' : 'List'}</button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-gray-100">
          {days.map((day) => (
            <div key={day} className="py-4 text-center text-sm font-bold text-gray-400 border-l border-gray-50 last:border-l-0">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {gridCells.map((day, i) => {
            const date = day - 3;
            const isToday = date === 15;
            const hasPosts = date === 15 || date === 18 || date === 22;

            return (
              <div 
                key={i} 
                className={`min-h-[140px] p-2 border-l border-b border-gray-50 last:border-l-0 hover:bg-gray-50 transition-all group ${
                  date < 1 || date > 31 ? 'bg-gray-50/50' : ''
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                    isToday ? 'bg-primary-600 text-white' : 'text-gray-700 group-hover:bg-white shadow-sm'
                  }`}>
                    {date > 0 && date <= 31 ? date : ''}
                  </span>
                  {date > 0 && date <= 31 && (
                    <button className="opacity-0 group-hover:opacity-100 p-1 bg-primary-50 text-primary-600 rounded-lg transition-all">
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {hasPosts && date > 0 && (
                  <div className="space-y-1">
                    <div className="p-1.5 bg-blue-50 border-r-4 border-blue-500 rounded text-[10px] font-bold text-blue-800 truncate">
                      IG: قصة نجاح العميل...
                    </div>
                    {date === 15 && (
                      <div className="p-1.5 bg-purple-50 border-r-4 border-purple-500 rounded text-[10px] font-bold text-purple-800 truncate">
                        TT: نصيحة اليوم في...
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
