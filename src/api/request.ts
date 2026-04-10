import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types'
import { TOKEN_KEY } from '@/constants'
import { message } from 'ant-design-vue'

const BASE_URL = '/api'
const TIMEOUT = 30000

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response
    const { code, msg } = data

    // 成功响应
    if (code === 0) {
      return response
    }

    // Token 失效
    if (code === 401) {
      localStorage.removeItem(TOKEN_KEY)
      window.location.href = '/login'
      return Promise.reject(new Error('登录已过期，请重新登录'))
    }

    // 其他错误
    message.error(msg || '请求失败')
    return Promise.reject(new Error(msg || '请求失败'))
  },
  (error) => {
    const { response, code } = error
    const errorMsg = response?.data?.msg || response?.data?.message || error.message || '网络错误'

    // HTTP 状态码处理
    switch (code) {
      case 'ECONNABORTED':
        message.error('请求超时')
        break
      case 'NETWORK':
        message.error('网络连接失败')
        break
      default:
        if (response?.status) {
          const statusMsg: Record<number, string> = {
            400: '请求参数错误',
            401: '登录已过期，请重新登录',
            403: '拒绝访问',
            404: '请求地址不存在',
            500: '服务器错误',
            502: '网关错误',
            503: '服务不可用',
            504: '网关超时',
          }
          message.error(statusMsg[response.status] || errorMsg)

          if (response.status === 401) {
            localStorage.removeItem(TOKEN_KEY)
            window.location.href = '/login'
          }
        } else {
          message.error(errorMsg)
        }
    }

    return Promise.reject(error)
  }
)

// 导出请求方法
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.get(url, config).then(res => res.data)
  },

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.post(url, data, config).then(res => res.data)
  },

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.put(url, data, config).then(res => res.data)
  },

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.patch(url, data, config).then(res => res.data)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.delete(url, config).then(res => res.data)
  },

  request<T = any>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.request(config).then(res => res.data)
  },
}

export default http
