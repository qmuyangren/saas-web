import http from '@/api/request'

/**
 * 获取概览统计
 */
export function getOverviewApi() {
  return http.get('/dashboard/overview')
}

/**
 * 获取趋势数据
 */
export function getTrendApi() {
  return http.get('/dashboard/trend')
}

/**
 * 获取活动记录
 */
export function getActivityApi() {
  return http.get('/dashboard/activity')
}
