
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Download, Filter, Calendar } from 'lucide-react';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Analytics: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const translations = {
    ar: {
      title: 'تحليلات الأداء',
      subtitle: 'نظرة معمقة على نتائج حملاتك الرقمية.',
      audienceGrowth: 'نمو الجمهور حسب المنصة',
      engagementType: 'توزيع التفاعل',
      export: 'تصدير التقرير PDF',
    },
    en: {
      title: 'Performance Analytics',
      subtitle: 'Deep insights into your digital campaign results.',
      audienceGrowth: 'Audience Growth by Platform',
      engagementType: 'Engagement Distribution',
      export: 'Export PDF Report',
    }
  }[lang];

  const barData = [
    { name: 'Instagram', new: 400, lost: 240 },
    { name: 'TikTok', new: 800, lost: 100 },
    { name: 'Facebook', new: 200, lost: 300 },
    { name: 'LinkedIn', new: 150, lost: 50 },
    { name: 'Twitter', new: 100, lost: 120 },
  ];

  const pieData = [
    { name: 'Likes', value: 4500 },
    { name: 'Comments', value: 1200 },
    { name: 'Shares', value: 800 },
    { name: 'Saves', value: 300 },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{translations.title}</h1>
          <p className="text-gray-500 mt-1">{translations.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {lang === 'ar' ? 'الفترة الزمنية' : 'Date Range'}
          </button>
          <button className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-700 transition-all shadow-lg flex items-center gap-2">
            <Download className="w-4 h-4" />
            {translations.export}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-6">{translations.audienceGrowth}</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Legend iconType="circle" />
                <Bar dataKey="new" fill="#0ea5e9" radius={[4, 4, 0, 0]} name={lang === 'ar' ? 'جديد' : 'New'} />
                <Bar dataKey="lost" fill="#ef4444" radius={[4, 4, 0, 0]} name={lang === 'ar' ? 'مفقود' : 'Lost'} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-6">{translations.engagementType}</h3>
          <div className="h-[350px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
