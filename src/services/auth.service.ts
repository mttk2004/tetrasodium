import axiosInstance from '@/lib/axios';
import { LoginFormValues, User } from '@/schemas/auth.schema';
import { LOCAL_STORAGE_KEYS } from '@/config/constants';

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (credentials: LoginFormValues): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);

    // Lưu thông tin đăng nhập vào localStorage
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, response.data.token);
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(response.data.user));

    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    window.location.href = '/login';
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as User;
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  },
};
