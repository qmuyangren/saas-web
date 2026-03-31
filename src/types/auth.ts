/**
 * 认证类型定义
 * 基于 OpenAPI 规范 v1
 */

/**
 * 登录请求表单
 */
export interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

/**
 * 登录成功响应
 */
export interface LoginResponse {
  code: 0
  message: 'success'
  data: {
    token: string
    expiresIn: number
    user: User
  }
}

/**
 * 错误响应
 */
export interface ErrorResponse {
  code: number
  message: string
  data: {
    lockedUntil?: string
  } | null
}

/**
 * 用户信息
 */
export interface User {
  id: number
  email: string
  createdAt: string
}

/**
 * 认证状态
 */
export interface AuthState {
  token: string | null
  tokenExpiresAt: number | null
  user: User | null
  rememberMe: boolean
  isAuthenticated: boolean
}
