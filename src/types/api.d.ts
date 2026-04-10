// API 相关类型定义

// 统一 API 响应格式
export interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T
}

// 分页响应格式
export interface PaginatedResponse<T = any> {
  list: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

// 分页请求参数
export interface PageParams {
  page?: number
  pageSize?: number
  [key: string]: any
}
