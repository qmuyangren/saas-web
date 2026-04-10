import http from '@/api/request'
import type { UserInfo, PageParams, PaginatedResponse } from '@/types'

/**
 * 获取用户列表
 */
export function getUserListApi(params: PageParams) {
  return http.get<PaginatedResponse<UserInfo>>('/users', { params })
}

/**
 * 获取用户详情
 */
export function getUserDetailApi(id: string) {
  return http.get<UserInfo>(`/users/${id}`)
}

/**
 * 创建用户
 */
export function createUserApi(data: Partial<UserInfo>) {
  return http.post<UserInfo>('/users', data)
}

/**
 * 更新用户
 */
export function updateUserApi(id: string, data: Partial<UserInfo>) {
  return http.put<UserInfo>(`/users/${id}`, data)
}

/**
 * 删除用户
 */
export function deleteUserApi(id: string) {
  return http.delete(`/users/${id}`)
}

/**
 * 批量删除用户
 */
export function batchDeleteUsersApi(ids: string[]) {
  return http.post('/users/batch-delete', { ids })
}
