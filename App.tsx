
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './features/dashboard/Dashboard';
import Clients from './features/clients/Clients';
import Calendar from './features/calendar/Calendar';
import Analytics from './features/analytics/Analytics';
import Templates from './features/templates/Templates';
import Settings from './features/settings/Settings';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleLang = () => {
    const next = lang === 'ar' ? 'en' : 'ar';
    setLang(next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
  };

  return (
    <Router>
      <div className={`min-h-screen bg-gray-50 flex ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} lang={lang} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header 
            toggleSidebar={toggleSidebar} 
            toggleLang={toggleLang} 
            lang={lang} 
            isSidebarOpen={isSidebarOpen}
          />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard lang={lang} />} />
              <Route path="/clients" element={<Clients lang={lang} />} />
              <Route path="/calendar" element={<Calendar lang={lang} />} />
              <Route path="/analytics" element={<Analytics lang={lang} />} />
              <Route path="/templates" element={<Templates lang={lang} />} />
              <Route path="/settings" element={<Settings lang={lang} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
