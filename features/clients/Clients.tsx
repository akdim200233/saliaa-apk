
import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, MoreVertical, Filter, Mail, Phone, 
  Globe, Instagram, Facebook, Linkedin, Clock, Activity,
  Loader2, AlertCircle 
} from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import { Client } from '../../types';

interface ClientsProps { lang: 'ar' | 'en'; }

const Clients: React.FC<ClientsProps> = ({ lang }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await mockApi.getClients();
        setClients(res);
      } catch (e) {} finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const t = {
    ar: { title: 'إدارة العملاء', add: 'إضافة عميل', search: 'ابحث عن عميل...', active: 'نشط', prospect: 'محتمل' },
    en: { title: 'Clients', add: 'Add Client', search: 'Search clients...', active: 'Active', prospect: 'Prospect' }
  }[lang];

  if (loading) return (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{t.title}</h1>
          <p className="text-gray-500 mt-1">{clients.length} {lang === 'ar' ? 'إجمالي العملاء' : 'Total Clients'}</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-700 shadow-lg flex items-center gap-2">
          <Plus className="w-5 h-5" /> {t.add}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder={t.search}
              className="w-full bg-gray-50 border-none rounded-xl pr-11 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
             <button className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 flex items-center gap-2">
               <Filter className="w-4 h-4" /> {lang === 'ar' ? 'تصفية' : 'Filter'}
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {clients.map((client) => (
            <div key={client.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 font-extrabold text-xl">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{client.name}</h4>
                    <p className="text-sm text-gray-500">{client.industry}</p>
                  </div>
                </div>
                <MoreVertical className="text-gray-400 cursor-pointer" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-xl text-center">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${client.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {client.status === 'active' ? t.active : t.prospect}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl text-center">
                  <span className="text-xs font-bold">{client.monthlyRate} MAD</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <div className="flex -space-x-2 space-x-reverse">
                  {client.socialAccounts.map(acc => (
                    <div key={acc.id} className="w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center shadow-sm">
                      {acc.platform === 'instagram' && <Instagram className="w-4 h-4 text-instagram" />}
                      {acc.platform === 'tiktok' && <Activity className="w-4 h-4 text-black" />}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Mail className="w-8 h-8 p-2 bg-primary-50 text-primary-600 rounded-lg cursor-pointer hover:bg-primary-100" />
                  <Phone className="w-8 h-8 p-2 bg-primary-50 text-primary-600 rounded-lg cursor-pointer hover:bg-primary-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
