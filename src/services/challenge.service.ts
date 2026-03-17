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
    let token = localStorage.getItem('auth_token');
    if (token) {
      if (token.includes('|')) {
        token = btoa(token);
        localStorage.setItem('auth_token', token);
      }
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
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.dispatchEvent(new Event('auth-logout'));
    }
    return Promise.reject(error);
  }
);

export interface SubmitFlagRequest {
  challenge_id: string;
  flag: string;
  category?: string;
}

export interface SubmitFlagResponse {
  status: 'correct' | 'incorrect' | 'already_solved' | 'error';
  message: string;
  solved?: boolean;
}

export interface SolvedChallengesResponse {
  status: 'success' | 'error';
  solved: string[];
  count?: number;
}

export interface ChallengeStatsResponse {
  status: 'success' | 'error';
  total_solved: number;
  by_category: Array<{
    category: string;
    count: number;
  }>;
}

class ChallengeService {
  /**
   * Get all challenges solved by the authenticated user
   */
  async getSolvedChallenges(): Promise<SolvedChallengesResponse> {
    try {
      const response = await api.get<SolvedChallengesResponse>('/challenges/solved');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        // Not authenticated, return empty
        return {
          status: 'success',
          solved: [],
          count: 0,
        };
      }
      throw error;
    }
  }

  /**
   * Submit a challenge flag for verification
   */
  async submitFlag(request: SubmitFlagRequest): Promise<SubmitFlagResponse> {
    try {
      const response = await api.post<SubmitFlagResponse>('/challenges/submit', request);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return error.response.data as SubmitFlagResponse;
        }
        return {
          status: 'error',
          message: error.message || 'Failed to submit flag',
        };
      }
      throw error;
    }
  }

  /**
   * Get user's challenge statistics
   */
  async getUserStats(): Promise<ChallengeStatsResponse> {
    try {
      const response = await api.get<ChallengeStatsResponse>('/challenges/stats');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return {
          status: 'success',
          total_solved: 0,
          by_category: [],
        };
      }
      throw error;
    }
  }
}

export const challengeService = new ChallengeService();
