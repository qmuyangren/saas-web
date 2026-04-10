import { defineStore } from 'pinia'
import { MENU_LIST_KEY } from '@/constants'
import { Persistent } from '@/utils/cache'
import { useUserStore } from './user'

export interface Menu {
  id: string
  parentId: string
  name: string
  path: string
  component?: string
  icon?: string
  sort: number
  enable: boolean
  type: string
  permission?: string
  children?: Menu[]
}

export interface PermissionState {
  isDynamicAddedRoute: boolean
  lastBuildMenuTime: number
  menuList: Menu[]
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    menuList: Persistent.getLocal(MENU_LIST_KEY) || [],
  }),

  getters: {
    getMenuList(): Menu[] {
      return this.menuList
    },

    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },

    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
  },

  actions: {
    setMenuList(list: Menu[]) {
      this.menuList = list
      Persistent.setLocal(MENU_LIST_KEY, list)
      if (list.length > 0) {
        this.lastBuildMenuTime = Date.now()
      }
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },

    resetState() {
      this.isDynamicAddedRoute = false
      this.lastBuildMenuTime = 0
      this.menuList = []
      Persistent.clearLocal(MENU_LIST_KEY)
    },

    async buildRoutesAction(): Promise<any[]> {
      const userStore = useUserStore()
      const menuList = userStore.getMenuList

      if (!menuList || menuList.length === 0) {
        // 尝试从 userStore 直接获取
        await userStore.getUserInfoAction()
        const retryMenuList = userStore.getMenuList
        if (!retryMenuList || retryMenuList.length === 0) {
          return []
        }
        return await this.transformMenuToRoutes(retryMenuList)
      }

      const routes = await this.transformMenuToRoutes(menuList)
      return routes
    },

    async transformMenuToRoutes(menus: Menu[]): Promise<any[]> {
      const routes: any[] = []

      // 视图组件映射
      const viewModules: Record<string, () => Promise<any>> = {
        'dashboard/index': () => import('@/views/dashboard/index.vue'),
        'system/user/index': () => import('@/views/system/user/index.vue'),
        'system/role/index': () => import('@/views/system/role/index.vue'),
        'system/menu/index': () => import('@/views/system/menu/index.vue'),
        'system/config/index': () => import('@/views/system/config/index.vue'),
      }

      for (const menu of menus) {
        if (!menu.enable) continue

        const route: any = {
          path: menu.path,
          name: menu.name,
          meta: {
            title: menu.name,
            icon: menu.icon,
            permission: menu.permission,
          },
        }

        if (menu.component === 'layout') {
          route.component = () => import('@/components/layout/DashboardLayout.vue')
          route.redirect = menu.children?.[0]?.path
        } else if (menu.component && viewModules[menu.component]) {
          route.component = viewModules[menu.component]
        }

        if (menu.children && menu.children.length > 0) {
          const childRoutes = await this.transformMenuToRoutes(menu.children)
          if (route.component) {
            route.children = childRoutes
          } else {
            route.children = childRoutes
            route.component = () => import('@/components/layout/DashboardLayout.vue')
          }
        }

        routes.push(route)
      }

      return routes
    },
  },
})

export function usePermissionStoreWithOut() {
  return usePermissionStore()
}
