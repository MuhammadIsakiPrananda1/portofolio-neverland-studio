import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const API_VERSION = '/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL ? `${API_BASE_URL}${API_VERSION}` : API_VERSION,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  let token = localStorage.getItem('auth_token');
  if (token) {
    if (token.includes('|')) {
      token = btoa(token);
      localStorage.setItem('auth_token', token);
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface VMStatus {
  id: number;
  status: 'stopped' | 'starting' | 'running' | 'stopping' | 'error' | 'no-vm';
  container_name: string;
  vnc_port: number;
  web_port: number;
  cpu_cores: number;
  memory_mb: number;
  storage_gb: number;
  started_at: string | null;
  stopped_at: string | null;
  error_message: string | null;
}

export interface VMConnectURL {
  novnc_url: string;
  vnc_port: number;
  web_port: number;
  session_token: string;
}

export interface VMResponse {
  message: string;
  vm_id?: number;
  status?: string;
  container_name?: string;
  vnc_port?: number;
  web_port?: number;
  error?: string;
}

class VMLabService {
  /**
   * Get current user's VM status
   */
  async getStatus(): Promise<VMStatus> {
    try {
      const response = await api.get<VMStatus>('/vm/status');
      return response.data;
    } catch (error) {
      console.error('Failed to get VM status:', error);
      throw error;
    }
  }

  /**
   * Start new VM or restart existing VM
   */
  async startVM(): Promise<VMResponse> {
    try {
      const response = await api.post<VMResponse>('/vm/start');
      return response.data;
    } catch (error) {
      console.error('Failed to start VM:', error);
      throw error;
    }
  }

  /**
   * Stop running VM
   */
  async stopVM(): Promise<VMResponse> {
    try {
      const response = await api.post<VMResponse>('/vm/stop');
      return response.data;
    } catch (error) {
      console.error('Failed to stop VM:', error);
      throw error;
    }
  }

  /**
   * Get noVNC connection URL for running VM
   */
  async getConnectURL(): Promise<VMConnectURL> {
    try {
      const response = await api.get<VMConnectURL>('/vm/connect-url');
      return response.data;
    } catch (error) {
      console.error('Failed to get connect URL:', error);
      throw error;
    }
  }

  /**
   * Delete VM completely
   */
  async deleteVM(): Promise<VMResponse> {
    try {
      const response = await api.delete<VMResponse>('/vm/delete');
      return response.data;
    } catch (error) {
      console.error('Failed to delete VM:', error);
      throw error;
    }
  }

  /**
   * Get container logs (debugging)
   */
  async getLogs(): Promise<{ container_name: string; logs: string }> {
    try {
      const response = await api.get<{ container_name: string; logs: string }>('/vm/logs');
      return response.data;
    } catch (error) {
      console.error('Failed to get logs:', error);
      throw error;
    }
  }

  /**
   * Update activity (for tracking idle VMs)
   */
  async updateActivity(): Promise<{ success: boolean }> {
    try {
      const response = await api.post<{ success: boolean }>('/vm/update-activity');
      return response.data;
    } catch (error) {
      console.error('Failed to update activity:', error);
      return { success: false };
    }
  }

  /**
   * Poll VM status until running or error
   */
  async waitForVMReady(timeout: number = 60000, interval: number = 2000): Promise<boolean> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      try {
        const status = await this.getStatus();
        
        if (status.status === 'running') {
          return true;
        }
        
        if (status.status === 'error') {
          return false;
        }
        
        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, interval));
      } catch (error) {
        console.error('Error polling status:', error);
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    }
    
    return false;
  }
}

export const vmLabService = new VMLabService();
export default vmLabService;
