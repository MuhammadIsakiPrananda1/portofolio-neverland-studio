import apiClient from './api.client';
import type { User } from './auth.service';

// Types
export interface UserSettings {
  id: number;
  user_id: number;
  avatar?: string;
  theme?: string;
  notifications?: any;
  privacy?: any;
  created_at: string;
  updated_at: string;
}

export interface SettingsResponse {
  success: boolean;
  data: {
    user: User;
    settings: UserSettings;
  };
  message?: string;
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  bio?: string;
  location?: string;
  website?: string;
}

export interface UpdatePasswordData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

class SettingsService {
  /**
   * Get user settings
   */
  async getSettings(): Promise<SettingsResponse> {
    const response = await apiClient.get<SettingsResponse>('/settings');
    return response.data;
  }

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileData): Promise<SettingsResponse> {
    const response = await apiClient.put<SettingsResponse>('/settings/profile', data);
    return response.data;
  }

  /**
   * Update password
   */
  async updatePassword(data: UpdatePasswordData): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.put('/settings/password', data);
    return response.data;
  }

  /**
   * Upload avatar
   */
  async uploadAvatar(file: File): Promise<SettingsResponse> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await apiClient.post<SettingsResponse>('/settings/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  /**
   * Update social media links
   */
  async updateSocialMedia(data: Record<string, string>): Promise<SettingsResponse> {
    const response = await apiClient.put<SettingsResponse>('/settings/social-media', data);
    return response.data;
  }

  /**
   * Update notification preferences
   */
  async updateNotifications(data: Record<string, boolean>): Promise<SettingsResponse> {
    const response = await apiClient.put<SettingsResponse>('/settings/notifications', data);
    return response.data;
  }

  /**
   * Update privacy settings
   */
  async updatePrivacy(data: Record<string, boolean>): Promise<SettingsResponse> {
    const response = await apiClient.put<SettingsResponse>('/settings/privacy', data);
    return response.data;
  }

  /**
   * Update email
   */
  async updateEmail(email: string, password: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.put('/settings/email', { email, password });
    return response.data;
  }
}

export default new SettingsService();
