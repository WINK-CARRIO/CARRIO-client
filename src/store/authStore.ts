import { create } from 'zustand';

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  oauth_provider?: string | null;
  created_at?: string;
};

type AuthState = {
  accessToken: string | null;
  user: User | null;
  setAuth: (payload: { accessToken: string; user: User }) => void;
  logout: () => void;
  hydrateAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setAuth: ({ accessToken, user }) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    set({
      accessToken,
      user,
    });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    set({
      accessToken: null,
      user: null,
    });
  },

  hydrateAuth: () => {
    const accessToken = localStorage.getItem('access_token');
    const userRaw = localStorage.getItem('user');

    set({
      accessToken,
      user: userRaw ? JSON.parse(userRaw) : null,
    });
  },
}));
