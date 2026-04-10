import { http } from '../request'

// 获取用户路由权限
export const getPermissionRoutes = () => {
  return http.get('/permission/routes')
}

// 获取用户信息  
export const getUserInfo = () => {
  return http.get('/user/info')
}
