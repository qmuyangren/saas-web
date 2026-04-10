import { message } from 'ant-design-vue'

const ERROR_MESSAGES: Record<number, string> = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求的资源不存在',
  408: '请求超时',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
}

export function errorInterceptor(error: unknown) {
  const status = (error as { response?: { status?: number } }).response?.status
  const msg = ERROR_MESSAGES[status ?? 0] || '网络异常'
  message.error(msg)
  return Promise.reject(error)
}
