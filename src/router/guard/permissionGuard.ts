import type { Router } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'

const LOGIN_PATH = '/login'
const WHITE_PATH_LIST = ['/login', '/404', '/403', '/500']

export function createPermissionGuard(router: Router) {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  router.beforeEach(async (to, _from, next) => {
    const token = userStore.getToken

    // 白名单直接放行
    if (WHITE_PATH_LIST.includes(to.path)) {
      next()
      return
    }

    // token 不存在，跳转到登录页
    if (!token) {
      next({
        path: LOGIN_PATH,
        query: { redirect: to.fullPath },
        replace: true,
      })
      return
    }

    // 已登录，访问登录页则跳转到首页
    if (to.path === LOGIN_PATH) {
      next({ path: '/', replace: true })
      return
    }

    // 用户信息未加载，先加载用户信息
    if (!userStore.getUserInfo?.id) {
      try {
        await userStore.getUserInfoAction()
      } catch (error) {
        console.error('Get user info failed:', error)
        userStore.resetState()
        next({
          path: LOGIN_PATH,
          query: { redirect: to.fullPath },
          replace: true,
        })
        return
      }
    }

    // 动态路由已加载，直接放行
    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    // 构建动态路由
    try {
      const routes = await permissionStore.buildRoutesAction()
      routes.forEach(route => {
        router.addRoute(route)
      })

      // 添加 404 路由
      router.addRoute(PAGE_NOT_FOUND_ROUTE)

      permissionStore.setDynamicAddedRoute(true)

      // 使用 router.replace 直接导航，避免 next() 在路由添加后的匹配问题
      const redirectPath = to.path === '/' ? '/dashboard/index' : to.path
      next({ path: redirectPath, replace: true, query: to.query, hash: to.hash })
    } catch (error) {
      console.error('Build routes failed:', error)
      permissionStore.resetState()
      userStore.resetState()
      next({
        path: LOGIN_PATH,
        query: { redirect: to.fullPath },
        replace: true,
      })
    }
  })
}
