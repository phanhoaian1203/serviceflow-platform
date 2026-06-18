import type { ApiResponse } from '../../types/api.ts';
import type { RegisterRequest, LoginRequest, AuthResponse, CurrentUserResponse } from './auth.types.ts';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  const json = await response.json().catch(() => ({
    success: false,
    message: 'Lỗi kết nối máy chủ.',
    data: null,
    errors: null
  }));

  if (!response.ok) {
    throw json;
  }
  return json;
};

export const authApi = {
  register: async (payload: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    return handleResponse<AuthResponse>(response);
  },

  login: async (payload: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    return handleResponse<AuthResponse>(response);
  },

  refreshToken: async (): Promise<ApiResponse<AuthResponse>> => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include', // Bắt buộc để gửi nhận HttpOnly cookie
    });
    return handleResponse<AuthResponse>(response);
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return handleResponse<null>(response);
  },

  getMe: (token: string): Promise<ApiResponse<CurrentUserResponse>> => {
    return fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => handleResponse<CurrentUserResponse>(response));
  },
};
