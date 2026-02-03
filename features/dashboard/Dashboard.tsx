
import React from 'react';
import { 
  Users, 
  Activity, 
  Calendar, 
  TrendingUp,
  Instagram,
  Facebook,
  MessageSquare,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  // Added FileText to the imports to resolve the error on line 104
  FileText
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface DashboardProps {
  lang: 'ar' | 'en';
}

const data = [
  { name: '10/1', followers: 4000, engagement: 2400 },
  { name: '10/2', followers: 4200, engagement: 2500 },
  { name: '10/3', followers: 4100, engagement: 2800 },
  { name: '10/4', followers: 4400, engagement: 3100 },
  { name: '10/5', followers: 4600, engagement: 2900 },
  { name: '10/6', followers: 4800, engagement: 3400 },
  { name: '10/7', followers: 5100, engagement: 4100 },
];

const KPICard: React.FC<{
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {Math.abs(change)}%
      </div>
    </div>
    <div>
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ lang }) => {
  const translations = {
    ar: {
      welcome: 'مرحباً، رضوان 👋',
      subtitle: 'إليك لمحة سريعة عما يحدث في حسابات عملائك اليوم.',
      totalClients: 'إجمالي العملاء',
      engagementRate: 'معدل التفاعل',
      scheduledPosts: 'منشورات مجدولة',
      totalReach: 'إجمالي الوصول',
      growthChart: 'نمو المتابعين والتفاعل',
      recentPosts: 'أحدث المنشورات',
      topPlatforms: 'أداء المنصات',
      viewReport: 'عرض التقرير',
      newPost: 'منشور جديد'
    },
    en: {
      welcome: 'Welcome, Redouane 👋',
      subtitle: "Here's a quick look at what's happening today.",
      totalClients: 'Total Clients',
      engagementRate: 'Engagement Rate',
      scheduledPosts: 'Scheduled Posts',
      totalReach: 'Total Reach',
      growthChart: 'Growth & Engagement',
      recentPosts: 'Recent Posts',
      topPlatforms: 'Platform Performance',
      viewReport: 'View Report',
      newPost: 'New Post'
    }
  }[lang];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{translations.welcome}</h1>
          <p className="text-gray-500 mt-1">{translations.subtitle}</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {translations.viewReport}
           </button>
           <button className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {translations.newPost}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title={translations.totalClients} 
          value="48" 
          change={12.5} 
          icon={<Users className="w-6 h-6" />} 
          color="blue"
        />
        <KPICard 
          title={translations.engagementRate} 
          value="5.8%" 
          change={2.1} 
          icon={<Activity className="w-6 h-6" />} 
          color="green"
        />
        <KPICard 
          title={translations.scheduledPosts} 
          value="156" 
          change={-5.4} 
          icon={<Calendar className="w-6 h-6" />} 
          color="purple"
        />
        <KPICard 
          title={translations.totalReach} 
          value="1.2M" 
          change={18.9} 
          icon={<TrendingUp className="w-6 h-6" />} 
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">{translations.growthChart}</h3>
            <select className="bg-gray-50 border-none rounded-lg px-3 py-1.5 text-sm font-medium outline-none">
              <option>{lang === 'ar' ? 'آخر 7 أيام' : 'Last 7 Days'}</option>
              <option>{lang === 'ar' ? 'آخر 30 يوماً' : 'Last 30 Days'}</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="followers" 
                  stroke="#0ea5e9" 
                  fillOpacity={1} 
                  fill="url(#colorFollowers)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#10b981" 
                  fillOpacity={0} 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg mb-6">{translations.topPlatforms}</h3>
          <div className="space-y-6">
            {[
              { name: 'Instagram', value: 45, icon: <Instagram className="text-instagram" />, color: '#E4405F' },
              { name: 'TikTok', value: 30, icon: <Activity className="text-black" />, color: '#000000' },
              { name: 'Facebook', value: 15, icon: <Facebook className="text-facebook" />, color: '#1877F2' },
              { name: 'LinkedIn', value: 10, icon: <TrendingUp className="text-linkedin" />, color: '#0A66C2' },
            ].map((p, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 font-bold text-gray-700">
                    {p.icon}
                    {p.name}
                  </div>
                  <span className="text-gray-500 font-medium">{p.value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${p.value}%`, backgroundColor: p.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all">
            {lang === 'ar' ? 'عرض كافة المنصات' : 'View All Platforms'}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900 text-lg">{translations.recentPosts}</h3>
          <button className="text-primary-600 text-sm font-bold hover:underline">
            {lang === 'ar' ? 'عرض الكل' : 'View All'}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-50">
                <th className="pb-4 font-medium">{lang === 'ar' ? 'المنشور' : 'Post'}</th>
                <th className="pb-4 font-medium">{lang === 'ar' ? 'المنصة' : 'Platform'}</th>
                <th className="pb-4 font-medium">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="pb-4 font-medium">{lang === 'ar' ? 'التفاعل' : 'Engagement'}</th>
                <th className="pb-4 font-medium">{lang === 'ar' ? 'الوقت' : 'Time'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1, 2, 3].map((_, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-all cursor-pointer">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0">
                        <img src={`https://picsum.photos/100/100?random=${i+10}`} alt="Post" className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <p className="text-sm font-bold text-gray-900 line-clamp-1 w-48">كيف تبني مشروعك الأول من الصفر...</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <Instagram className="w-5 h-5 text-instagram" />
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                      {lang === 'ar' ? 'منشور' : 'Published'}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-4 text-xs font-medium text-gray-500">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 12K</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> 452</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-500 font-medium">
                    2 {lang === 'ar' ? 'ساعة مضت' : 'hours ago'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
