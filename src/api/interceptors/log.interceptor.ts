import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

export function requestLogInterceptor(config: InternalAxiosRequestConfig) {
  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.params || config.data)
  return config
}

export function responseLogInterceptor(response: AxiosResponse) {
  console.log(`[API Response] ${response.status} ${response.config.url}`, response.data)
  return response
}
