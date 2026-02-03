
import React from 'react';
import { Menu, Search, Bell, Moon, Sun, Globe, LogOut } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleLang: () => void;
  lang: 'ar' | 'en';
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleLang, lang, isSidebarOpen }) => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-50 rounded-lg text-gray-500"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex items-center bg-gray-50 px-4 py-2 rounded-xl w-80">
          <Search className="w-4 h-4 text-gray-400 ml-2" />
          <input 
            type="text" 
            placeholder={lang === 'ar' ? 'البحث عن عميل أو تقرير...' : 'Search for client or report...'}
            className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleLang}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium transition-all"
        >
          <Globe className="w-4 h-4" />
          {lang === 'ar' ? 'English' : 'العربية'}
        </button>

        <div className="h-8 w-px bg-gray-200 mx-1 hidden md:block"></div>

        <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pr-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-tight">رضوان أكديم</p>
            <p className="text-xs text-gray-500">{lang === 'ar' ? 'المدير العام' : 'General Manager'}</p>
          </div>
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-gray-100">
            <img 
              src="https://picsum.photos/100/100?random=1" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
