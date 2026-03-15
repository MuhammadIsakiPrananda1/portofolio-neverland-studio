import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// API Base URL - use proxy in production/when not specified
const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const API_VERSION = '/api/v1';

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

// Add token to requests if available
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.dispatchEvent(new Event('auth-logout'));
    }
    return Promise.reject(error);
  }
);

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

export interface ResetPasswordData {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    status: string;
    role?: string;
  };
  token: string;
  message: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  status: string;
  role?: string;
}

class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password,
    });

    // Store token and user data
    if (response.data.token) {
      this.setAuthData(response.data.token, response.data.user);
    }

    return response.data;
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', {
      email: credentials.email,
      password: credentials.password,
      remember: credentials.remember,
    });

    // Store token and user data
    if (response.data.token) {
      this.setAuthData(response.data.token, response.data.user);
    }

    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/auth/user');

    // Update stored user data
    localStorage.setItem('auth_user', JSON.stringify(response.data));

    return response.data;
  }

  /**
   * Request password reset email
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/forgot-password', {
      email,
    });
    return response.data;
  }

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/reset-password', {
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      token: data.token,
    });
    return response.data;
  }

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put<User>('/auth/profile', data);

    // Update stored user data
    localStorage.setItem('auth_user', JSON.stringify(response.data));

    return response.data;
  }

  /**
   * Update user password
   */
  async updatePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const response = await api.put<{ message: string }>('/auth/password', {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: newPassword,
    });
    return response.data;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  /**
   * Get stored auth token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Get stored user data
   */
  getUser(): User | null {
    const userData = localStorage.getItem('auth_user');
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Store authentication data
   */
  private setAuthData(token: string, user: User): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    window.dispatchEvent(new Event('auth-login'));
  }

  /**
   * Clear authentication data
   */
  private clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    window.dispatchEvent(new Event('auth-logout'));
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
