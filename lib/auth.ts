// Simple authentication utility
const STORAGE_KEY = 'auth_session';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}

// Mock user credentials (in production, verify against a real backend)
const VALID_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123',
};

export const auth = {
  // Login user
  login: (email: string, password: string): { success: boolean; message?: string } => {
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      const session: AuthSession = {
        user: {
          id: '1',
          email: email,
          name: 'Admin User',
        },
        token: `token_${Date.now()}`,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      }
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  // Logout user
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  // Get current session
  getSession: (): AuthSession | null => {
    if (typeof window === 'undefined') return null;
    const session = localStorage.getItem(STORAGE_KEY);
    if (!session) return null;
    
    const parsed = JSON.parse(session) as AuthSession;
    if (parsed.expiresAt < Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return auth.getSession() !== null;
  },
};
