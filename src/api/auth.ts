/**
 * 认证 API 客户端
 * 根据 openspec 规范自动生成
 */

const API_BASE = '/api/v1';

// ============ 类型定义（从 openapi.yaml 生成）============

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  code: number;
  message: string;
  data: {
    token: string;
    expiresIn: number;
    user: {
      id: number;
      email: string;
      role: string;
      createdAt: string;
    };
  };
}

export interface SendCodeRequest {
  email: string;
}

export interface SendCodeResponse {
  code: number;
  message: string;
  data?: {
    expiresIn?: number;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  code: string;
}

export interface RegisterResponse extends LoginResponse {}

export interface ErrorResponse {
  code: number;
  message: string;
  data?: any;
}

// ============ API 客户端 ============

export class AuthApi {
  /**
   * 用户登录
   * POST /api/v1/auth/login
   */
  static async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (result.code !== 0) {
      throw new Error(result.message);
    }
    
    return result;
  }

  /**
   * 发送注册验证码
   * POST /api/v1/auth/register/send-code
   */
  static async sendCode(data: SendCodeRequest): Promise<SendCodeResponse> {
    const response = await fetch(`${API_BASE}/auth/register/send-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    return response.json();
  }

  /**
   * 用户注册
   * POST /api/v1/auth/register
   */
  static async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (result.code !== 0) {
      throw new Error(result.message);
    }
    
    return result;
  }
}

// ============ Token 管理 ============

export const TokenManager = {
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  },
  
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },
  
  removeToken(): void {
    localStorage.removeItem('auth_token');
  },
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
