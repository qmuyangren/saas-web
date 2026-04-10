import type { InternalAxiosRequestConfig } from 'axios'
import { TOKEN_KEY } from '@/constants'

export function authInterceptor(config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}
