import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from './auth.api.ts';
import type { AuthUserDto, LoginRequest, RegisterRequest } from './auth.types.ts';

interface AuthContextType {
  user: AuthUserDto | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUserDto | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Hàm refresh token (Silent Refresh)
  const refresh = useCallback(async (): Promise<string | null> => {
    try {
      const response = await authApi.refreshToken();
      if (response.success && response.data) {
        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
        return response.data.accessToken;
      }
    } catch (error) {
      // Hết hạn refresh token hoặc chưa đăng nhập, clear state
      setAccessToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
    return null;
  }, []);

  // Đăng nhập
  const login = async (payload: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(payload);
      if (response.success && response.data) {
        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
      } else {
        throw new Error(response.message || 'Đăng nhập không thành công.');
      }
    } catch (error) {
      setAccessToken(null);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Đăng ký
  const register = async (payload: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await authApi.register(payload);
      if (response.success && response.data) {
        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
      } else {
        throw new Error(response.message || 'Đăng ký không thành công.');
      }
    } catch (error) {
      setAccessToken(null);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Đăng xuất
  const logout = async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAccessToken(null);
      setUser(null);
      setIsLoading(false);
    }
  };

  // Thử refresh token khi khởi chạy app lần đầu
  useEffect(() => {
    refresh();
  }, [refresh]);

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
