
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

export interface DashboardStats {
  totalClients: number;
  activeClients: number;
  totalFollowers: number;
  monthlyRevenue: number;
  engagementRate: number;
  scheduledPosts: number;
}

export interface Post {
  id: string;
  clientId: string;
  platform: SocialPlatform;
  content: string;
  status: 'published' | 'scheduled' | 'draft';
  timestamp: string;
  engagement?: {
    views: number;
    comments: number;
  };
}
