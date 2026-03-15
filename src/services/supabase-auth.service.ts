// This file has been removed. Supabase has been replaced with MySQL + Laravel Sanctum.
// Use @/services/auth.service instead.
export {};


// Local user type for the application
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at?: string;
}

export interface AuthResponse {
  user: User;
  session: Session | null;
  needsConfirmation?: boolean;
}

// Transform Supabase user to application user
const transformUser = (supabaseUser: SupabaseAuthUser): User => {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    name: getUserDisplayName(supabaseUser as SupabaseUser),
    avatar_url: supabaseUser.user_metadata?.avatar_url,
    created_at: supabaseUser.created_at,
  };
};

class SupabaseAuthService {
  /**
   * Sign up a new user with email and password
   */
  async signUp(email: string, password: string, name: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          full_name: name,
        },
      },
    });

    if (error) throw error;
    if (!data.user) {
      throw new Error('Failed to create user account');
    }

    // data.session is null when Supabase email confirmation is required
    return {
      user: transformUser(data.user),
      session: data.session,
      needsConfirmation: !data.session,
    };
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user || !data.session) {
      throw new Error('Invalid login credentials');
    }

    return {
      user: transformUser(data.user),
      session: data.session,
    };
  }

  /**
   * Sign in with Google OAuth
   */
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  }

  /**
   * Sign in with GitHub OAuth
   */
  async signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  /**
   * Get current session
   */
  async getSession(): Promise<Session | null> {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    const { data } = await supabase.auth.getUser();
    return data.user ? transformUser(data.user) : null;
  }

  /**
   * Send password reset email
   */
  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;
  }

  /**
   * Update user password
   */
  async updatePassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        name: updates.name,
        full_name: updates.name,
        avatar_url: updates.avatar_url,
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error('Failed to update profile');

    return transformUser(data.user);
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return !!session;
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ? transformUser(session.user) : null;
      callback(user);
    });
  }

  /**
   * Get error message from Supabase AuthError
   */
  getErrorMessage(error: AuthError | Error): string {
    if ('message' in error) {
      // Map common Supabase errors to user-friendly messages
      const message = error.message.toLowerCase();
      
      if (message.includes('invalid login credentials')) {
        return 'Email atau password salah';
      }
      if (message.includes('user already registered')) {
        return 'Email sudah terdaftar';
      }
      if (message.includes('email not confirmed')) {
        return 'Silakan konfirmasi email Anda terlebih dahulu';
      }
      if (message.includes('password')) {
        return 'Password minimal 6 karakter';
      }
      if (message.includes('not enabled') || message.includes('unsupported provider')) {
        return 'Login dengan provider ini belum tersedia. Silakan gunakan email/password atau hubungi administrator.';
      }
      if (message.includes('rate limit')) {
        return 'Terlalu banyak percobaan. Silakan coba lagi nanti.';
      }
      
      return error.message;
    }
    return 'Terjadi kesalahan, silakan coba lagi';
  }
}

export const supabaseAuthService = new SupabaseAuthService();
