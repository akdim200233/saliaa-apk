
import React, { useEffect, useState } from 'react';
import { 
  Users, Activity, Calendar, TrendingUp, Instagram, Facebook, 
  MessageSquare, Eye, ArrowUpRight, ArrowDownRight, FileText, 
  Loader2, RefreshCcw, AlertCircle 
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { mockApi } from '../../services/mockApi';
import { DashboardStats } from '../../types';

interface DashboardProps { lang: 'ar' | 'en'; }

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
  title: string; value: string | number; change: number; icon: React.ReactNode; color: string;
}> = ({ title, value, change, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>{icon}</div>
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
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await mockApi.getDashboardStats();
      setStats(res);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const t = {
    ar: {
      welcome: 'مرحباً، رضوان 👋',
      subtitle: 'إليك لمحة سريعة عما يحدث في حسابات عملائك اليوم.',
      totalClients: 'إجمالي العملاء',
      engagementRate: 'معدل التفاعل',
      scheduledPosts: 'منشورات مجدولة',
      totalReach: 'إجمالي المتابعين',
      retry: 'إعادة المحاولة',
      loading: 'جاري تحميل البيانات...'
    },
    en: {
      welcome: 'Welcome, Redouane 👋',
      subtitle: "Here's a quick look at what's happening today.",
      totalClients: 'Total Clients',
      engagementRate: 'Engagement Rate',
      scheduledPosts: 'Scheduled Posts',
      totalReach: 'Total Followers',
      retry: 'Retry',
      loading: 'Loading data...'
    }
  }[lang];

  if (loading) return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-primary-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-500 font-bold">{t.loading}</p>
    </div>
  );

  if (error) return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-red-50 rounded-3xl border border-red-100">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h3 className="text-xl font-bold text-red-900 mb-2">فشل تحميل البيانات</h3>
      <button onClick={fetchStats} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2">
        <RefreshCcw size={18} /> {t.retry}
      </button>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{t.welcome}</h1>
          <p className="text-gray-500 mt-1">{t.subtitle}</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2">
            <FileText className="w-4 h-4" /> {lang === 'ar' ? 'تقرير' : 'Report'}
           </button>
           <button className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-700 transition-all shadow-lg flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {lang === 'ar' ? 'نشر' : 'Post'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard title={t.totalClients} value={stats?.totalClients || 0} change={12.5} icon={<Users className="w-6 h-6" />} color="blue" />
        <KPICard title={t.engagementRate} value={`${stats?.engagementRate}%`} change={2.1} icon={<Activity className="w-6 h-6" />} color="green" />
        <KPICard title={t.scheduledPosts} value={stats?.scheduledPosts || 0} change={-5.4} icon={<Calendar className="w-6 h-6" />} color="purple" />
        <KPICard title={t.totalReach} value={(stats?.totalFollowers || 0).toLocaleString()} change={18.9} icon={<TrendingUp className="w-6 h-6" />} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg mb-6">{lang === 'ar' ? 'نمو المتابعين' : 'Growth Chart'}</h3>
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
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="followers" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorFollowers)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
           <h3 className="font-bold text-gray-900 text-lg mb-6">{lang === 'ar' ? 'أداء المنصات' : 'Platforms'}</h3>
           <div className="flex-1 space-y-6">
              {[
                { name: 'Instagram', value: 45, color: '#E4405F' },
                { name: 'TikTok', value: 30, color: '#000000' },
                { name: 'Facebook', value: 15, color: '#1877F2' }
              ].map((p, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>{p.name}</span>
                    <span className="text-gray-400">{p.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${p.value}%`, backgroundColor: p.color }}></div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
