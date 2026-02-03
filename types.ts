
export type UserRole = 'admin' | 'manager' | 'analyst' | 'client';

export type SocialPlatform = 'instagram' | 'tiktok' | 'facebook' | 'youtube' | 'twitter' | 'linkedin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  language: 'ar' | 'en';
}

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  username: string;
  followers: number;
  growth: number;
  isConnected: boolean;
}

export interface Client {
  id: string;
  name: string;
  businessType: string;
  industry: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'prospect';
  monthlyRate: number;
  socialAccounts: SocialAccount[];
  startDate: string;
}

export interface KPI {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

export interface AnalyticsData {
  date: string;
  followers: number;
  engagement: number;
  reach: number;
}
