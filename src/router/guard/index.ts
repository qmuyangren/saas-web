import type { Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'
import { createStateGuard } from './stateGuard'
import { createProgressGuard } from './progressGuard'

/**
 * 创建路由守卫
 * @param router
 */
export function createRouterGuard(router: Router) {
  // 进度条
  createProgressGuard(router)
  // 权限守卫
  createPermissionGuard(router)
  // 状态守卫
  createStateGuard(router)
}
