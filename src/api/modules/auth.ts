import http from '@/api/request'
import type { LoginParams, LoginResult, UserInfo } from '@/types'

/**
 * 登录
 */
export function loginApi(params: LoginParams) {
  return http.post<LoginResult>('/auth/login', params)
}

/**
 * 登出
 */
export function logoutApi() {
  return http.post('/auth/logout')
}

/**
 * 获取用户信息
 */
export function getUserInfoApi() {
  return http.get<UserInfo>('/users/info')
}

/**
 * 刷新 Token
 */
export function refreshTokenApi() {
  return http.post<LoginResult>('/auth/refresh')
}
