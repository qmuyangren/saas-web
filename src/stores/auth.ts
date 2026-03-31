/**
 * 认证状态管理 (Pinia Store)
 * 基于 OpenAPI 规范 v1
 */

import { defineStore } from 'pinia'
import type { User, AuthState } from '@/types/auth'

const TOKEN_KEY = 'auth_token'
const TOKEN_EXPIRES_KEY = 'auth_token_expires'
const USER_KEY = 'auth_user'
const REMEMBER_ME_KEY = 'auth_remember_me'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null,
    tokenExpiresAt: parseInt(localStorage.getItem(TOKEN_EXPIRES_KEY) || sessionStorage.getItem(TOKEN_EXPIRES_KEY) || '0', 10) || null,
    user: JSON.parse(localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY) || 'null'),
    rememberMe: localStorage.getItem(REMEMBER_ME_KEY) === 'true',
    isAuthenticated: false,
  }),

  getters: {
    isLoggedIn: (state): boolean => {
      if (!state.token || !state.tokenExpiresAt) return false
      // 检查 token 是否过期
      return Date.now() < state.tokenExpiresAt
    },

    currentUser: (state): User | null => {
      return state.user
    },

    currentToken: (state): string | null => {
      if (!state.token || !state.tokenExpiresAt) return null
      if (Date.now() >= state.tokenExpiresAt) return null
      return state.token
    },

    tokenTimeRemaining: (state): number => {
      if (!state.tokenExpiresAt) return 0
      return Math.max(0, state.tokenExpiresAt - Date.now())
    },
  },

  actions: {
    /**
     * 设置认证 Token
     */
    setToken(token: string, expiresIn: number): void {
      this.token = token
      this.tokenExpiresAt = Date.now() + expiresIn * 1000

      const storage = this.rememberMe ? localStorage : sessionStorage

      storage.setItem(TOKEN_KEY, token)
      storage.setItem(TOKEN_EXPIRES_KEY, this.tokenExpiresAt.toString())
    },

    /**
     * 设置用户信息
     */
    setUser(user: User): void {
      this.user = user

      const storage = this.rememberMe ? localStorage : sessionStorage
      storage.setItem(USER_KEY, JSON.stringify(user))
    },

    /**
     * 设置记住我状态
     */
    setRememberMe(rememberMe: boolean): void {
      this.rememberMe = rememberMe
      localStorage.setItem(REMEMBER_ME_KEY, rememberMe.toString())

      // 如果从记住我切换，需要迁移存储
      if (rememberMe && this.token) {
        // 保持现有 token（sessionStorage -> localStorage）
        localStorage.setItem(TOKEN_KEY, this.token)
        if (this.tokenExpiresAt) {
          localStorage.setItem(TOKEN_EXPIRES_KEY, this.tokenExpiresAt.toString())
        }
        if (this.user) {
          localStorage.setItem(USER_KEY, JSON.stringify(this.user))
        }
        sessionStorage.removeItem(TOKEN_KEY)
        sessionStorage.removeItem(TOKEN_EXPIRES_KEY)
        sessionStorage.removeItem(USER_KEY)
      } else if (!rememberMe && this.token) {
        // 保持现有 token（localStorage -> sessionStorage）
        sessionStorage.setItem(TOKEN_KEY, this.token)
        if (this.tokenExpiresAt) {
          sessionStorage.setItem(TOKEN_EXPIRES_KEY, this.tokenExpiresAt.toString())
        }
        if (this.user) {
          sessionStorage.setItem(USER_KEY, JSON.stringify(this.user))
        }
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(TOKEN_EXPIRES_KEY)
        localStorage.removeItem(USER_KEY)
      }
    },

    /**
     * 清除认证状态
     */
    clearAuth(): void {
      this.token = null
      this.tokenExpiresAt = null
      this.user = null
      this.isAuthenticated = false

      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(TOKEN_EXPIRES_KEY)
      localStorage.removeItem(USER_KEY)
      sessionStorage.removeItem(TOKEN_KEY)
      sessionStorage.removeItem(TOKEN_EXPIRES_KEY)
      sessionStorage.removeItem(USER_KEY)
    },

    /**
     * 初始化认证状态
     */
    initAuth(): void {
      const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
      const expiresAt = parseInt(
        localStorage.getItem(TOKEN_EXPIRES_KEY) || sessionStorage.getItem(TOKEN_EXPIRES_KEY) || '0',
        10
      )
      const user = JSON.parse(
        localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY) || 'null'
      )
      const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === 'true'

      if (token && expiresAt && Date.now() < expiresAt) {
        this.token = token
        this.tokenExpiresAt = expiresAt
        this.user = user
        this.rememberMe = rememberMe
        this.isAuthenticated = true
      } else {
        this.clearAuth()
      }
    },
  },
})
