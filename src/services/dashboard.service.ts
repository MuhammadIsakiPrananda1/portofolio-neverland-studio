import apiClient from './api.client';
import type { User } from './auth.service';
import type { Contact } from './contact.service';

// Types
export interface DashboardStats {
  contacts: {
    new: number;
    total: number;
  };
  users: {
    active: number;
    total: number;
  };
}

export interface DashboardOverview {
  success: boolean;
  data: {
    overview: any;
    quick_stats: any;
    realtime: any;
  };
}

export interface UserResponse {
  success: boolean;
  data: {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ContactsResponse {
  success: boolean;
  data: {
    data: Contact[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

class DashboardService {
  /**
   * Get dashboard overview
   */
  async getOverview(): Promise<DashboardOverview> {
    const response = await apiClient.get<DashboardOverview>('/dashboard');
    return response.data;
  }

  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<{ success: boolean; data: DashboardStats }> {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  }

  /**
   * Get all contacts
   */
  async getContacts(status?: string, page = 1, perPage = 15): Promise<ContactsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });

    if (status) {
      params.append('status', status);
    }

    const response = await apiClient.get<ContactsResponse>(`/dashboard/contacts?${params.toString()}`);
    return response.data;
  }

  /**
   * Get all users
   */
  async getUsers(status?: string, page = 1, perPage = 15): Promise<UserResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });

    if (status) {
      params.append('status', status);
    }

    const response = await apiClient.get<UserResponse>(`/dashboard/users?${params.toString()}`);
    return response.data;
  }

  /**
   * Get quick stats
   */
  async getQuickStats(): Promise<any> {
    const response = await apiClient.get('/dashboard/quick-stats');
    return response.data;
  }

  /**
   * Get visitor chart data
   */
  async getVisitorChart(days = 7): Promise<any> {
    const response = await apiClient.get(`/dashboard/visitor-chart?days=${days}`);
    return response.data;
  }

  /**
   * Get activity feed
   */
  async getActivityFeed(limit = 20): Promise<any> {
    const response = await apiClient.get(`/dashboard/activity-feed?limit=${limit}`);
    return response.data;
  }

  /**
   * Clear dashboard cache
   */
  async clearCache(): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/dashboard/clear-cache');
    return response.data;
  }
}

export default new DashboardService();
