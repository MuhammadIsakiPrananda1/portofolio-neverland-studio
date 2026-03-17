/**
 * Virtual Machine Lab API Service
 * Handles all communication with the VM backend
 */

const API_BASE = import.meta.env.VITE_API_URL || '';

export interface VMStatus {
  id: number;
  status: 'stopped' | 'starting' | 'running' | 'error';
  container_name: string;
  vnc_port: number;
  web_port: number;
  cpu_cores: number;
  memory_mb: number;
  storage_gb: number;
  error_message?: string;
  started_at?: string;
  stopped_at?: string;
}

export interface ConnectUrl {
  novnc_url: string;
  vnc_port: number;
  web_port: number;
  session_token: string;
}

export interface VMLogs {
  logs: string;
  container_id: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class VMService {
  private getAuthToken(): string {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Authentication token not found');
    }
    return token;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.getAuthToken()}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  /**
   * Get current VM status
   */
  async getStatus(): Promise<VMStatus | null> {
    try {
      const response = await fetch(`${API_BASE}/api/v1/vm/status`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - please login');
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data.status === 'no-vm' ? null : data;
    } catch (error) {
      console.error('Failed to get VM status:', error);
      throw error;
    }
  }

  /**
   * Start or create a new VM
   */
  async startVM(): Promise<VMStatus> {
    try {
      const response = await fetch(`${API_BASE}/api/v1/vm/start`, {
        method: 'POST',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to start VM (${response.status})`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to start VM:', error);
      throw error;
    }
  }

  /**
   * Stop running VM
   */
  async stopVM(): Promise<APIResponse<{ message: string }>> {
    try {
      const response = await fetch(`${API_BASE}/api/v1/vm/stop`, {
        method: 'POST',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to stop VM (${response.status})`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to stop VM:', error);
      throw error;
    }
  }

  /**
   * Get noVNC connection URL and credentials
   */
  async getConnectUrl(): Promise<ConnectUrl> {
    try {
      const response = await fetch(`${API_BASE}/api/v1/vm/connect-url`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to get connection URL (${response.status})`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to get connect URL:', error);
      throw error;
    }
  }

  /**
   * Delete VM permanently
   */
  async deleteVM(): Promise<APIResponse<{ message: string }>> {
    try {
      const response = await fetch(`${API_BASE}/api/v1/vm/delete`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to delete VM (${response.status})`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to delete VM:', error);
      throw error;
    }
  }

  /**
   * Update VM activity timestamp (keep alive)
   */
  async updateActivity(): Promise<APIResponse<{ message: string }>> {
    try {
      const response = await fetch(`${API_BASE}/api/v1/vm/update-activity`, {
        method: 'POST',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        console.warn('Failed to update activity');
        return { success: false };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Failed to update VM activity:', error);
      return { success: false };
    }
  }

  /**
   * Get VM container logs for debugging
   */
  async getLogs(): Promise<VMLogs> {
    try {
      const response = await fetch(`${API_BASE}/api/v1/vm/logs`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to get logs (${response.status})`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to get VM logs:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const vmService = new VMService();
export default vmService;
