
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  lang: 'ar' | 'en';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, lang }) => {
  const navItems = [
    { name: lang === 'ar' ? 'لوحة القيادة' : 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: lang === 'ar' ? 'العملاء' : 'Clients', path: '/clients', icon: <Users className="w-5 h-5" /> },
    { name: lang === 'ar' ? 'الجدولة' : 'Calendar', path: '/calendar', icon: <Calendar className="w-5 h-5" /> },
    { name: lang === 'ar' ? 'التحليلات' : 'Analytics', path: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { name: lang === 'ar' ? 'القوالب' : 'Templates', path: '/templates', icon: <FileText className="w-5 h-5" /> },
    { name: lang === 'ar' ? 'الإعدادات' : 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside 
      className={`bg-white border-l border-r h-screen sticky top-0 transition-all duration-300 shadow-sm z-30 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-6 flex items-center gap-3 overflow-hidden">
        <div className="w-10 h-10 rounded-xl bg-primary-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">
          A
        </div>
        {isOpen && (
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 truncate">الرائد أكاديم</span>
            <span className="text-xs text-gray-500">Arraid Social CRM</span>
          </div>
        )}
      </div>

      <nav className="mt-6 px-3 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-primary-50 text-primary-600 font-semibold' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {isOpen && <span className="text-sm whitespace-nowrap">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {isOpen && (
        <div className="absolute bottom-10 left-6 right-6 p-4 bg-gray-50 rounded-2xl">
          <p className="text-xs font-medium text-gray-400 mb-2">{lang === 'ar' ? 'الخطة الحالية' : 'Current Plan'}</p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-gray-900">Premium</span>
            <span className="text-xs text-primary-600 bg-primary-100 px-2 py-0.5 rounded-full font-bold">Pro</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-primary-500"></div>
          </div>
          <p className="text-[10px] text-gray-500 mt-2">75% {lang === 'ar' ? 'من الحصة المستخدمة' : 'of quota used'}</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
