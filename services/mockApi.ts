
import { User, Client, DashboardStats, Post } from '../types';

const mockUser: User = {
  id: '1',
  email: 'redouane@arraid.com',
  fullName: 'رضوان أكديم',
  role: 'admin',
  language: 'ar',
  avatar: 'https://picsum.photos/100/100?random=1'
};

const mockClients: Client[] = [
  { id: '1', name: 'مطعم السفير', businessType: 'أغذية ومشروبات', industry: 'الطعام والشراب', email: 'saphir@rest.com', phone: '0612345678', status: 'active', monthlyRate: 2500, startDate: '2023-01-01', socialAccounts: [{ id: 's1', platform: 'instagram', username: '@saphir', followers: 12000, growth: 5, isConnected: true }] },
  { id: '2', name: 'عيادة الشفاء', businessType: 'رعاية صحية', industry: 'الطب', email: 'shifa@clinic.com', phone: '0622334455', status: 'active', monthlyRate: 4000, startDate: '2023-05-10', socialAccounts: [{ id: 's2', platform: 'tiktok', username: '@shifaclinic', followers: 45000, growth: 15, isConnected: true }] },
  { id: '3', name: 'عقارات الأطلس', businessType: 'عقارات', industry: 'العقار', email: 'atlas@realty.com', phone: '0688776655', status: 'prospect', monthlyRate: 3200, startDate: '2023-10-20', socialAccounts: [{ id: 's3', platform: 'linkedin', username: 'atlas-realty', followers: 1500, growth: 2, isConnected: true }] },
];

class MockApi {
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async login(email: string, pass: string): Promise<{ user: User; token: string }> {
    await this.delay(1000);
    if (email === 'demo@arraid.com' && pass === 'password') {
      return { user: mockUser, token: 'fake-jwt-token' };
    }
    throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
  }

  async getDashboardStats(): Promise<DashboardStats> {
    await this.delay(800);
    return {
      totalClients: 48,
      activeClients: 32,
      totalFollowers: 1200000,
      monthlyRevenue: 85000,
      engagementRate: 5.8,
      scheduledPosts: 156
    };
  }

  async getClients(): Promise<Client[]> {
    await this.delay(600);
    return mockClients;
  }
}

export const mockApi = new MockApi();
