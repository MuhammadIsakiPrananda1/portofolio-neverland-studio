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

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  points: number;
  solve_count: number;
  solved: boolean;
  first_blood: { user_id: number; at: string } | null;
}

export interface ChallengeDetail extends Challenge {
  hints: string | null;
  attachment_path: string | null;
}

export interface ChallengesResponse {
  status: 'success' | 'error';
  data: Challenge[];
}

export interface ChallengeDetailResponse {
  status: 'success' | 'error';
  data: ChallengeDetail;
}

export interface SubmitFlagRequest {
  flag: string;
}

export interface SubmitFlagResponse {
  status: 'correct' | 'incorrect' | 'already_solved' | 'error';
  message: string;
  points?: number;
  first_blood?: boolean;
  total_score?: number;
  guest?: boolean;
}

export interface SolvedChallengesResponse {
  status: 'success' | 'error';
  solved: number[];
  count?: number;
}

export interface ScoreboardEntry {
  rank: number;
  user_id: number;
  username: string;
  score: number;
  solved: number;
}

export interface ScoreboardResponse {
  status: 'success' | 'error';
  data: ScoreboardEntry[];
  total: number;
}

export interface UserProgressResponse {
  status: 'success' | 'error';
  data: {
    total_challenges: number;
    solved: number;
    score: number;
    categories: Record<string, number>;
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

class ChallengeService {
  /**
   * Get all active challenges (optionally filtered by category / difficulty)
   */
  async getChallenges(params?: { category?: string; difficulty?: string }): Promise<ChallengesResponse> {
    const response = await api.get<ChallengesResponse>('/challenges', { params });
    return response.data;
  }

  /**
   * Get a single challenge by ID
   */
  async getChallenge(id: number): Promise<ChallengeDetailResponse> {
    const response = await api.get<ChallengeDetailResponse>(`/challenges/${id}`);
    return response.data;
  }

  /**
   * Submit a flag for a specific challenge
   * Works for guests (no score saved) and authenticated users
   */
  async submitFlag(challengeId: number, flag: string): Promise<SubmitFlagResponse> {
    try {
      const response = await api.post<SubmitFlagResponse>(`/challenges/${challengeId}/submit`, { flag });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        return error.response.data as SubmitFlagResponse;
      }
      return { status: 'error', message: 'Network error. Please try again.' };
    }
  }

  /**
   * Get all challenges solved by the authenticated user
   */
  async getSolvedChallenges(): Promise<SolvedChallengesResponse> {
    try {
      const response = await api.get<SolvedChallengesResponse>('/challenges/user/solved');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return { status: 'success', solved: [], count: 0 };
      }
      throw error;
    }
  }

  /**
   * Get global scoreboard / leaderboard
   */
  async getScoreboard(limit = 20): Promise<ScoreboardResponse> {
    const response = await api.get<ScoreboardResponse>('/scoreboard', { params: { limit } });
    return response.data;
  }

  /**
   * Get authenticated user's progress
   */
  async getUserProgress(): Promise<UserProgressResponse> {
    try {
      const response = await api.get<UserProgressResponse>('/challenges/user/progress');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return {
          status: 'success',
          data: { total_challenges: 0, solved: 0, score: 0, categories: {} },
        };
      }
      throw error;
    }
  }
}

export const challengeService = new ChallengeService();
