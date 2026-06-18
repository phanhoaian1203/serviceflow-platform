export interface RegisterRequest {
  fullName: string;
  email: string;
  password?: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface AuthUserDto {
  id: string;
  fullName: string;
  email: string;
  systemRole: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUserDto;
}

export interface CurrentUserResponse {
  id: string;
  fullName: string;
  email: string;
  systemRole: string;
}
