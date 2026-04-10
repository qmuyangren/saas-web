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
