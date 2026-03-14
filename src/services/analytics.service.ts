import apiClient from './api.client';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnalyticsOverview {
  total_projects: number;
  published_projects: number;
  total_blog_posts: number;
  total_messages: number;
  new_messages: number;
  total_users: number;
  project_views: number;
  blog_views: number;
  total_views: number;
}

export interface VisitorPoint {
  date: string;
  unique_visitors: number;
  total_views: number;
}

export interface ProjectCategoryStat {
  category: string;
  total: number;
}

export interface ProjectStatusStat {
  status: string;
  total: number;
}

export interface TopProject {
  id: number;
  title: string;
  views: number;
  category: string;
}

export interface ProjectsStats {
  by_category: ProjectCategoryStat[];
  by_status: ProjectStatusStat[];
  top_projects: TopProject[];
}

export interface MessageTypeStat {
  message_type: string;
  total: number;
}

export interface MessageStatusStat {
  status: string;
  total: number;
}

export interface RecentMessage {
  id: number;
  name: string;
  email: string;
  message_type: string;
  status: string;
  created_at: string;
}

export interface MessagesStats {
  by_type: MessageTypeStat[];
  by_status: MessageStatusStat[];
  recent: RecentMessage[];
}

export interface TopService {
  message_type: string;
  requests: number;
}

export interface DailyVisitor {
  date: string;
  visitors: number;
}

export interface DeviceStat {
  device_type: string;
  count: number;
}

export interface BrowserStat {
  browser: string;
  count: number;
}

export interface TopPage {
  page_url: string;
  views: number;
}

export interface ActivityItem {
  id: number;
  type: string;
  description: string;
  created_at: string;
  meta?: Record<string, any>;
}

export interface HourlyVisitor {
  hour: number;
  visitors: number;
}

// ─── Service ──────────────────────────────────────────────────────────────────

class AnalyticsService {
  async getOverview(): Promise<AnalyticsOverview> {
    const res = await apiClient.get('/analytics/overview');
    return res.data.stats ?? res.data;
  }

  async getVisitors(days = 30): Promise<VisitorPoint[]> {
    const res = await apiClient.get(`/analytics/visitors?days=${days}`);
    return Array.isArray(res.data) ? res.data : res.data.data ?? [];
  }

  async getProjectsStats(): Promise<ProjectsStats> {
    const res = await apiClient.get('/analytics/projects-stats');
    return res.data;
  }

  async getMessagesStats(): Promise<MessagesStats> {
    const res = await apiClient.get('/analytics/messages-stats');
    return res.data;
  }

  async getTopServices(): Promise<TopService[]> {
    const res = await apiClient.get('/analytics/top-services');
    return Array.isArray(res.data) ? res.data : res.data.data ?? [];
  }

  async getVisitorChart(days = 7): Promise<DailyVisitor[]> {
    const res = await apiClient.get(`/dashboard/visitor-chart?days=${days}`);
    const data = res.data?.data ?? res.data ?? [];
    return Array.isArray(data) ? data : [];
  }

  async getDeviceStats(days = 30): Promise<DeviceStat[]> {
    const res = await apiClient.get(`/dashboard/device-stats?days=${days}`);
    const data = res.data?.data ?? res.data ?? [];
    return Array.isArray(data) ? data : [];
  }

  async getBrowserStats(days = 30): Promise<BrowserStat[]> {
    const res = await apiClient.get(`/dashboard/browser-stats?days=${days}`);
    const data = res.data?.data ?? res.data ?? [];
    return Array.isArray(data) ? data : [];
  }

  async getTopPages(limit = 10, days = 30): Promise<TopPage[]> {
    const res = await apiClient.get(`/dashboard/top-pages?limit=${limit}&days=${days}`);
    const data = res.data?.data ?? res.data ?? [];
    return Array.isArray(data) ? data : [];
  }

  async getActivityFeed(limit = 15): Promise<ActivityItem[]> {
    const res = await apiClient.get(`/dashboard/activity-feed?limit=${limit}`);
    const data = res.data?.data ?? res.data ?? [];
    return Array.isArray(data) ? data : [];
  }

  async getHourlyVisitors(): Promise<HourlyVisitor[]> {
    const res = await apiClient.get('/dashboard/hourly-visitors');
    const data = res.data?.data ?? res.data ?? [];
    return Array.isArray(data) ? data : [];
  }
}

export default new AnalyticsService();
