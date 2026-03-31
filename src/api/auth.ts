/**
 * 认证 API 模块
 * 基于 OpenAPI 规范 v1
 * Base URL: /api/v1
 */

import type { LoginForm, LoginResponse, ErrorResponse } from '@/types/auth'

const API_BASE = '/api/v1'

/**
 * 用户登录
 * @param data - 登录表单数据
 * @returns Promise<LoginResponse | ErrorResponse>
 */
export async function login(data: LoginForm): Promise<LoginResponse | ErrorResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include', // 发送 cookies
  })

  const result = await response.json()

  if (!response.ok) {
    throw result as ErrorResponse
  }

  return result as LoginResponse
}

/**
 * 用户登出
 */
export async function logout(): Promise<void> {
  await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
}

/**
 * 刷新 Token
 */
export async function refreshToken(): Promise<{ token: string; expiresIn: number }> {
  const response = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Token refresh failed')
  }

  return response.json()
}
