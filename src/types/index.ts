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

// 用户信息
export interface UserInfo {
  id: string
  username: string
  realName?: string
  email?: string
  phone?: string
  avatar?: string
  role?: string
  organizeId?: string
  organizeName?: string
  position?: string
  gender?: string
  birthday?: string
  createTime?: string
  menuList?: any[]
  permissionList?: string[]
  permissions?: string[]
}

// 登录参数
export interface LoginParams {
  username: string
  password: string
}

// 登录结果
export interface LoginResult {
  token: string
  expiresIn?: number
}
